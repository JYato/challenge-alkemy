module.exports = {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#36BFB1",
          "secondary": "#038C73",
          "accent": "#02735E",
          "neutral": "#014034",
          "base-100": "#F2F2F3",
          "info": "#71C6F4",
          "success": "#198A46",
          "warning": "#C6780C",
          "error": "#F8766D",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
