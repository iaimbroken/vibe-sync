import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { CampaignList } from './components/CampaignList';
import { ScheduledPostsList } from './components/ScheduledPostsList';
import { PerformanceMetrics } from './components/PerformanceMetrics';
import { ContentOverview } from './components/ContentOverview';

interface Campaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'draft' | 'completed';
}

export const LaunchPadScreen: React.FC = () => {
  const theme = useTheme();

  // Mock data for campaigns
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Summer Sale 2024',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      status: 'active',
    },
    {
      id: '2',
      name: 'Product Launch',
      startDate: '2024-07-15',
      endDate: '2024-07-30',
      status: 'draft',
    },
  ]);

  // Mock data for scheduled posts
  const [scheduledPosts, setScheduledPosts] = useState([
    {
      id: '1',
      content: 'Check out our new collection!',
      dateTime: '2024-06-15 14:00',
      platforms: ['instagram', 'facebook'],
    },
    {
      id: '2',
      content: 'Limited time offer - 50% off!',
      dateTime: '2024-06-20 09:00',
      platforms: ['instagram', 'twitter'],
    },
  ]);

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== id));
  };

  const handleCreateCampaign = () => {
    // TODO: Implement campaign creation
    console.log('Create campaign');
  };

  const handleUnschedulePost = (id: string) => {
    setScheduledPosts(scheduledPosts.filter(post => post.id !== id));
  };

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      testID="launchpad-screen"
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <PerformanceMetrics
          reach={{ value: 15000, change: 12 }}
          engagement={{ value: 2500, change: 8 }}
          conversion={{ value: 500, change: -2 }}
        />

        <ContentOverview
          drafts={5}
          scheduled={12}
          saved={8}
        />

        <CampaignList
          campaigns={campaigns}
          onDeleteCampaign={handleDeleteCampaign}
          onCreateCampaign={handleCreateCampaign}
        />

        <ScheduledPostsList
          posts={scheduledPosts}
          onUnschedule={handleUnschedulePost}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
}); 