import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { lightTheme, darkTheme, AppTheme, CustomTheme } from '@/theme/theme';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: AppTheme;
  isDark: boolean;
  themeType: ThemeType;
  toggleTheme: () => void;
  setThemeType: (type: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  themeType: 'system',
  toggleTheme: () => {},
  setThemeType: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>('system');
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    if (themeType === 'system') {
      setIsDark(systemColorScheme === 'dark');
    } else {
      setIsDark(themeType === 'dark');
    }
  }, [themeType, systemColorScheme]);

  const toggleTheme = useCallback(() => {
    setThemeType(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  const contextValue = useMemo(() => ({
    theme,
    isDark,
    themeType,
    toggleTheme,
    setThemeType,
  }), [theme, isDark, themeType, toggleTheme]);

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