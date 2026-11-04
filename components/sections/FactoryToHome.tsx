"use client";

import { useRef } from "react";
import { useLayoutEffect } from "react";
import { gsap } from "@/lib/motion";
import MediaImage from "@/components/ui/MediaImage";
import { IMG } from "@/lib/images";

const FLOW = [
  { step: "UCI Design", src: IMG.living2 },
  { step: "UCI Factory", src: IMG.workshop2 },
  { step: "UCI Furniture", src: IMG.wood2 },
  { step: "UCI Installation", src: IMG.detail },
  { step: "Your Home", src: IMG.complete },
];

export default function FactoryToHome() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getDistance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + getDistance(),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="factory"
      className="relative h-screen overflow-hidden bg-charcoal text-ivory"
    >
      <div className="flex h-full flex-col justify-center px-6 md:px-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <div>
            <p className="eyebrow mb-4 text-gold">Direct Factory to Home</p>
            <h2 className="display text-5xl md:text-7xl">
              FROM FACTORY
              <br />
              <em className="text-gold">TO YOUR HOME.</em>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-ivory/60">
            A more connected interior journey — from design and manufacturing
            to installation.
          </p>
        </div>

        <div ref={trackRef} className="flex w-max gap-8 will-change-transform">
          {FLOW.map((item, i) => (
            <div key={i} className="flex shrink-0 items-center gap-8">
              <div className="w-[64vw] sm:w-[46vw] md:w-[34vw]">
                <div className="relative h-[38vh] overflow-hidden rounded-2xl md:h-auto md:aspect-[4/5]">
                  <MediaImage
                    src={item.src}
                    alt={item.step}
                    sizes="(max-width: 768px) 64vw, 34vw"
                    parallax={6}
                    className="h-full w-full"
                  />
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="display text-2xl">{item.step}</span>
                  <span className="text-gold">
                    0{i + 1} / 0{FLOW.length}
                  </span>
                </div>
              </div>
              {i < FLOW.length - 1 && (
                <span className="display text-4xl text-gold">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
