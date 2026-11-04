"use client";

import { useRef } from "react";
import { useLayoutEffect } from "react";
import { gsap } from "@/lib/motion";
import Image from "next/image";
import { SplitText } from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { IMG, LOGO } from "@/lib/images";
import { BRAND } from "@/lib/data";

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-cta]"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden bg-charcoal">
      <div className="absolute inset-0">
        <Image
          src={IMG.complete}
          alt="Completed premium interior by Urban Craft Interior"
          fill
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161513]/90 via-[#161513]/50 to-[#161513]/30" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-32 text-center md:px-12">
        <div data-cta className="mb-10 flex justify-center">
          <Image
            src={LOGO.onDark}
            alt="Urban Craft Interior logo"
            width={1600}
            height={1600}
            className="h-16 w-16 object-contain md:h-20 md:w-20"
          />
        </div>
        <p data-cta className="eyebrow mb-8 text-gold">
          Start Your Interior Journey
        </p>

        <SplitText
          text="YOUR SPACE STARTS WITH A CONVERSATION."
          className="display text-[11vw] leading-[0.9] text-ivory md:text-[6vw]"
        />

        <p data-cta className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ivory/70 md:text-lg">
          Tell us what you have in mind. We&apos;ll help you take it from idea to
          reality.
        </p>

        <div
          data-cta
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="/contact" variant="solid">
            Get Free Consultation
          </MagneticButton>
          <MagneticButton
            href={`https://wa.me/${BRAND.whatsapp}`}
            variant="outlineLight"
            dataCursor="explore"
          >
            WhatsApp UCI
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
