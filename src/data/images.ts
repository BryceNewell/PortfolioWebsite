import meta from "./image-meta.json";
import { asset } from "@/lib/site";

export type ImageKey = keyof typeof meta;

export type Img = { src: string; width: number; height: number };

export function img(key: ImageKey): Img {
  const m = meta[key];
  return { src: asset(`/images/${key}.webp`), width: m.w, height: m.h };
}
