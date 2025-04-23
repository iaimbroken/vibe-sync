import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
  isDark: boolean;
  themeType: ThemeType;
  toggleTheme: () => void;
  setThemeType: (type: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
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

  const toggleTheme = () => {
    setThemeType(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const theme = isDark ? MD3DarkTheme : MD3LightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, themeType, toggleTheme, setThemeType }}>
      <PaperProvider theme={theme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
}; 