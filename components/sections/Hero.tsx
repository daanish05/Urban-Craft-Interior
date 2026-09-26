"use client";

import { useRef } from "react";
import { useLayoutEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { IMG } from "@/lib/images";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const elsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const curtain = curtainRef.current;
    const img = imgRef.current;
    const content = contentRef.current;
    const els = elsRef.current;
    if (!root || !curtain || !img || !content || !els) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.to(curtain, { yPercent: -100, duration: 1.3 }, 0.2)
        .fromTo(
          img,
          { scale: 1.08 },
          { scale: 1, duration: 2, ease: "power3.out" },
          0
        )
        .fromTo(
          els.querySelectorAll("[data-hero-el]"),
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, stagger: 0.08 },
          0.6
        );

      // Cinematic exit on scroll
      gsap.to(content, {
        y: -90,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        img,
        { scale: 1 },
        {
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, root);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => {
      ctx.revert();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="home"
      className="relative min-h-[100svh] overflow-hidden"
      aria-label="Urban Craft Interior"
    >
      <div
        ref={imgWrapRef}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          ref={imgRef}
          src={IMG.hero}
          alt="Premium warm interior by Urban Craft Interior"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ transform: "scale(1.08)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161513]/80 via-[#161513]/25 to-[#161513]/20" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-[20vh] pt-28 md:px-12 md:pb-[18vh] md:pt-32"
      >
        <div ref={elsRef} className="max-w-[1100px]">
          <p
            data-hero-el
            className="eyebrow mb-6 text-[#c2a878] opacity-0"
          >
            Interior Design • 3D Visualization • Manufacturing • Execution
          </p>

          <h1 className="display text-[12vw] leading-[0.9] text-[#faf7f0] md:text-[8.5vw] md:leading-[0.88]">
            <span data-hero-el className="block opacity-0">
              YOUR SPACE.
            </span>
            <span data-hero-el className="block opacity-0">
              DESIGNED TO BE <em className="text-[#c2a878]">YOURS.</em>
            </span>
          </h1>

          <p
            data-hero-el
            className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#c2a878] opacity-0 md:mt-8 md:text-[0.8rem] md:tracking-[0.34em]"
          >
            Designed. <span className="text-[#faf7f0]/60">Manufactured.</span>{" "}
            <span className="text-[#faf7f0]/60">Executed.</span>
          </p>

          <p
            data-hero-el
            className="mt-6 max-w-xl text-sm leading-relaxed text-[#faf7f0]/70 opacity-0 md:text-base"
          >
            From your first idea to the finished interior, UCI brings design,
            manufacturing and execution together under one roof.
          </p>

          <div
            data-hero-el
            className="mt-8 flex flex-wrap items-center gap-3 opacity-0 md:mt-10 md:gap-4"
          >
            <MagneticButton href="/contact" variant="solid">
              Get Free Consultation
            </MagneticButton>
            <MagneticButton href="#portfolio" variant="outlineLight">
              View Our Work
            </MagneticButton>
          </div>
        </div>
      </div>

      <div
        ref={curtainRef}
        className="pointer-events-none absolute inset-0 z-20 bg-[#f3ede2]"
      />
    </section>
  );
}
