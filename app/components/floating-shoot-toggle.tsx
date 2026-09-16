"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import {
    ensurePaintballAudioRunning,
    playPaintballShotSound,
} from "@/app/utils/play-paintball-shot-sound";
import {
    notifyShootModeSubscribers,
    SHOOT_MODE_STORAGE_KEY,
} from "@/app/utils/shoot-mode-store";

const SPLAT_FADE_MS = 520;
const SPLAT_TOTAL_LIFETIME_MS = 3200;
const SPLAT_VISIBLE_MS = SPLAT_TOTAL_LIFETIME_MS - SPLAT_FADE_MS;

/** Pinned scroll UIs (projects gallery): keep native clicks; shoot handlers must ignore this subtree. */
const SHOOT_SCROLL_INTERACTIVE_SEL = "[data-shoot-scroll-interactive]";

function GunLoadingFallback(): React.JSX.Element {
    return (
        <div className="h-64 w-[min(92vw,30rem)] sm:h-80 sm:w-xl md:h-96 md:w-176 overflow-visible flex items-end justify-center">
            <div className="h-60 w-[min(88vw,24rem)] sm:h-72 sm:w-md md:h-88 md:w-xl flex items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-foreground/70" />
            </div>
        </div>
    );
}

const GunViewer = dynamic(() => import("./gun-viewer"), {
    ssr: false,
    loading: () => <GunLoadingFallback />,
});

let paintSplatIdSeq = 0;
function nextPaintSplatId(): number {
    paintSplatIdSeq += 1;
    return paintSplatIdSeq;
}

type PaintSplat = {
    id: number;
    x: number;
    y: number;
    size: number;
    rotation: number;
    hue: number;
    saturation: number;
    lightness: number;
    exiting?: boolean;
};

/** True only if (x,y) is over a non-empty text character (not padding / empty layout). */
function getTextNodeAtPoint(x: number, y: number): Text | null {
    if (typeof document === "undefined") return null;
    try {
        const doc = document as Document & {
            caretRangeFromPoint?: (nx: number, ny: number) => Range | null;
            caretPositionFromPoint?: (nx: number, ny: number) => CaretPosition | null;
        };
        if (typeof doc.caretRangeFromPoint === "function") {
            const range = doc.caretRangeFromPoint(x, y);
            if (range?.startContainer?.nodeType === Node.TEXT_NODE) {
                return range.startContainer as Text;
            }
            return null;
        }
        if (typeof doc.caretPositionFromPoint === "function") {
            const pos = doc.caretPositionFromPoint(x, y);
            if (pos?.offsetNode?.nodeType === Node.TEXT_NODE) {
                return pos.offsetNode as Text;
            }
            return null;
        }
    } catch {
        return null;
    }
    return null;
}

function textNodeHasVisibleChar(text: Text): boolean {
    return (text.textContent ?? "").trim().length > 0;
}

/**
 * Deepest ancestor with `data-shoot-target` (section + inner headings both tagged -> heading wins).
 * Avoids matching Framer `div` wrappers before real text nodes via `closest(...,div,...)`.
 */
