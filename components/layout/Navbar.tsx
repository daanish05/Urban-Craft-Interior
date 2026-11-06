"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, BRAND } from "@/lib/data";
import { LOGO } from "@/lib/images";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTheme } from "@/components/providers/ThemeProvider";

const SECTION_IDS = ["home", "services", "portfolio", "process", "about"];

const NAVBAR_HEIGHT = 100;

function scrollToSection(href: string) {
  const hash = href.includes("#") ? href.split("#")[1] : "";

  if (window.location.pathname !== "/") {
    if (hash) {
      window.location.href = `/#${hash}`;
    } else if (href === "/") {
      window.location.href = "/";
    }
    return;
  }

  if (hash) {
    const el = document.getElementById(hash);

    if (el) {
      const top =
        el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;

      window.scrollTo({ top, behavior: "smooth" });
      history.pushState(null, "", `#${hash}`);
    }
  } else if (href === "/") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.pushState(null, "", "/");
  }
}

export default function Navbar() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  const [underlineStyle, setUnderlineStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onHashChange = () => setActiveHash(window.location.hash);

    window.addEventListener("hashchange", onHashChange);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveHash(window.location.hash);

    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Scroll spy
  useEffect(() => {
    if (pathname !== "/") return;

    const setInitialActive = () => {
      const scrollY = window.scrollY;

      const sections = SECTION_IDS.map((id) => {
        const el = document.getElementById(id);

        return el
          ? {
              id,
              top: el.offsetTop,
              height: el.offsetHeight,
            }
          : null;
      }).filter(Boolean);

      for (const section of sections) {
        if (
          section &&
          scrollY >= section.top - window.innerHeight * 0.3 &&
          scrollY < section.top + section.height - window.innerHeight * 0.3
        ) {
          setActiveHash(`#${section.id}`);
          return;
        }
      }

      if (scrollY < window.innerHeight * 0.3) {
        setActiveHash("#home");
      }
    };

    setInitialActive();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;

            if (SECTION_IDS.includes(id)) {
              setActiveHash(`#${id}`);
            }
          }
        });
      },
      {
        rootMargin: "0px 0px -50% 0px",
        threshold: 0.05,
      },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);

      if (el) observer.observe(el);
    });

    const onScroll = () => setInitialActive();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  // Mobile menu controls
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => {
    if (pathname === "/contact") {
      return href === "/contact";
    }

    if (pathname === "/") {
      return href === `/${activeHash}` || (activeHash === "" && href === "/");
    }

    return false;
  };

  // Sliding navigation underline
  useEffect(() => {
    if (pathname !== "/" || !navRef.current) return;

    const activeIndex = NAV_LINKS.findIndex((link) => isActive(link.href));

    if (activeIndex === -1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUnderlineStyle((prev) => ({
        ...prev,
        opacity: 0,
      }));
      return;
    }

    const navLinks =
      navRef.current.querySelectorAll<HTMLAnchorElement>("nav > a");

    const activeLink = navLinks[activeIndex];

    if (activeLink) {
      const navRect = navRef.current
        .querySelector("nav")
        ?.getBoundingClientRect();

      const linkRect = activeLink.getBoundingClientRect();

      if (navRect) {
        setUnderlineStyle({
          left: linkRect.left - navRect.left,
          width: linkRect.width,
          opacity: 1,
        });
      }
    }
  }, [activeHash, pathname, scrolled]);

  // Theme-aware colors
  const navText = "text-fg-primary/75 hover:text-fg-primary";

  const consultationButton =
    "bg-fg-primary text-fg-inverse hover:bg-gold hover:text-charcoal";

  const hamburgerColor = open ? "bg-ivory" : "bg-fg-primary";
  const brandOnDark = open || isDark;

  return (
    <>
      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-charcoal px-8 pt-20 transition-all duration-500 lg:hidden ${
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-5">
          {NAV_LINKS.map((link, i) => {
            const active = isActive(link.href);
            const isHashLink = link.href.includes("#") || link.href === "/";

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (isHashLink) {
                    e.preventDefault();
                    scrollToSection(link.href);
                    setOpen(false);
                  }
                }}
                tabIndex={open ? 0 : -1}
                className={`display text-4xl text-ivory transition-all duration-500 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                } ${active ? "text-gold" : ""}`}
                style={{
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div
          className={`mt-12 flex flex-col gap-3 transition-all delay-300 duration-500 ${
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-charcoal"
          >
            Get Free Consultation
          </Link>

          <a
            href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
            tabIndex={open ? 0 : -1}
            className="text-center text-xs uppercase tracking-[0.25em] text-ivory/60"
          >
            {BRAND.phone}
          </a>

          <div className="flex justify-center pt-4">
            <ThemeToggle light />
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-4 z-50 mx-4 rounded-2xl transition-all duration-500 md:mx-10 ${
          open
            ? "border border-transparent bg-transparent"
            : scrolled
              ? isDark
                ? "border border-white/15 bg-charcoal/75 shadow-[0_8px_40px_rgba(0,0,0,0.3)] backdrop-blur-[40px] backdrop-saturate-[200%]"
                : "border border-white/30 bg-ivory/50 shadow-[0_8px_40px_rgba(0,0,0,0.12)] backdrop-blur-[40px] backdrop-saturate-[200%]"
              : "border border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-1.5 md:px-10">
          {/* Brand */}
          <Link
            href="/"
            data-cursor=""
            onClick={() => setOpen(false)}
            aria-label="Urban Craft Interior — home"
            className="relative flex shrink-0 items-center gap-3"
          >
            <div className="relative block h-12 w-48 shrink-0 md:h-20 md:w-20">
              <Image
                src={LOGO.onDark}
                alt="Urban Craft Interior logo"
                width={400}
                height={100}
                priority
                className={`absolute inset-0 h-full w-full object-left object-contain transition-opacity duration-500 ${brandOnDark ? "opacity-100" : "opacity-0"}`}
              />
              <Image
                src={LOGO.onLight}
                alt=""
                aria-hidden="true"
                width={400}
                height={100}
                priority
                className={`absolute inset-0 h-full w-full object-left object-contain transition-opacity duration-500 ${brandOnDark ? "opacity-0" : "opacity-100"}`}
              />
            </div>

            <span className="hidden md:flex shrink-0 flex-col items-stretch whitespace-nowrap leading-none">
              <span className="text-center font-sans text-[20px] font-medium uppercase tracking-[0.08em] text-gold md:text-[22px]">
                Urban
              </span>

              <span
                aria-hidden="true"
                className="mt-[5px] h-px w-full bg-gold/80"
              />

              <span
                className={`mt-[5px] w-full text-center font-sans text-[8px] font-medium uppercase tracking-[0.22em] indent-[0.22em] md:text-[8.5px] ${
                  open ? "text-ivory" : "text-fg-primary"
                }`}
              >
                Craft Interior
              </span>
            </span>
            {/* <span className="flex shrink-0 flex-col items-stretch whitespace-nowrap leading-none">
              <span className="text-center font-sans text-[20px] font-medium uppercase tracking-[0.08em] text-gold md:text-[22px]">
                Urban
              </span>

              <span
                aria-hidden="true"
                className="mt-[5px] h-px w-full bg-gold/80"
              />

              <span
                className={`mt-[5px] w-full text-center font-sans text-[8px] font-medium uppercase tracking-[0.22em] indent-[0.22em] md:text-[8.5px] ${
                  open ? "text-ivory" : "text-fg-primary"
                }`}
              >
                Craft Interior
              </span>
            </span> */}
          </Link>

          {/* Desktop navigation */}
          <nav className="relative hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              const isHashLink = link.href.includes("#") || link.href === "/";

              return (
                <a
                  key={link.href}
                  href={link.href}
                  data-cursor=""
                  onClick={(e) => {
                    if (isHashLink) {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }
                  }}
                  className={`text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-colors duration-500 ${
                    active ? "text-gold" : navText
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            {/* Sliding underline */}
            <span
              className="absolute bottom-[-6px] h-[2px] rounded-full bg-gold transition-all duration-300 ease-out"
              style={{
                left: underlineStyle.left,
                width: underlineStyle.width,
                opacity: underlineStyle.opacity,
              }}
            />

            {/* Consultation button */}
            <Link
              href="/contact"
              data-cursor="explore"
              className={`rounded-full px-6 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-all ${consultationButton}`}
            >
              Get Consultation
            </Link>

            {/* Desktop theme toggle */}
            <ThemeToggle />
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            data-cursor=""
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`block h-[1px] w-6 transition-all duration-300 ${hamburgerColor} ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />

            <span
              className={`block h-[1px] w-6 transition-all duration-300 ${hamburgerColor} ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>
    </>
  );
}
