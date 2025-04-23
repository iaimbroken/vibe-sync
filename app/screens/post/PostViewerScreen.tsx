import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Card, useTheme, ActivityIndicator, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PostStackScreenProps } from '@/navigators/types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { format } from 'date-fns';
import { CustomTheme } from '@/theme/theme';

type Props = PostStackScreenProps<'PostViewer'>;

interface Post {
  id: string;
  prompt: string;
  caption: string;
  hashtags: string;
  imageUrl?: string;
  createdAt: any;
  userId: string;
}

export const PostViewerScreen: React.FC<Props> = ({ route }) => {
  const theme = useTheme<CustomTheme>();
  const { postId } = route.params;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, 'posts', postId));
        
        if (postDoc.exists()) {
          setPost({
            id: postDoc.id,
            ...postDoc.data()
          } as Post);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    card: {
      marginBottom: 20,
    },
    section: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 8,
    },
    text: {
      fontSize: 16,
      lineHeight: 24,
    },
    imageContainer: {
      marginVertical: 16,
      borderRadius: 8,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: 200,
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
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
  });

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

  if (!post) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.centerContent, { flex: 1 }]}>
          <Text style={{ color: theme.colors.onSurfaceVariant }}>
            Post not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.onSurface }]}>
          Post Viewer
        </Text>
        <Card style={[styles.card, { backgroundColor: theme.colors.card }]}>
          <Card.Content>
            <View style={styles.section}>
              <Text style={[styles.label, { color: theme.colors.onSurface }]}>
                Prompt
              </Text>
              <Text style={[styles.text, { color: theme.colors.onSurface }]}>
                {post.prompt}
              </Text>
            </View>

            {post.imageUrl && (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: post.imageUrl }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            )}

            <View style={styles.section}>
              <Text style={[styles.label, { color: theme.colors.onSurface }]}>
                Caption
              </Text>
              <Text style={[styles.text, { color: theme.colors.onSurface }]}>
                {post.caption}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={[styles.label, { color: theme.colors.onSurface }]}>
                Hashtags
              </Text>
              <Text style={[styles.hashtags, { color: theme.colors.primary }]}>
                {post.hashtags}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={[styles.label, { color: theme.colors.onSurface }]}>
                Created
              </Text>
              <Text style={[styles.text, { color: theme.colors.onSurface }]}>
                {format(post.createdAt?.toDate(), 'MMMM d, yyyy h:mm a')}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
}; 