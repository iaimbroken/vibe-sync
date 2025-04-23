import { MD3LightTheme, MD3DarkTheme, adaptNavigationTheme } from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, Theme as NavigationTheme } from '@react-navigation/native';

// Define custom spacing type
export type CustomSpacing = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

// Define custom theme type
export type CustomTheme = {
  colors: {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    onPrimaryContainer: string;
    secondary: string;
    onSecondary: string;
    secondaryContainer: string;
    onSecondaryContainer: string;
    tertiary: string;
    onTertiary: string;
    tertiaryContainer: string;
    onTertiaryContainer: string;
    error: string;
    onError: string;
    errorContainer: string;
    onErrorContainer: string;
    background: string;
    onBackground: string;
    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;
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
    border: string;
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
    spacing: CustomSpacing;
    borderRadius: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    shadows: {
      sm: {
        shadowColor: string;
        shadowOffset: { width: number; height: number };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
      };
      md: {
        shadowColor: string;
        shadowOffset: { width: number; height: number };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
      };
      lg: {
        shadowColor: string;
        shadowOffset: { width: number; height: number };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
      };
    };
  };
} & NavigationTheme;

// Define custom colors
const customColors = {
  primary: '#6200EE',
  onPrimary: '#FFFFFF',
  primaryContainer: '#EADDFF',
  onPrimaryContainer: '#21005D',
  secondary: '#03DAC6',
  onSecondary: '#000000',
  secondaryContainer: '#C8FFF4',
  onSecondaryContainer: '#002020',
  tertiary: '#7D5260',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#FFD8E4',
  onTertiaryContainer: '#31111D',
  error: '#B00020',
  onError: '#FFFFFF',
  errorContainer: '#FCD8DF',
  onErrorContainer: '#370B1E',
  background: '#FFFFFF',
  onBackground: '#000000',
  surface: '#FFFFFF',
  onSurface: '#000000',
  surfaceVariant: '#E7E0EC',
  onSurfaceVariant: '#49454F',
  outline: '#79747E',
  outlineVariant: '#CAC4D0',
  shadow: '#000000',
  scrim: '#000000',
  inverseSurface: '#322F35',
  inverseOnSurface: '#F5EFF7',
  inversePrimary: '#D0BCFF',
  surfaceDisabled: '#1C1B1F',
  onSurfaceDisabled: '#1C1B1F',
  backdrop: 'rgba(0, 0, 0, 0.5)',
  border: '#E0E0E0',
  elevation: {
    level0: 'transparent',
    level1: '#F7F2FA',
    level2: '#F3EDF7',
    level3: '#EEE8F4',
    level4: '#ECE6F3',
    level5: '#E8E2F0',
  },
};

const customDarkColors = {
  primary: '#D0BCFF',
  onPrimary: '#381E72',
  primaryContainer: '#4F378B',
  onPrimaryContainer: '#EADDFF',
  secondary: '#CCC2DC',
  onSecondary: '#332D41',
  secondaryContainer: '#4A4458',
  onSecondaryContainer: '#E8DEF8',
  tertiary: '#EFB8C8',
  onTertiary: '#492532',
  tertiaryContainer: '#633B48',
  onTertiaryContainer: '#FFD8E4',
  error: '#CF6679',
  onError: '#000000',
  errorContainer: '#8C1D18',
  onErrorContainer: '#F9DEDC',
  background: '#121212',
  onBackground: '#FFFFFF',
  surface: '#121212',
  onSurface: '#FFFFFF',
  surfaceVariant: '#1E1E1E',
  onSurfaceVariant: '#B0B0B0',
  outline: '#938F99',
  outlineVariant: '#49454F',
  shadow: '#000000',
  scrim: '#000000',
  inverseSurface: '#E6E1E5',
  inverseOnSurface: '#322F35',
  inversePrimary: '#6750A4',
  surfaceDisabled: '#1C1B1F',
  onSurfaceDisabled: '#1C1B1F',
  backdrop: 'rgba(0, 0, 0, 0.5)',
  border: '#2C2C2C',
  elevation: {
    level0: 'transparent',
    level1: '#1C1B1F',
    level2: '#211F26',
    level3: '#26242B',
    level4: '#2B2930',
    level5: '#2F2D35',
  },
};

// Define custom fonts
const customFonts = {
  regular: {
    fontFamily: 'System',
    fontWeight: 'normal' as const,
  },
  medium: {
    fontFamily: 'System',
    fontWeight: '500' as const,
  },
  bold: {
    fontFamily: 'System',
    fontWeight: '700' as const,
  },
  heavy: {
    fontFamily: 'System',
    fontWeight: '900' as const,
  },
};

// Define custom spacing
const customSpacing: CustomSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Define custom border radius
const customBorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

// Define custom shadows
const customShadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// Adapt navigation themes
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

// Create light theme
export const lightTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
    ...customColors,
  },
  fonts: customFonts,
  custom: {
    spacing: customSpacing,
    borderRadius: customBorderRadius,
    shadows: customShadows,
  },
} as const;

// Create dark theme
export const darkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    ...customDarkColors,
  },
  fonts: customFonts,
  custom: {
    spacing: customSpacing,
    borderRadius: customBorderRadius,
    shadows: customShadows,
  },
} as const;

// Export theme type
export type AppTheme = typeof lightTheme & NavigationTheme; 