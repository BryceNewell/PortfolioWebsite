import { featuredProjects, otherProjects } from "@/data/projects";
import { FeatureCard, ProjectCard } from "../ProjectCards";
import { SectionHeading } from "../SectionHeading";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="section">
      <div className="container-x">
        <SectionHeading
          index="01"
          eyebrow="Selected work"
          id="work-title"
          title="Things I've built, and how they work."
        >
          Procedural worlds, XR hand tracking, defence simulation and game jams. Every project is a short case
          study.
        </SectionHeading>

        <div className="mt-14 space-y-6 sm:mt-20 sm:space-y-8">
          {featuredProjects.map((p, i) => (
            <FeatureCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        <div className="mt-16 mb-8 flex items-center gap-4 sm:mt-24">
          <h3 className="font-mono text-xs font-medium tracking-[0.16em] text-fg-muted uppercase">
            More projects
          </h3>
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
          {otherProjects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} delay={(i % 2) * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
