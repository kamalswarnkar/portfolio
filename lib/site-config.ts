export const siteConfig = {
  particleCount: {
    desktop: 60,
    mobile: 18,
  },
  starCount: {
    desktop: 45,
    mobile: 14,
  },
  particleGlow: 0.9,
  animationSpeed: 1,
  gridOpacity: 0.16,
  pulseFrequencyMs: 4200,
  nebulaOpacity: 0.2,
  cursorTrailCount: {
    desktop: 10,
    mobile: 0,
  },
};

export const sectionIds = [
  "hero",
  "banner",
  "about",
  "education",
  "skills",
  "projects",
  "certificates",
  "achievements",
  "training",
  "contact",
] as const;

export type SectionId = (typeof sectionIds)[number];
