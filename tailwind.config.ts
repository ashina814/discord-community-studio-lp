import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#07090E",
        panel: "#0E1119",
        discord: "#4D86FF",
        neon: "#8B7BFF",
        cyan: "#74A0FF",
        gold: "#4D86FF",
      },
      boxShadow: {
        glow: "0 12px 34px rgba(77, 134, 255, 0.32)",
        gold: "0 12px 28px rgba(77, 134, 255, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
