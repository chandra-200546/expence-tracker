/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./hooks/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
    "./services/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          950: "#050816",
          900: "#0A1021",
          800: "#10182D",
          700: "#16203A"
        },
        brand: {
          500: "#4ADE80",
          600: "#22C55E",
          700: "#16A34A"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(74, 222, 128, 0.12), 0 20px 45px rgba(10, 16, 33, 0.45)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(74, 222, 128, 0.15), transparent 30%), linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};
