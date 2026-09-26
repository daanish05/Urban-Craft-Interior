import Image from "next/image";
import Link from "next/link";
import Marquee from "@/components/ui/Marquee";
import { BRAND, NAV_LINKS, SERVICES } from "@/lib/data";
import { LOGO } from "@/lib/images";

export default function Footer() {
  return (
    <footer className="bg-[#161513] text-[#faf7f0]">
      <div className="border-b border-[#faf7f0]/10">
        <Marquee
          items={["DESIGNED", "MANUFACTURED", "EXECUTED", "FROM 3D TO REALITY"]}
          direction="left"
          speed={30}
          className="py-6"
          light
        />
      </div>

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 py-20 md:grid-cols-12 md:px-12">
        <div className="md:col-span-5">
          <Image
            src={LOGO.onDark}
            alt="Urban Craft Interior — a complete interior solution"
            width={1600}
            height={1600}
            className="mb-10 h-20 w-20 object-contain md:h-24 md:w-24"
          />
          <p className="display text-5xl leading-[0.95] md:text-6xl">
            ONE COMPANY.
            <br />
            ONE PROCESS.
            <br />
            ONE RESPONSIBILITY.
          </p>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-[#faf7f0]/60">
            UCI brings design, manufacturing and execution together — from your
            first idea to a finished interior.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow mb-6 text-[#c2a878]">Explore</p>
          <ul className="space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-[#faf7f0]/70 transition-colors hover:text-[#faf7f0]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow mb-6 text-[#c2a878]">Interiors</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
            {SERVICES.slice(0, 8).map((s) => (
              <li key={s.id}>
                <span className="text-sm text-[#faf7f0]/70">{s.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[#faf7f0]/10">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-6 px-6 pb-24 pt-8 md:flex-row md:items-center md:px-12 md:py-8">
          <p className="text-xs text-[#faf7f0]/50">
            © {new Date().getFullYear()} {BRAND.name}. {BRAND.location}.
          </p>
          <div className="flex items-center gap-8 text-xs text-[#faf7f0]/50">
            <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} data-cursor="">
              {BRAND.phone}
            </a>
            <a href={`mailto:${BRAND.email}`} data-cursor="">
              {BRAND.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
