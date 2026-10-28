import type { ImageKey } from "./images";

export type ProjectKind = "passion" | "professional" | "team" | "jam" | "tool" | "research" | "app";

export type Highlight = {
  title: string;
  body: string;
  image?: ImageKey;
  alt?: string;
};

/** Extra content for a published mobile app. */
export type AppDetails = {
  playStoreUrl: string;
  icon: ImageKey;
  screens: { image: ImageKey; alt: string; caption: string }[];
  features: { title: string; body: string }[];
  stats: { value: string; label: string }[];
  stack: { group: string; items: string[] }[];
};

export type Project = {
  slug: string;
  title: string;
  kind: ProjectKind;
  /** Short category label shown on cards and headers. */
  label: string;
  /** Period or status, only where it is known. */
  period?: string;
  /** One or two sentences for cards. */
  summary: string;
  /** Larger statement used on the detail page hero. */
  tagline: string;
  cover: ImageKey;
  coverAlt: string;
  tech: string[];
  facts: { label: string; value: string }[];
  highlights: Highlight[];
  story: { heading: string; paragraphs: string[] };
  video?: { id: string; title: string; caption: string };
  links?: { label: string; href: string }[];
  note?: string;
  featured?: boolean;
  /** Shown as the dedicated spotlight on the home page instead of in the project lists. */
  spotlight?: boolean;
  app?: AppDetails;
};

