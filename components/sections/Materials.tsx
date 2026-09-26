"use client";

import { useRef } from "react";
import { useLayoutEffect } from "react";
import { gsap } from "@/lib/motion";
import Image from "next/image";
import { MATERIALS } from "@/lib/data";
import { MATERIAL_IMAGES } from "@/lib/images";

export default function Materials() {
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
      className="relative h-screen overflow-hidden bg-[#faf7f0]"
    >
      <div className="flex h-full flex-col justify-center px-6 md:px-12">
        <div className="mb-6 md:mb-10">
          <p className="eyebrow mb-4 text-[#8b8174]">Materials</p>
          <h2 className="display text-5xl text-[#161513] md:text-7xl">
            TOUCH THE
            <br />
            <em className="text-[#c2a878]">MATERIALS.</em>
          </h2>
        </div>

        <div ref={trackRef} className="flex w-max gap-6 will-change-transform">
          {MATERIALS.map((m, i) => (
            <div
              key={m.name}
              className="w-[52vw] shrink-0 sm:w-[38vw] md:w-[26vw]"
            >
              <div className="relative h-[38vh] overflow-hidden rounded-2xl md:h-auto md:aspect-[4/5]">
                <Image
                  src={MATERIAL_IMAGES[i]}
                  alt={m.name}
                  fill
                  sizes="(max-width: 768px) 52vw, 26vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161513]/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="display text-3xl text-[#faf7f0]">{m.name}</p>
                </div>
              </div>
              <p className="mt-4 max-w-[90%] text-sm text-[#8b8174]">
                {m.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
