"use client";

import Lenis from "@studio-freight/lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { logProjectsScroll } from "@/app/utils/projects-scroll-debug";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type LenisInstance = InstanceType<typeof Lenis>;
type WindowWithLenis = Window & { lenis?: LenisInstance };

function getWindowWithLenis(): WindowWithLenis {
  return window as WindowWithLenis;
}

/** Keep smooth wheel scrolling enabled on normal laptop/desktop screens. */
function shouldUseLenis(): boolean {
  if (typeof window === "undefined") return false;
  const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  return !isSmallScreen && !isCoarsePointer;
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.style.overflowY = "auto";
    document.documentElement.style.setProperty("scrollbar-width", "none");
    document.documentElement.style.setProperty("-ms-overflow-style", "none");
    document.body.style.overflowY = "auto";
    document.body.style.setProperty("scrollbar-width", "none");
    document.body.style.setProperty("-ms-overflow-style", "none");

    const useLenis = shouldUseLenis() && pathname !== "/projects";

    if (!useLenis) {
      return () => {
        document.documentElement.style.overflowY = "";
        document.body.style.overflowY = "";
      };
    }

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number): number => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenis.start();
    getWindowWithLenis().lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    let rafId: number | null = null;
    const raf = (time: number): void => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    const refresh = (): void => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", refresh);
    window.addEventListener("load", refresh);
    const refreshId = window.setTimeout(refresh, 150);

    return () => {
      window.clearTimeout(refreshId);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("load", refresh);
      lenis.destroy();
      delete getWindowWithLenis().lenis;
      document.documentElement.style.overflowY = "";
      document.body.style.overflowY = "";
      ScrollTrigger.refresh();
    };
  }, [pathname]);

  useEffect(() => {
    const lenis = getWindowWithLenis().lenis;
    logProjectsScroll("SmoothScroll pathname change", {
      pathname,
      lenisInstance: Boolean(lenis),
      shouldUseLenis: shouldUseLenis(),
      nativeScrollOnProjectsList: pathname === "/projects",
    });
    if (!lenis) return;

    const id = window.requestAnimationFrame(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });

    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return children;
}
