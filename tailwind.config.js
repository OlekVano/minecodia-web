/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'm': '560px',
        's': '480px',
        '400': '400px',
        'xs': '360px',
        '2xs': '280px'
      }
    },
  },
  plugins: []
}