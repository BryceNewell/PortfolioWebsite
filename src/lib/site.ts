/** Canonical origin. Override with NEXT_PUBLIC_SITE_URL for preview builds. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://brycenewell.co.uk").replace(/\/$/, "");

/** Absolute URL for a path on this site. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const site = {
  name: "Bryce Newell",
  role: "Software Engineer & Game Developer",
  description:
    "Portfolio of Bryce Newell, a software engineer and game developer specialising in real-time graphics, procedural generation, XR and gameplay systems with Unreal Engine, Unity, C++ and C#.",
  location: "Bristol, UK",
  email: "brycenewell@icloud.com",
  phone: "+44 7572 169493",
  phoneHref: "tel:+447572169493",
  linkedin: "https://www.linkedin.com/in/b-newell/",
  github: "https://github.com/BryceNewell",
} as const;

export const nav = [
  { label: "Work", href: "/#work", id: "work" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;
