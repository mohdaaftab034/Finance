/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sidebar: {
          bg: 'var(--sb-bg)',
          hover: 'var(--sb-hover)',
          active: 'var(--sb-active)',
          text: 'var(--sb-text)',
          textActive: 'var(--sb-text-active)',
          border: 'var(--sb-border)',
        },
        page: {
          bg: 'var(--page-bg)',
          card: 'var(--card-bg)',
          border: 'var(--card-border)',
          text: 'var(--text-primary)',
          muted: 'var(--text-secondary)',
        },
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      width: {
        sidebar: 'var(--sb-width)',
        sidebarCollapsed: 'var(--sb-collapsed-width)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'modal-in': {
          '0%': { opacity: 0, transform: 'scale(0.96)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 400ms ease-out both',
        'modal-in': 'modal-in 200ms ease-out both',
      },
    },
  },
  plugins: [],
}
