/** @type {import('tailwindcss').Config} */
export default {
  darkMode: true, // or 'media' or 'class'
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {

    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}

