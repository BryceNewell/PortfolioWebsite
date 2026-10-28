"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Dice } from "../icons";
import {
  buildScene,
  drawScene,
  FBM_OCTAVES,
  GERSTNER_OCTAVES,
  type Camera,
  type Quality,
  type Scene,
} from "./scene";

const DEFAULT_SEED = 0x5ea5ea;

const fmtSeed = (n: number) => `0x${(n >>> 0).toString(16).toUpperCase().padStart(6, "0").slice(-6)}`;

function qualityFor(width: number, scale: number): Quality {
  const small = width < 720;
  return {
    lines: Math.round((small ? 40 : 58) * scale),
    step: (small ? 10 : 6) / Math.max(0.6, scale),
    dpr: Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75),
  };
}

/**
 * The hero backdrop: a procedural seascape that can be re-rolled with a new seed.
 * Respects reduced-motion (renders a still frame) and pauses when off screen.
 */
export function HeroScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene>(buildScene(DEFAULT_SEED));
  const redrawRef = useRef<() => void>(() => {});
  const [seed, setSeed] = useState(DEFAULT_SEED);
  const [ready, setReady] = useState(false);
  const [flash, setFlash] = useState(0);

  const reroll = useCallback(() => {
    const next = (Math.random() * 0xffffff) >>> 0;
    sceneRef.current = buildScene(next);
    setSeed(next);
    setFlash((n) => n + 1);
    redrawRef.current();
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0;
    let H = 0;
    let quality = qualityFor(wrap.clientWidth, 1);
    let qScale = 1;
    let raf = 0;
    let visible = true;
    let running = false;
    let last = 0;
    let time = reduced ? 9 : 0;
    let slow = 0;
    let frames = 0;
    const cam: Camera = { x: 0, y: 0 };
    const target: Camera = { x: 0, y: 0 };

    const resize = () => {
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      quality = qualityFor(W, qScale);
      canvas.width = Math.round(W * quality.dpr);
      canvas.height = Math.round(H * quality.dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(quality.dpr, 0, 0, quality.dpr, 0, 0);
    };

    const render = () => drawScene(ctx, sceneRef.current, W, H, time, cam, quality);

    const frame = (now: number) => {
      raf = 0;
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      time += dt;
      cam.x += (target.x - cam.x) * Math.min(1, dt * 3);
      cam.y += (target.y - cam.y) * Math.min(1, dt * 3);
      const t0 = performance.now();
      render();
      // Adaptive quality: if frames keep taking too long, shed wave lines.
      if (performance.now() - t0 > 14) slow++;
      if (++frames % 90 === 0) {
        if (slow > 45 && qScale > 0.55) {
          qScale -= 0.15;
          quality = qualityFor(W, qScale);
        }
        slow = 0;
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (reduced || running || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    redrawRef.current = () => {
      if (W && (!running || reduced)) render();
    };

    resize();
    render();
    setReady(true);
    start();

    const ro = new ResizeObserver(() => {
      resize();
      render();
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(wrap);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const onPointer = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * W * 0.12;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * H * 0.1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <>
      <div
        ref={wrapRef}
        aria-hidden="true"
        className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
      >
        <canvas ref={canvasRef} className="block" />
        {/* brief ember flash when a new seed is rolled */}
        <div
          key={flash}
          className="pointer-events-none absolute inset-0 bg-ember-500/0"
          style={flash ? { animation: "seedflash 0.9s ease-out" } : undefined}
        />
      </div>

      <button
        type="button"
        onClick={reroll}
        className="absolute top-[5.5rem] right-5 z-20 inline-flex items-center gap-2 rounded-full border border-line-strong bg-ink-950/60 py-2 pr-4 pl-3 font-mono text-[0.7rem] text-fg-muted backdrop-blur-md transition active:scale-95 sm:hidden"
        aria-label="Re-roll the procedural world"
      >
        <Dice className="size-4 text-ember-400" />
        <span className="tabular-nums">{fmtSeed(seed)}</span>
      </button>

      <div className="absolute right-[clamp(1.25rem,4vw,3rem)] bottom-8 z-20 hidden w-[15.5rem] rounded-2xl border border-line-strong bg-ink-950/60 p-4 font-mono text-[0.7rem] leading-relaxed text-fg-muted backdrop-blur-md sm:block">
        <p className="mb-2 flex items-center justify-between text-[0.65rem] tracking-[0.18em] text-fg-dim uppercase">
          <span>Scene</span>
          <span className="inline-flex items-center gap-1.5 text-tide-400">
            <span className="size-1.5 rounded-full bg-tide-400 shadow-[0_0_8px_var(--color-tide-400)]" />
            live
          </span>
        </p>
        <dl className="space-y-0.5">
          <div className="flex justify-between gap-3">
            <dt>seed</dt>
            <dd className="text-ember-300 tabular-nums" aria-live="polite">
              {fmtSeed(seed)}
            </dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>ocean</dt>
            <dd className="text-fg">gerstner × {GERSTNER_OCTAVES}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>islands</dt>
            <dd className="text-fg">fbm × {FBM_OCTAVES}</dd>
          </div>
        </dl>
        <button
          type="button"
          onClick={reroll}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line-strong bg-white/[0.03] px-3 py-2 font-sans text-[0.8rem] font-semibold text-fg transition hover:border-ember-400 hover:text-ember-300 active:scale-[0.98]"
        >
          <Dice className="size-4" />
          Re-roll the world
        </button>
      </div>
    </>
  );
}
