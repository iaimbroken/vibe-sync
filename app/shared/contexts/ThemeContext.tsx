import React, { ReactNode } from 'react';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../styles/theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
}; 