/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.ts"],
  theme: {
    extend: {
      colors: {
        custom: {
          blue: "#ff49db",
          grey: "#ff7849",
        },
      },
    },
  },
  plugins: [],
};

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./*.{html,ts}"], // specify the files to scan so that Tailwind doesn't remove any classes you've defined but haven't used yet.
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
