import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, Card, useTheme, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';
import { CustomTheme } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps } from '../../types/navigation';

interface Post {
  id: string;
  caption: string;
  hashtags: string[];
  createdAt: any;
  userId: string;
}

export const PostHistoryScreen: React.FC = () => {
  const theme = useTheme<CustomTheme>();
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<RootStackScreenProps<'PostHistory'>['navigation']>();

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;

      try {
        const postsQuery = query(
          collection(db, 'posts'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(postsQuery);
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Post[];

        setPosts(fetchedPosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  const renderPost = ({ item }: { item: Post }) => (
    <Card style={[styles.card, { backgroundColor: theme.colors.surfaceVariant }]}>
      <Card.Content>
        <View style={styles.header}>
          <Text style={[styles.date, { color: theme.colors.onSurface }]}>
            {format(item.createdAt?.toDate(), 'MMM d, yyyy h:mm a')}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, { color: theme.colors.onSurface, fontSize: 14, fontWeight: 'medium' }]}>
            Caption
          </Text>
          <Text style={[styles.text, { color: theme.colors.onSurface }]}>
            {item.caption}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, { color: theme.colors.onSurface, fontSize: 14, fontWeight: 'medium' }]}>
            Hashtags
          </Text>
          <Text style={[styles.hashtags, { color: theme.colors.primary }]}>
            {item.hashtags.join(' ')}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.centerContent, { flex: 1 }]}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.centerContent, { flex: 1 }]}>
          <Text style={[styles.error, { color: theme.colors.error }]}>
            {error}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (posts.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.centerContent, { flex: 1 }]}>
          <Text style={{ color: theme.colors.onSurface, fontSize: 16, fontWeight: 'medium' }}>
            No posts found
          </Text>
          <Text style={{ color: theme.colors.onSurface, fontSize: 14, fontWeight: 'regular' }}>
            Your posts will appear here
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.onSurface, fontSize: 24, fontWeight: 'bold' }]}>
          Post History
        </Text>
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 20,
  },
  header: {
    marginBottom: 20,
  },
  date: {
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  hashtags: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    textAlign: 'center',
    marginHorizontal: 20,
  },
}); 