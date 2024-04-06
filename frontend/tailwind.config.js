/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      Manrope: ["Manrope", "sans-serif"],
      Josefin: ["Josefin Sans", "sans-serif"],
    },
    extend: {
      colors: {
        customDark: "#22181c",
        customLight: "#F2FBFD",
        customOrange: "#ff8811",
        customGreen: "#84a59d",
        customGrey: "#546A7B",
        customYellow: "#c17817",
        customPink: "#f28482",
        customBlue: "#3A7C9D",
      },
    },
  },
  plugins: [],
};
