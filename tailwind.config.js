const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  extend: {
    fontFamily: {
      sans: ['ui-monospace', ...defaultTheme.fontFamily.sans],
    }
  }
}