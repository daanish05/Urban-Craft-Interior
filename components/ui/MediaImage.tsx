"use client";

import { useRef } from "react";
import { useLayoutEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/motion";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  parallax?: number;
  reveal?: boolean;
};

export default function MediaImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 60vw",
  priority = false,
  parallax = 0,
  reveal = true,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;

    const ctx = gsap.context(() => {
      if (reveal) {
        gsap.fromTo(
          img,
          { scale: 1.18 },
          {
            scale: 1,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: {
              trigger: wrap,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
      if (parallax) {
        gsap.fromTo(
          img,
          { yPercent: -parallax },
          {
            yPercent: parallax,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, wrap);

    return () => ctx.revert();
  }, [parallax, reveal]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover will-change-transform"
        style={{ transform: "scale(1.18)" }}
      />
    </div>
  );
}
