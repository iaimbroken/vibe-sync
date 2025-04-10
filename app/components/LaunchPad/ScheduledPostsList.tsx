import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Button, useTheme } from 'react-native-paper';
import type { CustomTheme } from '../../shared/types';
import type { ScheduledPost } from '../../screens/LaunchPadScreen';

interface ScheduledPostsListProps {
  posts: ScheduledPost[];
  onUnschedule: (post: ScheduledPost) => void;
  onEdit: (post: ScheduledPost) => void;
}

export const ScheduledPostsList: React.FC<ScheduledPostsListProps> = ({
  posts,
  onUnschedule,
  onEdit,
}) => {
  const theme = useTheme() as CustomTheme;

  return (
    <Card style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          Scheduled Posts
        </Text>
        {posts.map((post) => (
          <View key={post.id} style={styles.post}>
            <View style={styles.postContent}>
              <Text variant="bodyMedium">
                Scheduled for: {post.scheduledTime.toLocaleDateString()}
              </Text>
              <Text variant="bodySmall">
                Platforms: {post.platforms.join(', ')}
              </Text>
            </View>
            <View style={styles.actions}>
              <Button
                mode="outlined"
                onPress={() => onEdit(post)}
                style={styles.button}
              >
                Edit
              </Button>
              <Button
                mode="outlined"
                onPress={() => onUnschedule(post)}
                style={styles.button}
              >
                Unschedule
              </Button>
            </View>
          </View>
        ))}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 16,
  },
  post: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  postContent: {
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
  },
}); 