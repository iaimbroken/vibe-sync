import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, Button } from 'react-native-paper';
import type { CustomTheme } from '@/types/theme';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorBoundaryContent error={this.state.error} onRetry={() => this.setState({ hasError: false, error: null })} />;
    }

    return this.props.children;
  }
}

const ErrorBoundaryContent: React.FC<{ error: Error | null; onRetry: () => void }> = ({ error, onRetry }) => {
  const theme = useTheme<CustomTheme>();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.error }]}>
        Something went wrong
      </Text>
      <Text style={[styles.message, { color: theme.colors.onSurface }]}>
        {error?.message || 'An unexpected error occurred'}
      </Text>
      <Button
        mode="contained"
        onPress={onRetry}
        style={styles.button}
      >
        Try again
      </Button>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
}); 