import Link from "next/link";
import { nav, site } from "@/lib/site";
import { ArrowUpRight } from "./icons";
import { LogoMark } from "./Logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line bg-ink-900/60">
      <div className="container-x grid grid-cols-1 gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 text-ember-500">
            <LogoMark className="h-7 w-auto" />
            <span className="font-display text-xl font-semibold tracking-tight text-fg">{site.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-[0.95rem] text-fg-muted">
            {site.role}. Real-time graphics, procedural worlds, XR and gameplay systems.
          </p>
        </div>

        <nav aria-label="Footer" className="text-[0.95rem]">
          <p className="font-mono text-xs tracking-[0.16em] text-fg-dim uppercase">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {nav.map((n) => (
              <li key={n.id}>
                <Link href={n.href} className="text-fg-muted transition-colors hover:text-ember-300">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy-policy" className="text-fg-muted transition-colors hover:text-ember-300">
                Privacy policy
              </Link>
            </li>
          </ul>
        </nav>

        <div className="text-[0.95rem]">
          <p className="font-mono text-xs tracking-[0.16em] text-fg-dim uppercase">Elsewhere</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-fg-muted transition-colors hover:text-ember-300"
              >
                LinkedIn <ArrowUpRight className="size-3.5" />
              </a>
            </li>
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-fg-muted transition-colors hover:text-ember-300"
              >
                GitHub <ArrowUpRight className="size-3.5" />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-fg-muted transition-colors hover:text-ember-300"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 font-mono text-xs text-fg-dim sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Bryce Newell. All rights reserved.</p>
          <p>Next.js 16 · Tailwind CSS 4 · TypeScript</p>
        </div>
      </div>
    </footer>
  );
}
