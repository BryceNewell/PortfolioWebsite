import type { ComponentType, SVGProps } from "react";
import { site } from "@/lib/site";
import { CopyEmail } from "../CopyEmail";
import { ArrowUpRight, Github, Linkedin, Mail, Phone } from "../icons";
import { Reveal } from "../Reveal";

type Row = {
  label: string;
  value: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  external?: boolean;
  copy?: boolean;
};

const rows: Row[] = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: Mail, copy: true },
  { label: "Phone", value: site.phone, href: site.phoneHref, icon: Phone },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/b-newell",
    href: site.linkedin,
    icon: Linkedin,
    external: true,
  },
  { label: "GitHub", value: "github.com/BryceNewell", href: site.github, icon: Github, external: true },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-line-strong bg-ink-900 px-6 py-14 sm:px-12 sm:py-20 lg:px-20 lg:py-24">
            {/* ember horizon glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-32 -bottom-48 size-[40rem] rounded-full bg-ember-500/25 blur-[120px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_85%_100%,#000,transparent_65%)]"
            />

            <div className="relative grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="eyebrow">
                  <span aria-hidden="true">05</span>
                  <span>Contact</span>
                </p>
                <h2
                  id="contact-title"
                  className="mt-6 text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] font-bold tracking-[-0.026em]"
                >
                  Let&apos;s build something worth playing.
                </h2>
                <p className="lede mt-7 max-w-lg">
                  Whether it&apos;s a game, a graphics problem or XR hand tracking, I&apos;d love to hear
                  about it.
                </p>
                <a href={`mailto:${site.email}`} className="btn btn-primary mt-10">
                  <Mail className="size-[1.1rem]" />
                  Email me
                </a>
              </div>

              <ul className="divide-y divide-line rounded-2xl border border-line bg-ink-950/60 backdrop-blur-sm">
                {rows.map((r) => (
                  <li key={r.label} className="flex items-center gap-4 p-4 sm:p-5">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-ember-400">
                      <r.icon className="size-5" />
                    </span>
                    <a
                      href={r.href}
                      {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group min-w-0 flex-1"
                    >
                      <span className="block font-mono text-[0.68rem] tracking-[0.16em] text-fg-dim uppercase">
                        {r.label}
                      </span>
                      <span className="flex items-center gap-1.5 font-display text-base font-medium text-fg transition-colors group-hover:text-ember-300 sm:text-lg">
                        <span className="[overflow-wrap:anywhere]">{r.value}</span>
                        {r.external ? (
                          <ArrowUpRight className="size-4 shrink-0 opacity-60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        ) : null}
                      </span>
                    </a>
                    {r.copy ? <CopyEmail email={r.value} /> : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
