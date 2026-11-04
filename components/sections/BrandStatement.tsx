"use client";

import { useRef } from "react";
import { useLayoutEffect } from "react";
import { gsap } from "@/lib/motion";

export default function BrandStatement() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const words = el.querySelectorAll<HTMLElement>("[data-drift]");
      gsap.fromTo(
        words,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.06,
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

  const line1 = ["DON'T", "JUST", "IMAGINE"];
  const line2 = ["YOUR", "INTERIOR."];
  const line3 = ["SEE", "IT", "MAKE", "IT", "LIVE", "IT"];

  return (
    <section
      ref={ref}
      id="statement"
      className="relative z-20 -mt-[10vh] rounded-t-[2rem] bg-bg-primary px-6 pb-24 pt-24 md:-mt-[14vh] md:rounded-t-[2.5rem] md:px-12 md:pt-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow mb-10 text-fg-secondary">The UCI Brand Story</p>

        <div className="display text-[11vw] leading-[0.9] text-fg-primary md:text-[6.2vw]">
          <div className="flex flex-wrap">
            {line1.map((w, i) => (
              <span key={i} className="mr-[0.18em]">
                <span data-drift className="inline-blocks">
                  {w}
                </span>
              </span>
            ))}
          </div>
          <div className="flex flex-wrap">
            {line2.map((w, i) => (
              <span key={i} className="mr-[0.18em]">
                <span data-drift className="inline-block italic text-gold">
                  {w}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-baseline gap-x-6 gap-y-2 md:mt-20">
          {line3.map((w, i) => (
            <span key={i} className="flex items-baseline gap-x-4">
              <span
                data-drift
                className="display text-[6vw] leading-none text-fg-primary/80 md:text-[3.4vw]"
              >
                {w}
              </span>
              {i % 2 === 1 && <span className="h-2 w-2 rounded-full bg-gold" />}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
