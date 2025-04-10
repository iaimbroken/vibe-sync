import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import type { CustomTheme } from '../../../shared/types';

interface Result {
  type: 'image' | 'text';
  content: string;
}

interface ResultDisplayProps {
  result: Result;
  onSave: () => void;
  onSchedule: () => void;
  onPost: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  onSave,
  onSchedule,
  onPost,
}) => {
  const theme = useTheme() as CustomTheme;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
        },
      ]}
    >
      <View style={styles.previewContainer}>
        {result.type === 'image' ? (
          <Image
            source={{ uri: result.content }}
            style={styles.image}
            testID="result-image"
          />
        ) : (
          <Text
            variant="bodyLarge"
            style={[styles.text, { color: theme.colors.onSurface }]}
            testID="result-text"
          >
            {result.content}
          </Text>
        )}
      </View>

      <View style={styles.actions}>
        <Button
          mode="outlined"
          onPress={onSave}
          icon="content-save"
          style={styles.button}
          testID="save-button"
        >
          Save
        </Button>
        <Button
          mode="outlined"
          onPress={onSchedule}
          icon="calendar"
          style={styles.button}
          testID="schedule-button"
        >
          Schedule
        </Button>
        <Button
          mode="contained"
          onPress={onPost}
          icon="send"
          style={styles.button}
          testID="post-button"
        >
          Post Now
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  previewContainer: {
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  text: {
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default ResultDisplay; 