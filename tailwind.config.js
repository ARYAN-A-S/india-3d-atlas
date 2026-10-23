/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Aesthetic Black & White base tokens
        dark: {
          bg: '#090A0C',        // Deep obsidian background
          surface: '#111216',   // Elevated dark surface
          card: '#16181D',      // Card background
          cardHover: '#1D2027', // Card hover state
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(212, 175, 55, 0.35)',
        },
        // Refined luxury gold tokens
        gold: {
          50: '#FDFBF7',
          100: '#FBF5E6',
          200: '#F5E7C4',
          300: '#EED69B',
          400: '#E4C26E',
          500: '#D4AF37', // Classic rich metallic gold
          600: '#B89224',
          700: '#947217',
          800: '#6E530F',
          900: '#483508',
          champagne: '#EADBB6',
          light: '#F3E5AB',
          metallic: '#C5A059',
        },
        charcoal: {
          950: '#070809',
          900: '#0E1013',
          800: '#181A1F',
          700: '#262930',
          600: '#3C404B',
          500: '#585D6B',
          400: '#818898',
          300: '#A9B0C0',
          200: '#D1D5DF',
          100: '#EDEDF2',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -4px rgba(212, 175, 55, 0.25)',
        'dark-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'elevated': '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
}
