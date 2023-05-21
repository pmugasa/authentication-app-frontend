/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-gray": "#333333",
        "light-gray": "#828282",
        "very-light-gray": "#E0E0E0",
        "dark-blue": "#2F80ED",
        "light-blue": "#2D9CDB",
        warning: "#EB5757",
        primary: "#FAFAFB",
      },
    },
  },
  plugins: [],
};