function pickInnerShootTarget(raw: Element | null): HTMLElement | null {
    let el: Element | null = raw;
    while (el && el instanceof HTMLElement) {
        if (el.matches("[data-shoot-ui]")) return null;
        if (el.hasAttribute("data-shoot-target")) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

function pickSemanticTextTarget(raw: Element | null): HTMLElement|null {
    let el: Element | null = raw;
    while (el && el instanceof HTMLElement) {
        if (el.matches("[data-shoot-ui]")) return null;
        if (el.matches("h1,h2,h3,h4,h5,h6,p,span,a,button,li,br,article,img")) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

/** Prefer inner `data-shoot-target` (e.g. h1) over outer section when hit-testing disagrees with caret. */
function pickInnerShootTargetFromTextNode(text: Text): HTMLElement | null {
    let el: HTMLElement | null = text.parentElement;
    while (el) {
        if (el.matches("[data-shoot-ui]")) return null;
        if (el.hasAttribute("data-shoot-target")) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

function wrapCharInTextNode(textNode: Text, offset: number): HTMLElement | null {
    const parentEl = textNode.parentElement;
    if (parentEl?.getAttribute("data-shoot-char-wrap") === "1") {
        return parentEl;
    }

    const full = textNode.textContent ?? "";
    if (full.length === 0) return null;

    let o = offset;
    if (o >= full.length) o = full.length - 1;
    if (o < 0) o = 0;

    const ch = full[o];
    if (ch === undefined) return null;

    const before = full.slice(0, o);
    const after = full.slice(o + 1);

    const span = document.createElement("span");
    span.setAttribute("data-shoot-char-wrap", "1");
    span.style.display = "inline-block";
    span.textContent = ch;

    const fragment = document.createDocumentFragment();
    if (before.length > 0) {
        fragment.appendChild(document.createTextNode(before));
    }
    fragment.appendChild(span);
    if (after.length > 0) {
        fragment.appendChild(document.createTextNode(after));
    }

    const parent = textNode.parentNode;
    if (!parent) return null;
    parent.replaceChild(fragment, textNode);
    return span;
}

/**
 * iOS WebKit: caret APIs often fail under shoot-mode `user-select: none`.
 * Per-glyph rects from Range still resolve reliably.
 */
function findTextOffsetAtPointWithRanges(root: HTMLElement, x: number, y: number): { node: Text; offset: number } | null {
    const range = document.createRange();
    let best: { node: Text; offset: number; area: number } | null = null;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

    let n: Node | null = walker.nextNode();
    while (n !== null) {
        const textNode = n as Text;
        const text = textNode.textContent ?? "";
        for (let i = 0; i < text.length; i += 1) {
            try {
                range.setStart(textNode, i);
                range.setEnd(textNode, i + 1);
                const r = range.getBoundingClientRect();
                if (r.width <= 0 || r.height <= 0) continue;
                const inside = x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
                if (inside) {
                    const area = r.width * r.height;
                    if (best === null || area < best.area) {
                        best = { node: textNode, offset: i, area };
                    }
                }
            } catch {
                // ignore
            }
        }
        n = walker.nextNode();
    }

    return best !== null ? { node: best.node, offset: best.offset } : null;
}

/**
 * For `data-shoot-granularity="char"`, wrap the glyph under (x,y) in its own span so GSAP
 * only moves that letter (imperative DOM; hero copy is static between navigations).
 */
function wrapShootCharAtPoint(x: number, y: number, root: HTMLElement): HTMLElement | null {
    const doc = document as Document & { caretRangeFromPoint?: (nx: number, ny: number) => Range | null };

    let textNode: Text | null = null;
    let offset = 0;

    if (typeof doc.caretRangeFromPoint === "function") {
        const caretRange = doc.caretRangeFromPoint(x, y);
        if (caretRange?.startContainer.nodeType === Node.TEXT_NODE) {
            const tn = caretRange.startContainer as Text;
            if (root.contains(tn)) {
                textNode = tn;
                offset = caretRange.startOffset;
            }
        }
    }

    if (textNode === null) {
        const found = findTextOffsetAtPointWithRanges(root, x, y);
        if (found === null) return null;
        textNode = found.node;
        offset = found.offset;
    }

    return wrapCharInTextNode(textNode, offset);
}

function resolveShootAnimationTarget(target: HTMLElement, x: number, y: number): HTMLElement {
    if (target.getAttribute("data-shoot-granularity") !== "char") return target;
    return wrapShootCharAtPoint(x, y, target) ?? target;
}

function pickHitWord(x: number, y: number, raw: Element | null): HTMLElement | null {
    if (!raw) return null;
    if (raw.closest("[data-shoot-ui]")) return null;

    const target = pickInnerShootTarget(raw) ?? pickSemanticTextTarget(raw);
    if (!target || target.closest("[data-shoot-ui]")) return null;

    if (target.tagName === "IMG") {
        const rect = target.getBoundingClientRect();
        const inside = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
        return inside ? target : null;
    }

    const textAtPoint = getTextNodeAtPoint(x, y);
    if (!textAtPoint || !textNodeHasVisibleChar(textAtPoint)) {
        const imgs = target.querySelectorAll("img");
        for (const im of imgs) {
            const r = im.getBoundingClientRect();
            if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
                return im;
            }
        }
        return target;
    }

    return pickInnerShootTargetFromTextNode(textAtPoint) ?? target;
}

function readInitialState(): boolean {
    if (typeof window === "undefined") return false;
    const raw = window.localStorage.getItem(SHOOT_MODE_STORAGE_KEY);
    return raw === "on";
}

function writeStateToStorage(isOn: boolean): void {
    try {
        window.localStorage.setItem(SHOOT_MODE_STORAGE_KEY, isOn ? "on" : "off");
        notifyShootModeSubscribers();
    } catch {
        // ignore storage errors
    }
}

export default function FloatingShootToggle(): React.JSX.Element {
    const [isOn, setIsOn] = React.useState<boolean>(false);
    const [showGunCursor, setShowGunCursor] = React.useState<boolean>(false);
    const [dateTimeText, setDateTimeText] = React.useState<string>("");
    const [aimX, setAimX] = React.useState<number>(0);
    const [aimY, setAimY] = React.useState<number>(0);
    const [cursorX, setCursorX] = React.useState<number>(0);
    const [cursorY, setCursorY] = React.useState<number>(0);
    const [splats, setSplats] = React.useState<PaintSplat[]>([]);
    const [hoverShootControls, setHoverShootControls] = React.useState<boolean>(false);
    const pointerRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const updateAimFromPoint = React.useCallback((x: number, y: number) => {
        setCursorX(x);
        setCursorY(y);
        pointerRef.current = { x, y };
        setAimX(Math.max(-1, Math.min(1, (x / window.innerWidth) * 2 - 1)));
        setAimY(Math.max(-1, Math.min(1, (y / window.innerHeight) * 2 - 1)));
    }, []);

    React.useEffect(() => {
        setIsOn(readInitialState());
    }, []);

    React.useEffect(() => {
        if (!isOn) setHoverShootControls(false);
    }, [isOn]);

    // Warm up gun viewer import
    React.useEffect(() => {
        void import("./gun-viewer");
    }, []);

    // Show gun cursor on large screens
    React.useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const apply = (m: boolean) => setShowGunCursor(m);
        apply(mq.matches);
        const handler = (e: MediaQueryListEvent) => apply(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    // Date/time display
    React.useEffect(() => {
        const fmt = () => {
            const now = new Date();
            const days = ["SUN","MON","TUE","WED","THU","FRI","SAT"] as const;
            const day = days[now.getDay()];
            const hrs = now.getHours();
            const mins = now.getMinutes().toString().padStart(2,"0");
            const ampm = hrs >= 12 ? "P.M" : "A.M";
            const dh = hrs % 12 || 12;
            setDateTimeText(`${day} ${dh}:${mins} ${ampm}`);
        };
        fmt();
        const id = setInterval(fmt, 1000);
        return () => clearInterval(id);
    }, []);

    const toggle = React.useCallback(() => {
        setIsOn(prev => {
            const next = !prev;
            writeStateToStorage(next);
            if (next) void ensurePaintballAudioRunning();
            return next;
        });
    }, []);

    // Fade splats when mode turned off
    React.useEffect(() => {
        if (isOn) return;
        setSplats(prev => prev.length ? prev.map(s => ({ ...s, exiting: true })) : prev);
        const id = setTimeout(() => setSplats([]), SPLAT_FADE_MS);
        return () => clearTimeout(id);
    }, [isOn]);

    // Remove exiting splats if re‑enabled
    React.useEffect(() => {
        if (!isOn) return;
        setSplats(prev => prev.filter(s => !s.exiting));
    }, [isOn]);

    // Pointer tracking for gun aim
    React.useEffect(() => {
        if (!isOn) return;
        setCursorX(window.innerWidth / 2);
        setCursorY(window.innerHeight / 2);
        const move = (e: PointerEvent) => {
            if (e.pointerType === "touch") return;
            updateAimFromPoint(e.clientX, e.clientY);
        };
        window.addEventListener("pointermove", move, { passive: true });
        return () => window.removeEventListener("pointermove", move);
    }, [isOn, updateAimFromPoint]);

    // Main shooting logic (mouse / touch)
    React.useEffect(() => {
        if (!isOn) return;
        let interval: number | null = null;
        let holding = false;
        let touchStart: { x: number; y: number } | null = null;
        let moved = false;
        const moveThreshold = 12;

        const prevent = (e: Event) => {
            const t = e.target as Element | null;
            if (t?.closest("[data-shoot-ui]") || t?.closest(SHOOT_SCROLL_INTERACTIVE_SEL)) return;
            e.preventDefault();
        };

        const fire = (x: number, y: number) => {
            const raw = document.elementFromPoint(x, y);
            if (raw?.closest("[data-shoot-ui]") || raw?.closest(SHOOT_SCROLL_INTERACTIVE_SEL)) return;
            playPaintballShotSound();
            const id = nextPaintSplatId();
            const size = 26 + Math.random() * 20;
            const rotation = (Math.random() * 80) - 40;
            const palettes = [
                { min: 340, max: 360 },
                { min: 8, max: 28 },
                { min: 185, max: 210 },
                { min: 265, max: 288 },
                { min: 95, max: 122 },
            ] as const;
            const p = palettes[Math.floor(Math.random() * palettes.length)];
            const hue = p.min + Math.random() * (p.max - p.min);
            const sat = 74 + Math.random() * 18;
            const lit = 42 + Math.random() * 16;
            setSplats(prev => [...prev.slice(-45), { id, x, y, size, rotation, hue, saturation: sat, lightness: lit }]);
            setTimeout(() => {
                setSplats(prev => prev.map(s => s.id === id ? { ...s, exiting: true } : s));
                setTimeout(() => setSplats(prev => prev.filter(s => s.id !== id)), SPLAT_FADE_MS);
            }, SPLAT_VISIBLE_MS);

            // page shake
            const main = document.querySelector("main") as HTMLElement | null;
            if (main) {
                gsap.fromTo(main, { x: 0, y: 0, rotate: 0 }, {
                    x: 9, y: -6, rotate: -0.15, duration: 0.045, repeat: 5, yoyo: true, ease: "power1.inOut", clearProps: "transform"
                });
            }

            const targetEl = pickHitWord(x, y, raw);
            if (!targetEl) return;
            const animTarget = resolveShootAnimationTarget(targetEl, x, y);
            if (animTarget.dataset.shotDown === "1") {
                gsap.to(animTarget, { y: "+=12", rotation: "+=6", duration: 0.16, ease: "power1.out" });
                return;
            }
            animTarget.dataset.shotDown = "1";
            animTarget.style.willChange = "transform, opacity";
            const impact = gsap.utils.random(-7, 7, 1);
            const fall = gsap.utils.random(-24, 24, 1);
            const tl = gsap.timeline();
            tl.to(animTarget, { x: gsap.utils.random(-6, 6, 1), y: gsap.utils.random(-10, -4, 1), rotation: impact, scale: 1.08, duration: 0.09, ease: "power2.out" })
              .to(animTarget, { x: gsap.utils.random(-2, 2, 1), y: gsap.utils.random(-2, 2, 1), rotation: impact * 0.45, scale: 0.96, duration: 0.08, ease: "power1.inOut" })
              .to(animTarget, { y: window.innerHeight * 0.55, rotation: fall, opacity: 0.15, scale: 1, duration: 1.05, ease: "power2.in" });
        };

        const stop = () => {
            holding = false;
            if (interval !== null) { clearInterval(interval); interval = null; }
        };

        const down = (e: PointerEvent) => {
            if (!e.isPrimary) return;
            if (e.pointerType === "mouse" && e.button !== 0) return;
            if ((e.target as Element | null)?.closest("[data-shoot-ui]") || (e.target as Element | null)?.closest(SHOOT_SCROLL_INTERACTIVE_SEL)) return;
            if (e.pointerType === "touch") {
                touchStart = { x: e.clientX, y: e.clientY };
                moved = false;
                return;
            }
            e.preventDefault();
            window.getSelection()?.removeAllRanges();
            updateAimFromPoint(e.clientX, e.clientY);
            fire(e.clientX, e.clientY);
            holding = true;
            if (interval) clearInterval(interval);
            interval = setInterval(() => { if (holding) fire(pointerRef.current.x, pointerRef.current.y); }, 90);
        };

        const moveTouch = (e: PointerEvent) => {
            if (!e.isPrimary || e.pointerType !== "touch" || !touchStart) return;
            const dist = Math.hypot(e.clientX - touchStart.x, e.clientY - touchStart.y);
            if (dist > moveThreshold) moved = true;
        };

        const up = (e: PointerEvent) => {
            if (!e.isPrimary) return;
            if (e.pointerType === "mouse" && e.button !== 0) return;
            if (e.pointerType === "touch") {
                const upEl = document.elementFromPoint(e.clientX, e.clientY);
                const inUi = upEl?.closest("[data-shoot-ui]");
                const inScroll = upEl?.closest(SHOOT_SCROLL_INTERACTIVE_SEL);
                if (!inUi && !inScroll && !moved) {
                    updateAimFromPoint(e.clientX, e.clientY);
                    fire(e.clientX, e.clientY);
                }
                touchStart = null; moved = false;
            }
            stop();
        };

        document.addEventListener("selectstart", prevent);
        document.addEventListener("dragstart", prevent);
        window.addEventListener("pointerdown", down);
        window.addEventListener("pointermove", moveTouch, { passive: true });
        window.addEventListener("pointerup", up);
        window.addEventListener("pointercancel", stop);
        window.addEventListener("blur", stop);
        return () => {
            stop();
            document.removeEventListener("selectstart", prevent);
            document.removeEventListener("dragstart", prevent);
            window.removeEventListener("pointerdown", down);
            window.removeEventListener("pointermove", moveTouch);
            window.removeEventListener("pointerup", up);
            window.removeEventListener("pointercancel", stop);
            window.removeEventListener("blur", stop);
        };
    }, [isOn, updateAimFromPoint]);

    // Global CSS classes handling
    React.useEffect(() => {
        const shootClass = "shoot-mode-active";
        const cursorHide = "shoot-cursor-hidden";
        const touchUI = "shoot-mode-touch-ui";
        if (isOn) {
            document.documentElement.classList.add(shootClass);
            document.body.classList.add(shootClass);
            if (navigator.maxTouchPoints > 0) {
                document.documentElement.classList.add(touchUI);
                document.body.classList.add(touchUI);
            }
        } else {
            document.documentElement.classList.remove(shootClass);
            document.body.classList.remove(shootClass);
            document.documentElement.classList.remove(touchUI);
            document.body.classList.remove(touchUI);
        }
        const hide = isOn && showGunCursor && !hoverShootControls;
        if (hide) {
            document.documentElement.classList.add(cursorHide);
            document.body.classList.add(cursorHide);
        } else {
            document.documentElement.classList.remove(cursorHide);
            document.body.classList.remove(cursorHide);
        }
        return () => {
            document.documentElement.classList.remove(cursorHide);
            document.body.classList.remove(cursorHide);
            document.documentElement.classList.remove(shootClass);
            document.body.classList.remove(shootClass);
            document.documentElement.classList.remove(touchUI);
            document.body.classList.remove(touchUI);
        };
    }, [isOn, showGunCursor, hoverShootControls]);

    return (
        <>
            {(isOn || splats.length) && (
                <div className="fixed inset-0 z-9998 pointer-events-none" aria-hidden="true">
                    {splats.map(s => (
                        <div key={s.id} className="absolute transition-opacity ease-out" style={{
                            left: s.x,
                            top: s.y,
                            width: s.size,
                            height: s.size,
                            transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
                            opacity: s.exiting ? 0 : 1,
                            transitionDuration: `${SPLAT_FADE_MS}ms`,
                        }}>
                            <span className="absolute inset-0 opacity-95" style={{
                                clipPath: "polygon(50% 0%, 59% 10%, 71% 4%, 77% 16%, 91% 12%, 89% 27%, 100% 38%, 88% 49%, 100% 62%, 84% 67%, 90% 82%, 74% 81%, 69% 97%, 55% 90%, 46% 100%, 35% 88%, 21% 96%, 15% 82%, 0% 77%, 6% 62%, 0% 48%, 11% 39%, 3% 24%, 18% 20%, 24% 5%, 38% 12%)",
                                background: `hsl(${s.hue} ${s.saturation}% ${s.lightness}%)`
                            }} />
                            <span className="absolute inset-0 opacity-70" style={{
                                clipPath: "polygon(50% 8%, 62% 16%, 75% 14%, 84% 25%, 90% 38%, 83% 52%, 89% 65%, 77% 71%, 75% 85%, 62% 82%, 53% 92%, 42% 84%, 29% 88%, 22% 76%, 10% 70%, 14% 56%, 8% 44%, 18% 34%, 13% 22%, 27% 21%, 33% 10%, 44% 16%)",
                                background: `hsl(${s.hue + 12} ${Math.min(s.saturation + 8, 96)}% ${Math.min(s.lightness + 10, 66)}%)`
                            }} />
                            <span className="absolute rounded-full opacity-82" style={{
                                width: s.size * 0.24,
                                height: s.size * 0.24,
                                left: -s.size * 0.18,
                                top: s.size * 0.12,
                                background: `hsl(${s.hue - 8} ${s.saturation}% ${Math.max(s.lightness - 10, 25)}%)`
                            }} />
                            <span className="absolute rounded-full opacity-80" style={{
                                width: s.size * 0.2,
                                height: s.size * 0.2,
                                right: -s.size * 0.15,
                                bottom: s.size * 0.1,
                                background: `hsl(${s.hue + 16} ${Math.min(s.saturation + 6, 96)}% ${Math.max(s.lightness - 4, 28)}%)`
                            }} />
                            <span className="absolute rounded-full opacity-78" style={{
                                width: s.size * 0.16,
                                height: s.size * 0.16,
                                left: s.size * 0.36,
                                bottom: -s.size * 0.18,
                                background: `hsl(${s.hue} ${s.saturation}% ${Math.max(s.lightness - 12, 24)}%)`
                            }} />
                        </div>
                    ))}
                </div>
            )}
            {isOn && showGunCursor && !hoverShootControls && (
                <div className="fixed z-9999 pointer-events-none" style={{ left: cursorX, top: cursorY, transform: "translate(-50%, -100%)" }} aria-hidden="true" data-shoot-ui="1">
                    <div className="relative h-7 w-7">
                        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-foreground/70" />
                        <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-foreground/70" />
                        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/80" />
                        <span className="absolute right-[-8px] top-1/2 h-[2px] w-3 -translate-y-1/2 bg-foreground/80" />
                    </div>
                </div>
            )}
            {isOn && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-9999 pointer-events-none" data-shoot-ui="1">
                    <GunViewer aimX={aimX} aimY={aimY} />
                </div>
            )}
            <div className="fixed bottom-5 inset-x-0 z-9999 px-6 pointer-events-none" data-shoot-ui="1">
                <div className="flex items-center justify-between">
                    <div className="pointer-events-auto cursor-pointer" data-shoot-controls="1" onMouseEnter={() => setHoverShootControls(true)} onMouseLeave={() => setHoverShootControls(false)}>
                        <button type="button" onClick={toggle} className={[
                            "group flex items-center gap-3 rounded-full backdrop-blur-md px-4 py-2 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.35)] transition-[border-color,background-color] duration-200",
                            isOn ? "border-border bg-card" : ""
                        ].join(" ")} aria-pressed={isOn} aria-label="Toggle shoot mode">
                            <span aria-hidden="true" className={[
                                "relative inline-flex h-5 w-9 items-center rounded-full border border-border bg-transparent transition-[border-color,background-color] duration-200",
                                isOn ? "bg-muted border-foreground/35" : ""
                            ].join(" ")}>
                                <span className={[
                                    "absolute left-0.5 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-foreground transition-transform duration-200 ease-out",
                                    isOn ? "translate-x-4" : "translate-x-0"
                                ].join(" ")} />
                            </span>
                            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-foreground/80 select-none">Shoot</span>
                        </button>
                    </div>
                    <div />
                    <div className="pointer-events-none"><div className="rounded-full backdrop-blur-md px-4 py-2"><div className="text-[10px] font-mono uppercase tracking-[0.28em] text-foreground/70 select-none">{dateTimeText}</div></div></div>
                </div>
            </div>
        </>
    );
}
