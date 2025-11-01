/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#13c8ec",
        "income": "#48BB78", 
        "expense": "#F56565",
        "background-light": "var(--background-light)",
        "background-dark": "var(--background-dark)",
        "text-light": "var(--text-light)",
        "text-dark": "var(--text-dark)",
        "text-muted-light": "#4c8d9a",
        "text-muted-dark": "#8a9a9d",
        "border-light": "#cfe3e7",
        "border-dark": "#2a3a3d", 
        "card-light": "#ffffff",
        "card-dark": "#18282b",
        "success": "#28A745",
        "danger": "#DC3545",
      },
      fontFamily: {
        "display": ["Inter", ...defaultTheme.fontFamily.sans]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem", 
        "xl": "0.75rem",
        "full": "9999px"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/aspect-ratio'),
  ],
}
