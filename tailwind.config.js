/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C6602F',
          dark: '#9C4A22',
          light: '#E68A5C',
        },
        secondary: {
          DEFAULT: '#1F5C4F',
          dark: '#143D34',
          light: '#E8F0EC',
        },
        accent: {
          DEFAULT: '#D9A441',
          dark: '#B38226',
          light: '#F4D488',
        },
        cream: {
          DEFAULT: '#FBF6EE',
          dark: '#F3EAD8',
          card: '#FFFDF9',
        },
        ink: {
          DEFAULT: '#2B2420',
          light: '#6B6058',
          muted: '#948880',
        },
        warmborder: '#E7DCC9',
        success: '#3E7D5A',
        danger: '#B4432E',
      },
      fontFamily: {
        serif: ['var(--font-heading)', '"Plus Jakarta Sans"', '"Outfit"', 'sans-serif'],
        sans: ['var(--font-body)', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(43, 36, 32, 0.05)',
        'warm-md': '0 4px 20px rgba(43, 36, 32, 0.08)',
        'warm-lg': '0 12px 32px rgba(43, 36, 32, 0.12)',
      }
    },
  },
  plugins: [],
}
