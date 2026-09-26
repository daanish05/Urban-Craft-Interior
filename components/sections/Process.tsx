"use client";

import { useRef } from "react";
import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { PROCESS_STEPS } from "@/lib/data";

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const n = PROCESS_STEPS.length;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => "+=" + n * 90 + "%",
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        onUpdate: (self) => {
          const idx = Math.min(
            n - 1,
            Math.max(0, Math.floor(self.progress * n))
          );
          const step = PROCESS_STEPS[idx];

          if (numRef.current) numRef.current.textContent = step.id;
          if (titleRef.current) titleRef.current.textContent = step.title;
          if (descRef.current) descRef.current.textContent = step.desc;

          itemRefs.current.forEach((item, i) => {
            if (!item) return;
            const active = i === idx;
            item.style.opacity = active ? "1" : "0.3";
            item.style.transform = active
              ? "translateX(0) scale(1)"
              : "translateX(6px) scale(0.97)";
          });
          if (barRef.current) {
            barRef.current.style.width = `${(idx / (n - 1)) * 100}%`;
          }
          if (countRef.current) {
            countRef.current.textContent = `Step ${idx + 1} / ${n}`;
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative h-screen overflow-hidden bg-[#f3ede2]"
    >
      <div className="mx-auto flex h-full max-w-[1400px] flex-col justify-center gap-6 px-6 md:flex-row md:items-center md:gap-16 md:px-12">
        <div className="md:w-1/2">
          <p className="eyebrow mb-4 text-[#8b8174] md:mb-6">Our Process</p>
          <span
            ref={countRef}
            className="mb-3 inline-block text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#c2a878] md:hidden"
          >
            Step 1 / 10
          </span>
          <div className="flex items-baseline gap-4">
            <span
              ref={numRef}
              className="display text-[15vw] leading-none text-[#c2a878] md:text-[9vw]"
            >
              01
            </span>
          </div>
          <h3
            ref={titleRef}
            className="display mt-3 text-4xl text-[#161513] md:mt-4 md:text-6xl"
          >
            Consultation
          </h3>
          <p
            ref={descRef}
            className="mt-4 max-w-md text-sm leading-relaxed text-[#8b8174] md:mt-6 md:text-base"
          >
            We listen to how you live and what you need.
          </p>
          <div className="mt-6 h-[1px] w-full max-w-md bg-[#161513]/10 md:mt-10">
            <div
              ref={barRef}
              className="h-[1px] bg-[#c2a878] transition-all duration-300"
              style={{ width: "0%" }}
            />
          </div>
        </div>

        <div className="hidden md:block md:w-1/2">
          <div className="flex flex-col gap-3 border-l border-[#161513]/10 pl-8">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="flex items-baseline gap-4 transition-all duration-400"
                style={{ opacity: i === 0 ? 1 : 0.3 }}
              >
                <span className="display text-lg text-[#c2a878]">
                  {step.id}
                </span>
                <span className="text-base font-medium text-[#161513]">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
