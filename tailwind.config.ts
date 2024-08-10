import type { Config } from 'tailwindcss'
const { fontFamily } = require('tailwindcss/defaultTheme')

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        "card-visible": {
          "0%": {
            transform:
              "rotate3d(1, 12, -3, 18deg) translate3d(210px, 0px, 90px)",
          },
          "95%": {
            transform:
              "rotate3d(0, 0.2, 0, 180deg) translate3d(0px, calc(150% - 45vh), 0px) scale(3)",
          },
          "100%": {
            transform:
              "rotate3d(0, 0.2, 0, 180deg) translate3d(0px, calc(150% - 45vh), 0px) scale(3)",
          },
        },
        "card-on-stack": {
          "0%": {
            transform:
              "rotate3d(0, 0.2, 0, 180deg) translate3d(0px, calc(150% - 45vh), 0px) scale(3)",
          },
          "5%": {
            transform:
              "rotate3d(0, 0.2, 0, 180deg) translate3d(0px, calc(150% - 45vh), 0px) scale(3)",
          },
          "100%": {
            transform: "rotate3d(0, 0, 0, 0) translate3d(0, 0px, 0px)",
          },
        },
        "card-details": {
          "0%": {
            opacity: "0",
            pointerEvents: "none",
          },
          "80%": {
            opacity: "0",
            pointerEvents: "none",
          },
          "100%": {
            opacity: "1",
            pointerEvents: "auto",
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        "card-visible": "card-visible 0.8s ease-in-out forwards",
        "card-hidden": "card-on-stack 0.8s ease-in-out forwards",
        "card-details": "card-details 0.8s ease-in-out forwards",
        "card-details-hidden": "card-details 0.8s ease-in-out reverse",
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        'jbm': ['JetBrainsMono', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
