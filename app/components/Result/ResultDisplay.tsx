import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';

interface Metadata {
  sentiment?: string;
  summary?: string;
  tags?: string[];
  timestamp?: string;
  [key: string]: any;
}

export interface ResultDisplayProps {
  result: {
    content: string | string[];
    type: 'image' | 'text';
    metadata?: Metadata;
  };
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const theme = useTheme();

  const renderMetadata = (metadata?: Metadata) => {
    if (!metadata) return null;

    return (
      <View style={styles.metadataContainer}>
        {metadata.sentiment && (
          <Text style={styles.metadataItem}>
            Sentiment: {metadata.sentiment}
          </Text>
        )}
        {metadata.summary && (
          <Text style={styles.metadataItem}>
            Summary: {metadata.summary}
          </Text>
        )}
        {metadata.tags && metadata.tags.length > 0 && (
          <Text style={styles.metadataItem}>
            Tags: {metadata.tags.join(', ')}
          </Text>
        )}
      </View>
    );
  };

  const renderContent = () => {
    if (result.type === 'image') {
      return (
        <Image
          source={{ uri: result.content as string }}
          style={styles.image}
          resizeMode="contain"
          testID="result-image"
          accessibilityLabel="Generated image result"
        />
      );
    }

    return (
      <Text
        style={[styles.text, { color: theme.colors.onSurface }]}
        testID="result-text"
        accessibilityLabel="Generated text result"
      >
        {Array.isArray(result.content) ? result.content.join('\n') : result.content}
      </Text>
    );
  };

  return (
    <Card style={styles.container} testID="result-display">
      <Card.Content>
        {renderContent()}
        {renderMetadata(result.metadata)}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  metadataContainer: {
    marginTop: 16,
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  metadataItem: {
    marginVertical: 4,
    fontSize: 14,
  },
}); 