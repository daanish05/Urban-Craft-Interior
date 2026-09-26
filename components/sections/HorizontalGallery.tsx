"use client";

import { useRef } from "react";
import { useLayoutEffect } from "react";
import { gsap } from "@/lib/motion";
import Image from "next/image";
import { PROJECTS } from "@/lib/data";
import { PROJECT_IMAGES } from "@/lib/images";

export default function HorizontalGallery() {
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
      id="portfolio"
      className="relative h-screen overflow-hidden bg-[#f3ede2]"
    >
      <div className="flex h-full flex-col justify-center px-6 md:px-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <div>
            <p className="eyebrow mb-4 text-[#8b8174]">A Look Inside</p>
            <h2 className="display text-5xl text-[#161513] md:text-7xl">
              OUR <em className="text-[#c2a878]">INTERIORS.</em>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-[#8b8174]" data-cursor="drag">
            Keep scrolling — the gallery moves with you.
          </p>
        </div>

        <div ref={trackRef} className="flex w-max gap-8 will-change-transform">
          {PROJECTS.map((p, i) => (
            <div key={i} className="w-[70vw] shrink-0 sm:w-[48vw] md:w-[36vw]">
              <div
                className="relative h-[44vh] overflow-hidden rounded-2xl md:h-auto md:aspect-[3/4]"
                data-cursor="view"
              >
                <Image
                  src={PROJECT_IMAGES[i]}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 70vw, 36vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161513]/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="eyebrow text-[#c2a878]">{p.type}</p>
                  <p className="display text-3xl text-[#faf7f0]">{p.title}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[#8b8174]">
                <span>{p.location}</span>
                <span>{p.style}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
