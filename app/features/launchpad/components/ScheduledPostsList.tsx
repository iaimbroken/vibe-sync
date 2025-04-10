import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, IconButton, List, Text, useTheme } from 'react-native-paper';

interface ScheduledPost {
  id: string;
  content: string;
  dateTime: string;
  platforms: string[];
}

interface ScheduledPostsListProps {
  posts: ScheduledPost[];
  onUnschedule: (id: string) => void;
}

export const ScheduledPostsList: React.FC<ScheduledPostsListProps> = ({
  posts,
  onUnschedule,
}) => {
  const theme = useTheme();

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return 'instagram';
      case 'facebook':
        return 'facebook';
      case 'twitter':
        return 'twitter';
      case 'linkedin':
        return 'linkedin';
      default:
        return 'web';
    }
  };

  return (
    <Card style={styles.container} testID="scheduled-posts-list">
      <Card.Content>
        <Text 
          variant="titleMedium" 
          style={[styles.title, { color: theme.colors.onSurfaceVariant }]}
        >
          Scheduled Posts
        </Text>

        <View style={styles.postsList}>
          {posts.map((post) => (
            <List.Item
              key={post.id}
              title={post.content}
              description={post.dateTime}
              left={props => (
                <View style={styles.platformIcons}>
                  {post.platforms.map((platform) => (
                    <List.Icon
                      key={platform}
                      {...props}
                      icon={getPlatformIcon(platform)}
                      style={styles.platformIcon}
                    />
                  ))}
                </View>
              )}
              right={props => (
                <IconButton
                  {...props}
                  icon="close"
                  size={20}
                  onPress={() => onUnschedule(post.id)}
                  testID={`unschedule-post-${post.id}`}
                />
              )}
              style={styles.postItem}
              testID={`scheduled-post-${post.id}`}
            />
          ))}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    marginBottom: 16,
  },
  postsList: {
    gap: 8,
  },
  postItem: {
    paddingLeft: 0,
  },
  platformIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformIcon: {
    marginRight: 4,
  },
}); 