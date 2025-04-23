// app/components/common/AuraPostUnified.tsx
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, useTheme, Card } from 'react-native-paper';
import type { CustomTheme } from '@/types/theme';

interface AuraPostUnifiedProps {
  title: string;
  content: string;
  imageUrl?: string;
  hashtags?: string[];
  date?: string;
  author?: string;
  onPress?: () => void;
}

export const AuraPostUnified: React.FC<AuraPostUnifiedProps> = ({
  title,
  content,
  imageUrl,
  hashtags,
  date,
  author,
  onPress,
}) => {
  const theme = useTheme<CustomTheme>();

  return (
    <Card 
      style={[styles.card, { backgroundColor: theme.colors.surface }]}
      onPress={onPress}
    >
      <Card.Content>
        <Text style={[styles.title, { color: theme.colors.onSurface }]}>
          {title}
        </Text>
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <Text style={[styles.content, { color: theme.colors.onSurfaceVariant }]}>
          {content}
        </Text>
        {hashtags && hashtags.length > 0 && (
          <View style={styles.tags}>
            {hashtags.map((tag, index) => (
              <Text
                key={index}
                style={[styles.tag, { color: theme.colors.primary }]}
              >
                #{tag}
              </Text>
            ))}
          </View>
        )}
        <View style={styles.footer}>
          {date && (
            <Text style={[styles.date, { color: theme.colors.onSurfaceVariant }]}>
              {date}
            </Text>
          )}
          {author && (
            <Text style={[styles.author, { color: theme.colors.onSurfaceVariant }]}>
              {author}
            </Text>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  tag: {
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
  },
  author: {
    fontSize: 12,
  },
});