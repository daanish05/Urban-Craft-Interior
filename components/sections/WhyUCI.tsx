"use client";

import { useRef } from "react";
import { useLayoutEffect } from "react";
import { gsap } from "@/lib/motion";
import { WHY_UCI } from "@/lib/data";
import Marquee from "@/components/ui/Marquee";

export default function WhyUCI() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-why]"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="about" className="bg-[#faf7f0] px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-6 text-[#8b8174]">Why UCI</p>
            <h2 className="display text-[9vw] leading-[0.9] text-[#161513] md:text-[4.5vw]">
              WHY UCI IS
              <br />
              <em className="text-[#c2a878]">DIFFERENT.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#8b8174]">
            Not a coordinator of vendors — a single integrated interior
            journey from design to installation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
          {WHY_UCI.map((w, i) => (
            <div
              key={w.id}
              data-why
              className={`border-t border-[#161513]/10 pt-8 ${
                i % 2 === 1 ? "md:mt-16" : ""
              }`}
            >
              <span className="display text-3xl text-[#c2a878]">{w.id}</span>
              <h3 className="display mt-4 text-4xl text-[#161513] md:text-5xl">
                {w.title}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[#8b8174] md:text-base">
                {w.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 overflow-hidden rounded-2xl bg-[#161513] px-6 py-12 text-center md:py-16">
          <p className="display text-[7vw] leading-[0.95] text-[#faf7f0] md:text-[3.5vw]">
            DIRECT FACTORY <em className="text-[#c2a878]">TO HOME.</em>
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm text-[#faf7f0]/60">
            Design, manufacturing and execution — connected under one roof,
            delivered to your home.
          </p>
        </div>

        <div className="mt-16">
          <Marquee
            items={["Designed", "Manufactured", "Executed"]}
            direction="left"
            speed={32}
            className="border-y border-[#161513]/10 py-6"
          />
        </div>
      </div>
    </section>
  );
}
