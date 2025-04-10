import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Button, Text, useTheme } from 'react-native-paper';
import type { CustomTheme } from '../../../shared/types';

interface ScheduledPost {
  id: string;
  day: string;
  platform: string;
  title: string;
}

const scheduledPosts: ScheduledPost[] = [
  { id: '1', day: 'Mon', platform: 'IG Reel', title: 'Studio Glow' },
  { id: '2', day: 'Wed', platform: 'Quote Post', title: 'AI in 2025' },
];

const SchedulePreview: React.FC = () => {
  const theme = useTheme() as CustomTheme;

  return (
    <View style={styles.container}>
      {scheduledPosts.map((post) => (
        <Card
          key={post.id}
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderLeftWidth: 4,
              borderLeftColor: theme.colors.primary,
            },
          ]}
          testID={`scheduled-post-${post.id}`}
        >
          <Card.Content>
            <Text variant="titleMedium">
              {`${post.day} • ${post.platform} → ${post.title}`}
            </Text>
          </Card.Content>
        </Card>
      ))}
      <Button
        mode="contained"
        icon="plus"
        onPress={() => {}}
        style={styles.button}
        accessibilityLabel="Schedule new post"
        testID="schedule-new-button"
      >
        Schedule New Post
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  card: {
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
  },
});

export default SchedulePreview; 