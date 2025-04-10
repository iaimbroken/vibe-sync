import React from 'react';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../theme/theme';
import { BottomNav } from './components/common/BottomNav';

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <Slot />
        <BottomNav />
      </SafeAreaProvider>
    </PaperProvider>
  );
} 