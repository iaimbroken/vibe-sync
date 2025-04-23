import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, Button, Surface } from 'react-native-paper';
import { RootStackScreenProps } from '../../types/navigation';

export const ResultScreen = () => {
  const navigation = useNavigation<RootStackScreenProps<'Result'>['navigation']>();
  const route = useRoute<RootStackScreenProps<'Result'>['route']>();
  const { result } = route.params;

  const handleCreatePost = () => {
    navigation.navigate('PostCreator', {
      initialData: {
        title: result.title,
        content: result.content,
        tags: result.tags,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.resultCard}>
        <Text variant="headlineMedium" style={styles.title}>
          {result.title}
        </Text>
        <Text variant="bodyLarge" style={styles.content}>
          {result.content}
        </Text>
        {result.tags && result.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {result.tags.map((tag, index) => (
              <Text key={index} variant="labelMedium" style={styles.tag}>
                #{tag}
              </Text>
            ))}
          </View>
        )}
      </Surface>
      <Button mode="contained" onPress={handleCreatePost} style={styles.button}>
        Create Post
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  resultCard: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    marginBottom: 8,
  },
  content: {
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    color: '#666',
  },
  button: {
    marginTop: 'auto',
  },
}); 