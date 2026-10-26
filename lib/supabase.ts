// lib/supabase.ts
// Reusable Supabase client for both browser and server contexts.
// NOTE: Do NOT expose the service_role key. Use only the public anon key.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let supabaseClient: SupabaseClient | null = null;

/**
 * Returns a Supabase client instance.
 * In a browser environment it uses NEXT_PUBLIC_ env vars.
 * On the server (Node) it prefers the same public vars, but you can also
 * provide a service_role key via SERVER_SUPABASE_SERVICE_ROLE_KEY if needed –
 * never import that in client‑side code.
 */
export function getSupabaseClient(): SupabaseClient | null {
  // Browser side – use public anon key.
  if (typeof window !== "undefined") {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anonKey) return null;

    if (!supabaseClient) {
      supabaseClient = createClient(url, anonKey);
    }
    return supabaseClient;
  }

  // Server side – optionally use service role key for privileged access.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SERVER_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;

  if (!supabaseClient) {
    supabaseClient = createClient(url, serviceKey);
  }
  return supabaseClient;
}

// For compatibility with existing import path used in LiveChat.
export { getSupabaseClient as getSupabaseBrowserClient };
