import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface FeatureGridProps {
  onSelect?: (tool: string) => void;
}

interface GridItem {
  id: string;
  emoji: string;
  title: string;
}

const gridItems: GridItem[] = [
  { id: 'edit-image', emoji: '📸', title: 'Edit Image' },
  { id: 'text-analysis', emoji: '💬', title: 'Text Analysis' },
  { id: 'ai-art', emoji: '🎨', title: 'AI Art Generator' },
  { id: 'batch-tools', emoji: '🧪', title: 'Batch Tools' },
];

const FeatureGrid: React.FC<FeatureGridProps> = ({ onSelect }) => {
  const theme = useTheme();
  const { width } = Dimensions.get('window');
  const itemSize = (width - theme.spacing.md * 3) / 2; // 3 gaps (2 between items, 1 for padding)

  const handlePress = (toolId: string) => {
    onSelect?.(toolId);
  };

  return (
    <View style={styles.container}>
      {gridItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.item,
            {
              width: itemSize,
              height: itemSize,
              backgroundColor: theme.colors.surface,
              borderRadius: theme.borderRadius.md,
            },
          ]}
          onPress={() => handlePress(item.id)}
          activeOpacity={0.7}
          accessibilityLabel={`${item.title} tool`}
          accessibilityRole="button"
        >
          <Text style={styles.emoji}>{item.emoji}</Text>
          <Text
            variant="titleSmall"
            style={[styles.title, { color: theme.colors.onSurface }]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    padding: 16,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  title: {
    textAlign: 'center',
  },
});

export default FeatureGrid; 