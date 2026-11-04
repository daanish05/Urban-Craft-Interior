"use client";

import { useRef } from "react";
import { useLayoutEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { REALITY_STAGES } from "@/lib/data";
import { IMG } from "@/lib/images";

const STAGE_IMAGES = [
  IMG.living2,
  IMG.stone,
  IMG.workshop1,
  IMG.detail,
  IMG.living1,
];

export default function From3DToReality() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRefs = useRef<Array<HTMLImageElement | null>>([]);
  const stageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const n = STAGE_IMAGES.length;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=500%",
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(
            n - 1,
            Math.max(0, Math.floor(self.progress * n))
          );

          imgRefs.current.forEach((img, i) => {
            if (img) img.style.opacity = i === idx ? "1" : "0";
          });
          stageRefs.current.forEach((s, i) => {
            if (!s) return;
            const active = i === idx;
            s.style.opacity = active ? "1" : "0.35";
            s.style.transform = active ? "translateX(0) scale(1)" : "translateX(8px) scale(0.97)";
            // s.style.color = active ? "#faf7f0" : "#8b8174";
            s.style.color = active ? "#c2a878" : "#8b8174";
          });
          if (barRef.current) {
            barRef.current.style.width = `${(idx / (n - 1)) * 100}%`;
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-charcoal"
    >
      <div className="flex h-full flex-col justify-center gap-5 px-6 py-14 md:flex-row md:items-center md:gap-8 md:px-12 md:py-24">
        <div className="relative h-[34vh] w-full overflow-hidden md:h-[72vh] md:w-1/2">
          {STAGE_IMAGES.map((src, i) => (
            <div key={i} className="absolute inset-0">
              <Image
                ref={(el) => {
                  imgRefs.current[i] = el;
                }}
                src={src}
                alt={REALITY_STAGES[i].label}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-opacity duration-700"
                style={{ opacity: i === 0 ? 1 : 0 }}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#161513]/60 to-transparent" />
        </div>

        <div className="flex w-full flex-col justify-center md:w-1/2 md:pl-12">
          <p className="eyebrow mb-2 text-gold">From 3D to Reality</p>
          <h2 className="display mb-6 text-4xl text-ivory md:mb-10 md:text-6xl">
            SEE IT BEFORE
            <br />
            <em className="text-gold">IT EXISTS.</em>
          </h2>

          <div className="space-y-3 md:space-y-5">
            {REALITY_STAGES.map((stage, i) => (
              <div
                key={stage.id}
                ref={(el) => {
                  stageRefs.current[i] = el;
                }}
                className="flex items-baseline gap-4 transition-all duration-500 md:gap-5"
                style={{ opacity: i === 0 ? 1 : 0.35 }}
              >
                <span className="display text-xl text-gold md:text-2xl">
                  {stage.id}
                </span>
                <div>
                  <p className="display text-xl md:text-3xl">{stage.label}</p>
                  <p className="mt-1 hidden max-w-sm text-sm text-[#8b8174] md:block">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 h-[1px] w-full max-w-sm bg-ivory/20 md:mt-10">
            <div
              ref={barRef}
              className="h-[1px] bg-gold transition-all duration-500"
              style={{ width: "0%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
