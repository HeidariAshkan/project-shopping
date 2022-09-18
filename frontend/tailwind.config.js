/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    extend: {},
    screens: {
      xs:{"max": "457px"},
      ...defaultTheme.screens
    },
    fontFamily:{
      IR:'IRANSans',
    }
  },
  plugins: [],
}
