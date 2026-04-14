/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
          950: "#172554",
        },
        accent: "#f97316",
        slate: {
          950: "#020617",
        },
      },
      boxShadow: {
        soft: "0 20px 45px -24px rgba(15, 23, 42, 0.35)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top left, rgba(37, 99, 235, 0.18), transparent 40%), radial-gradient(circle at top right, rgba(249, 115, 22, 0.14), transparent 30%)",
      },
    },
  },
  plugins: [],
};
