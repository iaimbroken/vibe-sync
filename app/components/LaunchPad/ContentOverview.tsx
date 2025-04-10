import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';

interface ContentOverviewProps {
  postsCreated?: number;
  postsScheduled?: number;
  upcomingPosts?: number;
}

export const ContentOverview: React.FC<ContentOverviewProps> = ({
  postsCreated = 12,
  postsScheduled = 3,
  upcomingPosts = 5,
}) => {
  const theme = useTheme();

  const stats = [
    { label: 'Created', value: postsCreated, icon: '✨' },
    { label: 'Scheduled', value: postsScheduled, icon: '📅' },
    { label: 'Upcoming', value: upcomingPosts, icon: '🔜' },
  ];

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.surface }]} elevation={1}>
      <View style={styles.grid}>
        {stats.map((stat, index) => (
          <View key={stat.label} style={styles.statItem}>
            <Text style={styles.icon}>{stat.icon}</Text>
            <Text
              variant="headlineSmall"
              style={[styles.value, { color: theme.colors.onSurface }]}
            >
              {stat.value}
            </Text>
            <Text
              variant="labelMedium"
              style={[styles.label, { color: theme.colors.onSurfaceVariant }]}
            >
              {stat.label}
            </Text>
          </View>
        ))}
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
  },
  value: {
    fontWeight: '600',
  },
  label: {
    opacity: 0.7,
  },
}); 