import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: {
          1: "#1c1c1c",
          2: "#242424",
          3: "#2e2e2e",
        },
        anthracite: {
          50:  "#f5f5f7",
          100: "#e8e8ec",
          200: "#d1d1d8",
          300: "#a8a8b4",
          400: "#7a7a8a",
          500: "#52525e",
          600: "#3a3a44",
          700: "#2e2e36",
          800: "#242428",
          900: "#1a1a1e",
          950: "#0f0f12",
        },
        gold: {
          400: "#FFD700",
          500: "#FFC700",
          600: "#E6B800",
        },
        neon: {
          blue:   "#63b3ed",
          purple: "#b794f4",
          cyan:   "#76e4f7",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s easeOut",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #a855f7, 0 0 10px #a855f7" },
          "100%": { boxShadow: "0 0 20px #a855f7, 0 0 30px #a855f7" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
