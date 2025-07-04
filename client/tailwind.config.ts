import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cinema-gradient': 'linear-gradient(135deg, #1a0a0a 0%, #2d1b1b 50%, #1a0a0a 100%)',
        'red-carpet': 'linear-gradient(135deg, #8b0000 0%, #dc143c 50%, #b22222 100%)',
        'golden-hour': 'linear-gradient(135deg, #ffd700 0%, #ffb347 50%, #daa520 100%)',
        'vintage-film': 'linear-gradient(45deg, #8b4513 0%, #cd853f 50%, #daa520 100%)',
      },
      colors: {
        // Retro filmové barvy
        film: {
          black: '#1a0a0a',
          dark: '#2d1b1b',
          brown: '#3d2b1f',
          cream: '#f5f5dc',
          gold: '#ffd700',
          brass: '#b5651d',
        },
        cinema: {
          red: '#dc143c',
          crimson: '#8b0000',
          burgundy: '#b22222',
          velvet: '#722f37',
          curtain: '#4a0e0e',
        },
        vintage: {
          gold: '#daa520',
          bronze: '#cd7f32',
          sepia: '#704214',
          cream: '#fffdd0',
          ivory: '#ffeaa7',
          amber: '#ffbf00',
        },
        // Keep shadcn colors for compatibility
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        'cinema': ['Playfair Display', 'serif'],
        'vintage': ['Bebas Neue', 'sans-serif'],
        'classic': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'curtain': 'curtain 4s ease-in-out infinite',
        'spotlight': 'spotlight 3s ease-in-out infinite',
        'film-roll': 'film-roll 8s linear infinite',
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
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'curtain': {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(0.95)' },
        },
        'spotlight': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        'film-roll': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      boxShadow: {
        'vintage': '0 4px 20px rgba(218, 165, 32, 0.3)',
        'cinema': '0 8px 32px rgba(220, 20, 60, 0.4)',
        'film': '0 0 40px rgba(255, 215, 0, 0.2)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;