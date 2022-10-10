/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0 0 2px 0 #7a0a44 inset, 0 0 2px 2px #7a0a44",
      },
    },
  },
  plugins: [],
};
