export type Experience = {
  period: string;
  title: string;
  org: string;
  summary: string;
  points: string[];
  slug: string;
  current?: boolean;
};

export const experience: Experience[] = [
  {
    period: "Ongoing",
    title: "Solo developer",
    org: "Procedural Pirates · personal project",
    summary: "A fully procedural, open-world pirate game built in my free time in Unreal Engine 5.4.",
    points: [
      "GPU terrain from Fractal Brownian Motion",
      "Ten-octave Gerstner ocean via custom HLSL nodes",
      "Spline-driven PCG town generation",
    ],
    slug: "procedural-pirates",
    current: true,
  },
  {
    period: "Dec 2022 – Aug 2024",
    title: "Unity Software Engineer",
    org: "Ultraleap",
    summary: "Built features and demos for the open-source Ultraleap Unity Plugin for hand tracking.",
    points: [
      "Physical Hands and near-solo pose recording and detection",
      "MRTK 3, Unity XRI and XR Hands support",
      "Android VR and Windows standalone apps, SOLID tools and a major docs refactor",
    ],
    slug: "ultraleap-unity-plugin",
  },
  {
    period: "May 2020 – Dec 2022",
    title: "Software Engineer",
    org: "Systems Engineering & Assessment",
    summary:
      "Delivered defence and training simulation software as the primary C# and front-end developer on AR and VR projects.",
    points: [
      "Customer-site deliveries with detailed delivery documentation",
      "Several concurrent projects across languages and platforms",
      "An efficient in-house IDE for bespoke solutions",
    ],
    slug: "sea",
  },
  {
    period: "Game development",
    title: "Studio and game jam projects",
    org: "Kachiku 64 · Global Game Jam 2019",
    summary: "Team-based game development, from a 30-person studio project to a 48-hour jam.",
    points: [
      "Bomb interaction systems for a 64-player co-op party game",
      "Second place at the UK's largest Global Game Jam site",
    ],
    slug: "kachiku-64",
  },
];
