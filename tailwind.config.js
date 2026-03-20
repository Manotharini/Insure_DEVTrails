/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blinkitYellow: "#FFE141",
        blinkitGreen: "#22C55E",
      },
      boxShadow: {
        card: "0 10px 30px rgba(15, 23, 42, 0.12)",
      },
      keyframes: {
        popIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        popIn: "popIn 280ms ease-out forwards",
      },
    },
  },
  plugins: [],
};
