import React from 'react';
import { ThemeProvider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, AppTheme, CustomTheme } from './theme';

type ThemeContextType = {
  theme: AppTheme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
});

export const useThemeContext = () => React.useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = React.useState(colorScheme === 'dark');
  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = React.useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  React.useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  const contextValue = React.useMemo(() => ({
    theme,
    isDark,
    toggleTheme,
  }), [theme, isDark, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <PaperProvider theme={theme as CustomTheme}>
        <NavigationContainer theme={theme}>
          {children}
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}; 