import { createHash } from "node:crypto";

const WINDOW_SECONDS = 60;
const MAX_REQUESTS = 8;

const memory = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();
    return request.headers.get("x-real-ip") || "unknown";
}

function identifierFor(request: Request): string {
    const ip = getClientIp(request);
    const salt = process.env.RATE_LIMIT_SALT || "portfolio-rag-rate-limit";
    return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

async function upstashRateLimit(identifier: string): Promise<boolean> {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) return memoryRateLimit(identifier);

    const key = `portfolio-rag:minute:${identifier}`;
    const script = `
local count = redis.call('INCR', KEYS[1])
if count == 1 then
  redis.call('EXPIRE', KEYS[1], ARGV[1])
end
return count
`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            command: "EVAL",
            args: [script, "1", key, String(WINDOW_SECONDS)],
        }),
        cache: "no-store",
    });

    if (!response.ok) {
        // Do not silently remove protection if Redis is temporarily unavailable.
        return memoryRateLimit(identifier);
    }

    const payload = (await response.json()) as { result?: number };
    return Number(payload.result) <= MAX_REQUESTS;
}

function memoryRateLimit(identifier: string): boolean {
    const now = Date.now();
    const current = memory.get(identifier);

    if (!current || current.resetAt <= now) {
        memory.set(identifier, {
            count: 1,
            resetAt: now + WINDOW_SECONDS * 1000,
        });
        return true;
    }

    current.count += 1;
    return current.count <= MAX_REQUESTS;
}

export async function enforceRagRateLimit(request: Request): Promise<boolean> {
    return upstashRateLimit(identifierFor(request));
}

export const RAG_RATE_LIMIT = {
    maxRequests: MAX_REQUESTS,
    windowSeconds: WINDOW_SECONDS,
};
