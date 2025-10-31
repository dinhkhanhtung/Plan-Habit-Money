/** @type {import('tailwindcss').Config} */
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
        "primary": "#137fec",
        "income": "#48BB78",
        "expense": "#F56565",
        "background-light": "#f6f7f8",
        "background-dark": "#101922",
        "text-light": "#0d141b",
        "text-dark": "#f6f7f8",
        "subtext-light": "#4c739a",
        "subtext-dark": "#a0b3c6",
        "border-light": "#cfdbe7",
        "border-dark": "#2c3e50",
        "surface-light": "#ffffff",
        "surface-dark": "#1a2a3a",
        "success": "#28A745",
        "danger": "#DC3545",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}