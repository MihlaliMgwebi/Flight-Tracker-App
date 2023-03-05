/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.ts"],
  theme: {
    extend: {
      backgroundImage: {
        cloudySky: "url('/assets/bg.avif')",
      },
      colors: {
        custom: {
          blue: "rgb(77, 153, 231)",
          darkGrey: "#333",
          grey: "#e7e7e7",
          lightGrey: "#f1f1f1",
        },
      },
      boxShadow: {
        whitesmoke: "0 0 1rem whitesmoke;",
      },
    },
  },
  plugins: [],
};
