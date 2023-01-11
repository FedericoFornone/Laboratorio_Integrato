/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require('@tailwindcss/forms')],
  daisyui: {
    themes: [
      {
        "nomad-light": {
          primary: "#E70B67",
          secondary: "#3F3D56",
          accent: "#f1cfdd",
          neutral: "#2F4858",
          "base-100": "#F2f2f2",
          info: "#FC2F20",
          success: "#B13990",
          warning: "#6D4E97",
          error: "#2f2e41",
        },
      },
    ],
  },
};
