import { MD3DarkTheme, MD3LightTheme, MD3Theme } from 'react-native-paper';

type ThemeMode = 'light' | 'dark';

const basePalette = {
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
  error: '#B3261E',
  onError: '#FFFFFF',
  errorContainer: '#F9DEDC',
  onErrorContainer: '#410E0B',
  outline: '#7A757F',
};

const createTheme = (mode: ThemeMode): MD3Theme => {
  const isDark = mode === 'dark';

  return {
    ...(isDark ? MD3DarkTheme : MD3LightTheme),
    dark: isDark,
    colors: {
      ...(isDark ? MD3DarkTheme.colors : MD3LightTheme.colors),
      ...basePalette,
      primary: isDark ? '#D0BCFF' : basePalette.primary,
      onPrimary: isDark ? '#381E72' : basePalette.onPrimary,
      primaryContainer: isDark ? '#4F378B' : basePalette.primaryContainer,
      onPrimaryContainer: isDark ? '#EADDFF' : basePalette.onPrimaryContainer,
      secondary: isDark ? '#CCC2DC' : basePalette.secondary,
      onSecondary: isDark ? '#332D41' : basePalette.onSecondary,
      secondaryContainer: isDark ? '#4A4458' : basePalette.secondaryContainer,
      onSecondaryContainer: isDark ? '#E8DEF8' : basePalette.onSecondaryContainer,
      tertiary: isDark ? '#EFB8C8' : basePalette.tertiary,
      onTertiary: isDark ? '#492532' : basePalette.onTertiary,
      tertiaryContainer: isDark ? '#633B48' : basePalette.tertiaryContainer,
      onTertiaryContainer: isDark ? '#FFD8E4' : basePalette.onTertiaryContainer,
      background: isDark ? '#1D1B20' : '#F7F2FA',
      onBackground: isDark ? '#E6E1E6' : '#1D1B20',
      surface: isDark ? '#1D1B20' : '#FFFBFE',
      onSurface: isDark ? '#E6E1E6' : '#1D1B20',
      surfaceVariant: isDark ? '#49454F' : '#E7E0EC',
      onSurfaceVariant: isDark ? '#CAC4D0' : '#4A4458',
      outline: isDark ? '#948F99' : basePalette.outline,
      outlineVariant: isDark ? '#49454F' : '#CAC4D0',
      inverseSurface: isDark ? '#E6E1E6' : '#313033',
      inverseOnSurface: isDark ? '#313033' : '#F4EFF4',
      inversePrimary: isDark ? basePalette.primary : '#D0BCFF',
      shadow: '#000000',
      surfaceDisabled: 'rgba(26, 28, 30, 0.12)',
      onSurfaceDisabled: 'rgba(26, 28, 30, 0.38)',
      backdrop: 'rgba(50, 47, 55, 0.4)',
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
