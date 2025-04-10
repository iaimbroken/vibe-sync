import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigator } from './app/navigation/AppNavigator';
import { ThemeProvider } from './app/shared/contexts/ThemeContext';
import { AuthProvider } from './app/shared/contexts/AuthContext';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
