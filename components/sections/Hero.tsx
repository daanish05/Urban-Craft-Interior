"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useLayoutEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { HERO_SLIDES } from "@/lib/images";

// Check for reduced motion preference
const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const totalSlides = HERO_SLIDES.length;
  const slide = HERO_SLIDES[currentSlide];

  // Navigate to next slide
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [isTransitioning, totalSlides]);

  // Navigate to previous slide
  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [isTransitioning, totalSlides]);

  // Navigate to specific slide
  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentSlide) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
    },
    [isTransitioning, currentSlide],
  );

  // Reset transition state after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Autoplay with 5 second interval
  useEffect(() => {
    if (prefersReducedMotion()) return;

    slideIntervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, [nextSlide]);

  // Pause autoplay on hover/focus
  const pauseAutoplay = useCallback(() => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
      slideIntervalRef.current = null;
    }
  }, []);

  const resumeAutoplay = useCallback(() => {
    if (prefersReducedMotion()) return;
    if (!slideIntervalRef.current) {
      slideIntervalRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
  }, [nextSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Initial animations
  useLayoutEffect(() => {
    const root = rootRef.current;
    const content = contentRef.current;
    const textContent = textContentRef.current;
    if (!root || !content || !textContent) return;

    const ctx = gsap.context(() => {
      // Animate text elements in
      gsap.fromTo(
        textContent.querySelectorAll("[data-hero-el]"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.07,
          delay: 0.2,
          ease: "expo.out",
        },
      );

      // Subtle exit on scroll - only for the content area, not the whole section
      gsap.to(content, {
        y: -60,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
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
      className="relative bg-bg-primary"
      aria-label="Urban Craft Interior"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
      onFocus={pauseAutoplay}
      onBlur={resumeAutoplay}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main container with proper spacing for fixed navbar */}
      <div className="pt-[100px] md:pt-[120px]" />

      <div className="relative flex min-h-[calc(100svh-100px)] flex-col md:flex-row md:min-h-[calc(100svh-120px)]">
        {/* Left Panel - Slideshow Image (42%) */}
        <div className="relative h-[40svh] w-full overflow-hidden md:h-auto md:w-[80%] lg:w-[78%]">
          {/* Diagonal/Slanted Edge - Desktop Only */}
          <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
            {/* Main diagonal cut */}
            <div
              className="absolute right-0 top-0 h-full w-[100px] bg-bg-primary"
              style={{
                clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
              }}
            />
            {/* Gold accent line on diagonal */}
            <div
              className="absolute right-[-50px] top-0 h-full w-[2px] bg-gradient-to-b from-gold/0 via-gold/60 to-gold/0"
              style={{
                transform: "skewX(-12deg)",
                // transformOrigin: "top right",
                transformOrigin: "top right",
              }}
            />
          </div>

          {/* Slideshow Images */}
          {HERO_SLIDES.map((s, index) => (
            <div
              key={s.id}
              className="absolute inset-0"
              style={{
                opacity: index === currentSlide ? 1 : 0,
                transition: prefersReducedMotion()
                  ? "opacity 0.3s ease"
                  : "opacity 0.8s ease-in-out",
                zIndex: index === currentSlide ? 1 : 0,
              }}
            >
              <Image
                src={s.image}
                alt={`${s.title} by Urban Craft Interior`}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover"
                style={{
                  transform:
                    index === currentSlide && !prefersReducedMotion()
                      ? "scale(1)"
                      : "scale(1.08)",
                  transition: prefersReducedMotion()
                    ? "none"
                    : "transform 4s ease-out",
                }}
              />
              {/* Subtle dark overlay for depth */}
              <div className="absolute inset-0 bg-[#161513]/5" />
            </div>
          ))}
        </div>

        {/* Right Panel - Content (58%) */}
        <div
          ref={contentRef}
          className="relative flex min-h-[60svh] w-full flex-col justify-center px-6 py-12 md:w-[58%] md:min-h-0 md:px-12 md:py-16 lg:w-[60%] lg:px-16 xl:px-24"
        >
          <div
            ref={textContentRef}
            className="max-w-xl translate-x-0 md:translate-x-13"
          >
            {/* Eyebrow */}
            <p
              data-hero-el
              className="mb-4 text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-gold opacity-0 md:text-[1.15rem]"
            >
              {/* DESIGN · MANUFACTURING · EXECUTION */}
              Innovation that Inspires
            </p>

            {/* Category Title */}
            <h1
              key={`title-${slide.id}`}
              className="display text-[10vw] leading-[0.92] text-fg-primary opacity-0 md:text-[4vw] lg:text-[4.8vw]"
              style={{
                animation: prefersReducedMotion()
                  ? "none"
                  : "fadeSlideUp 1.2s ease forwards",
              }}
            >
              {slide.title}
            </h1>

            {/* Subcategory Captions with gold separators */}
            <div
              key={`captions-${slide.id}`}
              className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-1"
              style={{
                animation: prefersReducedMotion()
                  ? "none"
                  : "fadeSlideUp 0.5s ease 0.1s forwards",
                opacity: prefersReducedMotion() ? 1 : 0,
              }}
            >
              {slide.captions.map((caption, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5">
                  <span className="text-sm font-medium text-fg-primary/70 md:text-[0.85rem]">
                    {caption}
                  </span>
                  {idx < slide.captions.length - 1 && (
                    <span className="text-gold text-xs" aria-hidden="true">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>

            {/* Description */}
            <p
              data-hero-el
              className="mt-6 text-sm leading-relaxed text-fg-primary/60 opacity-0 md:text-[0.9rem] md:leading-relaxed"
            >
              {slide.description}
            </p>

            {/* Tagline */}
            <p
              data-hero-el
              className="mt-6 text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-gold opacity-0 md:text-[0.65rem]"
            >
              DESIGN.MANUFACTURE.EXECUTE.
              {/* <span className="text-fg-primary/40">MANUFACTURED.</span>{" "}
              <span className="text-fg-primary/40">EXECUTED.</span> */}
            </p>

            {/* CTA Buttons */}
            <div
              data-hero-el
              className="mt-8 flex flex-wrap items-center gap-3 opacity-0"
            >
              <MagneticButton href="/contact" variant="solid">
                Get Free Consultation
              </MagneticButton>
              <MagneticButton href="#portfolio" variant="outline">
                View Our Work
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation - Absolute positioned at the bottom of the Hero section */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 md:bottom-10 md:left-auto md:right-8 md:-translate-x-0 lg:bottom-14 lg:right-12 xl:left-48">
        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-bg-primary/95 text-fg-primary shadow-lg backdrop-blur-sm transition-all hover:border-gold hover:bg-gold hover:text-bg-primary hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 active:scale-95"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-bg-primary/95 text-fg-primary shadow-lg backdrop-blur-sm transition-all hover:border-gold hover:bg-gold hover:text-bg-primary hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 active:scale-95"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        {/* Slide Indicators with Background */}
        <div className="flex items-center gap-1.5 rounded-full bg-bg-primary/95 px-3 py-2 shadow-lg backdrop-blur-sm">
          {HERO_SLIDES.map((s, index) => (
            <button
              key={s.id}
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
                index === currentSlide
                  ? "w-8 bg-gold shadow-md"
                  : "w-2.5 bg-fg-primary/20 hover:bg-fg-primary/40 hover:w-4"
              }`}
              aria-label={`Go to slide ${index + 1}: ${s.title}`}
              aria-current={index === currentSlide ? "true" : undefined}
            />
          ))}
        </div>

        {/* Slide Counter with Background */}
        <div className="flex items-center gap-1 rounded-full bg-bg-primary/95 px-3 py-2 text-xs font-semibold tracking-wider shadow-lg backdrop-blur-sm">
          <span className="text-gold">
            {String(currentSlide + 1).padStart(2, "0")}
          </span>
          <span className="text-fg-primary/40 mx-1">/</span>
          <span className="text-fg-primary/60">
            {String(totalSlides).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* CSS Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
