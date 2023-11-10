/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    theme: {
      fontFamily: {
        'sans': ['Roboto', 'system-ui',],
        'serif': ['Roboto',  'system-ui',],
        'mono': ['Roboto',  'system-ui'],
        'display': ['Roboto', 'system-ui',],
        'body': ['Roboto',  'system-ui',],
      }
    },
    extend: {},
    colors: {
      'globalWhite': '#FFFFFF',
      'grayMedium': '#00000029',
      'purple': '#B13CFF',
      'grayHigh': '#BDBDBD',
      'grayLow':'#EEEDED',
      'black': '#000000',
      'blackOpacity': '#3636367A',
      'grayBold': '#474747',
      'pink': '#FF00FF',
      'splash': '#40006A',
      'error': '#FF8B8B',

    }
  },
  plugins: [require('@tailwindcss/forms')],
}