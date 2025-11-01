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
        primary: '#13c8ec',
        income: '#48BB78',
        expense: '#F56565',
        background: {
          light: '#f6f8f8',
          dark: '#101f22'
        },
        card: {
          light: '#ffffff',
          dark: '#18282b'
        },
        text: {
          light: '#0d191b',
          dark: '#e0e4e5',
          'muted-light': '#4c8d9a',
          'muted-dark': '#8a9a9d',
          'primary-light': '#1F2937',
          'primary-dark': '#F9FAFB',
          'secondary-light': '#6B7280',
          'secondary-dark': '#9CA3AF'
        },
        border: {
          light: '#cfe3e7',
          dark: '#2a3a3d'
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
        display: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'DEFAULT': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        'full': '9999px'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
