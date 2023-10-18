/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        "light-purple": "#e4e6f3",
        black: "#000",
        "dark-navy": "#0c113b",
        accent: "#e12e1d",
        "text-fields-grey": "#7d7d7d",
        midnightblue: "#13194c",
        "light-grey": "#f5f0f0",
        "text-fields-grey-hf": "#4f5054",
      },
      borderRadius: {
        "31xl": "50px",
      },
    },

  },

  
  plugins: [],
};
