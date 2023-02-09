/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      "3xs": "320px",
      // => @media (min-width: 320px) { ... }

      "2xs": "400px",
      // => @media (min-width: 400px) { ... }

      xs: "576px",
      // => @media (min-width: 576px) { ... }

      md: "640px",
      // => @media (min-width: 640px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1300px",
    },

    extend: {
      boxShadow: {
        "3xl": "0 0 2px 0 #6c5670 inset, 0 0 2px 2px #6c5670",
      },
      fontFamily: {
        outfit: "Outfit",
        poppins: "Poppins",
        "hind-kochi": "'Hind Kochi'",
        inter: "Inter",
        alike: "Alike",
      },
    },
    colors: {
      white: "#fff",
      black: "#000",
      indigo: {
        100: "#1180e6",
        200: "#4f46e5",
        300: "#4d47c3",
        400: "rgba(79, 70, 229, 0)",
      },
      gray: {
        100: "#eff0f2",
        200: "#b5b5b5",
        300: "#838383",
        400: "#6a6464",
        500: "#4d5959",
        600: "#5f4c4c",
        700: "#303030",
        800: "#043133",
        900: "rgba(217, 217, 217, 0)",
        1000: "rgba(255, 255, 255, 0)",
        1100: "rgba(255, 233, 233, 0.45)",
      },
      brown: "#ed0541",
      red: "#ff6b00",
    },
  },
  corePlugins: { preflight: false },
};
