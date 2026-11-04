"use client";

import { useRef, useState } from "react";
import { useLayoutEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/motion";
import { SERVICES } from "@/lib/data";
import { SERVICE_IMAGES } from "@/lib/images";

export default function Services() {
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [src, setSrc] = useState<string>(SERVICE_IMAGES["01"]);

  useLayoutEffect(() => {
    const preview = previewRef.current;
    const fine =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function"
        ? window.matchMedia("(pointer: fine)").matches
        : false;
    if (!preview || !fine) return;

    const xTo = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      // Offset by half the preview size (340x420) so it floats beside the cursor.
      xTo(e.clientX - 170);
      yTo(e.clientY - 210);
    };
    window.addEventListener("mousemove", onMove);

    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useLayoutEffect(() => {
    if (active === null) {
      gsap.to(previewRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      const srcUrl = SERVICE_IMAGES[SERVICES[active].id];
      // eslint-disable-next-line
      setSrc(srcUrl);
      gsap.fromTo(
        previewRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [active]);

  return (
    <section id="services" className="bg-bg-primary px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-6 text-fg-secondary">What We Design</p>
            <h2 className="display text-[9vw] leading-[0.9] text-fg-primary md:text-[4.5vw]">
              INTERIOR
              <br />
              <em className="text-gold">CATEGORIES.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-fg-secondary">
            Every space, considered and crafted. Hover over a category to see
            the kind of interior we design for it.
          </p>
        </div>

        <div ref={listRef} className="border-t border-border">
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              className="group relative -mx-2 flex cursor-none items-center justify-between border-b border-border px-2 py-6 transition-colors duration-300 hover:bg-fg-primary hover:text-fg-inverse md:-mx-4 md:px-4 md:py-8"
              data-cursor="view"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="flex items-baseline gap-6 md:gap-12">
                <span className="display text-xl text-gold transition-colors group-hover:text-gold md:text-2xl">
                  {service.id}
                </span>
                <div>
                  <h3 className="display text-3xl transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                    {service.name}
                  </h3>
                  <p className="mt-1 max-w-md text-xs uppercase tracking-[0.18em] text-fg-secondary transition-colors group-hover:text-gold md:text-sm">
                    {service.note}
                  </p>
                </div>
              </div>
              <span className="display hidden text-3xl text-gold opacity-0 transition-all duration-300 group-hover:opacity-100 md:block">
                →
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={previewRef}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[420px] w-[340px] overflow-hidden rounded-2xl opacity-0 md:block"
        style={{ transform: "translate(-180px, 0)" }}
      >
        <div className="relative h-full w-full">
          <Image
            ref={imgRef}
            src={src}
            alt="Interior category preview"
            fill
            sizes="340px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#161513]/20" />
        </div>
      </div>
    </section>
  );
}
