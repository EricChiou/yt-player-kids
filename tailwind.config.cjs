/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      'white': '#fff',
      'gray': '#eaeaea',
      'black': '#666',
      'black-deep': '#000',
      'red': '#f00',
    },
  },
  plugins: [],
};
