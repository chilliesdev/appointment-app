module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#22C55E',
        'secondary': '#D1D5DB'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'sans': ['ui-sans-serif', 'system-ui']
      },
    }
  },
  plugins: [],
}
