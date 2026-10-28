export type Experience = {
  period: string;
  title: string;
  org: string;
  summary: string;
  points: string[];
  slug: string;
  current?: boolean;
};

export type SideProject = {
  title: string;
  status: string;
  summary: string;
  slug: string;
};

/** Employment history, most recent first. */
export const experience: Experience[] = [
  {
    period: "Sep 2024 – Present",
    title: "Software Engineer",
    org: "Systems Engineering & Assessment",
    summary: "Back at SEA, working on full-stack secure embedded systems for defence and training customers.",
    points: [
      "Full-stack development of secure embedded systems",
      "Building on years of customer-site delivery and bespoke tooling at SEA",
    ],
    slug: "sea",
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
];

/** Personal and university projects. Not employment. */
export const sideProjects: SideProject[] = [
  {
    title: "POITracker",
    status: "Solo project · Live on Google Play",
    summary:
      "An Android travel companion for saving and organising places, built solo in Dart and Flutter with a Firebase backend. Offline-first, with Street View, sync and subscriptions.",
    slug: "poitracker",
  },
  {
    title: "Procedural Pirates",
    status: "Personal project · ongoing",
    summary:
      "A fully procedural, open-world pirate game I build in my free time in Unreal Engine 5.4: GPU terrain, a ten-octave Gerstner ocean and spline-driven towns.",
    slug: "procedural-pirates",
  },
  {
    title: "Kachiku 64",
    status: "University project",
    summary:
      "A 64-player local co-op party game built by a team of ~30. I built the bomb interaction systems.",
    slug: "kachiku-64",
  },
  {
    title: "Country Roads",
    status: "University game jam",
    summary:
      "Made for Global Game Jam 2019 by a team of five in 48 hours: a procedurally generated Wild West road game that placed second at the UK's largest jam site.",
    slug: "country-roads",
  },
];
