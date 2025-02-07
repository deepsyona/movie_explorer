/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        anta: ['Anta', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        teko: ['Teko', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

