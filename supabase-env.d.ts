// supabase-env.d.ts
// TypeScript declarations for Supabase environment variables.

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL?: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
    SERVER_SUPABASE_SERVICE_ROLE_KEY?: string;
  }
}
