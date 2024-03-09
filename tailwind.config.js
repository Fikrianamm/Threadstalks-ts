/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oleoScript: ["Oleo Script", "system-ui"],
        openSans: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}
