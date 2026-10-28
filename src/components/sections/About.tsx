import type { ReactNode } from "react";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

type Tok = [cls: string, text: string];

const k = "text-ember-300"; // keyword
const s = "text-tide-300"; // string
const p = "text-fg"; // property
const c = "text-fg-dim"; // comment
const x = "text-fg-muted"; // punctuation

const code: Tok[][] = [
  [[c, "// bryce.ts"]],
  [
    [k, "export const "],
    [p, "bryce"],
    [x, " = {"],
  ],
  [
    [p, "  role"],
    [x, ": "],
    [s, '"Software Engineer & Game Developer"'],
    [x, ","],
  ],
  [
    [p, "  base"],
    [x, ": "],
    [s, '"Bristol, UK"'],
    [x, ","],
  ],
  [
    [p, "  languages"],
    [x, ": ["],
    [s, '"C++"'],
    [x, ", "],
    [s, '"C#"'],
    [x, ", "],
    [s, '"Python"'],
    [x, ", "],
    [s, '"JavaScript"'],
    [x, "],"],
  ],
  [
    [p, "  engines"],
    [x, ": ["],
    [s, '"Unreal Engine 5"'],
    [x, ", "],
    [s, '"Unity"'],
    [x, "],"],
  ],
  [
    [p, "  graphics"],
    [x, ": ["],
    [s, '"DirectX 11"'],
    [x, ", "],
    [s, '"HLSL"'],
    [x, ", "],
    [s, '"PCG"'],
    [x, "],"],
  ],
  [
    [p, "  xr"],
    [x, ": ["],
    [s, '"Hand tracking"'],
    [x, ", "],
    [s, '"MRTK 3"'],
    [x, ", "],
    [s, '"XR Hands"'],
    [x, "],"],
  ],
  [
    [p, "  values"],
    [x, ": ["],
    [s, '"clean code"'],
    [x, ", "],
    [s, '"efficient algorithms"'],
    [x, ", "],
    [s, '"teamwork"'],
    [x, "],"],
  ],
  [
    [p, "  now"],
    [x, ": "],
    [s, '"Building Procedural Pirates in UE 5.4"'],
    [x, ","],
  ],
  [
    [x, "} "],
    [k, "as const"],
    [x, ";"],
  ],
];

const principles: { title: string; body: ReactNode }[] = [
  { title: "Clean code", body: "Readable, maintainable systems that a whole team can build on." },
  {
    title: "Efficient algorithms",
    body: "Frame budgets, memory and data structures treated as design constraints.",
  },
  {
    title: "Collaborative problem-solving",
    body: "Close work with designers, artists, hardware teams and customers.",
  },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SectionHeading
              index="03"
              eyebrow="About"
              id="about-title"
              title="Immersive experiences, robust software."
            />
            <Reveal className="prose-site mt-10 max-w-2xl" delay={80}>
              <p>
                I&apos;m Bryce Newell, a software engineer and game developer who loves building immersive
                digital experiences and dependable software, from high-performance real-time graphics to hand
                tracking in virtual reality. Relentless curiosity and a desire to build impactful applications
                have driven my journey in tech.
              </p>
              <p>
                With a strong foundation in <strong>C++, C#, Python and JavaScript</strong>, I thrive in
                environments that challenge me to learn and adapt. I specialise in real-time graphics, physics
                simulation and crafting intuitive user interfaces, with experience spanning game development
                in Unity and Unreal Engine, full-stack web development and backend system design.
              </p>
              <p>
                Whether I&apos;m optimising a rendering pipeline, designing a complex data structure or
                bringing a game concept to life, I&apos;m committed to delivering high-quality results.
              </p>
            </Reveal>
          </div>

          <Reveal delay={150} className="lg:pt-24">
            <figure
              aria-label="Profile summary written as code"
              className="overflow-hidden rounded-2xl border border-line-strong bg-ink-900 shadow-[0_40px_120px_-40px_rgb(255_106_19/0.25)]"
            >
              <div className="flex items-center gap-2 border-b border-line bg-ink-850 px-4 py-3">
                <span className="size-2.5 rounded-full bg-ember-500/80" />
                <span className="size-2.5 rounded-full bg-ink-600" />
                <span className="size-2.5 rounded-full bg-ink-600" />
                <span className="ml-3 font-mono text-xs text-fg-dim">bryce.ts</span>
              </div>
              <pre
                tabIndex={0}
                className="overflow-x-auto p-5 font-mono text-[0.78rem] leading-[1.85] sm:p-6 sm:text-[0.82rem]"
              >
                <code>
                  {code.map((line, i) => (
                    <span key={i} className="block whitespace-pre">
                      <span
                        aria-hidden="true"
                        className="mr-5 inline-block w-4 text-right text-fg-dim select-none"
                      >
                        {i + 1}
                      </span>
                      {line.map(([cls, text], j) => (
                        <span key={j} className={cls}>
                          {text}
                        </span>
                      ))}
                    </span>
                  ))}
                </code>
              </pre>
            </figure>
          </Reveal>
        </div>

        <ul className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-28 md:grid-cols-3">
          {principles.map((pr, i) => (
            <Reveal as="li" key={pr.title} delay={i * 90} className="bg-ink-950 p-8 sm:p-10">
              <p className="font-mono text-xs text-ember-400">0{i + 1}</p>
              <h3 className="mt-5 text-2xl font-semibold">{pr.title}</h3>
              <p className="mt-3 text-fg-muted">{pr.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
