import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C9A227",
          light: "#D4AF37",
          dark: "#B8860B",
          pale: "#F5E6A3",
        },
        cream: "#FAF8F3",
        ink: {
          DEFAULT: "#111111",
          body: "#2B2B2B",
          muted: "#6B7280",
        },
        footer: "#0A0A0A",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "Lato", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37, #B8860B)",
        "gold-gradient-h": "linear-gradient(90deg, #D4AF37, #B8860B)",
      },
      letterSpacing: {
        widest2: "0.2em",
      },
      animation: {
        marquee: "marquee 160s linear infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      boxShadow: {
        gold: "0 4px 24px rgba(201, 162, 39, 0.25)",
        "gold-lg": "0 8px 40px rgba(201, 162, 39, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
