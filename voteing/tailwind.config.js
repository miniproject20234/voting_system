/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      
      screens: {
        sm2: '490px',
        sm3: '400px',
        sm715:'717px',
        sm750:'750px',  
        sm500:'500px',  
      },
    },
  },
  plugins: [],
}