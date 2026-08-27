/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: "#151515",
        "surface-hover": "#1F1F1F",
        border: "#262626",
        "text-primary": "#F5F5F0",
        muted: {
          DEFAULT: "#8A8A8A",
          dark: "#525252",
        },
        accent: {
          DEFAULT: "#B8A47E",
          hover: "#A3916D",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
};
