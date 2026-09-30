/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["Instrument Serif", "serif"],
        body: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        navy: {
          950: "#1e2521",
          900: "#272f2a",
          800: "#313a34",
          700: "#46514a",
        },
        electric: {
          400: "#a84732",
          500: "#bb6149",
          600: "#873a2a",
        },
        violet: {
          400: "#315c55",
          500: "#3f7167",
        },
        teal: {
          400: "#719789",
          500: "#315c55",
        },
        slate: {
          100: "#edf0eb",
          300: "#bac3bc",
          400: "#929d95",
          500: "#758079",
          600: "#58635d",
          700: "#46514a",
          800: "#313a34",
          900: "#1e2521",
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        gradient: "gradient 8s ease infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundSize: {
        "300%": "300%",
      },
    },
  },
  plugins: [],
};
