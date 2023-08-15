/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff0000', // Replace with your desired primary color hex code
      },
      fontFamily: {
        custom: ['Roboto', 'sans-serif'], // Replace 'Your Custom Font' with your desired font name
      },
    },
  },
  plugins: [],
};

// @media screen and (min-width: 992px) {}
// @media screen and (min-width: 768px) {}
// @media screen and (min-width: 576px) {}
