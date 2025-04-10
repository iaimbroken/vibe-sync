import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, Text, Card, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ResultScreenProps {
  result: {
    type: 'text' | 'image';
    content: string;
    metadata?: {
      timestamp: string;
      tool: string;
      settings?: Record<string, any>;
    };
  };
  onSave: () => void;
  onSchedule: () => void;
  onPost: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  onSave,
  onSchedule,
  onPost,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView 
      style={[styles.wrapper, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={[
        styles.container,
        { 
          paddingBottom: insets.bottom + 20,
          paddingTop: insets.top + 12,
        }
      ]}
    >
      <Text 
        variant="headlineMedium" 
        style={[styles.title, { color: theme.colors.onSurface }]}
      >
        Generated Result
      </Text>

      <Card style={styles.resultCard}>
        <Card.Content>
          {result.type === 'text' ? (
            <Text 
              variant="bodyLarge" 
              style={[styles.textResult, { color: theme.colors.onSurface }]}
            >
              {result.content}
            </Text>
          ) : (
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: result.content }} 
                style={styles.imageResult}
                resizeMode="cover"
              />
            </View>
          )}

          {result.metadata && (
            <View style={[styles.metadata, { borderTopColor: theme.colors.outlineVariant }]}>
              <Text 
                variant="bodySmall"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                Generated using {result.metadata.tool} at{' '}
                {new Date(result.metadata.timestamp).toLocaleString()}
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>

      <View style={styles.buttonGroup}>
        <Button 
          mode="contained"
          onPress={onSave}
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          contentStyle={styles.buttonContent}
          icon="content-save"
        >
          Save to Vault
        </Button>

        <View style={styles.buttonRow}>
          <Button 
            mode="contained-tonal"
            onPress={onSchedule}
            style={[styles.buttonHalf, { backgroundColor: theme.colors.secondaryContainer }]}
            contentStyle={styles.buttonContent}
            icon="calendar"
          >
            Schedule
          </Button>

          <Button 
            mode="contained-tonal"
            onPress={onPost}
            style={[styles.buttonHalf, { backgroundColor: theme.colors.tertiaryContainer }]}
            contentStyle={styles.buttonContent}
            icon="share-variant"
          >
            Post Now
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 20,
    fontWeight: '600',
  },
  resultCard: {
    marginBottom: 24,
    borderRadius: 12,
  },
  textResult: {
    lineHeight: 24,
  },
  imageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  imageResult: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  metadata: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  buttonGroup: {
    gap: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    borderRadius: 12,
  },
  buttonHalf: {
    flex: 1,
    borderRadius: 12,
  },
  buttonContent: {
    height: 48,
  },
}); 