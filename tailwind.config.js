/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#6750A4',
        onPrimary: '#FFFFFF',
        primaryContainer: '#EADDFF',
        onPrimaryContainer: '#21005D',
        secondary: '#625B71',
        onSecondary: '#FFFFFF',
        secondaryContainer: '#E8DEF8',
        onSecondaryContainer: '#1D192B',
        tertiary: '#7D5260',
        onTertiary: '#FFFFFF',
        tertiaryContainer: '#FFD8E4',
        onTertiaryContainer: '#31111D',
        background: '#F7F2FA',
        onBackground: '#1D1B20',
        surface: '#FFFFFF',
        onSurface: '#1D1B20',
        surfaceVariant: '#E7E0EC',
        onSurfaceVariant: '#4A4458',
        outline: '#7A757F',
        inverseSurface: '#313033',
        inverseOnSurface: '#F4EFF4',
        success: '#4CAF50',
        warning: '#F2C94C',
        error: '#B3261E'
      },
      borderRadius: {
        xl: '1.25rem'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};