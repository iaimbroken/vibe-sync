import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Button, Surface, useTheme } from 'react-native-paper';
import { FAB } from 'react-native-paper/lib/typescript';
import { ScheduledPostsList } from '../components/LaunchPad/ScheduledPostsList';
import { DraftList } from '../components/LaunchPad/DraftList';
import { ContentOverview } from '../components/LaunchPad/ContentOverview';
import { SmartBins } from '../components/LaunchPad/SmartBins';
import { SmartSuggestions } from '../components/LaunchPad/SmartSuggestions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  CreateLab: undefined;
};

export interface Draft {
  id: string;
  title: string;
  preview: string;
  platform: string;
}

export const LaunchPadScreen: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate data refresh
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 1500);
    });
    setRefreshing(false);
  }, []);

  const handleSchedulePress = useCallback(() => {
    navigation.navigate('CreateLab');
  }, [navigation]);

  const mockScheduledPosts = [
    { id: '1', title: 'Morning Coffee', platform: 'Instagram', date: '2024-03-20' },
    { id: '2', title: 'Workspace Setup', platform: 'LinkedIn', date: '2024-03-21' },
  ];

  const [drafts] = useState<Draft[]>([
    {
      id: '1',
      title: 'Summer Campaign Post',
      preview: 'Check out our latest summer collection...',
      platform: 'instagram'
    },
    {
      id: '2',
      title: 'Product Launch',
      preview: 'Introducing our new product line...',
      platform: 'facebook'
    }
  ]);

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: insets.bottom + 80 }
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.primary}
          />
        }
      >
        <Surface style={[styles.header, { backgroundColor: theme.colors.surface }]} elevation={0}>
          <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onSurface }]}>
            🚀 LaunchPad
          </Text>
          <Text variant="titleSmall" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Your Content Command Center
          </Text>
        </Surface>

        <View style={styles.content}>
          <ContentOverview
            postsCreated={12}
            postsScheduled={mockScheduledPosts.length}
            upcomingPosts={5}
          />

          <Surface style={[styles.section, { backgroundColor: theme.colors.surface }]} elevation={1}>
            <View style={styles.sectionHeader}>
              <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
                📅 Scheduled Posts
              </Text>
              <Button
                mode="text"
                onPress={handleSchedulePress}
                icon="calendar-plus"
                compact
              >
                Schedule New
              </Button>
            </View>
            <ScheduledPostsList
              posts={mockScheduledPosts}
              onUnschedule={(id) => console.log('Unschedule', id)}
              onEdit={(id) => console.log('Edit', id)}
            />
          </Surface>

          <Surface style={[styles.section, { backgroundColor: theme.colors.surface }]} elevation={1}>
            <View style={styles.sectionHeader}>
              <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
                📝 Drafts
              </Text>
              <Button
                mode="text"
                onPress={() => navigation.navigate('CreateLab')}
                icon="pencil-plus"
                compact
              >
                New Draft
              </Button>
            </View>
            <DraftList
              drafts={drafts}
              onPostNow={(id) => console.log('Post Now', id)}
              onEdit={(id) => console.log('Edit', id)}
              onDelete={(id) => console.log('Delete', id)}
            />
          </Surface>

          <SmartBins />

          <Surface style={[styles.section, { backgroundColor: theme.colors.surface }]} elevation={1}>
            <View style={styles.sectionHeader}>
              <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
                💡 Smart Suggestions
              </Text>
              <Button
                mode="text"
                onPress={() => {}}
                icon="refresh"
                compact
              >
                Refresh
              </Button>
            </View>
            <SmartSuggestions />
          </Surface>
        </View>
      </ScrollView>

      <FAB
        icon="plus"
        label="Create"
        style={[
          styles.fab,
          { bottom: insets.bottom + 16 }
        ]}
        onPress={() => navigation.navigate('CreateLab')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
  header: {
    padding: 16,
    paddingTop: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
  },
  subtitle: {
    marginTop: 4,
    opacity: 0.7,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  section: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  fab: {
    position: 'absolute',
    right: 16,
    borderRadius: 16,
  },
}); 