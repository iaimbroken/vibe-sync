import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, useTheme, Surface, List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PostStackScreenProps } from '@/navigators/types';
import { CustomTheme } from '@/theme/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = PostStackScreenProps<'PostAnalytics'>;

export const PostAnalyticsScreen: React.FC<Props> = ({ route }) => {
  const theme = useTheme<CustomTheme>();
  const { postId } = route.params;

  // Mock analytics data - in a real app, this would come from an API
  const analyticsData = {
    views: 1250,
    likes: 89,
    comments: 23,
    shares: 15,
    engagementRate: '7.2%',
    reach: 2500,
    impressions: 3200,
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.title, { color: theme.colors.onSurface, fontSize: 24, fontWeight: 'bold' }]}>
            Post Analytics
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurface, fontSize: 16, fontWeight: 'regular' }]}>
            Detailed insights about your post performance
          </Text>
        </View>

        <Surface style={[styles.statsCard, { backgroundColor: theme.colors.surfaceVariant }]}>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="eye" size={24} color={theme.colors.primary} />
              <Text style={[styles.statValue, { color: theme.colors.onSurface, fontSize: 20, fontWeight: 'bold' }]}>
                {analyticsData.views}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.onSurface, fontSize: 14, fontWeight: 'regular' }]}>Views</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="heart" size={24} color={theme.colors.primary} />
              <Text style={[styles.statValue, { color: theme.colors.onSurface, fontSize: 20, fontWeight: 'bold' }]}>
                {analyticsData.likes}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.onSurface, fontSize: 14, fontWeight: 'regular' }]}>Likes</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="comment" size={24} color={theme.colors.primary} />
              <Text style={[styles.statValue, { color: theme.colors.onSurface, fontSize: 20, fontWeight: 'bold' }]}>
                {analyticsData.comments}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.onSurface, fontSize: 14, fontWeight: 'regular' }]}>Comments</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="share" size={24} color={theme.colors.primary} />
              <Text style={[styles.statValue, { color: theme.colors.onSurface, fontSize: 20, fontWeight: 'bold' }]}>
                {analyticsData.shares}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.onSurface, fontSize: 14, fontWeight: 'regular' }]}>Shares</Text>
            </View>
          </View>
        </Surface>

        <Surface style={[styles.detailsCard, { backgroundColor: theme.colors.surfaceVariant }]}>
          <List.Section>
            <List.Item
              title="Engagement Rate"
              description="Percentage of people who interacted with your post"
              left={props => <List.Icon {...props} icon="chart-line" />}
              right={() => (
                <Text style={{ color: theme.colors.onSurface, fontSize: 16, fontWeight: 'medium' }}>
                  {analyticsData.engagementRate}
                </Text>
              )}
            />
            <List.Item
              title="Reach"
              description="Number of unique users who saw your post"
              left={props => <List.Icon {...props} icon="account-group" />}
              right={() => (
                <Text style={{ color: theme.colors.onSurface, fontSize: 16, fontWeight: 'medium' }}>
                  {analyticsData.reach}
                </Text>
              )}
            />
            <List.Item
              title="Impressions"
              description="Total number of times your post was seen"
              left={props => <List.Icon {...props} icon="eye" />}
              right={() => (
                <Text style={{ color: theme.colors.onSurface, fontSize: 16, fontWeight: 'medium' }}>
                  {analyticsData.impressions}
                </Text>
              )}
            />
          </List.Section>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    opacity: 0.7,
  },
  statsCard: {
    borderRadius: 8,
    marginBottom: 24,
    elevation: 2,
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statValue: {
    marginVertical: 8,
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    opacity: 0.7,
  },
  detailsCard: {
    borderRadius: 8,
    marginBottom: 24,
    elevation: 2,
  },
}); 