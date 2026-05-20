/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1a3a52',
        'navy-light': '#2a4a62',
        gold: '#d4af37',
      }
    },
  },
  plugins: [],
}
