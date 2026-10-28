import { practices, skillGroups } from "@/data/skills";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { Spotlight } from "../Spotlight";

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="section border-t border-line bg-ink-900/40"
    >
      <div className="container-x">
        <SectionHeading
          index="04"
          eyebrow="Skills & tech stack"
          id="skills-title"
          title="The toolkit, from metal to engine."
        >
          Languages, engines and techniques I reach for most, and what I use each one for.
        </SectionHeading>

        <div className="mt-14 grid gap-5 sm:mt-20 md:grid-cols-2">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={(i % 2) * 90} className="h-full">
              <Spotlight className="h-full">
                <section aria-label={g.title} className="flex h-full flex-col p-7 sm:p-9">
                  <p className="font-mono text-xs text-ember-400">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">{g.title}</h3>
                  <p className="mt-2 text-fg-muted">{g.blurb}</p>
                  <ul className="mt-7 divide-y divide-line border-t border-line">
                    {g.items.map((it) => (
                      <li key={it.name} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                        <span className="font-display text-lg font-semibold text-fg">{it.name}</span>
                        <span className="text-[0.95rem] text-fg-muted">{it.note}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </Spotlight>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 sm:mt-16">
          <p className="font-mono text-xs tracking-[0.16em] text-fg-muted uppercase">Ways of working</p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {practices.map((pr) => (
              <li
                key={pr}
                className="rounded-full border border-line-strong bg-white/[0.02] px-4 py-2 font-display text-[0.95rem] font-medium text-fg"
              >
                {pr}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
