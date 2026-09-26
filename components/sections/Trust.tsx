"use client";

import { useRef } from "react";
import { useLayoutEffect } from "react";
import { gsap } from "@/lib/motion";
import Marquee from "@/components/ui/Marquee";
import { TRUST_PILLARS } from "@/lib/data";

export default function Trust() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-trust]"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-[#161513] px-6 py-24 text-[#faf7f0] md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-6 text-[#c2a878]">What You Can Rely On</p>
            <h2 className="display text-[8vw] leading-[0.92] text-[#faf7f0] md:text-[4vw]">
              BUILT ON
              <br />
              <em className="text-[#c2a878]">TRUST.</em>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-[#faf7f0]/60">
            Six commitments that shape every UCI interior.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3">
          {TRUST_PILLARS.map((p, i) => (
            <div key={p} data-trust className="border-t border-[#faf7f0]/15 pt-6">
              <span className="display text-lg text-[#c2a878]">
                0{i + 1}
              </span>
              <p className="display mt-3 text-2xl md:text-3xl">{p}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <Marquee
          items={["Design Expertise", "3D Visualization", "Manufacturing", "Craftsmanship", "Execution", "Transparency"]}
          separator="•"
          direction="left"
          speed={34}
          className="border-y border-[#faf7f0]/10 py-6"
          light
        />
      </div>
    </section>
  );
}
