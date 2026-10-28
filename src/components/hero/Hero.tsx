import Link from "next/link";
import type { CSSProperties } from "react";
import { site } from "@/lib/site";
import { ArrowRight } from "../icons";
import { HeroScene } from "./HeroScene";

const rise = (delay: number): CSSProperties => ({ animationDelay: `${delay}ms` });

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
      <HeroScene />

      {/* Legibility scrims: left for the headline, bottom to melt into the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgb(5_8_12/0.88)_0%,rgb(5_8_12/0.55)_38%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink-950/80 to-transparent"
      />

      <div className="container-x relative z-10 pt-40 pb-20 sm:pb-24">
        <p className="animate-rise eyebrow mb-6 sm:mb-8" style={rise(150)}>
          Software Engineer · Game Developer
        </p>

        <h1
          className="animate-rise font-display text-[clamp(5rem,15vw,12.5rem)] leading-[0.84] font-bold tracking-[-0.03em]"
          style={rise(280)}
        >
          Bryce
          <br />
          <span className="bg-gradient-to-r from-fg via-fg to-ember-300 bg-clip-text text-transparent">
            Newell
          </span>
        </h1>

        <p
          className="animate-rise mt-8 max-w-xl text-[clamp(1.05rem,1.7vw,1.3rem)] leading-relaxed text-fg-muted sm:mt-10"
          style={rise(480)}
        >
          I build real-time worlds, procedural systems and XR tools, from a ten-octave Gerstner ocean in
          Unreal Engine to hand tracking in virtual reality.
        </p>

        <div className="animate-rise mt-9 flex flex-wrap items-center gap-3 sm:mt-11" style={rise(620)}>
          <Link href="/#work" className="btn btn-primary">
            View selected work
            <ArrowRight className="arrow size-[1.1rem]" />
          </Link>
          <Link href="/#contact" className="btn btn-ghost">
            Get in touch
          </Link>
        </div>
      </div>

      <p className="sr-only">
        {site.name}, {site.role}, based in {site.location}.
      </p>
    </section>
  );
}
