import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

interface CreatorStatsProps {
  stats: {
    postsCreated: number;
    followers: number;
    scheduledPosts: number;
  };
}

export const CreatorStats: React.FC<CreatorStatsProps> = ({ stats }) => {
  const theme = useTheme();

  return (
    <Card style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Card.Content style={styles.content}>
        <View style={styles.statItem}>
          <Text variant="headlineMedium" style={[styles.statValue, { color: theme.colors.primary }]}>
            {stats.postsCreated}
          </Text>
          <Text variant="bodyMedium" style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
            Posts Created
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text variant="headlineMedium" style={[styles.statValue, { color: theme.colors.primary }]}>
            {stats.followers}
          </Text>
          <Text variant="bodyMedium" style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
            Followers
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text variant="headlineMedium" style={[styles.statValue, { color: theme.colors.primary }]}>
            {stats.scheduledPosts}
          </Text>
          <Text variant="bodyMedium" style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
            Scheduled
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    marginBottom: 4,
  },
  statLabel: {
    textAlign: 'center',
  },
}); 