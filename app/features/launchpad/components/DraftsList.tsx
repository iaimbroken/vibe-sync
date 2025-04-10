import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import type { CustomTheme } from '../../../shared/types';

interface DraftPost {
  id: string;
  title: string;
  progress: number;
  lastEdited: string;
}

const draftPosts: DraftPost[] = [
  { id: '1', title: 'Morning Routine', progress: 0.75, lastEdited: '2h ago' },
  { id: '2', title: 'Product Launch', progress: 0.3, lastEdited: '1d ago' },
];

const DraftsList: React.FC = () => {
  const theme = useTheme() as CustomTheme;

  return (
    <View style={styles.container}>
      {draftPosts.map((post) => (
        <Card
          key={post.id}
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
            },
          ]}
          testID={`draft-post-${post.id}`}
        >
          <Card.Content>
            <Text variant="titleMedium" style={styles.title}>
              {post.title}
            </Text>
            <View style={[styles.progressBarContainer, { backgroundColor: theme.colors.surfaceVariant }]}>
              <View 
                style={[
                  styles.progressBar,
                  { 
                    width: `${post.progress * 100}%`,
                    backgroundColor: theme.colors.primary 
                  }
                ]} 
              />
            </View>
            <Text variant="bodySmall" style={styles.lastEdited}>
              Last edited {post.lastEdited}
            </Text>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  card: {
    marginBottom: 8,
  },
  title: {
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 4,
    borderRadius: 2,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  lastEdited: {
    opacity: 0.7,
  },
});

export default DraftsList; 