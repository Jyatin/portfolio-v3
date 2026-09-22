import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

/**
 * One Supabase client per browser tab. Navbar + collaborative cursors (and any future
 * client features) must share this so GoTrueClient is not instantiated twice on the
 * same storage key.
 */
export function getSupabaseBrowserClient(): SupabaseClient | null {
    if (typeof window === "undefined") return null;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // Support both Supabase's current publishable key name and the legacy anon-key name.
    const key =
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) return null;

    if (!browserClient) {
        browserClient = createClient(url, key);
    }

    return browserClient;
}
