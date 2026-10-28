import { Play } from "./icons";

/** Link to the Google Play listing. Opens in a new tab. */
export function GooglePlayButton({ href, className = "" }: { href: string; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${className}`}>
      <Play className="size-[1.05rem]" />
      Get it on Google Play
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
