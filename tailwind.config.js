/** @type {import('tailwindcss').Config} */
export default {
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
        card: {
          light: '#FFFFFF',
          dark: '#111827'
        },
        text: {
          'primary-light': '#1F2937',
          'primary-dark': '#F9FAFB',
          'secondary-light': '#6B7280',
          'secondary-dark': '#9CA3AF'
        },
        border: {
          light: '#E5E7EB',
          dark: '#374151'
        },
        surface: {
          light: '#FFFFFF',
          dark: '#111827'
        },
        success: '#50E3C2',
        danger: '#EF4444',
        warning: '#F59E0B'
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
