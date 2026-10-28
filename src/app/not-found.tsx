import Link from "next/link";
import { ArrowLeft } from "@/components/icons";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col items-start justify-center py-40">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-6 text-[clamp(3rem,10vw,8rem)] leading-[0.9] font-bold tracking-[-0.028em]">
        Lost at sea.
      </h1>
      <p className="lede mt-6 max-w-md">
        This chart doesn&apos;t show a page here. Head back to port and try again.
      </p>
      <Link href="/" className="btn btn-primary mt-10">
        <ArrowLeft className="size-[1.1rem]" />
        Back to the portfolio
      </Link>
    </section>
  );
}