export const projects: Project[] = [
  {
    slug: "poitracker",
    title: "POITracker",
    kind: "app",
    label: "Solo project · Android app",
    period: "Live on Google Play",
    summary:
      "A map-first, offline-first travel companion for saving and organising places. Designed, built and released solo in Dart and Flutter, with Firebase sync, Street View and Google Play subscriptions.",
    tagline:
      "Never forget a hidden gem or a breathtaking view again. A travel companion I designed, built and shipped to Google Play on my own.",
    cover: "poitracker-cover",
    coverAlt:
      "Three phone screens from POITracker: a map of saved places, a place detail with Street View, and a colour-coded list in dark mode.",
    tech: ["Dart", "Flutter", "Riverpod", "SQLite", "Firebase", "Google Maps", "Kotlin", "TypeScript"],
    facts: [
      { label: "Platform", value: "Android, on Google Play" },
      { label: "Role", value: "Solo developer: design, build and release" },
      { label: "Built with", value: "Dart and Flutter, Firebase backend" },
      { label: "Status", value: "Live and in active development" },
    ],
    highlights: [
      {
        title: "Offline-first, with sync you control",
        body: "Everything is stored in a local SQLite database, so the whole app works with no signal. Cloud sync is opt-in and runs while the app is open: it covers place metadata only, photos stay on the device, and concurrent edits are surfaced as an explicit keep-device or keep-cloud choice instead of being overwritten. Pro and Lifetime accounts also get up to seven rolling daily recovery snapshots, served by TypeScript Cloud Functions.",
      },
      {
        title: "Security and privacy by design",
        body: "Sensitive data is protected with AES-GCM encryption, with keys held in platform secure storage, and exports can be encrypted. The app supports biometric unlock and auto-lock, Firebase App Check, GDPR-style consent controls, and in-app data export and account deletion.",
      },
      {
        title: "Clean, tested architecture",
        body: "A feature-first structure with Riverpod state management, repositories for data access and a service layer for business logic. Over 300 automated tests cover models, repositories, services and screens, and a GitHub Actions pipeline runs analysis, tests with coverage, Firestore security-rules tests and the Android App Bundle build.",
      },
      {
        title: "Subscriptions done properly",
        body: "Free, Pro and Lifetime tiers are sold through Google Play Billing. Purchases are verified server-side by a Cloud Function, and features are gated through reactive Riverpod providers and tier-aware widgets so access always matches the user's entitlement.",
      },
    ],
    story: {
      heading: "Building it solo",
      paragraphs: [
        "POITracker is a map-first travel companion for capturing and organising points of interest, from a quick GPS save to a full library of places with photos, reviews, reminders and Street View.",
        "I built it entirely on my own as a personal project, not formal employment: the product design, the Flutter and Dart app, the native Android home-screen widgets in Kotlin, the Firebase backend with TypeScript Cloud Functions, the automated tests and CI pipeline, and the release to Google Play.",
        "Working solo meant owning every trade-off end to end. I kept the app fully usable offline, made sync opt-in and conflict-aware rather than silently overwriting data, kept photos on the device, and treated privacy controls, encrypted exports and subscription gating as part of the architecture instead of an afterthought.",
        "It is live on Google Play and still in active development.",
      ],
    },
    links: [
      {
        label: "POITracker on Google Play",
        href: "https://play.google.com/store/apps/details?id=com.brycenewell.holidaypoitracker",
      },
    ],
    note: "Screenshots are from the Google Play listing. Google Play is a trademark of Google LLC.",
    spotlight: true,
    app: {
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.brycenewell.holidaypoitracker&hl=en_GB",
      icon: "poitracker-icon",
      screens: [
        {
          image: "poitracker-map",
          alt: "POITracker's map view showing saved places as pins around Port Dickson, with collection tabs along the top.",
          caption: "Your places on an interactive Google Map",
        },
        {
          image: "poitracker-list-light",
          alt: "POITracker's list view in light theme with colour-coded category rows and thumbnails.",
          caption: "Colour-coded categories in the list",
        },
        {
          image: "poitracker-list-dark",
          alt: "POITracker's list view in dark theme with colour-coded rows.",
          caption: "Light and dark themes throughout",
        },
        {
          image: "poitracker-detail",
          alt: "A POITracker place detail screen with a Street View panorama, photos section, address, navigate and reminder buttons, and nearby businesses.",
          caption: "Street View, photos, reviews and reminders per place",
        },
      ],
      features: [
        {
          title: "Instant capture",
          body: "Save a spot from your GPS in one tap, from typed coordinates or an address, a map long-press or a place search, with duplicate detection before it is saved.",
        },
        {
          title: "Interactive map",
          body: "Browse every place on Google Maps with colour-coded markers, filter by favourites, rating or category, and jump straight into turn-by-turn navigation.",
        },
        {
          title: "Organise your way",
          body: "Unlimited colour-coded categories, custom tags, and collections, including shared collections, plus reusable filter and sort presets.",
        },
        {
          title: "Photos and Street View",
          body: "Attach multiple photos to each place and preview 360° Street View panoramas where they are available.",
        },
        {
          title: "Reviews and reminders",
          body: "Rate and review places, mark favourites, and schedule date-and-time reminders so you remember to revisit them.",
        },
        {
          title: "Insights dashboard",
          body: "Charts of activity by day, weekday, hour and month, category distribution, review trends and location hotspots, filtered by date range.",
        },
        {
          title: "Backup and portability",
          body: "Opt-in cloud sync with recovery snapshots, plus separate encrypted offline export and import for taking your data anywhere.",
        },
        {
          title: "Private and secure",
          body: "Biometric unlock, auto-lock, a security dashboard, granular consent controls, and tools to export or delete your data.",
        },
        {
          title: "Home-screen widgets",
          body: "Native Kotlin quick-save widgets in four sizes, so a place is one tap away from your home screen.",
        },
      ],
      stats: [
        { value: "56k", label: "lines of Dart in the app" },
        { value: "300+", label: "automated unit and widget tests" },
        { value: "4", label: "quick-save home-screen widget sizes" },
        { value: "7", label: "rolling daily recovery snapshots for Pro and Lifetime" },
      ],
      stack: [
        { group: "App", items: ["Dart", "Flutter", "Riverpod", "Freezed", "fl_chart"] },
        {
          group: "Data and sync",
          items: ["SQLite (sqflite)", "Cloud Firestore", "Secure storage", "Offline sync queue"],
        },
        {
          group: "Backend",
          items: ["Firebase Auth", "Cloud Functions (TypeScript)", "App Check", "Crashlytics", "Analytics"],
        },
        {
          group: "Platform and device",
          items: [
            "Google Maps and Street View",
            "Geolocation",
            "Local notifications",
            "Biometrics",
            "Kotlin widgets",
          ],
        },
        {
          group: "Quality and release",
          items: [
            "flutter_test and Mockito",
            "Firestore rules tests",
            "GitHub Actions CI",
            "Google Play Billing",
          ],
        },
      ],
    },
  },
  {
    slug: "procedural-pirates",
    title: "Procedural Pirates",
    kind: "passion",
    label: "Passion project",
    period: "In development",
    summary:
      "A fully procedural, open-world pirate game built in Unreal Engine 5.4. GPU-generated terrain, a ten-octave Gerstner ocean and spline-driven town generation.",
    tagline: "A boundless, player-driven pirate sandbox where the world is generated, not hand-placed.",
    cover: "pirates-ship",
    coverAlt: "A wooden galleon anchored off a procedurally generated tropical coast in Unreal Engine 5.4.",
    tech: ["Unreal Engine 5.4", "C++", "HLSL", "PCG", "Fractal Brownian Motion", "Gerstner waves"],
    facts: [
      { label: "Engine", value: "Unreal Engine 5.4" },
      { label: "Role", value: "Solo developer" },
      { label: "Status", value: "In active development" },
      { label: "Focus", value: "Procedural content generation" },
    ],
    highlights: [
      {
        title: "Procedural terrain",
        body: "Archipelagos are generated on the GPU using Fractal Brownian Motion, so the world is vast, varied and never repeats.",
        image: "pirates-terrain",
        alt: "Aerial view of procedurally generated islands surrounded by deep blue water.",
      },
      {
        title: "Gerstner waves",
        body: "Ten octaves of Gerstner waves, driven by custom HLSL material nodes, give the ocean realistic crests that react to the environment.",
        image: "pirates-waves",
        alt: "A realistic open ocean surface with layered wave detail and sun glints.",
      },
      {
        title: "Unreal 5.4 PCG town generation",
        body: "Using the latest Procedural Content Generation tooling, splines describe the layout and whole towns grow along them, each one unique.",
        image: "pirates-town",
        alt: "A procedurally generated pirate town of timber houses on a palm-lined beach.",
      },
    ],
    story: {
      heading: "My passion",
      paragraphs: [
        "I have always loved pirate and sailing games, ever since classics like Sid Meier's Pirates! and Assassin's Creed IV: Black Flag first sparked a fascination with the open seas and the adventures waiting on them. Now, with years of development experience behind me, I am channelling that passion into a dream project: a fully procedural open-world game built in Unreal Engine 5.4.",
        "The aim is a truly immersive sandbox where players design and customise their own ships, explore a virtually limitless world and choose their own path, whether that is trading or embracing the pirate life. Terrain is generated on the GPU with Fractal Brownian Motion, producing landscapes that feel both dynamic and natural.",
        "The water is just as important. Ten octaves of Gerstner waves, built from custom HLSL nodes, produce an ocean that responds to its environment and carries the whole sense of place. Splines then drive the procedural generation of entire towns, so every settlement is unique and the world feels alive as you explore it.",
        "It is a solo endeavour, but the enthusiasm of friends who have followed the project has been hugely encouraging, and their interest in contributing says a lot about its potential. I cannot wait to see how it evolves as I keep developing and refining it.",
      ],
    },
    featured: true,
  },
  {
    slug: "ultraleap-unity-plugin",
    title: "Ultraleap Unity Plugin",
    kind: "professional",
    label: "Professional · XR hand tracking",
    period: "Dec 2022 – Aug 2024",
    summary:
      "Unity Software Engineer on Ultraleap's open-source hand-tracking plugin, building Physical Hands, pose detection and MRTK 3, XR Hands and XRI integrations.",
    tagline:
      "Helping push Ultraleap's open-source Unity plugin to be the number one hand-tracking plugin for Unity.",
    cover: "ultraleap-physical-hands",
    coverAlt: "The Unity editor showing a Physical Hands demo scene with interactive lab equipment.",
    tech: ["Unity", "C#", "Hand tracking", "MRTK 3", "Unity XRI", "XR Hands", "Android VR", "SOLID"],
    facts: [
      { label: "Company", value: "Ultraleap" },
      { label: "Role", value: "Unity Software Engineer" },
      { label: "Period", value: "Dec 2022 – Aug 2024" },
      { label: "Platforms", value: "All Android VR platforms and Windows standalone" },
    ],
    highlights: [
      {
        title: "Physical Hands",
        body: "A brand-new way to interact with the virtual world, integrating deeply with the Unity physics engine.",
        image: "ultraleap-physical-hands",
        alt: "A Physical Hands demo scene in the Unity editor with tubes, buttons and a poke panel.",
      },
      {
        title: "Pose detection",
        body: "I worked nearly solo on bringing pose recording and detection to the plugin, with regular code reviews and input from UX designers.",
        image: "ultraleap-pose",
        alt: "A tracked skeletal hand in a rock-on pose inside the pose editor.",
      },
      {
        title: "Keeping up with the latest and greatest",
        body: "I was integral in implementing support for MRTK 3, Unity XRI and XR Hands, keeping the plugin current with the wider XR ecosystem.",
        image: "ultraleap-xr-ui",
        alt: "A virtual hand using an XR UI panel with buttons, toggles and a scroll view.",
      },
    ],
    story: {
      heading: "My work at Ultraleap",
      paragraphs: [
        "As a Unity Software Engineer at Ultraleap from December 2022 to August 2024, I played a key role in the development and maintenance of the Ultraleap Unity Plugin for hand tracking. I created features and demos for customers and trade shows, contributing significantly to pose detection and the plugin's physical hands functionality. The work meant talking to low-level hardware APIs to implement new features and push the boundaries of hand tracking in Unity.",
        "I kept the developer documentation comprehensive and current, including a major refactor, and built scalable tools using SOLID principles and Agile processes. I shipped applications for all Android VR platforms and Windows standalone, tightly integrated with MRTK, Unity XR Hands and Unity XRI, to advance what hand tracking can do in virtual reality.",
      ],
    },
    links: [
      { label: "Ultraleap Unity Plugin on GitHub", href: "https://github.com/ultraleap/UnityPlugin" },
      { label: "My Ultraleap GitHub account", href: "https://github.com/BryceNewell-UL" },
    ],
    featured: true,
  },
  {
    slug: "sea",
    title: "Systems Engineering & Assessment",
    kind: "professional",
    label: "Professional · Defence, training & embedded",
    period: "2020 – 2022 · Sep 2024 – Present",
    summary:
      "Software Engineer at SEA, then and now: defence and training simulation across VR, AR and desktop, and today full-stack secure embedded systems.",
    tagline:
      "Delivering defence and training software, from VR and AR front ends to full-stack secure embedded systems.",
    cover: "sea-warship",
    coverAlt: "A naval warship moored in a harbour beneath a rainbow.",
    tech: ["C#", "Full-stack", "Secure embedded systems", "VR", "AR", "In-house IDE"],
    facts: [
      { label: "Company", value: "Systems Engineering & Assessment" },
      { label: "Role", value: "Software Engineer (current role)" },
      { label: "Period", value: "May 2020 – Dec 2022, and Sep 2024 – present" },
      { label: "Domain", value: "Defence, training and secure embedded systems" },
    ],
    highlights: [
      {
        title: "Defence and training simulations",
        body: "I delivered a wide range of defence and training software projects, both collaboratively and independently.",
        image: "sea-ship",
        alt: "A naval vessel at anchor, in black and white.",
      },
      {
        title: "Delivering hardware and software solutions",
        body: "I was trusted to deliver products to customer sites, writing detailed delivery documentation to make implementation and support seamless.",
        image: "sea-laptop",
        alt: "A laptop with a vividly lit keyboard and screen.",
      },
      {
        title: "An efficient in-house IDE",
        body: "I played a crucial role in creating an efficient in-house Integrated Development Environment for bespoke solutions, streamlining workflow and boosting productivity across the team.",
      },
    ],
    story: {
      heading: "My work at SEA",
      paragraphs: [
        "I rejoined Systems Engineering & Assessment as a Software Engineer in September 2024, and my current work is on full-stack secure embedded systems.",
        "In my first stint at SEA, from May 2020 to December 2022, I played a pivotal role in delivering a wide array of defence and training software projects. I worked both collaboratively within teams and independently, taking on complex tasks that demanded a deep understanding of many technologies and development practices. I delivered products directly to customer sites, always with comprehensive delivery documentation for seamless implementation and support.",
        "One of the key challenges was managing several projects at once. That meant context switching between programming languages and platforms, and it taught me to stay effective under pressure. The projects spanned both virtual reality and standard screen-based software, each tailored to the specific needs of defence and training applications.",
        "I also contributed to an efficient in-house IDE for bespoke solutions, and as the primary C# and front-end developer for augmented and virtual reality projects I pushed to deliver high-quality, user-centric immersive software. The experience sharpened my skills in software development, project management and client relations.",
      ],
    },
    note: "Imagery on this page is illustrative.",
    featured: true,
  },
  {
    slug: "kachiku-64",
    title: "Kachiku 64",
    kind: "team",
    label: "University team project",
    period: "Team of ~30",
    summary:
      "A 64-player local co-op party game in the spirit of Bomberman. 64 farm animals, tractors, planes and combine harvesters, with phones as controllers.",
    tagline:
      "64 farm animals fighting to win through a series of mini games: tractors, planes, combine harvesters and, of course, B.O.B!",
    cover: "kachiku-arena",
    coverAlt: "A top-down pixel-art arena with a Japanese shrine, ponds and a countdown timer.",
    tech: ["Multiplayer", "Gameplay systems", "Mobile controllers", "Teamwork"],
    facts: [
      { label: "Players", value: "Up to 64, using their phones" },
      { label: "Team", value: "~30 developers" },
      { label: "My focus", value: "Bomb interaction systems" },
      { label: "Inspiration", value: "Bomberman" },
    ],
    highlights: [
      {
        title: "Teamwork",
        body: "This was a 30-person project, with every discipline carrying its own responsibilities and needs.",
        image: "kachiku-shrine",
        alt: "Pixel-art shrine courtyard with cherry blossom trees and characters.",
      },
      {
        title: "Adapting existing code",
        body: "We picked the game up in its existing state, originally developed by the cohorts before us, and had to make it ours.",
        image: "kachiku-map",
        alt: "A wide pixel-art map with farmland, ponds, a runway and a hedge maze.",
      },
      {
        title: "Making it fun",
        body: "We were tasked with making the game fun and usable for up to 64 players at once, all playing on their phones.",
        image: "kachiku-arena",
        alt: "The Kachiku 64 arena mid-match with a round timer.",
      },
    ],
    story: {
      heading: "How we did it",
      paragraphs: [
        "Working at university as a large game development team of around 30 people, we were entrusted with bringing the vision of a previous cohort to life by enhancing and completing their unfinished project. The game, inspired by Bomberman, is a dynamic battle arena where 64 players compete using power-ups and navigate an evolving map.",
        "My sub-group was tasked with developing the system that handles all bomb interactions. That demanded close collaboration with the other teams, so our work integrated seamlessly with every game mode and every aspect of gameplay. It honed our teamwork and communication as much as our technical expertise in game development.",
      ],
    },
    video: {
      id: "Q8h34L63lcA",
      title: "Kachiku 64 gameplay",
      caption: "Kachiku 64 in action.",
    },
  },
  {
    slug: "country-roads",
    title: "Country Roads",
    kind: "jam",
    label: "University game jam · 2nd place",
    period: "Global Game Jam 2019",
    summary:
      "Played as a horse hauling a cart home through a procedurally generated Wild West. Built in 48 hours and placed second at the UK's largest jam site.",
    tagline:
      "Built by a team of five in 48 hours, it earned second place at the UK's largest Global Game Jam site.",
    cover: "roads-canyon",
    coverAlt: "A team of horses pulling a covered wagon along a canyon path beside a river.",
    tech: ["Procedural generation", "Game jam", "Rapid prototyping", "Team of five"],
    facts: [
      { label: "Event", value: "Global Game Jam 2019" },
      { label: "Theme", value: "Home" },
      { label: "Team", value: "Five developers" },
      { label: "Result", value: "2nd place, UK's largest jam site" },
    ],
    highlights: [
      {
        title: "Team work",
        body: "Working with four other team members over a game jam weekend to create something we were all proud of.",
        image: "roads-start",
        alt: "The Country Road start sign with four horses lined up to race.",
      },
      {
        title: "Dedication",
        body: "Late nights and early mornings to bring our vision to life.",
        image: "roads-canyon",
        alt: "Horses pulling a wagon along a canyon with wooden bridges ahead.",
      },
      {
        title: "Fast iteration",
        body: "With the whole jam lasting just 48 hours, we had to implement and iterate on ideas in a very short timeframe.",
        image: "roads-run",
        alt: "A wagon racing through the canyon, seen from behind.",
      },
    ],
    story: {
      heading: "The game",
      paragraphs: [
        'Created around the theme of "home", Country Roads has you play as a horse pulling a cart back to your homestead in the Wild West. It was developed by a team of five during the 48-hour Global Game Jam 2019, and it earned second place at the UK\'s largest jam site.',
        "The game features a procedurally generated map, ever-increasing speed and perilous terrain. Players must pick the right route home by going left or right based on the signs they meet along the journey. It showcased our ability to develop engaging, challenging gameplay quickly and under tight deadlines.",
      ],
    },
  },
  {
    slug: "directx11-procedural-buildings",
    title: "DirectX 11 Procedural Buildings",
    kind: "tool",
    label: "Tool · Graphics programming",
    summary:
      "A tool for generating and exporting 3D buildings from user input, built from the ground up in C++ with only the basic DirectX 11 framework.",
    tagline: "A simple tool to create 3D houses, built from the ground up in DirectX 11.",
    cover: "dx11-wall",
    coverAlt: "A brick wall with two windows rendered by a custom DirectX 11 building tool.",
    tech: ["C++", "DirectX 11", "Procedural generation", "Renderer", "Model export"],
    facts: [
      { label: "Language", value: "C++" },
      { label: "API", value: "DirectX 11" },
      { label: "Scope", value: "Window creation to model export" },
      { label: "Input", value: "User-defined building parameters" },
    ],
    highlights: [
      {
        title: "Low-level code",
        body: "Using only the basic DirectX framework, a simple tool was created to generate and export a 3D building from user-supplied data.",
        image: "dx11-wall",
        alt: "A procedurally generated brick wall with windows and a properties panel.",
      },
      {
        title: "C++ coding experience",
        body: "Very low-level C++ to create a renderer and a procedural building creation tool, with no engine to lean on.",
        image: "dx11-tower",
        alt: "A tall, narrow procedurally generated dark building.",
      },
    ],
    story: {
      heading: "How I did it",
      paragraphs: [
        "I developed a simple tool to create 3D houses using DirectX 11, starting from the ground up. Using only the basic DirectX framework, I built an application that generates and exports 3D buildings from user input.",
        "The goal was to construct a 3D application from the very basics, from creating the initial window to exporting the finished model in a usable format. It sharpened my low-level graphics programming and gave me a solid foundation in 3D application development.",
      ],
    },
  },
  {
    slug: "3d-gan",
    title: "3D GAN",
    kind: "research",
    label: "Machine learning",
    summary:
      "A 3D Generative Adversarial Network built with TensorFlow and TensorLayer, trained to generate game-ready voxel car models from a dataset.",
    tagline: "Using deep learning to start creating game-ready 3D assets from a dataset of cars.",
    cover: "gan-voxels",
    coverAlt: "A voxel-based 3D car model generated by a neural network, shown in the Unity editor.",
    tech: ["TensorFlow", "TensorLayer", "Deep learning", "GAN", "Voxels", "Unity"],
    facts: [
      { label: "Framework", value: "TensorFlow and TensorLayer" },
      { label: "Training", value: "24+ hours, ~3,000 epochs" },
      { label: "Dataset", value: "3D car models" },
      { label: "Output", value: "Voxel assets, viewed in Unity" },
    ],
    highlights: [
      {
        title: "Deep learning",
        body: "Using some of the latest deep learning techniques to bring voxel assets to life.",
        image: "gan-voxels",
        alt: "A blocky voxel model produced by the generative network.",
      },
      {
        title: "TensorFlow",
        body: "TensorFlow was used to train the network. Discriminator and generator losses were tracked across the run.",
        image: "gan-loss",
        alt: "A chart of discriminator and generator loss against training epochs.",
      },
      {
        title: "Game-ready assets",
        body: "Although the assets are a little unrefined, these images are taken directly from the Unity editor.",
        image: "gan-car",
        alt: "A generated voxel car shown inside the Unity editor.",
      },
    ],
    story: {
      heading: "The why",
      paragraphs: [
        "Deep learning has a vast range of applications, from recognising numbers to generating entire games. In this project I used TensorFlow and TensorLayer to generate 3D models from a dataset, focusing on cars.",
        "Training the Generative Adversarial Network took over 24 hours and around 3,000 epochs to produce the results shown here. The generated cars are slightly undefined, but they are fully usable as game assets. It highlights the potential of deep learning for creating complex 3D models across a range of applications.",
      ],
    },
  },
];

export const spotlightProject = projects.find((p) => p.spotlight);
export const featuredProjects = projects.filter((p) => p.featured && !p.spotlight);
export const otherProjects = projects.filter((p) => !p.featured && !p.spotlight);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
