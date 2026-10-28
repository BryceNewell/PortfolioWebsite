"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Img } from "@/data/images";
import { Close, Expand } from "./icons";

/** An image that opens full-size in a native modal dialog. */
export function ZoomImage({
  image,
  alt,
  sizes,
  className = "",
  priority = false,
}: {
  image: Img;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className={`group/zoom relative block w-full cursor-zoom-in text-left ${className}`}
        aria-label={`Enlarge image: ${alt}`}
      >
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={alt}
          sizes={sizes}
          priority={priority}
          className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover/zoom:scale-[1.03]"
        />
        <span
          aria-hidden="true"
          className="absolute right-3 bottom-3 inline-flex size-9 items-center justify-center rounded-full border border-line-strong bg-ink-950/70 text-fg opacity-0 backdrop-blur-md transition group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100"
        >
          <Expand className="size-4" />
        </span>
      </button>

      <dialog
        ref={dialog}
        aria-label={alt}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="m-auto max-h-[92svh] max-w-[min(92vw,1600px)] overflow-visible border-0 bg-transparent p-0 text-fg backdrop:bg-ink-950/90 backdrop:backdrop-blur-sm"
      >
        <div className="relative">
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt={alt}
            sizes="92vw"
            className="max-h-[86svh] w-auto rounded-xl object-contain shadow-2xl"
          />
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="absolute -top-3 -right-3 inline-flex size-10 items-center justify-center rounded-full border border-line-strong bg-ink-900 text-fg transition hover:border-ember-400 hover:text-ember-300"
            aria-label="Close image"
          >
            <Close className="size-5" />
          </button>
          <p className="mt-3 text-center text-sm text-fg-muted">{alt}</p>
        </div>
      </dialog>
    </>
  );
}
