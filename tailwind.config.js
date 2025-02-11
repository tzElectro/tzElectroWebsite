const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#00A3FF',
          secondary: '#6C72CB',
          accent: '#FF6B6B',
          light: '#F8FAFC',
          dark: '#1A1F2C',
          gradient: {
            start: '#CDFCFFF',
            middle: '#FF5C00',
            end: '#00FFFF'
          }
        }
      },
      backgroundImage: {
        'gradient-shine': 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)',
        'gradient-modern': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-glow': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        'hero-gradient': 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)'
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        glow: {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        spotlight: {
          '0%': { opacity: 0, transform: 'scale(0.8)' },
          '100%': { opacity: 1, transform: 'scale(1)' }
        },
        'meteor-effect': {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: 1 },
          '70%': { opacity: 1 },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: 0
          }
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: 1 },
          "70%": { opacity: 1 },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: 0,
          },
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        glow: 'glow 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        spotlight: 'spotlight 2s ease-in-out forwards',
        meteor: 'meteor 5s linear infinite'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: '#00A3FF',
          secondary: '#6C72CB',
          accent: '#FF6B6B',
          background: '#F8FAFC',
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444'
        }
      },
      dark: {
        colors: {
          primary: '#00A3FF',
          secondary: '#6C72CB',
          accent: '#FF6B6B',
          background: '#1A1F2C',
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444'
        }
      }
    }
  })]
};