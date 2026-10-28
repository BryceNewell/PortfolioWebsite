import meta from "./image-meta.json";

export type ImageKey = keyof typeof meta;

export type Img = { src: string; width: number; height: number };

export function img(key: ImageKey): Img {
  const m = meta[key];
  return { src: `/images/${key}.webp`, width: m.w, height: m.h };
}
