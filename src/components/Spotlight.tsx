"use client";

import { useCallback, type PointerEvent, type ReactNode } from "react";

/** Card wrapper whose glow follows the pointer. Pure presentation: children stay server-rendered. */
export function Spotlight({ children, className = "" }: { children: ReactNode; className?: string }) {
  const onMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  return (
    <div onPointerMove={onMove} className={`spotlight ${className}`}>
      {children}
    </div>
  );
}
