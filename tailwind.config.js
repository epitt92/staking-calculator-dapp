/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      gray: {
        light: '#FAFAFA',
        medium: '#F3F3F3',
        dark: '#EFEFEF'
      },
      'error': '#AF3434',
    },
    extend: {
      boxShadow: {
        10:'0 0 10px rgba(0,0,0,0.5)'
      }
    },
  },
  plugins: [],
};
