"use client";

import { useRef, useState } from "react";
import { useLayoutEffect } from "react";
import { gsap } from "@/lib/motion";
import { SplitText } from "@/components/ui/Reveal";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-testi]"),
        { y: 50, opacity: 0 },
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

  const t = TESTIMONIALS[active];

  return (
    <section ref={ref} className="bg-[#f3ede2] px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-14 text-center">
          <p className="eyebrow mb-6 text-[#8b8174]">Client Stories</p>
          <SplitText
            text="WHAT OUR CLIENTS SAY."
            className="display text-[8vw] leading-[0.92] text-[#161513] md:text-[4vw]"
          />
        </div>

        {t.placeholder && (
          <div
            data-testi
            className="mb-6 rounded-2xl border border-[#c2a878]/40 bg-[#faf7f0] px-6 py-4 text-center text-xs uppercase tracking-[0.2em] text-[#8b8174]"
          >
            Reserved for client-provided testimonials
          </div>
        )}

        <div key={active} data-testi className="text-center">
          <p className="display mx-auto max-w-3xl text-3xl italic leading-snug text-[#161513] md:text-4xl">
            “{t.quote}”
          </p>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-[#161513]">
            {t.name}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#8b8174]">
            {t.role}
          </p>
        </div>

        {TESTIMONIALS.length > 1 && (
          <div className="mt-12 flex justify-center gap-3">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show testimonial ${i + 1}`}
                data-cursor=""
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-[#161513]" : "w-2 bg-[#161513]/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
