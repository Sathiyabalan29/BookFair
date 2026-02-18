/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-gold': '#c9a227',
        'deep-blue': '#1e3a5f',
      },
    },
  },
  plugins: [],
}
