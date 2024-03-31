/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ], theme: {
    fontFamily: {
      'Manrope': ['Manrope', 'sans-serif'],
      'Josefin': ['Josefin Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        'dark': '#22181c',
        'light': '#F2FBFD',
        'orange': '#ff8811',
        'green': '#84a59d',
        'grey': '#546A7B',
        'yellow': '#c17817',
        'pink': '#f28482',
        'blue': '#3A7C9D'
      },
    },
  },
  plugins: [],
}

