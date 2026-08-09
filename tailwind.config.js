/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        navy: {
          950: "#120F0A",
          900: "#3B200B",
          800: "#4A2A11",
          700: "#5A3416",
        },
        electric: {
          400: "#D76F02",
          500: "#FAA718",
          600: "#D76F02",
        },
        violet: {
          400: "#FCCF46",
          500: "#FAA718",
        },
        teal: {
          400: "#FAA718",
          500: "#FCCF46",
        },
        slate: {
          100: "#FFF8E8",
          300: "#F7D28C",
          400: "#F2C66C",
          500: "#C67D2C",
          600: "#8F5A1C",
          700: "#5A3416",
          800: "#3B200B",
          900: "#120F0A",
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
