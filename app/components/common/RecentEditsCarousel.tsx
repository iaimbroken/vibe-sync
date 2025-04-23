import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme, Card } from 'react-native-paper';
import type { CustomTheme } from '@/types/theme';

interface Edit {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface RecentEditsCarouselProps {
  edits: Edit[];
}

export const RecentEditsCarousel: React.FC<RecentEditsCarouselProps> = ({ edits }) => {
  const theme = useTheme<CustomTheme>();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {edits.map((edit) => (
        <Card
          key={edit.id}
          style={[styles.card, { backgroundColor: theme.colors.surfaceVariant }]}
        >
          <Card.Content>
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>
              {edit.title}
            </Text>
            <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
              {edit.description}
            </Text>
            <Text style={[styles.date, { color: theme.colors.onSurfaceVariant }]}>
              {edit.date}
            </Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  card: {
    width: 200,
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
  },
}); 