import { Reveal } from "../Reveal";

const stats = [
  { value: "6+", label: "years shipping software professionally, across defence, XR and embedded systems" },
  { value: "64", label: "players in Kachiku 64, a local co-op party game built by a team of ~30" },
  { value: "10", label: "octaves of Gerstner waves driving the ocean in Procedural Pirates" },
  { value: "2nd", label: "place at the UK's largest Global Game Jam site, 2019, in just 48 hours" },
];

export function Stats() {
  return (
    <section aria-label="By the numbers" className="border-b border-line">
      <dl className="container-x grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.value}
            delay={i * 90}
            className={`flex flex-col gap-3 border-line px-1 py-9 sm:px-6 sm:py-12 ${
              i % 2 === 1 ? "border-l pl-5 sm:pl-6" : ""
            } ${i > 0 ? "lg:border-l lg:pl-8" : ""} ${i >= 2 ? "border-t lg:border-t-0" : ""}`}
          >
            <dt className="font-display text-[clamp(3.25rem,7vw,5.5rem)] leading-none font-bold tracking-[-0.028em] text-fg">
              <span className="bg-gradient-to-b from-fg to-ember-400 bg-clip-text text-transparent">
                {s.value}
              </span>
            </dt>
            <dd className="max-w-[16rem] text-sm leading-relaxed text-fg-muted">{s.label}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
