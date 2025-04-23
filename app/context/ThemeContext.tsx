import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { lightTheme, darkTheme, CustomTheme } from '@/theme/theme';

// Define theme types
export type ThemeType = 'light' | 'dark' | 'system';

// Create context
interface ThemeContextType {
  themeType: ThemeType;
  isDark: boolean;
  toggleTheme: () => void;
  setThemeType: (type: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use theme context
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>('system');

  // Determine if we should use dark theme
  const isDark = themeType === 'system' 
    ? systemColorScheme === 'dark'
    : themeType === 'dark';

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setThemeType(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Get the appropriate theme based on the current state
  const theme = isDark ? darkTheme : lightTheme;
  const navigationTheme = isDark ? NavigationDarkTheme : NavigationDefaultTheme;

  return (
    <ThemeContext.Provider value={{ themeType, isDark, toggleTheme, setThemeType }}>
      <PaperProvider theme={theme as CustomTheme}>
        <NavigationContainer theme={navigationTheme}>
          {children}
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}; 