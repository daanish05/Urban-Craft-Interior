"use client";

import { useRef } from "react";
import { useLayoutEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/motion";
import { PACKAGES } from "@/lib/data";
import { IMG } from "@/lib/images";
import MagneticButton from "@/components/ui/MagneticButton";

const PACK_IMAGES = [IMG.living2, IMG.kitchen1, IMG.complete];

export default function Packages() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-pack]"),
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
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
    <section ref={ref} id="packages" className="bg-[#faf7f0] px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-6 text-[#8b8174]">Packages</p>
            <h2 className="display text-[9vw] leading-[0.9] text-[#161513] md:text-[4.5vw]">
              CHOOSE YOUR
              <br />
              <em className="text-[#c2a878]">INTERIOR.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#8b8174]">
            Transparent, considered packages — each covering the full journey
            from design to execution.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <div
              key={pkg.id}
              data-pack
              className="group relative flex min-h-[520px] flex-col justify-end overflow-hidden rounded-2xl md:min-h-[620px]"
            >
              <div className="absolute inset-0">
                <Image
                  src={PACK_IMAGES[i]}
                  alt={pkg.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161513]/95 via-[#161513]/40 to-[#161513]/10" />
              </div>

              <div className="relative p-7 md:p-9">
                <span className="inline-block rounded-full border border-[#c2a878]/60 px-4 py-1 text-[0.6rem] uppercase tracking-[0.25em] text-[#c2a878]">
                  {pkg.tag}
                </span>
                <h3 className="display mt-5 text-3xl text-[#faf7f0] md:text-4xl">
                  {pkg.title}
                </h3>
                <p className="mt-2 text-sm text-[#c2a878]">{pkg.subtitle}</p>

                <ul className="mt-6 grid max-h-[400px] gap-2 overflow-hidden opacity-100 transition-all duration-700 ease-out md:max-h-0 md:opacity-0 md:group-hover:max-h-[400px] md:group-hover:opacity-100">
                  {pkg.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 text-sm text-[#faf7f0]/90"
                    >
                      <span className="h-1 w-1 rounded-full bg-[#c2a878]" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  <MagneticButton href="/contact" variant="solid">
                    Get Quote
                  </MagneticButton>
                  <a
                    href="/contact"
                    data-cursor="explore"
                    className="inline-flex items-center gap-2 rounded-full border border-[#faf7f0]/40 px-8 py-4 text-sm text-[#faf7f0] transition-colors hover:bg-[#faf7f0] hover:text-[#161513]"
                  >
                    View Package
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
