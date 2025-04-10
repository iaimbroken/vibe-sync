import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import type { CustomTheme } from '../../shared/types';

interface EditItem {
  id: string;
  emoji: string;
  title: string;
}

interface CardStyle extends ViewStyle {
  backgroundColor: string;
  borderRadius: number;
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

const editItems: EditItem[] = [
  { id: 'face-detect', emoji: '👤', title: 'Face Detect' },
  { id: 'emotion', emoji: '😃', title: 'Emotion' },
  { id: 'object-tag', emoji: '🎯', title: 'Object Tag' },
];

const RecentEditsCarousel: React.FC = () => {
  const theme = useTheme() as CustomTheme;

  const getCardStyle = (): CardStyle => ({
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    shadowColor: theme.shadows.sm.shadowColor,
    shadowOffset: theme.shadows.sm.shadowOffset,
    shadowOpacity: theme.shadows.sm.shadowOpacity,
    shadowRadius: theme.shadows.sm.shadowRadius,
    elevation: theme.shadows.sm.elevation,
  });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      accessibilityRole="list"
      testID="recent-edits-carousel"
    >
      {editItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.card, getCardStyle()]}
          accessibilityLabel={`${item.title} AI edit`}
          accessibilityRole="button"
          testID={`edit-item-${item.id}`}
        >
          <View style={styles.content}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text
              variant="bodyMedium"
              style={[styles.title, { color: theme.colors.onSurface }]}
            >
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    width: 120,
    height: 100,
    padding: 12,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  title: {
    textAlign: 'center',
  },
});

export default RecentEditsCarousel; 