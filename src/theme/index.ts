import { MD3DarkTheme, MD3LightTheme, MD3Theme, configureFonts } from 'react-native-paper';

type ThemeMode = 'light' | 'dark';

// CEND Brand Palette
const brandColors = {
  primaryPurple: '#8020A2',     // Deep purple - primary brand color
  lightPurple: '#995FAF',       // Light purple variant
  paleLavender: '#DAC1E3',      // Pale lavender - accents/containers
  peach: '#F9D2AA',             // Peach - secondary/highlights
  white: '#FFFFFF',             // Pure white
  charcoal: '#1C1B1F',          // Soft black for text (more comfortable than pure black)
};

// Custom font configuration
// Product Sans for headers/titles, Poppins for body text
// Android requires explicit font family names for each weight
const fontConfig = {
  displayLarge: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 57,
    letterSpacing: 0,
    lineHeight: 64,
  },
  displayMedium: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 45,
    letterSpacing: 0,
    lineHeight: 52,
  },
  displaySmall: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 36,
    letterSpacing: 0,
    lineHeight: 44,
  },
  headlineLarge: {
    fontFamily: 'ProductSans-Bold',
    fontSize: 32,
    letterSpacing: 0,
    lineHeight: 40,
  },
  headlineMedium: {
    fontFamily: 'ProductSans-Regular',
    fontSize: 28,
    letterSpacing: 0,
    lineHeight: 36,
  },
  headlineSmall: {
    fontFamily: 'ProductSans-Regular',
    fontSize: 24,
    letterSpacing: 0,
    lineHeight: 32,
  },
  titleLarge: {
    fontFamily: 'ProductSans-Regular',
    fontSize: 22,
    letterSpacing: 0,
    lineHeight: 28,
  },
  titleMedium: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  titleSmall: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  bodyLarge: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    letterSpacing: 0.25,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    letterSpacing: 0.4,
    lineHeight: 16,
  },
  labelLarge: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelMedium: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelSmall: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    letterSpacing: 0.5,
    lineHeight: 16,
  },
} as const;

const createTheme = (mode: ThemeMode): MD3Theme => {
  const isDark = mode === 'dark';

  return {
    ...(isDark ? MD3DarkTheme : MD3LightTheme),
    dark: isDark,
    fonts: configureFonts({ config: fontConfig }),
    colors: {
      ...(isDark ? MD3DarkTheme.colors : MD3LightTheme.colors),
      // Primary colors
      primary: isDark ? brandColors.lightPurple : brandColors.primaryPurple,
      onPrimary: brandColors.white,
      primaryContainer: isDark ? brandColors.primaryPurple : brandColors.paleLavender,
      onPrimaryContainer: isDark ? brandColors.paleLavender : brandColors.primaryPurple,
      
      // Secondary colors
      secondary: brandColors.peach,
      onSecondary: brandColors.primaryPurple,
      secondaryContainer: isDark ? '#B5956B' : brandColors.peach,
      onSecondaryContainer: isDark ? brandColors.white : brandColors.primaryPurple,
      
      // Tertiary colors
      tertiary: brandColors.lightPurple,
      onTertiary: brandColors.white,
      tertiaryContainer: brandColors.paleLavender,
      onTertiaryContainer: brandColors.primaryPurple,
      
      // Error colors (keep standard for accessibility)
      error: '#B3261E',
      onError: brandColors.white,
      errorContainer: '#F9DEDC',
      onErrorContainer: '#410E0B',
      
      // Surface colors
      background: isDark ? '#121212' : brandColors.white,
      onBackground: isDark ? brandColors.white : brandColors.charcoal,
      surface: isDark ? '#1A1A1A' : brandColors.white,
      onSurface: isDark ? brandColors.white : brandColors.charcoal,
      surfaceVariant: isDark ? '#2D2D2D' : brandColors.paleLavender,
      onSurfaceVariant: isDark ? brandColors.white : brandColors.charcoal,
      
      // Utility colors
      outline: isDark ? brandColors.lightPurple : brandColors.primaryPurple,
      outlineVariant: isDark ? '#4D4D4D' : brandColors.paleLavender,
      inverseSurface: isDark ? brandColors.white : '#1A1A1A',
      inverseOnSurface: isDark ? brandColors.charcoal : brandColors.white,
      inversePrimary: isDark ? brandColors.primaryPurple : brandColors.lightPurple,
      shadow: brandColors.charcoal,
      surfaceDisabled: 'rgba(128, 32, 162, 0.12)',
      onSurfaceDisabled: 'rgba(128, 32, 162, 0.38)',
      backdrop: isDark ? 'rgba(153, 95, 175, 0.4)' : 'rgba(128, 32, 162, 0.4)',
    },
  };
};

export const lightTheme = createTheme('light');
export const darkTheme = createTheme('dark');

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

type ThemeName = keyof typeof themes;

export type AppTheme = (typeof themes)[ThemeName];
