import { MD3DarkTheme, MD3LightTheme, MD3Theme } from 'react-native-paper';

type ThemeMode = 'light' | 'dark';

// CEND Brand Palette
const brandColors = {
  primaryPurple: '#8020A2',     // Deep purple - primary brand color
  lightPurple: '#995FAF',       // Light purple variant
  paleLavender: '#DAC1E3',      // Pale lavender - accents/containers
  peach: '#F9D2AA',             // Peach - secondary/highlights
  white: '#FFFFFF',             // Pure white
};

const createTheme = (mode: ThemeMode): MD3Theme => {
  const isDark = mode === 'dark';

  return {
    ...(isDark ? MD3DarkTheme : MD3LightTheme),
    dark: isDark,
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
      onBackground: isDark ? brandColors.white : '#000000',
      surface: isDark ? '#1A1A1A' : brandColors.white,
      onSurface: isDark ? brandColors.white : '#000000',
      surfaceVariant: isDark ? '#2D2D2D' : brandColors.paleLavender,
      onSurfaceVariant: isDark ? brandColors.white : '#000000',
      
      // Utility colors
      outline: isDark ? brandColors.lightPurple : brandColors.primaryPurple,
      outlineVariant: isDark ? '#4D4D4D' : brandColors.paleLavender,
      inverseSurface: isDark ? brandColors.white : '#1A1A1A',
      inverseOnSurface: isDark ? '#000000' : brandColors.white,
      inversePrimary: isDark ? brandColors.primaryPurple : brandColors.lightPurple,
      shadow: '#000000',
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
