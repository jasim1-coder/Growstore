/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        formBackground: "#FCFDFC",
        baseGreen: "#3BB77E",
        lightGreen: "#DEF9EC",
        uiGrey: "#ADADAD",
        greyLight: "#F3F3F3",
        uiBlack: "#253D4E",
        uiWhite: "#FFFFFF",
        uiRed: "#DE3A3A",
        textDim: "#908F8F",
        rightBar: "#F2F2F2",
      },
    },
    container: {
      center: true,
      padding: "1rem",
    },
    screens: {
      xs: "320px",
      ss: "375px",
      sm: "440px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
};
