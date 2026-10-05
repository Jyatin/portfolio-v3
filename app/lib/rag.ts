import { readFile } from "node:fs/promises";
import path from "node:path";

export type RagChunk = {
    id: string;
    type: string;
    title: string;
    content: string;
    embedding?: number[];
};

type RagIndex = {
    version: number;
    embeddingModel: string;
    dimensions: number;
    generatedAt: string;
    chunks: RagChunk[];
};

const INDEX_PATH = path.join(process.cwd(), "content/rag/index.json");
const CHUNKS_PATH = path.join(process.cwd(), "content/rag/chunks.json");
const TOP_K = 5;
const SIMILARITY_THRESHOLD = 0.7;
const LEXICAL_THRESHOLD = 0.08;

let cachedIndex: RagIndex | null = null;
let cachedChunks: RagChunk[] | null = null;

async function loadChunks(): Promise<RagChunk[]> {
    if (cachedChunks) return cachedChunks;

    const raw = await readFile(CHUNKS_PATH, "utf8");
    const chunks = JSON.parse(raw) as RagChunk[];

    if (!Array.isArray(chunks) || chunks.length === 0) {
        throw new Error("RAG chunks are missing or empty.");
    }

    cachedChunks = chunks;
    return chunks;
}

async function loadIndex(): Promise<RagIndex | null> {
    if (cachedIndex) return cachedIndex;

    try {
        const raw = await readFile(INDEX_PATH, "utf8");
        cachedIndex = JSON.parse(raw) as RagIndex;
        return cachedIndex;
    } catch {
        return null;
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
    if (!index) return [];

    return index.chunks
        .filter((chunk) => Array.isArray(chunk.embedding))
        .map((chunk) => ({
            chunk,
            score: cosineSimilarity(queryEmbedding, chunk.embedding!),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, TOP_K)
        .filter(({ score }) => score >= SIMILARITY_THRESHOLD);
}

function tokenize(value: string): string[] {
    const stopWords = new Set([
        "a", "an", "and", "are", "as", "at", "be", "by", "do", "for", "from",
        "how", "i", "in", "is", "it", "me", "my", "of", "on", "or", "that", "the",
        "this", "to", "what", "when", "where", "which", "who", "with", "your", "you",
    ]);

    return value
        .toLowerCase()
        .replace(/[^a-z0-9+#.-]+/g, " ")
        .split(/\s+/)
        .filter((token) => token.length > 1 && !stopWords.has(token));
}

/**
 * Dependency-free fallback retrieval over the committed portfolio corpus.
 * This keeps the assistant usable when the optional vector index or
 * embedding provider is unavailable.
 */
export async function retrieveLexical(query: string) {
    const chunks = await loadChunks();
    const queryTokens = tokenize(query);

    if (queryTokens.length === 0) return [];

    const scored = chunks.map((chunk) => {
        const titleTokens = tokenize(chunk.title);
        const contentTokens = tokenize(chunk.content);
        const titleSet = new Set(titleTokens);
        const contentSet = new Set(contentTokens);

        let score = 0;
        for (const token of queryTokens) {
            if (titleSet.has(token)) score += 0.22;
            if (contentSet.has(token)) score += 0.08;
        }

        // Reward phrases/names that appear verbatim in the corpus.
        const normalizedQuery = query.trim().toLowerCase();
        const title = chunk.title.toLowerCase();
        const content = chunk.content.toLowerCase();
        if (normalizedQuery.length >= 4 && title.includes(normalizedQuery)) score += 0.6;
        if (normalizedQuery.length >= 4 && content.includes(normalizedQuery)) score += 0.25;

        const coverage = queryTokens.filter((token) => contentSet.has(token) || titleSet.has(token)).length;
        if (queryTokens.length > 0) score += (coverage / queryTokens.length) * 0.2;

        return { chunk, score };
    });

    return scored
        .sort((a, b) => b.score - a.score)
        .slice(0, TOP_K)
        .filter(({ score }) => score >= LEXICAL_THRESHOLD);
}

export const RAG_CONFIG = {
    topK: TOP_K,
    similarityThreshold: SIMILARITY_THRESHOLD,
    lexicalThreshold: LEXICAL_THRESHOLD,
};
