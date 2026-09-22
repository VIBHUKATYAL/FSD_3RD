/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B132B",
        accent: "#1C2541",
        brand: "#3A506B",
        highlight: "#5BC0BE",
        surface: "#FFFFFF",
        background: "#F0F4F8",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
