const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ...fontFamily,
        sans: ["Varela Round", "sans-serif"],
      },
      gridTemplateColumns: {
        'input-field': '20% 1fr',
        'user-header': 'auto 1fr auto',
        'user-cards': 'repeat(auto-fit, minmax(270px, 1fr))',
      },
      boxShadow: {
        'sharp': '3px 3px 0px 0px #000'
      }
    },
  },
  plugins: [],
};
