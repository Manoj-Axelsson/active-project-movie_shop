/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/components/ui/**/*.{ts,tsx}",
    "./src/styles/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          matt: '#EFDBB2',
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};  
