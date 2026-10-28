import { Hero } from "@/components/hero/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { Skills } from "@/components/sections/Skills";
import { Stats } from "@/components/sections/Stats";
import { Work } from "@/components/sections/Work";
import { SITE_URL, site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: SITE_URL,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Bristol", addressCountry: "GB" },
  sameAs: [site.linkedin, site.github],
  knowsAbout: [
    "Game development",
    "Unreal Engine",
    "Unity",
    "C++",
    "C#",
    "Real-time graphics",
    "Procedural generation",
    "Extended reality",
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Marquee />
      <Stats />
      <Work />
      <ExperienceSection />
      <About />
      <Skills />
      <Contact />
    </>
  );
}
