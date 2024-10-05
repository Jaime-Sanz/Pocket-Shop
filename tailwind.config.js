/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ejs,js}"], 
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      backdropBlur: {
        '5.5px': '5.5px',
      },
      boxShadow: {
        'custom-shadow': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
    },
  },
  plugins: [],
}

