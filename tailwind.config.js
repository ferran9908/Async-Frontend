module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'corn-flower-blue': '#413c69',
        'blue-gem': '#4a47a3',
        'neptune': '#709fb0',
        'tropical-blue': '#a7c5eb'
      }
    },
    fontFamily: {
      'sans': ['Roboto', 'sans-serif']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
