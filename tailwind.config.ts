import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-space-mono)", "monospace"],
        sans: ["var(--font-syne)", "sans-serif"],
      },
      colors: {
        bg: "#080C10",
        surface: "#0D1117",
        surface2: "#131920",
        border: "#1E2733",
        accent: "#00E5FF",
        "text-mid": "#8A9BAB",
        "text-muted": "#5A6A7A",
        success: "#4ADE80",
      },
      animation: {
        fadeUp: "fadeUp 0.7s ease forwards",
        ticker: "ticker 20s linear infinite",
        blink: "blink 1s step-end infinite",
        pulse2: "pulse2 2s infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        pulse2: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
