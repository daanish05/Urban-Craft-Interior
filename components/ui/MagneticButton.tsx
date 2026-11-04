"use client";

import { useRef, type ReactNode, type MouseEvent as ReactMouseEvent } from "react";
import { gsap } from "@/lib/motion";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "outline" | "outlineLight" | "ghost";
  className?: string;
  onClick?: () => void;
  dataCursor?: string;
};

export default function MagneticButton({
  children,
  href,
  variant = "solid",
  className = "",
  onClick,
  dataCursor = "explore",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: ReactMouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
  };

  const base =
    "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 text-sm font-medium tracking-wide transition-colors duration-500";

  const styles = {
    solid:
      "bg-fg-primary text-fg-inverse hover:bg-gold hover:text-charcoal",
    outline:
      "border border-border text-fg-primary hover:border-fg-primary hover:bg-fg-primary hover:text-fg-inverse",
    outlineLight:
      "border border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory hover:text-charcoal",
    ghost:
      "bg-transparent text-fg-primary underline decoration-gold decoration-2 underline-offset-8",
  }[variant];

  const cls = `${base} ${styles} ${className}`;

  const common = {
    className: cls,
    "data-cursor": dataCursor,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick,
  };

  const setRef = (el: HTMLElement | null) => {
    ref.current = el;
  };

  if (href) {
    return (
      <a href={href} ref={setRef} {...common}>
        <span className="relative z-10 flex items-center gap-3">{children}</span>
      </a>
    );
  }

  return (
    <button type="button" ref={setRef} {...common}>
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </button>
  );
}