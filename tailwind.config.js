/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
        'radial-circle': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'radial-ellipse': 'radial-gradient(ellipse, var(--tw-gradient-stops))',
        'radial-corners': `
          radial-gradient(circle at 0% 0%, black, transparent 50%),
          radial-gradient(circle at 100% 0%, black, transparent 50%),
          radial-gradient(circle at 0% 100%, black, transparent 50%),
          radial-gradient(circle at 100% 100%, black, transparent 50%)
        `,
      },
      fontFamily: {
        outfit: ['"Outfit"', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [
    require('twglow'),
    require('tailwindcss-dotted-background'),
    require('daisyui'),
    require('tailwind-glassmorphism')
  ],
}