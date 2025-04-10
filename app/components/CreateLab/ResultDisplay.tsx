import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Text, Button, useTheme, ActivityIndicator, Surface, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ResultDisplayProps {
  type: 'text' | 'image';
  result: string | null;
  loading: boolean;
  error: string | null;
  onSave: () => void;
  onSchedule: () => void;
  onPost: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  type,
  result,
  loading,
  error,
  onSave,
  onSchedule,
  onPost,
}) => {
  const theme = useTheme();
  const screenWidth = Dimensions.get('window').width;

  if (loading) {
    return (
      <Surface style={[styles.loadingContainer, { backgroundColor: theme.colors.surface }]} elevation={1}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text variant="titleMedium" style={[styles.loading, { color: theme.colors.primary }]}>
          Creating magic...
        </Text>
      </Surface>
    );
  }

  if (error) {
    return (
      <Surface style={[styles.errorContainer, { backgroundColor: theme.colors.errorContainer }]} elevation={1}>
        <MaterialCommunityIcons name="alert-circle" size={24} color={theme.colors.error} />
        <Text variant="bodyLarge" style={[styles.error, { color: theme.colors.error }]}>
          {error}
        </Text>
      </Surface>
    );
  }

  if (!result) return null;

  return (
    <Card style={styles.container} elevation={2}>
      {type === 'image' ? (
        <Card.Cover
          source={{ uri: result }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <Card.Content>
          <Text
            variant="bodyLarge"
            style={[styles.textResult, { color: theme.colors.onSurface }]}
          >
            {result}
          </Text>
        </Card.Content>
      )}
      <Card.Actions style={styles.actions}>
        <Button
          mode="outlined"
          icon="content-save-outline"
          onPress={onSave}
          style={styles.actionButton}
          labelStyle={styles.buttonLabel}
        >
          Save
        </Button>
        <Button
          mode="outlined"
          icon="calendar-outline"
          onPress={onSchedule}
          style={styles.actionButton}
          labelStyle={styles.buttonLabel}
        >
          Schedule
        </Button>
        <Button
          mode="contained"
          icon="send"
          onPress={onPost}
          style={styles.actionButton}
          labelStyle={styles.buttonLabel}
        >
          Post Now
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    width: '100%',
    overflow: 'hidden',
  },
  loadingContainer: {
    marginTop: 20,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    gap: 16,
  },
  loading: {
    textAlign: 'center',
  },
  errorContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  error: {
    flex: 1,
  },
  image: {
    height: 250,
    borderRadius: 0,
  },
  textResult: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
  },
  actions: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    flexWrap: 'wrap',
    padding: 8,
  },
  actionButton: {
    minWidth: 110,
  },
  buttonLabel: {
    fontSize: 13,
  },
}); 