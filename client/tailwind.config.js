/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '30': '32%',
        '68': '268px',
        '400':'400px'
      } 
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

