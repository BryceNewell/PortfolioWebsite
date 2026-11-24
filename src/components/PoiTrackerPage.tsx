import Link from "next/link";
import type { ReactNode } from "react";

const links = [
  { href: "/faq", label: "FAQ" },
  { href: "/support", label: "Support" },
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of use" },
];

export function PoiTrackerLinks({ current }: { current?: string }) {
  return (
    <nav aria-label="POITracker resources" className="flex flex-wrap gap-3">
      {links.filter(({ href }) => href !== current).map(({ href, label }) => (
        <Link key={href} href={href} className="btn btn-ghost">
          {label}
        </Link>
      ))}
    </nav>
  );
}

export function PoiTrackerPage({
  title,
  path,
  children,
}: {
  title: string;
  path: string;
  children: ReactNode;
}) {
  return (
    <article className="container-x pt-36 pb-24 sm:pt-44 sm:pb-32">
      <header className="max-w-3xl">
        <Link href="/projects/poitracker" className="eyebrow hover:text-ember-300">
          POITracker
        </Link>
        <h1 className="mt-5 text-[clamp(2.75rem,8vw,6rem)] leading-[0.95] font-bold tracking-[-0.028em]">
          {title}
        </h1>
      </header>
      <div className="prose-site mt-10 max-w-3xl">{children}</div>
      <div className="mt-10">
        <PoiTrackerLinks current={path} />
      </div>
    </article>
  );
}
