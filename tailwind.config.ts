import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#070A12",
        panel: "rgba(17, 24, 39, 0.72)",
        discord: "#5865F2",
        neon: "#8B5CF6",
        cyan: "#7DD3FC",
        gold: "#F5C542",
      },
      boxShadow: {
        glow: "0 0 36px rgba(88, 101, 242, 0.34)",
        gold: "0 0 28px rgba(248, 193, 74, 0.22)",
      },
    },
  },
  plugins: [],
};

export default config;
