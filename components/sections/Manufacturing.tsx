"use client";

import { useRef } from "react";
import { useLayoutEffect } from "react";
import MediaImage from "@/components/ui/MediaImage";
import { SplitText } from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";
import { gsap } from "@/lib/motion";
import { IMG } from "@/lib/images";

const CRAFT = [
  { src: IMG.workshop1, label: "Craftsmanship", sub: "Hands-on build" },
  { src: IMG.workshop3, label: "Assembly", sub: "Precision joinery" },
  { src: IMG.wood2, label: "Material", sub: "Wood & finishing" },
  { src: IMG.hardware, label: "Hardware", sub: "Detail that lasts" },
  { src: IMG.workshop2, label: "Production", sub: "In-house facility" },
  { src: IMG.detail, label: "Quality", sub: "Checked by hand" },
];

export default function Manufacturing() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-craft]"),
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="manufacturing" className="bg-[#faf7f0] px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow mb-6 text-[#8b8174]">UCI Manufacturing</p>
            <SplitText
              text="NOT JUST DESIGNED. ACTUALLY MADE."
              className="display text-[9vw] leading-[0.9] text-[#161513] md:text-[4.5vw]"
            />
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#8b8174] md:justify-self-end md:text-base">
            The interior you see is not just designed on a screen. It is built
            in UCI&apos;s own manufacturing capability — cabinetry, panels, cutting,
            finishing and assembly, all under one roof.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CRAFT.map((c, i) => (
            <div
              key={i}
              data-craft
              className={`group relative overflow-hidden rounded-2xl ${
                i % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"
              }`}
            >
              <MediaImage
                src={c.src}
                alt={c.label}
                sizes="(max-width: 768px) 100vw, 33vw"
                parallax={6}
                className="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161513]/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="display text-2xl text-[#faf7f0]">{c.label}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-[#c2a878]">
                  {c.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Marquee
            items={[
              "Designed by UCI",
              "Manufactured by UCI",
              "Executed by UCI",
            ]}
            separator="—"
            direction="right"
            speed={34}
            className="border-y border-[#161513]/10 py-6"
          />
        </div>
      </div>
    </section>
  );
}
