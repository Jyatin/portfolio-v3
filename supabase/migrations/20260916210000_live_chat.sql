-- Persistent portfolio chat: remove the previous 10-minute purge and
-- configure the chat table for public guest messaging + Supabase Realtime.

-- Remove the old TTL trigger/function if the earlier migration was applied.
DROP TRIGGER IF EXISTS chat_messages_purge_after_insert
ON public.chat_messages;

DROP FUNCTION IF EXISTS public.purge_expired_chat_messages();

-- Create the table when it does not already exist.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.chat_messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_id text NOT NULL,
    guest_name text NOT NULL,
    message text NOT NULL,
    country_code text,
    created_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT chat_messages_message_length
        CHECK (char_length(message) BETWEEN 1 AND 500),

    CONSTRAINT chat_messages_guest_name_length
        CHECK (char_length(guest_name) BETWEEN 6 AND 32)
);

-- Keep the existing country-code migration compatible with this migration.
ALTER TABLE public.chat_messages
    ADD COLUMN IF NOT EXISTS country_code text;

-- Enable RLS for the browser client.
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read chat messages"
ON public.chat_messages;

CREATE POLICY "Anyone can read chat messages"
ON public.chat_messages
FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Anyone can insert chat messages"
ON public.chat_messages;

CREATE POLICY "Anyone can insert chat messages"
ON public.chat_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
    char_length(message) BETWEEN 1 AND 500
    AND char_length(guest_name) BETWEEN 6 AND 32
);

GRANT SELECT, INSERT
ON public.chat_messages
TO anon, authenticated;

-- Add the table to Realtime only when it is not already published.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime'
          AND schemaname = 'public'
          AND tablename = 'chat_messages'
    ) THEN
        ALTER PUBLICATION supabase_realtime
        ADD TABLE public.chat_messages;
    END IF;
END
$$;
