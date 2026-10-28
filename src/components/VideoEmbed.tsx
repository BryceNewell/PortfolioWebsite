"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "./icons";

/** Click-to-load YouTube embed, so no third-party requests happen until the visitor asks for it. */
export function VideoEmbed({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="frame aspect-video">
      {playing ? (
        <iframe
          className="size-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group relative block size-full"
          aria-label={`Play video: ${title}`}
        >
          <Image
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            fill
            unoptimized
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-ink-950/10"
          />
          <span className="absolute top-1/2 left-1/2 inline-flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ember-500 text-black shadow-[0_0_0_10px_rgb(255_106_19/0.25)] transition duration-300 group-hover:scale-110 group-hover:bg-ember-400">
            <Play className="ml-1 size-8" />
          </span>
        </button>
      )}
    </div>
  );
}
