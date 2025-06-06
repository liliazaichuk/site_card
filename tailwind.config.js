/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
    colors: {
      customGray: '#575F6E',
    },
    fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif']
    },
    colors: {
        'custom-gray': '#575F6E', 
      },
  },
  },
  plugins: [],
};
