import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  children,
  id,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <Reveal className="max-w-3xl">
      <p className="eyebrow">
        <span aria-hidden="true">{index}</span>
        <span>{eyebrow}</span>
      </p>
      <h2 id={id} className="h-section mt-5">
        {title}
      </h2>
      {children ? <p className="lede mt-6 max-w-2xl">{children}</p> : null}
    </Reveal>
  );
}
