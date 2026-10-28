import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@/components/icons";
import policy from "@/data/privacy-policy.json";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for the Holi-Track mobile application.",
  alternates: { canonical: "/privacy-policy" },
};

type Block =
  | { t: "h1" | "h2" | "h3"; h: string; ids?: string[] }
  | { t: "p"; h: string; ids?: string[] }
  | { t: "ul"; items: string[] }
  | { t: "table"; rows: { h: string; th: boolean }[][] };

const blocks = policy as Block[];

/**
 * The policy text is generated, trusted, static content that was converted to
 * a whitelist of inline tags (strong, em, u, a, br) at authoring time.
 */
const Html = ({ html, as: Tag = "span" }: { html: string; as?: "span" | "p" | "li" | "td" | "th" }) => (
  <Tag dangerouslySetInnerHTML={{ __html: html }} />
);

export default function PrivacyPolicyPage() {
  const seen = new Set<string>();
  const anchors = (ids?: string[]) =>
    (ids ?? []).filter((id) => {
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });

  return (
    <article className="container-x pt-36 pb-24 sm:pt-44 sm:pb-32">
      <Link
        href="/"
        className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] text-fg-muted uppercase transition-colors hover:text-ember-300"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        Back to portfolio
      </Link>

      <header className="mt-10 max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-5 text-[clamp(2.75rem,8vw,6rem)] leading-[0.95] font-bold tracking-[-0.028em]">
          Privacy Policy
        </h1>
        <p className="lede mt-6">
          This policy covers the Holi-Track mobile application and related services.
        </p>
      </header>

      <div className="prose-site mt-14 max-w-3xl">
        {blocks.map((b, i) => {
          if (b.t === "h1") return null; // the page already has an h1
          if (b.t === "h2" || b.t === "h3") {
            const [first, ...rest] = anchors(b.ids);
            const Tag = b.t;
            return (
              <Tag key={i} id={first}>
                {rest.map((id) => (
                  <span key={id} id={id} />
                ))}
                {b.h}
              </Tag>
            );
          }
          if (b.t === "ul") {
            return (
              <ul key={i}>
                {b.items.map((li, j) => (
                  <Html key={j} as="li" html={li} />
                ))}
              </ul>
            );
          }
          if (b.t === "table") {
            return (
              <div key={i} className="overflow-x-auto">
                <table>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, c) => (
                          <Html key={c} as={cell.th ? "th" : "td"} html={cell.h} />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          const [first] = anchors(b.ids);
          return <p key={i} id={first} dangerouslySetInnerHTML={{ __html: b.h }} />;
        })}
      </div>
    </article>
  );
}
