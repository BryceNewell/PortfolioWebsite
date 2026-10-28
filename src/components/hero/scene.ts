/**
 * Procedural dusk seascape drawn to a 2D canvas.
 *
 * It mirrors the techniques behind Procedural Pirates: a ten-octave Gerstner
 * ocean (with LOD, so distant lines evaluate fewer octaves) and islands carved
 * from Fractal Brownian Motion. Everything derives from a single seed.
 */

export const GERSTNER_OCTAVES = 10;
export const FBM_OCTAVES = 6;

type Wave = {
  k: number;
  dx: number;
  dz: number;
  amp: number;
  steep: number;
  omega: number;
  phase: number;
};

type Star = { x: number; y: number; size: number; twinkle: number; speed: number };

export type Scene = {
  seed: number;
  waves: Wave[];
  stars: Star[];
  sunX: number;
  sunLift: number;
  islandOffset: number;
  islandScale: number;
  glintPhase: number;
};

export type Camera = { x: number; y: number };

export type Quality = { lines: number; step: number; dpr: number };

/* ---- deterministic randomness ------------------------------------ */

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash1(n: number, seed: number): number {
  let h = Math.imul(n | 0, 0x27d4eb2d) ^ Math.imul(seed | 0, 0x165667b1);
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function valueNoise(x: number, seed: number): number {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  return hash1(i, seed) * (1 - u) + hash1(i + 1, seed) * u;
}

function fbm(x: number, seed: number, octaves: number): number {
  let sum = 0;
  let amp = 0.5;
  let freq = 1;
  let norm = 0;
  for (let o = 0; o < octaves; o++) {
    sum += amp * valueNoise(x * freq, seed + o * 31);
    norm += amp;
    amp *= 0.5;
    freq *= 2.03;
  }
  return sum / norm;
}

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ---- scene construction ------------------------------------------ */

export function buildScene(seed: number): Scene {
  const rnd = mulberry32(seed);
  const baseDir = (rnd() - 0.5) * 0.9;

  const waves: Wave[] = Array.from({ length: GERSTNER_OCTAVES }, (_, j) => {
    const lambda = 15 * Math.pow(0.6, j);
    const k = (2 * Math.PI) / lambda;
    const dir = baseDir + (rnd() * 2 - 1) * (0.2 + 0.11 * j);
    const amp = lambda * (0.011 + rnd() * 0.004);
    return {
      k,
      dx: Math.sin(dir),
      dz: Math.cos(dir),
      amp,
      steep: Math.min(1, 0.8 / (k * amp * GERSTNER_OCTAVES)),
      omega: 0.5 * Math.sqrt(k),
      phase: rnd() * Math.PI * 2,
    };
  });

  const stars: Star[] = Array.from({ length: 140 }, () => ({
    x: rnd(),
    y: Math.pow(rnd(), 1.4),
    size: 0.4 + rnd() * 1.1,
    twinkle: rnd() * Math.PI * 2,
    speed: 0.4 + rnd() * 1.6,
  }));

  return {
    seed,
    waves,
    stars,
    sunX: 0.6 + rnd() * 0.22,
    sunLift: 0.02 + rnd() * 0.09,
    islandOffset: rnd() * 500,
    islandScale: 0.8 + rnd() * 0.6,
    glintPhase: rnd() * 10,
  };
}

/* ---- rendering --------------------------------------------------- */

const HORIZON = 0.55;

export function drawScene(
  ctx: CanvasRenderingContext2D,
  scene: Scene,
  W: number,
  H: number,
  t: number,
  cam: Camera,
  quality: Quality,
) {
  const horizon = H * HORIZON;
  const sunX = W * scene.sunX - cam.x * 0.25;
  const sunR = Math.min(W, H * 1.4) * 0.07;
  const sunY = horizon - H * scene.sunLift - sunR * 0.35;

  /* Sky */
  const sky = ctx.createLinearGradient(0, 0, 0, horizon);
  sky.addColorStop(0, "#03060a");
  sky.addColorStop(0.5, "#0a1119");
  sky.addColorStop(0.82, "#1d1612");
  sky.addColorStop(1, "#4a2610");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, horizon + 2);

  /* Stars */
  for (const s of scene.stars) {
    const y = s.y * horizon * 0.78;
    const fade = 1 - y / (horizon * 0.78);
    const a = (0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * s.speed + s.twinkle))) * fade;
    ctx.fillStyle = `rgba(220,232,245,${a.toFixed(3)})`;
    const x = (((s.x * W - cam.x * 0.05) % W) + W) % W;
    ctx.fillRect(x, y - cam.y * 0.02, s.size, s.size);
  }

  /* Sun + halo */
  const halo = ctx.createRadialGradient(sunX, sunY, sunR * 0.4, sunX, sunY, sunR * 7);
  halo.addColorStop(0, "rgba(255,138,61,0.55)");
  halo.addColorStop(0.35, "rgba(255,106,19,0.16)");
  halo.addColorStop(1, "rgba(255,106,19,0)");
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, W, horizon + 2);

  const disc = ctx.createLinearGradient(0, sunY - sunR, 0, sunY + sunR);
  disc.addColorStop(0, "#ffd9b0");
  disc.addColorStop(0.5, "#ff8a3d");
  disc.addColorStop(1, "#ff5a0a");
  ctx.fillStyle = disc;
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
  ctx.fill();

  /* Islands: three FBM ridge layers, far to near */
  const layers = [
    { freq: 0.0021, hs: 0.085, par: 0.2, fill: "#1a2431", rim: 0.1, lo: 0.52, hi: 0.78 },
    { freq: 0.0032, hs: 0.068, par: 0.45, fill: "#101822", rim: 0.16, lo: 0.55, hi: 0.8 },
    { freq: 0.0049, hs: 0.052, par: 0.8, fill: "#09101a", rim: 0.22, lo: 0.58, hi: 0.82 },
  ];
  layers.forEach((L, li) => {
    ctx.beginPath();
    ctx.moveTo(-4, horizon + 4);
    const stepX = Math.max(3, quality.step * 0.6);
    for (let px = -4; px <= W + 4; px += stepX) {
      const wx = (px + cam.x * L.par) * L.freq * scene.islandScale + scene.islandOffset + li * 97;
      const n = fbm(wx, scene.seed + li * 13, FBM_OCTAVES);
      const mask = smoothstep(L.lo, L.hi, n);
      const ridge = 0.65 + 0.35 * fbm(wx * 4.1, scene.seed + 7, 3);
      ctx.lineTo(px, horizon - mask * ridge * H * L.hs);
    }
    ctx.lineTo(W + 4, horizon + 4);
    ctx.closePath();
    ctx.fillStyle = L.fill;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(255,150,80,${L.rim})`;
    ctx.stroke();
  });

  /* Horizon haze */
  const haze = ctx.createLinearGradient(0, horizon - H * 0.06, 0, horizon + H * 0.02);
  haze.addColorStop(0, "rgba(255,106,19,0)");
  haze.addColorStop(1, "rgba(255,120,40,0.22)");
  ctx.fillStyle = haze;
  ctx.fillRect(0, horizon - H * 0.06, W, H * 0.08);

  /* Sea base */
  const sea = ctx.createLinearGradient(0, horizon, 0, H);
  sea.addColorStop(0, "#2a1c15");
  sea.addColorStop(0.08, "#0f1a22");
  sea.addColorStop(1, "#05080c");
  ctx.fillStyle = sea;
  ctx.fillRect(0, horizon, W, H - horizon);

  /* Gerstner ocean, painted far to near so crests occlude what is behind. */
  const f = W / 9;
  const span = H - horizon;
  const N = quality.lines;
  const step = quality.step;
  const samples = Math.ceil((W + step * 4) / step) + 1;
  const xs = new Float32Array(samples);
  const ys = new Float32Array(samples);
  const camShift = cam.x * 0.6;

  for (let i = 0; i < N; i++) {
    const v = Math.pow((i + 1) / N, 2.05);
    const z = 1 / Math.max(v, 0.015);
    const yBase = horizon + span * v;
    const octaves = Math.max(3, Math.round(3 + (GERSTNER_OCTAVES - 3) * Math.pow(v, 0.7)));
    const ampPx = f * v;

    for (let s = 0; s < samples; s++) {
      const px = -step * 2 + s * step;
      let X = ((px - W / 2 + camShift) * z) / f;
      let dy = 0;
      let dX = 0;
      const Z = z + t * 0.32;
      for (let j = 0; j < octaves; j++) {
        const w = scene.waves[j];
        const arg = w.k * (w.dx * X + w.dz * Z) - w.omega * t + w.phase;
        dy += w.amp * Math.sin(arg);
        dX += w.steep * w.amp * w.dx * Math.cos(arg);
      }
      X += dX;
      xs[s] = (X * f) / z + W / 2 - camShift;
      ys[s] = yBase - dy * ampPx * 1.6;
    }

    // occluding body of the wave
    ctx.beginPath();
    ctx.moveTo(xs[0], ys[0]);
    for (let s = 1; s < samples; s++) ctx.lineTo(xs[s], ys[s]);
    ctx.lineTo(xs[samples - 1], H + 4);
    ctx.lineTo(xs[0], H + 4);
    ctx.closePath();
    ctx.fillStyle = `rgb(${lerp(26, 5, v) | 0},${lerp(30, 9, v) | 0},${lerp(36, 13, v) | 0})`;
    ctx.fill();

    // crest line
    ctx.beginPath();
    ctx.moveTo(xs[0], ys[0]);
    for (let s = 1; s < samples; s++) ctx.lineTo(xs[s], ys[s]);
    ctx.lineWidth = 0.6 + 1.1 * v;
    ctx.strokeStyle = `rgba(62,224,207,${(0.12 + 0.55 * Math.pow(v, 0.8)).toFixed(3)})`;
    ctx.stroke();

    // sun glitter on the crests
    const sigma = W * (0.035 + 0.16 * v);
    ctx.beginPath();
    let open = false;
    for (let s = 0; s < samples; s++) {
      const d = (xs[s] - sunX) / sigma;
      const g = Math.exp(-d * d);
      const sparkle = 0.5 + 0.5 * Math.sin(xs[s] * 0.21 + t * 2.4 + i * 1.7 + scene.glintPhase);
      if (g * (0.4 + 0.6 * sparkle) > 0.3) {
        if (!open) {
          ctx.moveTo(xs[s], ys[s]);
          open = true;
        } else {
          ctx.lineTo(xs[s], ys[s]);
        }
      } else {
        open = false;
      }
    }
    ctx.lineWidth = 0.8 + 1.5 * v;
    ctx.strokeStyle = `rgba(255,170,100,${(0.35 + 0.55 * v).toFixed(3)})`;
    ctx.stroke();
  }
}
