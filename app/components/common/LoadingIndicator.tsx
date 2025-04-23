import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, ActivityIndicator } from 'react-native-paper';
import type { CustomTheme } from '@/types/theme';

interface LoadingIndicatorProps {
  message?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message = 'Loading...',
}) => {
  const theme = useTheme<CustomTheme>();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text style={[styles.message, { color: theme.colors.onSurface }]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
  },
}); 