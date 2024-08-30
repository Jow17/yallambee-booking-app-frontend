/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-lime': '#f7fee7',
      }
    },
    container: {
      padding: {
        md: "10rem",
      },
    },
  },
  plugins: [],
};