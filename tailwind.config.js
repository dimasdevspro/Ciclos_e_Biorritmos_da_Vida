/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "media",
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    safelist: [
  "animate-fade-in",
  "bg-blue-100",
  "bg-blue-200",
  "rounded-xl",
  "shadow",
],
};

