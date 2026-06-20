/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        surface: '#FFFFFF',
        primary: '#0F766E',
        accent: '#D97706',
        danger: '#DC2626',
        muted: '#64748B',
      },
      spacing: { touch: 48 },
      fontSize: { title: ['24px', { lineHeight: '32px', fontWeight: '700' }] },
    },
  },
  plugins: [],
};
