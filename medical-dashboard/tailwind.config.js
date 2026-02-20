/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444"
      }
    }
  },
  plugins: []
};
