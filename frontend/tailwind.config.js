/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{
        gmarket:["gmarket","sans-serif"],
        bmjua:["bmjua","sans-serif"]
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
