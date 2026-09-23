import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const ROOT = process.cwd();
const SOURCE = resolve(ROOT, "content/rag/chunks.json");
const OUTPUT = resolve(ROOT, "content/rag/index.json");
const MODEL = process.env.RAG_EMBEDDING_MODEL || "text-embedding-3-small";

// RAG indexing is optional during deployment. Vercel can build the portfolio
// without an OpenAI key; when the key is configured, regenerate the index.
if (!process.env.OPENAI_API_KEY) {
    console.warn("OPENAI_API_KEY is not configured; skipping RAG index generation.");
    process.exit(0);
}

const chunks = JSON.parse(await readFile(SOURCE, "utf8"));

if (!Array.isArray(chunks) || chunks.length === 0) {
    throw new Error("content/rag/chunks.json must contain at least one chunk.");
}

function validateChunk(chunk) {
    if (!chunk?.id || !chunk?.type || !chunk?.title || !chunk?.content) {
        throw new Error(`Invalid RAG chunk: ${JSON.stringify(chunk)}`);
    }
}

chunks.forEach(validateChunk);

async function createEmbeddings(inputs) {
    const response = await fetch("https://api.openai.com/v1/embeddings", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: MODEL, input: inputs }),
    });

    if (!response.ok) {
        const detail = await response.text();
        throw new Error(`Embedding request failed (${response.status}): ${detail}`);
    }

    const payload = await response.json();
    return payload.data
        .sort((a, b) => a.index - b.index)
        .map((item) => item.embedding);
}

const embeddings = await createEmbeddings(
    chunks.map((chunk) => `${chunk.title}\n${chunk.content}`)
);

const index = {
    version: 1,
    embeddingModel: MODEL,
    dimensions: embeddings[0]?.length ?? 0,
    generatedAt: new Date().toISOString(),
    chunks: chunks.map((chunk, index) => ({
        ...chunk,
        embedding: embeddings[index],
    })),
};

await mkdir(dirname(OUTPUT), { recursive: true });
await writeFile(OUTPUT, `${JSON.stringify(index, null, 2)}\n`, "utf8");

console.log(`RAG index generated: ${chunks.length} chunks × ${index.dimensions} dimensions`);
