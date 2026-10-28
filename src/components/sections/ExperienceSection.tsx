import Link from "next/link";
import { experience } from "@/data/experience";
import { ArrowRight } from "../icons";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="section border-y border-line bg-ink-900/40"
    >
      <div className="container-x">
        <SectionHeading
          index="02"
          eyebrow="Experience"
          id="experience-title"
          title="A career built on real-time."
        >
          From defence training simulators to open-source hand tracking, and the games I build for the love of
          it.
        </SectionHeading>

        <ol className="relative mt-16 sm:mt-24">
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[0.45rem] w-px bg-gradient-to-b from-ember-500 via-line-strong to-transparent md:left-[calc(12rem+0.45rem)]"
          />
          {experience.map((job, i) => (
            <li key={job.slug} className="pb-14 last:pb-0">
              <Reveal
                delay={i * 60}
                className="relative grid gap-x-10 gap-y-3 pl-9 md:grid-cols-[12rem_1fr] md:pl-0"
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-1.5 left-0 size-[0.95rem] rounded-full border-2 md:left-[12rem] ${
                    job.current
                      ? "border-ember-500 bg-ember-500 shadow-[0_0_0_6px_rgb(255_106_19/0.18)]"
                      : "border-ember-500 bg-ink-950"
                  }`}
                />
                <p className="font-mono text-xs tracking-[0.12em] text-fg-muted uppercase md:pt-1.5 md:text-right">
                  {job.period}
                </p>

                <div className="md:pl-12">
                  <h3 className="text-2xl font-semibold sm:text-3xl">{job.title}</h3>
                  <p className="mt-1 font-display text-lg text-ember-300">{job.org}</p>
                  <p className="mt-4 max-w-2xl text-fg-muted">{job.summary}</p>
                  <ul className="mt-5 max-w-2xl space-y-2 text-[0.97rem] text-fg-muted">
                    {job.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-[0.65em] size-1.5 shrink-0 rotate-45 bg-ember-500"
                        />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/projects/${job.slug}`}
                    className="group mt-6 inline-flex items-center gap-2 font-display font-semibold text-fg transition-colors hover:text-ember-300"
                  >
                    Read more
                    <ArrowRight className="arrow size-4" />
                  </Link>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
