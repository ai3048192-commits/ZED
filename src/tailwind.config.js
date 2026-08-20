/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // <--- هذه خطوة مهمة جداً لكي يعمل كلاس dark:
  theme: {
    extend: {},
  },
  plugins: [],
}