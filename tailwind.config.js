/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0 0 2px 0 #6c5670 inset, 0 0 2px 2px #6c5670",
      },
    },
  },
  plugins: [],
};
