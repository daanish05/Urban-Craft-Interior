"use client";

import Link from "next/link";
import { BRAND } from "@/lib/data";

export default function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-border bg-bg-primary/95 backdrop-blur-md md:hidden">
      <Link
        href="/contact"
        className="flex flex-1 items-center justify-center gap-2 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-fg-primary"
      >
        Get Consultation
      </Link>
      <a
        href={`https://wa.me/${BRAND.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 bg-fg-primary py-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-fg-inverse"
      >
        WhatsApp UCI
      </a>
    </div>
  );
}
