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
      "bg-[#161513] text-[#faf7f0] hover:bg-[#c2a878] hover:text-[#161513]",
    outline:
      "border border-[#161513]/30 text-[#161513] hover:border-[#161513] hover:bg-[#161513] hover:text-[#faf7f0]",
    outlineLight:
      "border border-[#faf7f0]/40 text-[#faf7f0] hover:border-[#faf7f0] hover:bg-[#faf7f0] hover:text-[#161513]",
    ghost:
      "bg-transparent text-[#161513] underline decoration-[#c2a878] decoration-2 underline-offset-8",
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