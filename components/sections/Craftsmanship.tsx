"use client";

import { useRef } from "react";
import { useLayoutEffect } from "react";
import MediaImage from "@/components/ui/MediaImage";
import Marquee from "@/components/ui/Marquee";
import { SplitText } from "@/components/ui/Reveal";
import { gsap } from "@/lib/motion";
import { IMG } from "@/lib/images";

export default function Craftsmanship() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-detail]"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
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
    <section ref={ref} className="bg-charcoal px-6 py-28 text-ivory md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow mb-10 text-gold">Craftsmanship</p>

        <SplitText
          text="DETAIL MAKES THE SPACE."
          className="display text-[11vw] leading-[0.88] md:text-[7vw]"
        />

        <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          <div data-detail className="md:mt-24">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <MediaImage
                src={IMG.wood2}
                alt="Wood grain detail"
                sizes="(max-width: 768px) 100vw, 33vw"
                parallax={8}
                className="h-full w-full"
              />
            </div>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-ivory/60">
              Wood Grain
            </p>
          </div>

          <div data-detail>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <MediaImage
                src={IMG.hardware}
                alt="Hardware and edge detail"
                sizes="(max-width: 768px) 100vw, 33vw"
                parallax={8}
                className="h-full w-full"
              />
            </div>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-ivory/60">
              Hardware & Edge
            </p>
          </div>

          <div data-detail className="md:mt-24">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <MediaImage
                src={IMG.detail}
                alt="Joinery and lighting detail"
                sizes="(max-width: 768px) 100vw, 33vw"
                parallax={8}
                className="h-full w-full"
              />
            </div>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-ivory/60">
              Joinery & Lighting
            </p>
          </div>
        </div>

        <div className="mt-20">
          <Marquee
            items={["Joinery", "Edge Finish", "Wood Grain", "Lighting", "Hardware", "Texture"]}
            separator="·"
            direction="left"
            speed={28}
            className="border-y border-ivory/10 py-6"
            light
          />
        </div>
      </div>
    </section>
  );
}
