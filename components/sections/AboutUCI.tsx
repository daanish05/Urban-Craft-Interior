"use client";

import { useRef } from "react";
import { useLayoutEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/motion";
import { SplitText, Reveal } from "@/components/ui/Reveal";
import { LOGO } from "@/lib/images";

const PILLARS = ["Design", "Manufacturing", "Execution"];

export default function AboutUCI() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-pillar]"),
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
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
    <section ref={ref} className="relative overflow-hidden bg-[#f3ede2] px-6 py-28 md:px-12 md:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 hidden w-[560px] -translate-y-1/2 opacity-[0.16] mix-blend-multiply lg:block"
      >
        <Image
          src={LOGO.watermark}
          alt=""
          width={1400}
          height={1400}
          className="h-auto w-full"
        />
      </div>
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <div>
            <p className="eyebrow mb-6 text-[#8b8174]">Why UCI Exists</p>
            <SplitText
              text="THE PROBLEM WITH PIECES."
              className="display text-[9vw] leading-[0.9] text-[#161513] md:text-[4vw]"
            />
            <div className="mt-10 space-y-5 text-base leading-relaxed text-[#8b8174]">
              <p>
                Most interior projects are built from parts. A designer here, a
                contractor there, a carpenter, a furniture vendor, a material
                vendor, an installer.
              </p>
              <p>
                Each one speaks a different language. Communication gets
                fragmented. Your home gets caught in the gaps.
              </p>
            </div>
          </div>

          <div className="md:pl-10">
            <p className="eyebrow mb-6 text-[#c2a878]">The UCI Way</p>
            <h3 className="display text-4xl text-[#161513] md:text-5xl">
              ONE INTEGRATED
              <br />
              INTERIOR JOURNEY.
            </h3>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#8b8174]">
              UCI connects design, manufacturing and execution into a single
              process — one company, one point of responsibility, from the
              first concept to the finished interior.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              {PILLARS.map((p, i) => (
                <div key={p} data-pillar className="flex items-center gap-4">
                  <span className="rounded-full border border-[#161513]/20 px-5 py-3 text-sm uppercase tracking-[0.18em]">
                    {p}
                  </span>
                  {i < PILLARS.length - 1 && (
                    <span className="display text-2xl text-[#c2a878]">+</span>
                  )}
                </div>
              ))}
            </div>

            <Reveal className="mt-10 border-l-2 border-[#c2a878] pl-6">
              <p className="display text-2xl italic text-[#161513]">
                From 3D
                <br />
                to reality.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
