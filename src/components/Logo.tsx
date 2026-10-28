/**
 * The brand mark: a terminal window with a prompt, redrawn as SVG from the
 * original logo so it stays crisp at any size.
 */
export function LogoMark({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 34"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="36" height="30" rx="5" />
      <path d="M2 10.5h36" />
      <circle cx="7.5" cy="6.25" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="11.5" cy="6.25" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="6.25" r="0.9" fill="currentColor" stroke="none" />
      <path d="m10.5 16 5 4.25-5 4.25" />
      <path d="M19.5 25h8" />
    </svg>
  );
}
