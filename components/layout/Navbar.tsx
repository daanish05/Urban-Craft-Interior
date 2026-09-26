"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, BRAND } from "@/lib/data";
import { LOGO } from "@/lib/images";

const SECTION_IDS = ["home", "services", "portfolio", "process", "about"];

const NAVBAR_HEIGHT = 100; // Approximate navbar height for offset

function scrollToSection(href: string) {
  // Handle both "#services" and "/#services" formats
  const hash = href.includes("#") ? href.split("#")[1] : "";
  
  // If on contact page (or any non-home page), navigate to home with hash
  if (window.location.pathname !== "/") {
    if (hash) {
      window.location.href = `/#${hash}`;
    } else if (href === "/") {
      window.location.href = "/";
    }
    return;
  }
  
  // On home page - smooth scroll
  if (hash) {
    const el = document.getElementById(hash);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
      window.scrollTo({ top, behavior: "smooth" });
      history.pushState(null, "", `#${hash}`);
    }
  } else if (href === "/") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.pushState(null, "", "/");
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });
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
    setActiveHash(window.location.hash);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Scroll spy: update hash based on visible section
  useEffect(() => {
    if (pathname !== "/") return;
    
    // Set initial active section based on scroll position
    const setInitialActive = () => {
      const scrollY = window.scrollY;
      const sections = SECTION_IDS.map(id => {
        const el = document.getElementById(id);
        return el ? { id, top: el.offsetTop, height: el.offsetHeight } : null;
      }).filter(Boolean);
      
      for (const section of sections) {
        if (scrollY >= section.top - window.innerHeight * 0.3 && 
            scrollY < section.top + section.height - window.innerHeight * 0.3) {
          setActiveHash(`#${section.id}`);
          return;
        }
      }
      // Default to home if at top
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
      { rootMargin: "0px 0px -50% 0px", threshold: 0.05 }
    );
    
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    
    // Also listen to scroll for immediate updates
    const onScroll = () => setInitialActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

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

  // Light text when the bar sits over the dark home hero or the dark
  // menu overlay. Other pages start on a light background.
  const light = (pathname === "/" && !scrolled) || open;

  const isActive = (href: string) => {
    if (pathname === "/contact") return href === "/contact";
    if (pathname === "/") return href === `/${activeHash}` || (activeHash === "" && href === "/");
    return false;
  };

  // Update underline position when active navlink changes
  useEffect(() => {
    if (pathname !== "/" || !navRef.current) return;
    
    const activeIndex = NAV_LINKS.findIndex(link => isActive(link.href));
    if (activeIndex === -1) {
      setUnderlineStyle(prev => ({ ...prev, opacity: 0 }));
      return;
    }
    
    const navLinks = navRef.current.querySelectorAll<HTMLAnchorElement>("nav > a");
    const activeLink = navLinks[activeIndex];
    
    if (activeLink) {
      const navRect = navRef.current.querySelector("nav")?.getBoundingClientRect();
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

  return (
    <>
      {/* Mobile menu overlay — sibling of the header so backdrop-blur on the
          header never traps it, and it always covers the full viewport. */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-[#161513] px-8 pt-20 transition-all duration-500 lg:hidden ${
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
                className={`display text-4xl text-[#faf7f0] transition-all duration-500 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                } ${active ? "text-[#c2a878]" : ""}`}
                style={{ transitionDelay: `${i * 60}ms` }}
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
            className="inline-flex items-center justify-center rounded-full bg-[#c2a878] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#161513]"
          >
            Get Free Consultation
          </Link>
          <a
            href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
            tabIndex={open ? 0 : -1}
            className="text-center text-xs uppercase tracking-[0.25em] text-[#faf7f0]/60"
          >
            {BRAND.phone}
          </a>
        </div>
      </div>
<header
        ref={navRef}
        className={`fixed inset-x-0 top-4 z-50 transition-all duration-500 mx-4 md:mx-10 rounded-2xl ${
          open
            ? "border border-transparent bg-transparent"
            : scrolled
            ? "border border-white/30 bg-white/10 backdrop-blur-[40px] backdrop-saturate-[200%] backdrop-brightness-[110%] shadow-[0_8px_40px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.1)_inset] [backdrop-filter:_blur(40px)_saturate(200%)_brightness(110%)]"
            : "border border-transparent bg-transparent"
        }`}
      >
        {/* <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          open
            ? "border-b border-transparent bg-transparent"
            : scrolled
              ? "border-b border-[#161513]/10 bg-[#f3ede2]/85 backdrop-blur-md"
              : "border-b border-transparent bg-transparent"
        }`}
      > */}

        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-3 md:px-10">
          <Link
            href="/"
            data-cursor=""
            onClick={() => setOpen(false)}
            aria-label="Urban Craft Interior — home"
            className="relative flex items-center gap-3 shrink-0"
          >
            <div className="relative block h-11 w-11 shrink-0 md:h-12 md:w-12">
              <Image
                src={LOGO.onDark}
                alt="Urban Craft Interior logo"
                width={1600}
                height={1600}
                priority
                className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
                  light ? "opacity-100" : "opacity-0"
                }`}
              />
              <Image
                src={LOGO.onLight}
                alt=""
                aria-hidden="true"
                width={1600}
                height={1600}
                priority
                className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
                  light ? "opacity-0" : "opacity-100"
                }`}
              />
            </div>
            <span className="flex shrink-0 flex-col items-stretch whitespace-nowrap leading-none">
              <span className="text-center font-sans text-[20px] font-medium uppercase tracking-[0.08em] text-[#c2a878] md:text-[22px]">
                Urban
              </span>
              <span
                aria-hidden="true"
                className="mt-[5px] h-px w-full bg-[#c2a878]/80"
              />
              <span className="mt-[5px] w-full text-center font-sans text-[8px] font-medium uppercase tracking-[0.22em] indent-[0.22em] text-[#faf7f0] md:text-[8.5px]">
                Craft Interior
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex relative">
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
                    active
                      ? light
                        ? "text-[#c2a878]"
                        : "text-[#c2a878]"
                      : light
                      ? "text-[#faf7f0]/75 hover:text-[#faf7f0]"
                      : "text-[#161513]/70 hover:text-[#161513]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            {/* Sliding underline */}
            <span
              className="absolute bottom-[-6px] h-[2px] bg-[#c2a878] rounded-full transition-all duration-300 ease-out"
              style={{
                left: underlineStyle.left,
                width: underlineStyle.width,
                opacity: underlineStyle.opacity,
              }}
            />
            <Link
              href="/contact"
              data-cursor="explore"
              className={`rounded-full bg-[#161513] px-6 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#faf7f0] transition-all hover:bg-[#c2a878] hover:text-[#161513] ${
                light ? "ring-1 ring-[#faf7f0]/40" : "ring-1 ring-transparent"
              }`}
            >
              Get Consultation
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            data-cursor=""
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`block h-[1px] w-6 transition-all duration-300 ${
                light ? "bg-[#faf7f0]" : "bg-[#161513]"
              } ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-[1px] w-6 transition-all duration-300 ${
                light ? "bg-[#faf7f0]" : "bg-[#161513]"
              } ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </header>
    </>
  );
}
