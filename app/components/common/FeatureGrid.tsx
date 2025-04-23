// app/components/common/FeatureGrid.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { CustomTheme } from '@/types/theme';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  onPress: () => void;
}

interface FeatureGridProps {
  features: Feature[];
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ features }) => {
  const theme = useTheme<CustomTheme>();

  return (
    <View style={styles.grid}>
      {features.map((feature) => (
        <TouchableOpacity
          key={feature.id}
          style={[styles.feature, { backgroundColor: theme.colors.surfaceVariant }]}
          onPress={feature.onPress}
        >
          <MaterialCommunityIcons
            name={feature.icon as any}
            size={24}
            color={theme.colors.primary}
          />
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>
            {feature.title}
          </Text>
          <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
            {feature.description}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  feature: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
});
