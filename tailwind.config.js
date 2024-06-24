/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        xd: "0px 0px 20px rgba(255,255,255,0.16)",

      }
    },
  },
  plugins: [],
};
