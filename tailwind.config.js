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
        'xs': '360px'
      }
    },
  },
  plugins: [],
}
