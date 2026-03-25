/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF6ED',
          200: '#F5ECDA',
          300: '#EDE0C4',
          400: '#D4C5A0',
          500: '#B8A67E',
        },
        espresso: {
          50: '#F5F0EB',
          100: '#E8DFD4',
          200: '#C9B99E',
          300: '#A89070',
          400: '#7D6548',
          500: '#5A4530',
          600: '#3D2E1F',
          700: '#2A1F14',
          800: '#1A130C',
          900: '#0D0A07',
        },
        gold: {
          400: '#D4A853',
          500: '#C9963C',
          600: '#B8842E',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-outfit)', 'sans-serif'],
        accent: ['var(--font-great-vibes)', 'cursive'],
      },
      letterSpacing: {
        ultrawide: '0.35em',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
