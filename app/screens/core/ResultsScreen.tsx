import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme, Card, Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RootStackScreenProps } from '../../types/navigation';

const ResultsScreen: React.FC = () => {
  const theme = useTheme();
  const route = useRoute<RootStackScreenProps<'Results'>['route']>();
  const navigation = useNavigation<RootStackScreenProps<'Results'>['navigation']>();
  const { data } = route.params;

  const handleCreatePost = () => {
    navigation.navigate('PostCreator', {
      initialData: {
        title: data.caption,
        content: data.caption,
        tags: data.hashtags
      }
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surfaceVariant }]}>
        <Card.Content>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>
            Results
          </Text>
          <Text style={[styles.content, { color: theme.colors.onSurface }]}>
            {data.caption}
          </Text>
          <View style={styles.tags}>
            {data.hashtags?.map((tag: string, index: number) => (
              <Text
                key={index}
                style={[styles.tag, { color: theme.colors.primary }]}
              >
                #{tag}
              </Text>
            ))}
          </View>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleCreatePost}
          style={styles.button}
        >
          Create Post
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          Back
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default ResultsScreen; 