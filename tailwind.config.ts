import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        panel: "#1F1F1F",
        accent: "#39FF14",
        accentSoft: "rgba(57, 255, 20, 0.16)",
      },
      boxShadow: {
        glow: "0 0 24px rgba(57, 255, 20, 0.32)",
        "glow-strong": "0 0 48px rgba(57, 255, 20, 0.42)",
      },
      fontFamily: {
        display: ["Orbitron", "ui-sans-serif", "system-ui"],
        body: ["Rajdhani", "ui-sans-serif", "system-ui"],
      },
      backgroundImage: {
        "grid-radial":
          "radial-gradient(circle at center, rgba(57,255,20,0.12) 0, transparent 58%)",
      },
      animation: {
        scan: "scan 5s linear infinite",
        pulseRing: "pulseRing 4.8s ease-out infinite",
        float: "float 8s ease-in-out infinite",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-120%)" },
          "100%": { transform: "translateY(220%)" },
        },
        pulseRing: {
          "0%": { transform: "translate(-50%, -50%) scale(0.75)", opacity: "0" },
          "20%": { opacity: "0.55" },
          "100%": { transform: "translate(-50%, -50%) scale(1.8)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
