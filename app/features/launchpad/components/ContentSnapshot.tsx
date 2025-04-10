import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';
import type { CustomTheme } from '../../../shared/types';

interface StatItem {
  id: string;
  label: string;
  value: number;
  icon: string;
}

const stats: StatItem[] = [
  { id: 'scheduled', label: 'Scheduled', value: 3, icon: 'calendar-check' },
  { id: 'drafts', label: 'Drafts', value: 2, icon: 'pencil' },
  { id: 'saved', label: 'Saved', value: 5, icon: 'bookmark' },
];

const ContentSnapshot: React.FC = () => {
  const theme = useTheme() as CustomTheme;

  return (
    <View style={[styles.container, { gap: theme.spacing.md }]}>
      {stats.map((stat) => (
        <Chip
          key={stat.id}
          icon={stat.icon}
          style={[
            styles.chip,
            { backgroundColor: theme.colors.surfaceVariant },
          ]}
          textStyle={{ color: theme.colors.onSurfaceVariant }}
          testID={`stat-${stat.id}`}
        >
          {`${stat.label}: ${stat.value}`}
        </Chip>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  chip: {
    marginRight: 8,
  },
});

export default ContentSnapshot; 