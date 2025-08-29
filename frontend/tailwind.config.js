export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C0392B",   // Burgundy red
        secondary: "#247BA0", // Teal
        gold: "#D4AF37",      // Luxury gold
        background: "#FAF9F6",// Soft ivory
        charcoal: "#2D2D2D",  // Text
        muted: "#6E6E6E",     // Subtext
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
