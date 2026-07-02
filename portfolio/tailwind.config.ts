import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-inter)', 'var(--font-oswald)', 'sans-serif'],
        mono: ['var(--font-fira-code)', 'var(--font-jetbrains)', 'monospace'],
        sans: ['var(--font-roboto)', 'var(--font-poppins)', 'sans-serif'],
        serif: ['var(--font-lora)', 'var(--font-playfair)', 'serif'],
      },
      colors: {
        velvet: {
          900: '#0a0e1a',
          800: '#0d1429',
          700: '#111c38',
          600: '#162447',
          500: '#1a2d56',
          400: '#1f3665',
          300: '#244074',
          200: '#294a83',
          100: '#2e5492',
        },
        biolum: {
          50: '#e6f7ff',
          100: '#b3e5ff',
          200: '#80d4ff',
          300: '#4dc3ff',
          400: '#1ab2ff',
          500: '#00a8ff',
          600: '#0096e6',
          700: '#007acc',
          800: '#005e99',
          900: '#004266',
        },
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 168, 255, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 168, 255, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
