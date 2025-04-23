import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme, Card, Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RootStackScreenProps } from '../../types/navigation';

const PostDetailsScreen: React.FC = () => {
  const theme = useTheme();
  const route = useRoute<RootStackScreenProps<'PostDetails'>['route']>();
  const navigation = useNavigation<RootStackScreenProps<'PostDetails'>['navigation']>();
  const { postId } = route.params;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surfaceVariant }]}>
        <Card.Content>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>
            Post Details
          </Text>
          <Text style={[styles.content, { color: theme.colors.onSurface }]}>
            Post ID: {postId}
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('PostAnalytics', { postId })}
          style={styles.button}
        >
          View Analytics
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('PostSettings', { postId })}
          style={styles.button}
        >
          Settings
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

export default PostDetailsScreen; 