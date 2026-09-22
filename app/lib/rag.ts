import { readFile } from "node:fs/promises";
import path from "node:path";

export type RagChunk = {
    id: string;
    type: string;
    title: string;
    content: string;
    embedding: number[];
};

type RagIndex = {
    version: number;
    embeddingModel: string;
    dimensions: number;
    generatedAt: string;
    chunks: RagChunk[];
};

const INDEX_PATH = path.join(process.cwd(), "content/rag/index.json");
const TOP_K = 5;
const SIMILARITY_THRESHOLD = 0.7;

let cachedIndex: RagIndex | null = null;

async function loadIndex(): Promise<RagIndex> {
    if (cachedIndex) return cachedIndex;

    try {
        const raw = await readFile(INDEX_PATH, "utf8");
        cachedIndex = JSON.parse(raw) as RagIndex;
        return cachedIndex;
    } catch {
        throw new Error(
            "RAG index is missing. Run `npm run rag:ingest` or `npm run build` with OPENAI_API_KEY configured."
        );
    }
}

export async function embedQuery(query: string): Promise<number[]> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY is not configured.");

    const response = await fetch("https://api.openai.com/v1/embeddings", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: process.env.RAG_EMBEDDING_MODEL || "text-embedding-3-small",
            input: query,
        }),
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`Query embedding failed with status ${response.status}.`);
    }

    const payload = (await response.json()) as {
        data?: Array<{ embedding: number[] }>;
    };

    const embedding = payload.data?.[0]?.embedding;
    if (!embedding) throw new Error("Embedding provider returned no vector.");
    return embedding;
}

function cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return -1;

    let dot = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i += 1) {
        dot += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
    }

    if (normA === 0 || normB === 0) return -1;
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function retrieve(queryEmbedding: number[]) {
    const index = await loadIndex();

    return index.chunks
        .map((chunk) => ({
            chunk,
            score: cosineSimilarity(queryEmbedding, chunk.embedding),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, TOP_K)
        .filter(({ score }) => score >= SIMILARITY_THRESHOLD);
}

export const RAG_CONFIG = {
    topK: TOP_K,
    similarityThreshold: SIMILARITY_THRESHOLD,
};
