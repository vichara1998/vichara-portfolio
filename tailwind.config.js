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
          950: "#041416",
          900: "#092326",
          800: "#103538",
          700: "#176166",
        },
        electric: {
          400: "#21d5d9",
          500: "#00aeb5",
          600: "#087f83",
        },
        violet: {
          400: "#1a8589",
          500: "#11696d",
        },
        teal: {
          400: "#57b5b3",
          500: "#1a8589",
        },
        slate: {
          100: "#e8f8f7",
          300: "#b4d0cf",
          400: "#82a7a6",
          500: "#668d8c",
          600: "#426968",
          700: "#176166",
          800: "#103538",
          900: "#041416",
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
