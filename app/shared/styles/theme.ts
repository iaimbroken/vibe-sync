import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,

    // Brand colors
    primary: '#6200EE',
    onPrimary: '#FFFFFF',
    primaryContainer: '#EADDFF',
    onPrimaryContainer: '#21005D',

    secondary: '#625B71',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#E8DEF8',
    onSecondaryContainer: '#1D192B',

    background: '#FEF7FF',
    onBackground: '#1C1B1F',

    surface: '#FEF7FF',
    onSurface: '#1C1B1F',
    surfaceVariant: '#E7E0EC',
    onSurfaceVariant: '#49454F',

    error: '#B3261E',
    onError: '#FFFFFF',
    errorContainer: '#F9DEDC',
    onErrorContainer: '#410E0B',

    // Custom colors
    success: '#28a745',
    onSuccess: '#FFFFFF',
    successContainer: '#C8E6C9',
    onSuccessContainer: '#1B5E20',

    warning: '#FFA500',
    onWarning: '#FFFFFF',
    warningContainer: '#FFE0B2',
    onWarningContainer: '#E65100',

    placeholder: '#999999',
  },

  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
    },
    fontSize: {
      displayLarge: 57,
      displayMedium: 45,
      displaySmall: 36,
      headlineLarge: 32,
      headlineMedium: 28,
      headlineSmall: 24,
      titleLarge: 22,
      titleMedium: 16,
      titleSmall: 14,
      bodyLarge: 16,
      bodyMedium: 14,
      bodySmall: 12,
      labelLarge: 14,
      labelMedium: 12,
      labelSmall: 11,
    },
    lineHeight: {
      displayLarge: 64,
      displayMedium: 52,
      displaySmall: 44,
      headlineLarge: 40,
      headlineMedium: 36,
      headlineSmall: 32,
      titleLarge: 28,
      titleMedium: 24,
      titleSmall: 20,
      bodyLarge: 24,
      bodyMedium: 20,
      bodySmall: 16,
      labelLarge: 20,
      labelMedium: 16,
      labelSmall: 16,
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },

  shadows: {
    xs: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 1,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 2,
      elevation: 3,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 6,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 9,
    },
  },
};

export type CustomTheme = typeof theme;
export default theme;
