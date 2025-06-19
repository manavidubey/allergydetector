/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./src/**/*.{html,js,css}"
  ],
  theme: {
    extend: {
      colors: {
        'allergy-red': '#dc2626',
        'allergy-green': '#16a34a',
        'allergy-blue': '#2563eb',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
} 