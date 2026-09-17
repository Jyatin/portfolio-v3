"use client";

import dynamic from "next/dynamic";

const LiveChat = dynamic(() => import("./live-chat"), {
    ssr: false,
});

export default function LiveChatHost() {
    return <LiveChat />;
}
