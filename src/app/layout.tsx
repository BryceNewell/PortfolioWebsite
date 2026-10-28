import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource-variable/hanken-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { absoluteUrl, SITE_URL, site } from "@/lib/site";

const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: `${site.name} — Portfolio`,
  authors: [{ name: site.name, url: SITE_URL }],
  keywords: [
    "Bryce Newell",
    "software engineer",
    "game developer",
    "Unreal Engine",
    "Unity",
    "C++",
    "C#",
    "procedural generation",
    "XR",
    "hand tracking",
    "portfolio",
  ],
  openGraph: {
    type: "website",
    siteName: `${site.name} — Portfolio`,
    title,
    description: site.description,
    url: SITE_URL,
    locale: "en_GB",
    images: [{ url: absoluteUrl("/og.png"), width: 1200, height: 630, alt: `${site.name}, ${site.role}` }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: [absoluteUrl("/og.png")],
  },
};

export const viewport: Viewport = {
  themeColor: "#05080c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>
        <a
          href="#main"
          className="sr-only z-[200] rounded-full bg-ember-500 px-5 py-3 font-display font-semibold text-black focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
