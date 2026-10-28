import Image from "next/image";
import Link from "next/link";
import { img } from "@/data/images";
import type { Project } from "@/data/projects";
import { ArrowUpRight } from "./icons";
import { Reveal } from "./Reveal";
import { Spotlight } from "./Spotlight";

/** Large, editorial case-study card. Alternates image side on desktop. */
export function FeatureCard({ project, index }: { project: Project; index: number }) {
  const cover = img(project.cover);
  const flip = index % 2 === 1;
  return (
    <Reveal>
      <Spotlight className="group">
        <article className="grid grid-cols-1 items-stretch lg:grid-cols-12">
          <div
            className={`relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[28rem] ${
              flip ? "lg:order-2" : ""
            }`}
          >
            <Image
              src={cover.src}
              width={cover.width}
              height={cover.height}
              alt={project.coverAlt}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
            <div
              aria-hidden="true"
              className={`absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent ${
                flip ? "lg:bg-gradient-to-l" : "lg:bg-gradient-to-r"
              } lg:from-transparent lg:to-ink-900/40`}
            />
          </div>

          <div className="relative flex flex-col justify-between gap-10 p-7 sm:p-10 lg:col-span-5">
            <div>
              <p className="flex items-center gap-3 font-mono text-xs tracking-[0.14em] text-ember-400 uppercase">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
                <span>{project.label}</span>
              </p>
              <h3 className="mt-5 text-[clamp(1.9rem,3.2vw,2.9rem)] font-semibold">
                <Link
                  href={`/projects/${project.slug}`}
                  className="after:absolute after:inset-0 after:z-10 after:content-['']"
                >
                  {project.title}
                </Link>
              </h3>
              {project.period ? (
                <p className="mt-2 font-mono text-xs tracking-wide text-fg-dim">{project.period}</p>
              ) : null}
              <p className="mt-5 text-fg-muted">{project.summary}</p>
            </div>

            <div>
              <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                {project.tech.slice(0, 5).map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-7 inline-flex items-center gap-2 font-display font-semibold text-fg transition-colors group-hover:text-ember-300">
                Read the case study
                <ArrowUpRight className="arrow size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>
            </div>
          </div>
        </article>
      </Spotlight>
    </Reveal>
  );
}

/** Compact card for the secondary projects. */
export function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  const cover = img(project.cover);
  return (
    <Reveal delay={delay} className="h-full">
      <Spotlight className="group h-full">
        <article className="flex h-full flex-col">
          <div className="relative aspect-[16/9] overflow-hidden bg-ink-800">
            <Image
              src={cover.src}
              width={cover.width}
              height={cover.height}
              alt={project.coverAlt}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent opacity-80"
            />
            <span className="absolute top-4 left-4 rounded-full border border-line-strong bg-ink-950/70 px-3 py-1 font-mono text-[0.68rem] tracking-[0.12em] text-ember-300 uppercase backdrop-blur-md">
              {project.label}
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-semibold">
                <Link
                  href={`/projects/${project.slug}`}
                  className="after:absolute after:inset-0 after:z-10 after:content-['']"
                >
                  {project.title}
                </Link>
              </h3>
              <ArrowUpRight className="mt-1 size-5 shrink-0 text-fg-dim transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ember-300" />
            </div>
            <p className="text-[0.97rem] text-fg-muted">{project.summary}</p>
            <ul className="mt-auto flex flex-wrap gap-2 pt-2" aria-label="Technologies">
              {project.tech.slice(0, 4).map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </Spotlight>
    </Reveal>
  );
}
