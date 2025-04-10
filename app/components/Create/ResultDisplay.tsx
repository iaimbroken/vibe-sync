import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, ActivityIndicator, useTheme } from 'react-native-paper';
import { ToolType } from '../../screens/CreateLabScreen';

interface ResultDisplayProps {
  result: {
    type: ToolType;
    content: string | string[];
    metadata?: Record<string, any>;
  } | null;
  loading: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  loading,
}) => {
  const theme = useTheme();

  if (loading) {
    return (
      <Card style={styles.container}>
        <Card.Content style={styles.loadingContent}>
          <ActivityIndicator size="large" />
          <Text variant="bodyLarge">Creating something amazing...</Text>
        </Card.Content>
      </Card>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <Card style={styles.container}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          Generated Result
        </Text>
        
        {Array.isArray(result.content) ? (
          result.content.map((item, index) => (
            <Text 
              key={index} 
              variant="bodyLarge"
              style={[styles.content, { color: theme.colors.onSurface }]}
            >
              {item}
            </Text>
          ))
        ) : (
          <Text 
            variant="bodyLarge"
            style={[styles.content, { color: theme.colors.onSurface }]}
          >
            {result.content}
          </Text>
        )}

        {result.metadata && (
          <View style={styles.metadata}>
            <Text 
              variant="bodySmall"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              Generated using {result.type} at{' '}
              {new Date(result.metadata.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  loadingContent: {
    alignItems: 'center',
    gap: 16,
    paddingVertical: 32,
  },
  title: {
    marginBottom: 16,
  },
  content: {
    marginBottom: 8,
  },
  metadata: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
}); 