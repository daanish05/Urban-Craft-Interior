"use client";

import { useEffect } from "react";

const NAVBAR_HEIGHT = 100;

export default function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const el = document.getElementById(hash);
    if (el) {
      // Wait for layout to settle
      requestAnimationFrame(() => {
        const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
        window.scrollTo({ top, behavior: "smooth" });
      });
    }
  }, []);

  return null;
}