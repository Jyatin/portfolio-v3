"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Keep the browser as the sole scroll owner. This avoids wheel-locking and
    // stale virtual-scroll state while preserving native smooth scrolling via CSS.
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflowY;
    const previousBodyOverflow = body.style.overflowY;

    html.style.overflowY = "auto";
    body.style.overflowY = "auto";

    // When arriving on a hash URL, wait for the page to mount before scrolling
    // so the browser does not land at an incorrect position during hydration.
    const scrollToHash = () => {
      if (!window.location.hash) return;
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) {
        window.requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      window.removeEventListener("hashchange", scrollToHash);
      html.style.overflowY = previousHtmlOverflow;
      body.style.overflowY = previousBodyOverflow;
    };
  }, [pathname]);

  return children;
}
