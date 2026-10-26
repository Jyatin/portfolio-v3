import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getAdminToken(request: NextRequest) {
    return request.headers.get("x-chat-admin-token") ?? "";
}

function getSupabaseAdmin() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) return null;

    return createClient(url, key, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}

function isAuthorized(request: NextRequest) {
    const configuredToken = process.env.CHAT_ADMIN_TOKEN;
    if (!configuredToken) return false;

    const suppliedToken = getAdminToken(request);
    return suppliedToken.length > 0 && suppliedToken === configuredToken;
}

export async function GET(request: NextRequest) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
        return NextResponse.json(
            { error: "Server Supabase configuration is missing." },
            { status: 500 }
        );
    }

    const { data, error } = await supabase
        .from("chat_messages")
        .select("id, guest_id, guest_name, message, country_code, created_at")
        .order("created_at", { ascending: false })
        .limit(200);

    if (error) {
        return NextResponse.json(
            { error: "Could not load chat messages." },
            { status: 500 }
        );
    }

    return NextResponse.json({ messages: data ?? [] });
}
