import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { Spotlight } from "@/components/Spotlight";
import { VideoEmbed } from "@/components/VideoEmbed";
import { ZoomImage } from "@/components/ZoomImage";
import { img, type ImageKey } from "@/data/images";
import { getProject, projects, type Highlight, type Project } from "@/data/projects";
import { absoluteUrl, SITE_URL } from "@/lib/site";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const url = `${SITE_URL}/projects/${project.slug}`;
  const cover = img(project.cover);
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${project.title} · Bryce Newell`,
      description: project.summary,
      url,
      images: [
        {
          url: absoluteUrl(`/images/${project.cover}.webp`),
          width: cover.width,
          height: cover.height,
          alt: project.coverAlt,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const cover = img(project.cover);

  return (
    <article>
      {/* Header */}
      <header className="relative isolate overflow-hidden pt-36 pb-10 sm:pt-44 sm:pb-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-40 -z-10 size-[44rem] rounded-full bg-ember-500/15 blur-[140px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,#000,transparent_80%)]"
        />
        <div className="container-x">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] text-fg-muted uppercase transition-colors hover:text-ember-300"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            All work
          </Link>

          <p className="eyebrow mt-10">
            <span>{project.label}</span>
            {project.period ? <span className="text-fg-dim">· {project.period}</span> : null}
          </p>
          <h1 className="mt-5 max-w-5xl text-[clamp(2.75rem,8vw,7rem)] leading-[0.92] font-bold tracking-[-0.028em]">
            {project.title}
          </h1>
          <p className="lede mt-8 max-w-3xl">{project.tagline}</p>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies">
            {project.tech.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Cover */}
      <div className="container-x">
        <Reveal>
          <figure>
            <div className="frame aspect-[16/9] sm:aspect-[2/1]">
              <ZoomImage
                image={cover}
                alt={project.coverAlt}
                sizes="(min-width: 1312px) 1232px, 100vw"
                priority
                className="size-full"
              />
            </div>
            {project.note ? (
              <figcaption className="mt-3 font-mono text-xs text-fg-dim">{project.note}</figcaption>
            ) : null}
          </figure>
        </Reveal>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {project.facts.map((f) => (
            <div key={f.label} className="bg-ink-950 p-5 sm:p-7">
              <dt className="font-mono text-[0.68rem] tracking-[0.16em] text-fg-dim uppercase">{f.label}</dt>
              <dd className="mt-2 font-display text-lg leading-snug font-semibold text-fg sm:text-xl">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Highlights */}
      <section aria-labelledby="highlights-title" className="section !pb-0">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">
              <span aria-hidden="true">01</span>
              <span id="highlights-title">Highlights</span>
            </p>
          </Reveal>
          <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-28">
            {project.highlights.map((h, i) => (
              <HighlightRow key={h.title} highlight={h} index={i} cover={project.cover} />
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      {project.video ? (
        <section aria-labelledby="video-title" className="section !pb-0">
          <div className="container-x">
            <Reveal>
              <p className="eyebrow">
                <span aria-hidden="true">02</span>
                <span id="video-title">View in action</span>
              </p>
              <div className="mx-auto mt-10 max-w-5xl">
                <VideoEmbed id={project.video.id} title={project.video.title} />
                <p className="mt-3 text-center font-mono text-xs text-fg-dim">{project.video.caption}</p>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* Story */}
      <Story project={project} sectionNumber={project.video ? "03" : "02"} />

      {/* Prev / next */}
      <nav aria-label="More projects" className="border-t border-line">
        <div className="container-x grid gap-px sm:grid-cols-2">
          <PagerLink project={prev} direction="prev" />
          <PagerLink project={next} direction="next" />
        </div>
      </nav>
    </article>
  );
}

function HighlightRow({ highlight, index, cover }: { highlight: Highlight; index: number; cover: ImageKey }) {
  const flip = index % 2 === 1;
  // The cover is already shown at the top of the page, so a highlight that reuses it
  // (or has no image) becomes an editorial statement row instead of repeating the picture.
  const image = highlight.image && highlight.image !== cover ? img(highlight.image) : null;
  const num = String(index + 1).padStart(2, "0");

  if (!image) {
    return (
      <Reveal>
        <div className="grid grid-cols-1 items-center gap-6 border-y border-line py-12 lg:grid-cols-12 lg:gap-16 lg:py-16">
          <p
            aria-hidden="true"
            className="font-display text-[clamp(6rem,13vw,11rem)] leading-[0.8] font-bold tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_rgb(255_138_61/0.6)] lg:col-span-4"
          >
            {num}
          </p>
          <div className="lg:col-span-8">
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-semibold">{highlight.title}</h2>
            <p className="mt-5 max-w-2xl text-xl leading-relaxed text-fg-muted">{highlight.body}</p>
          </div>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
        <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
          <div className="frame">
            <ZoomImage
              image={image}
              alt={highlight.alt ?? highlight.title}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="bg-ink-800"
            />
          </div>
        </div>
        <div className="lg:col-span-5">
          <p className="font-mono text-xs tracking-[0.14em] text-ember-400">{num}</p>
          <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.6rem)] font-semibold">{highlight.title}</h2>
          <p className="mt-5 text-lg text-fg-muted">{highlight.body}</p>
        </div>
      </div>
    </Reveal>
  );
}

function Story({ project, sectionNumber }: { project: Project; sectionNumber: string }) {
  return (
    <section aria-labelledby="story-title" className="section">
      <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">
              <span aria-hidden="true">{sectionNumber}</span>
              <span>The story</span>
            </p>
            <h2 id="story-title" className="mt-5 text-[clamp(2rem,4vw,3.25rem)] font-semibold">
              {project.story.heading}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-8">
          <div className="prose-site max-w-3xl text-[1.12rem]">
            {project.story.paragraphs.map((para, i) => (
              <p key={i} className={i === 0 ? "!text-fg" : undefined}>
                {para}
              </p>
            ))}
          </div>

          {project.links?.length ? (
            <ul className="mt-12 max-w-3xl divide-y divide-line border-y border-line">
              {project.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-5 font-display text-lg font-semibold text-fg transition-colors hover:text-ember-300"
                  >
                    <span>
                      {l.label}
                      <span className="mt-0.5 block font-mono text-xs font-normal text-fg-dim">
                        {l.href.replace("https://", "")}
                      </span>
                    </span>
                    <ArrowUpRight className="size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}

function PagerLink({ project, direction }: { project: Project; direction: "prev" | "next" }) {
  const cover = img(project.cover);
  const isNext = direction === "next";
  return (
    <Spotlight className="group !rounded-none !border-0 !bg-transparent">
      <Link
        href={`/projects/${project.slug}`}
        className={`relative flex items-center gap-6 py-10 sm:py-14 ${isNext ? "sm:flex-row-reverse sm:text-right" : ""}`}
      >
        <div className="frame hidden size-24 shrink-0 sm:block">
          <Image
            src={cover.src}
            width={cover.width}
            height={cover.height}
            alt=""
            className="size-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className={`flex items-center gap-2 font-mono text-xs tracking-[0.14em] text-fg-dim uppercase ${
              isNext ? "sm:justify-end" : ""
            }`}
          >
            {isNext ? null : <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />}
            {isNext ? "Next project" : "Previous project"}
            {isNext ? <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /> : null}
          </p>
          <p className="mt-2 font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-ember-300 sm:text-3xl">
            {project.title}
          </p>
        </div>
      </Link>
    </Spotlight>
  );
}
