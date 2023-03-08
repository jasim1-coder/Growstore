/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        uiBlack: "#141319",
        uiGreen: "#00CC96",
        uiRed: "#DE3A3A",
        textDim: "#908F8F",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        uiGray: "#AEAEAE",
        rightBar: "#F2F2F2",
        formBackground: "#FCFDFC",
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "620px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
