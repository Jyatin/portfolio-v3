"use client";

import Lenis from "@studio-freight/lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type LenisInstance = InstanceType<typeof Lenis>;
type WindowWithLenis = Window & { lenis?: LenisInstance };

function getWindowWithLenis(): WindowWithLenis {
  return window as WindowWithLenis;
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Keep the browser as the actual scroll container. Lenis only smooths
    // wheel input on desktop; it does not take ownership of page scrolling.
    document.documentElement.style.overflowY = "auto";
    document.body.style.overflowY = "auto";

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const useLenis = isDesktop && pathname !== "/projects";

    if (!useLenis) {
      ScrollTrigger.refresh();
      return () => {
        document.documentElement.style.overflowY = "";
        document.body.style.overflowY = "";
      };
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number): number => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenis.start();
    getWindowWithLenis().lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    const refresh = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", refresh);
    window.addEventListener("load", refresh);
    const refreshId = window.setTimeout(refresh, 250);

    return () => {
      window.clearTimeout(refreshId);
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("load", refresh);
      lenis.destroy();
      delete getWindowWithLenis().lenis;
      document.documentElement.style.overflowY = "";
      document.body.style.overflowY = "";
      ScrollTrigger.refresh();
    };
  }, [pathname]);

  return children;
}
