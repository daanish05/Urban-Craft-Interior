"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mql =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function"
        ? window.matchMedia("(pointer: fine)")
        : null;
    // eslint-disable-next-line
    setEnabled(Boolean(mql && mql.matches));
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const setActive = (active: boolean) => {
      gsap.to(ring, {
        scale: active ? 3.2 : 1,
        opacity: active ? 0.92 : 0.5,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: active ? 0 : 1, duration: 0.3 });
    };

    const setLabel = (text: string) => {
      if (text) {
        label.textContent = text;
        gsap.to(ring, {
          backgroundColor: "rgba(22,21,19,0.92)",
          duration: 0.3,
        });
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.3 });
      } else {
        gsap.to(ring, {
          backgroundColor: "rgba(194,168,120,0.25)",
          duration: 0.3,
        });
        gsap.to(label, { opacity: 0, scale: 0.6, duration: 0.3 });
      }
    };

    const onMove = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        "[data-cursor], a, button, [role='button']"
      ) as HTMLElement | null;
      if (target) {
        const cursor = target.getAttribute("data-cursor");
        setActive(true);
        setLabel(cursor || "");
      } else {
        setActive(false);
        setLabel("");
      }
    };

    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.2 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.2 });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        style={{ backgroundColor: "rgba(194,168,120,0.25)" }}
        aria-hidden="true"
      >
        <span
          ref={labelRef}
          className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[#faf7f0] opacity-0"
          style={{ transform: "scale(0.6)" }}
        />
      </div>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[101] block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#161513]"
        aria-hidden="true"
      />
    </>
  );
}