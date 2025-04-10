import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';

interface SmartBin {
  id: string;
  label: string;
  icon: string;
  count: number;
}

const BINS: SmartBin[] = [
  { id: 'art', label: 'Art Concepts', icon: '🎨', count: 3 },
  { id: 'captions', label: 'Caption Ideas', icon: '💬', count: 5 },
  { id: 'edits', label: 'Daily Edits', icon: '📸', count: 2 },
  { id: 'templates', label: 'Templates', icon: '📑', count: 4 },
];

export const SmartBins: React.FC = () => {
  const theme = useTheme();

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.surface }]} elevation={1}>
      <View style={styles.header}>
        <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
          📁 Smart Bins
        </Text>
      </View>
      
      <View style={styles.grid}>
        {BINS.map((bin) => (
          <Surface
            key={bin.id}
            style={[
              styles.bin,
              { backgroundColor: theme.colors.surfaceVariant }
            ]}
            elevation={0}
          >
            <Text style={[styles.binIcon]}>{bin.icon}</Text>
            <Text
              variant="labelLarge"
              style={[styles.binLabel, { color: theme.colors.onSurface }]}
              numberOfLines={1}
            >
              {bin.label}
            </Text>
            <Text
              variant="labelSmall"
              style={[styles.binCount, { color: theme.colors.onSurfaceVariant }]}
            >
              {bin.count} items
            </Text>
          </Surface>
        ))}
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 8,
  },
  bin: {
    flex: 1,
    minWidth: '45%',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 4,
  },
  binIcon: {
    fontSize: 24,
  },
  binLabel: {
    textAlign: 'center',
    fontWeight: '500',
  },
  binCount: {
    opacity: 0.7,
  },
}); 