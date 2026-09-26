"use client";

import { useRef } from "react";
import { useLayoutEffect } from "react";
import { gsap } from "@/lib/motion";
import MediaImage from "@/components/ui/MediaImage";
import { SplitText } from "@/components/ui/Reveal";
import { FOUNDER } from "@/lib/data";
import { IMG } from "@/lib/images";

export default function Founder() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-founder]"),
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
    <section ref={ref} className="bg-[#faf7f0] px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <MediaImage
                src={IMG.detail}
                alt="Portrait placeholder for Ar. Mohsin Abbas Shaikh"
                sizes="(max-width: 768px) 100vw, 40vw"
                parallax={6}
                className="h-full w-full"
              />
              <div className="absolute bottom-4 left-4 rounded-full bg-[#161513]/70 px-4 py-2 text-[0.6rem] uppercase tracking-[0.2em] text-[#faf7f0]">
                Portrait coming soon
              </div>
            </div>
          </div>

          <div className="md:col-span-7 md:pl-10">
            <p className="eyebrow mb-6 text-[#8b8174]">The Person Behind UCI</p>
            <SplitText
              text={FOUNDER.name}
              className="display text-[7vw] leading-[0.95] text-[#161513] md:text-[3.6vw]"
            />

            <div className="mt-6 flex flex-wrap gap-3">
              {FOUNDER.roles.map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-[#161513]/15 px-4 py-2 text-[0.65rem] uppercase tracking-[0.18em] text-[#8b8174]"
                >
                  {role}
                </span>
              ))}
            </div>

            <p
              data-founder
              className="display mt-8 text-2xl italic text-[#c2a878]"
            >
              {FOUNDER.headline}
            </p>

            <p data-founder className="mt-6 max-w-2xl text-base leading-relaxed text-[#8b8174]">
              {FOUNDER.intro}
            </p>

            <div data-founder className="mt-10 grid gap-4 md:grid-cols-2">
              {FOUNDER.education.map((edu) => (
                <div
                  key={edu}
                  className="rounded-xl border border-[#161513]/10 p-5"
                >
                  <span className="mb-2 block h-1 w-6 bg-[#c2a878]" />
                  <p className="text-sm text-[#161513]">{edu}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
