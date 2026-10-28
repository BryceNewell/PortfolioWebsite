"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { ArrowRight, Close, Menu } from "./icons";
import { LogoMark } from "./Logo";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  // Header gains a frosted background once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy for the in-page sections on the home page.
  useEffect(() => {
    if (!isHome) return;
    const targets = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    const top = () => {
      if (window.scrollY < 200) setActive("");
    };
    window.addEventListener("scroll", top, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", top);
    };
  }, [isHome]);

  // Lock scroll and handle Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid
            ? "border-b border-line bg-ink-950/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
          <Link
            href="/"
            className="group flex items-center gap-3 text-ember-500"
            aria-label={`${site.name} — home`}
            onClick={() => setOpen(false)}
          >
            <LogoMark className="h-6 w-auto transition-transform duration-500 group-hover:-rotate-6" />
            <span className="font-display text-[1.05rem] font-semibold tracking-tight text-fg">
              Bryce Newell
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                aria-current={active === item.id ? "location" : undefined}
                className={`relative rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors ${
                  active === item.id ? "text-fg" : "text-fg-muted hover:text-fg"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-ember-500 transition-transform duration-500 ${
                    active === item.id ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              className="btn btn-primary hidden !min-h-10 !px-5 !py-2 text-sm sm:inline-flex"
            >
              Get in touch
              <ArrowRight className="arrow size-4" />
            </Link>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-fg md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <Close /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-0 bottom-0 z-40 overflow-y-auto pt-[4.5rem] border-t border-line bg-ink-950/95 backdrop-blur-xl md:hidden"
      >
        <nav aria-label="Mobile" className="container-x flex flex-col py-8">
          {nav.map((item, i) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between border-b border-line py-5 font-display text-4xl font-semibold tracking-tight"
            >
              {item.label}
              <span className="font-mono text-xs text-ember-400">0{i + 1}</span>
            </Link>
          ))}
          <Link
            href="/privacy-policy"
            onClick={() => setOpen(false)}
            className="mt-8 font-mono text-xs tracking-widest text-fg-dim uppercase"
          >
            Privacy policy
          </Link>
        </nav>
      </div>
    </>
  );
}
