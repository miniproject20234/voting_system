/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {screens: {
      s450:"450px",
      s600:"600px",
    
    },},
  },
  plugins: [],
}