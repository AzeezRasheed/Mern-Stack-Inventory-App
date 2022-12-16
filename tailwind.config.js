module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  extend: {
    gridTemplateColumns: {
      "custom-sidenav-layout": "auto 1fr",
    },
  },
  theme: {
    extend: {},
  },
  variant: { backgroundColor: ["active"] },
  plugins: [],
};
