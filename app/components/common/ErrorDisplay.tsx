import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, Button } from 'react-native-paper';
import type { CustomTheme } from '@/types/theme';

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
  retryText?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  retryText = 'Retry',
}) => {
  const theme = useTheme<CustomTheme>();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.errorText, { color: theme.colors.error }]}>
        {error}
      </Text>
      {onRetry && (
        <Button
          mode="contained"
          onPress={onRetry}
          style={styles.retryButton}
        >
          {retryText}
        </Button>
      )}
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
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    marginTop: 8,
  },
});