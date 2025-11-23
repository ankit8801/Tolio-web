module.exports = {
  content: ["./src/**/*.{js,jsx}"],

  darkMode: "class", // 🔥 Enables class-based dark mode

  theme: {
    extend: {
      colors: {
        tolio: {
          lime: "#84cc16",
          emerald: "#059669",
          dark: "#0d0d0d",
        },
      },

      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.35)",
      },

      backgroundImage: {
        "tolio-gradient": "linear-gradient(to bottom right, #84cc16, #059669)",
      },
    },
  },

  plugins: [],
};
