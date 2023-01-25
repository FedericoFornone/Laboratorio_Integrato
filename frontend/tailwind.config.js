const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
  daisyui: {
    themes: [
      {
        "nomad-light": {
          primary: "#E70B67",
          secondary: "#3F3D56",
          accent: "#f1cfdd",
          neutral: "#2F4858",
          "base-100": "#F2f2f2",
          "base-content": "#32323233",
          info: "#FC2F20",
          success: "#B13990",
          warning: "#6D4E97",
          error: "#2f2e41",
          transparent: "#ffffff00",
        },
        "nomad-dark": {
          primary: "#E70B67",
          secondary: "#F2f2f2",
          accent: "#2e173a",
          neutral: "#F2f2f2",
          "base-100": "#100E2D",
          "base-content": "#32323233",
          info: "#9CD5F2",
          success: "#28E671",
          warning: "#A25E10",
          error: "#E56C76",
          transparent: "#ffffff00",
        },
      },
    ],
  },
};
