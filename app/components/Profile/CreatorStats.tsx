import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

interface Stat {
  label: string;
  value: number;
}

interface CreatorStatsProps {
  stats: Stat[];
}

export const CreatorStats: React.FC<CreatorStatsProps> = ({ stats }) => {
  const theme = useTheme();

  return (
    <View style={styles.container} testID="creator-stats">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          style={[styles.statCard, { backgroundColor: theme.colors.surface }]}
          testID={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <Card.Content>
            <Text 
              variant="headlineMedium" 
              style={[styles.value, { color: theme.colors.primary }]}
            >
              {stat.value}
            </Text>
            <Text 
              variant="bodyMedium" 
              style={[styles.label, { color: theme.colors.onSurfaceVariant }]}
            >
              {stat.label}
            </Text>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    elevation: 1,
  },
  value: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label: {
    textAlign: 'center',
    marginTop: 4,
  },
}); 