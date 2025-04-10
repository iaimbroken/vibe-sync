import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';

interface ContentOverviewProps {
  drafts: number;
  scheduled: number;
  saved: number;
}

export const ContentOverview: React.FC<ContentOverviewProps> = ({ drafts, scheduled, saved }) => {
  const theme = useTheme();

  return (
    <Surface style={styles.container} elevation={1}>
      <Text variant="titleMedium" style={styles.title}>Content Overview</Text>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text variant="headlineMedium">{drafts}</Text>
          <Text variant="bodyMedium">Drafts</Text>
        </View>
        <View style={styles.stat}>
          <Text variant="headlineMedium">{scheduled}</Text>
          <Text variant="bodyMedium">Scheduled</Text>
        </View>
        <View style={styles.stat}>
          <Text variant="headlineMedium">{saved}</Text>
          <Text variant="bodyMedium">Saved</Text>
        </View>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
}); 