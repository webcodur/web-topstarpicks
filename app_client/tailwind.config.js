/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6573c3',
          main: '#3f51b5',
          dark: '#2c3e8c',
        },
        secondary: {
          light: '#f73378',
          main: '#f50057',
          dark: '#ab003c',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      keyframes: {
        'curtain-left': {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-100%)' }
        },
        'curtain-right': {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(100%)' }
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        },
        'draw-to-player': {
          'from': { transform: 'translate(0, 0) rotate(0deg)' },
          'to': { transform: 'translate(-200px, 200px) rotate(360deg)' }
        },
        'draw-to-opponent': {
          'from': { transform: 'translate(0, 0) rotate(0deg)' },
          'to': { transform: 'translate(200px, -200px) rotate(360deg)' }
        },
        'fade-in-card': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        'float-and-fade': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '20%': { opacity: '1', transform: 'translateY(0)' },
          '80%': { opacity: '1', transform: 'translateY(-10px)' },
          '100%': { opacity: '0', transform: 'translateY(-20px)' }
        }
      },
      animation: {
        'curtain-left': 'curtain-left 1.5s cubic-bezier(0.8, 0, 0.2, 1) forwards',
        'curtain-right': 'curtain-right 1.5s cubic-bezier(0.8, 0, 0.2, 1) forwards',
        'fade-in': 'fade-in 0.5s ease-out 1s forwards',
        'draw-to-player': 'draw-to-player 1s ease-out forwards',
        'draw-to-opponent': 'draw-to-opponent 1s ease-out forwards',
        'fade-in-card': 'fade-in-card 0.5s ease-out',
        'float-and-fade': 'float-and-fade 1s ease-out forwards'
      }
    },
  },
  plugins: [],
}