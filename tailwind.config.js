/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-1': '#454B44',
        'color-2': '#208C0A',
        'color-3': '#5F007E',
        'color-4': '#D9D9D9',
        'color-5': '#FFF5F5',
        'color-6': '#0D002C66',
        'color-7': '#07001782',
      },
      fontFamily: {
        sans: ['Teko', 'sans-serif', 'Staatliches'],
      },
    },
  },
  plugins: [],
}