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
        primary: '#4FD1C5',
        income: '#48BB78',
        expense: '#F56565',
        background: {
          light: '#F7FAFC',
          dark: '#1A202C'
        },
        text: {
          'light-primary': '#2D3748',
          'dark-primary': '#F7FAFC',
          'light-secondary': '#A0AEC0',
          'dark-secondary': '#A0AEC0'
        },
        border: {
          light: '#E2E8F0',
          dark: '#4A5568'
        },
        surface: {
          light: '#FFFFFF',
          dark: '#2D3748'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
