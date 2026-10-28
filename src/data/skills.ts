export type SkillGroup = {
  title: string;
  blurb: string;
  items: { name: string; note: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    blurb: "The foundations: systems, gameplay and the web.",
    items: [
      { name: "C++", note: "High-performance systems and real-time graphics." },
      { name: "C#", note: "Robust application development and game logic." },
      { name: "Python", note: "Backend development, data analysis and scripting." },
      { name: "Dart & Flutter", note: "Cross-platform mobile apps, including POITracker on Google Play." },
      { name: "JavaScript & React", note: "Dynamic web applications and component-based interfaces." },
    ],
  },
  {
    title: "Engines & XR",
    blurb: "Shipping interactive experiences on every screen, and without one.",
    items: [
      { name: "Unreal Engine", note: "High-fidelity games and procedural content generation." },
      { name: "Unity", note: "Cross-platform games and interactive experiences." },
      { name: "Hand tracking & XR", note: "MRTK 3, Unity XRI and XR Hands on Android VR and Windows." },
    ],
  },
  {
    title: "Graphics",
    blurb: "From the first window to the last pixel.",
    items: [
      { name: "DirectX 11", note: "Low-level graphics programming and 3D application development." },
      { name: "HLSL", note: "Custom shader development for realistic rendering." },
      { name: "Procedural generation", note: "FBM terrain, Gerstner oceans and spline-based towns." },
    ],
  },
  {
    title: "Machine learning",
    blurb: "Generative models applied to game assets.",
    items: [
      { name: "Deep learning", note: "Neural networks, generative models and AI applications." },
      { name: "TensorFlow", note: "Machine learning framework for model training and deployment." },
      { name: "TensorLayer", note: "Simplified deep learning library built on TensorFlow." },
    ],
  },
];

export const practices = [
  "SOLID principles",
  "Agile delivery",
  "Code review",
  "Developer documentation",
  "Customer-site delivery",
  "Cross-discipline teamwork",
];
