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
        "nomad-dark": {
          primary: "#E70B67",
          secondary: "#f2e28a",
          accent: "#ef9ea4",
          neutral: "#1E141F",
          "base-100": "#E1E4EA",
          info: "#9CD5F2",
          success: "#28E671",
          warning: "#A25E10",
          error: "#E56C76",
        }
      },
    ],
  },
};
