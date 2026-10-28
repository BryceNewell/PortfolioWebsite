const items = [
  "C++",
  "C#",
  "Unreal Engine 5",
  "Unity",
  "DirectX 11",
  "HLSL",
  "Python",
  "TensorFlow",
  "JavaScript",
  "React",
  "Hand tracking",
  "VR / AR",
  "Procedural generation",
  "Gameplay systems",
];

/** A slow ticker of the stack. The duplicate list is hidden from assistive tech. */
export function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-display text-2xl font-semibold tracking-tight text-fg-muted sm:text-3xl">
            {item}
          </span>
          <span aria-hidden="true" className="size-1.5 rotate-45 bg-ember-500" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      role="region"
      aria-label="Technologies I work with"
      className="relative overflow-hidden border-y border-line bg-ink-900/50 py-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
    >
      <div className="animate-marquee flex w-max hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
