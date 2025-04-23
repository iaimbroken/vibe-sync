import { MD3Theme } from 'react-native-paper';

export interface CustomTheme extends MD3Theme {
  colors: {
    primary: string;
    onPrimary: string;
    secondary: string;
    onSecondary: string;
    background: string;
    onBackground: string;
    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;
    error: string;
    onError: string;
    border: string;
    // MD3Colors properties
    primaryContainer: string;
    onPrimaryContainer: string;
    secondaryContainer: string;
    onSecondaryContainer: string;
    tertiary: string;
    onTertiary: string;
    tertiaryContainer: string;
    onTertiaryContainer: string;
    errorContainer: string;
    onErrorContainer: string;
    outline: string;
    outlineVariant: string;
    shadow: string;
    scrim: string;
    inverseSurface: string;
    inverseOnSurface: string;
    inversePrimary: string;
    surfaceDisabled: string;
    onSurfaceDisabled: string;
    backdrop: string;
    elevation: {
      level0: string;
      level1: string;
      level2: string;
      level3: string;
      level4: string;
      level5: string;
    };
  };
  custom: {
    spacing: {
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    shadows?: {
      sm: {
        shadowColor: string;
        shadowOffset: {
          width: number;
          height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
      };
      md: {
        shadowColor: string;
        shadowOffset: {
          width: number;
          height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
      };
      lg: {
        shadowColor: string;
        shadowOffset: {
          width: number;
          height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
      };
    };
  };
} 