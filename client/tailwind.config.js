module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      SourceSans: ['Source Sans Pro', 'sans-serif'],
      Dosis: ['Dosis', 'sans-serif'],
      Barlow: ['Barlow', 'sans-serif'],
    },
    backgroundImage: {
      separator: "url('/images/separator.png')",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
