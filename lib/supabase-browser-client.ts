// lib/supabase-browser-client.ts
// Thin wrapper to maintain existing import paths for the LiveChat component and other client‑side utilities.
// Re‑exports the browser‑only client creator from supabase.ts.
export { getSupabaseClient as getSupabaseBrowserClient } from "./supabase";
