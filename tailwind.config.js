/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
        colors: {
            'privacy-excellent': "#10b981",
            'privacy-good': "#3b82f6",
            'privacy-fair': "#f59e0b",
            'privacy-poor': "#ef4444",
            'privacy-very-poor': "#991b1b",
        },
    },
  },
  plugins: [],
};