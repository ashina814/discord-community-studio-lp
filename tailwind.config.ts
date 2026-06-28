import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#030711",
        panel: "#0B1628",
        discord: "#1E88FF",
        neon: "#38BDF8",
        cyan: "#38BDF8",
        gold: "#1E88FF",
      },
      boxShadow: {
        glow: "0 0 34px rgba(30, 136, 255, 0.24)",
        gold: "0 0 28px rgba(56, 189, 248, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
