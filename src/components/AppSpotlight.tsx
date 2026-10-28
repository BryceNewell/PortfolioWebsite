import Image from "next/image";
import Link from "next/link";
import { img } from "@/data/images";
import type { Project } from "@/data/projects";
import { ArrowRight } from "./icons";
import { GooglePlayButton } from "./GooglePlayButton";
import { PhoneFrame } from "./PhoneFrame";
import { Reveal } from "./Reveal";

/** Home-page spotlight for the latest project, a published Android app. */
export function AppSpotlight({ project }: { project: Project }) {
  const app = project.app;
  if (!app) return null;
  const icon = img(app.icon);

  return (
    <Reveal>
      <article
        aria-labelledby="spotlight-title"
        className="relative isolate overflow-hidden rounded-[2rem] border border-line-strong bg-ink-900"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -bottom-56 -z-10 size-[44rem] rounded-full bg-ember-500/25 blur-[130px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -left-32 -z-10 size-[30rem] rounded-full bg-tide-400/10 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_80%_70%,#000,transparent_70%)]"
        />

        <div className="grid grid-cols-1 items-center gap-12 p-7 sm:p-12 lg:grid-cols-12 lg:gap-8 lg:p-16">
          <div className="lg:col-span-6">
            <p className="eyebrow">Latest project · Android app</p>

            <div className="mt-7 flex items-center gap-5">
              <Image
                src={icon.src}
                width={icon.width}
                height={icon.height}
                alt=""
                className="size-16 rounded-2xl border border-line-strong sm:size-20"
              />
              <h3
                id="spotlight-title"
                className="text-[clamp(2.5rem,6vw,4.75rem)] leading-none font-bold tracking-[-0.028em]"
              >
                {project.title}
              </h3>
            </div>

            <p className="lede mt-7 max-w-xl">{project.summary}</p>

            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Technologies">
              {project.tech.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>

            <dl className="mt-9 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-7">
              {app.stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-fg-muted">{s.label}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <GooglePlayButton href={app.playStoreUrl} />
              <Link href={`/projects/${project.slug}`} className="btn btn-ghost">
                Read the case study
                <ArrowRight className="arrow size-[1.05rem]" />
              </Link>
            </div>
            <p className="mt-5 font-mono text-xs text-fg-dim">
              A solo project, built in my own time. Not formal employment.
            </p>
          </div>

          <div className="lg:col-span-6" aria-hidden="true">
            <div className="relative mx-auto flex max-w-[40rem] items-end justify-center">
              <PhoneFrame
                image="poitracker-map"
                sizes="(min-width: 1024px) 14rem, 28vw"
                className="relative -mr-[7%] mb-[-4%] w-[31%] -rotate-[4deg]"
              />
              <PhoneFrame
                image="poitracker-detail"
                sizes="(min-width: 1024px) 17rem, 36vw"
                className="relative z-10 w-[38%]"
              />
              <PhoneFrame
                image="poitracker-list-dark"
                sizes="(min-width: 1024px) 14rem, 28vw"
                className="relative -ml-[7%] mb-[-4%] w-[31%] rotate-[4deg]"
              />
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
