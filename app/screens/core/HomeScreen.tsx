import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, useTheme, Surface, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { TabParamList, RootStackParamList, RootStackScreenProps } from '../../types/navigation';
import { GreetingHeader } from '@/components/common/GreetingHeader';
import { AuraPostUnified } from '@/components/common/AuraPostUnified';
import { RecentEditsCarousel } from '@/components/common/RecentEditsCarousel';
import { FeatureGrid } from '@/components/common/FeatureGrid';
import { useAuth } from '../../contexts/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = BottomTabScreenProps<TabParamList, 'Home'>;

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  onPress: () => void;
}

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<RootStackScreenProps<'Home'>['navigation']>();
  const { user } = useAuth();
  const displayName = user?.displayName || 'User';

  const features: Feature[] = [
    {
      id: '1',
      title: 'AI Image Generation',
      description: 'Create stunning images using AI',
      icon: 'image',
      onPress: () => navigation.navigate('AIImageTool'),
    },
    {
      id: '2',
      title: 'Batch Analysis',
      description: 'Analyze multiple posts at once',
      icon: 'chart-bar',
      onPress: () => navigation.navigate('BatchAnalysis'),
    },
    {
      id: '3',
      title: 'AI History',
      description: 'View your AI generation history',
      icon: 'history',
      onPress: () => navigation.navigate('AIHistory'),
    },
    {
      id: '4',
      title: 'Post Creator',
      description: 'Create and edit posts',
      icon: 'pencil',
      onPress: () => navigation.navigate('PostCreator', { initialData: undefined }),
    },
  ];

  const recentEdits = [
    {
      id: '1',
      title: 'AI Generated Art',
      description: 'Created a stunning AI-generated artwork',
      date: '2 hours ago',
    },
    {
      id: '2',
      title: 'Content Analysis',
      description: 'Analyzed content using AI tools',
      date: '5 hours ago',
    }
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1A1B2A',
    },
    content: {
      flex: 1,
      padding: 20,
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      marginBottom: 16,
      color: '#FFFFFF',
    },
    subtitle: {
      color: '#C4C4C4',
      opacity: 0.7,
    },
    postSection: {
      marginBottom: 32,
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
    emptyState: {
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyStateText: {
      color: '#C4C4C4',
      textAlign: 'center',
    },
    featuresGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    featureCard: {
      width: '48%',
      padding: 16,
      marginBottom: 16,
      borderRadius: 12,
      alignItems: 'center',
    },
    featureTitle: {
      marginTop: 12,
      marginBottom: 4,
      textAlign: 'center',
    },
    featureDescription: {
      textAlign: 'center',
      opacity: 0.7,
    },
    quickActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    actionButton: {
      flex: 1,
      marginHorizontal: 8,
    },
    card: {
      marginBottom: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
  });

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <GreetingHeader name={displayName} />
        </View>

        <View style={styles.postSection}>
          <AuraPostUnified
            title="Create Your Next Masterpiece"
            content="Describe your vision and let AI bring it to life"
            imageUrl="https://example.com/ai-preview.jpg"
            hashtags={['#AIArt', '#Creativity', '#DigitalArt']}
            date="Just now"
            author="You"
          />
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('CreateLab')}
              style={styles.button}
            >
              Generate with AI
            </Button>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('PostCreator', { initialData: undefined })}
              style={styles.button}
            >
              Post Now
            </Button>
          </View>
        </View>

        <View style={styles.section}>
          <Text 
            style={[styles.sectionTitle, { color: theme.colors.onSurface, fontSize: 24, fontWeight: '500' }]}
          >
            Recent Activity
          </Text>
          <Surface style={{ backgroundColor: theme.colors.background, padding: 16 }}>
            <Text style={{ color: theme.colors.onSurface, fontSize: 20, fontWeight: '500' }}>
              Welcome back!
            </Text>
          </Surface>
        </View>

        <View style={styles.section}>
          <Text style={{ color: theme.colors.onSurface, fontSize: 20, fontWeight: '500' }}>
            Recent Posts
          </Text>
          <FeatureGrid features={features} />
        </View>

        <View style={styles.section}>
          <Text 
            style={[styles.sectionTitle, { color: theme.colors.onSurface, fontSize: 24, fontWeight: '500' }]}
          >
            Recent Edits
          </Text>
          {recentEdits.length > 0 ? (
            <RecentEditsCarousel edits={recentEdits} />
          ) : (
            <Surface style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No recent edits yet
              </Text>
            </Surface>
          )}
        </View>

        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <Card
              key={index}
              style={[styles.featureCard, { backgroundColor: theme.colors.surfaceVariant }]}
              onPress={feature.onPress}
            >
              <MaterialCommunityIcons
                name={feature.icon as any}
                size={32}
                color={theme.colors.primary}
              />
              <Text style={[styles.featureTitle, { color: theme.colors.onSurface, fontSize: 16, fontWeight: 'bold' }]}>
                {feature.title}
              </Text>
              <Text style={[styles.featureDescription, { color: theme.colors.onSurface, fontSize: 14, fontWeight: 'regular' }]}>
                {feature.description}
              </Text>
            </Card>
          ))}
        </View>

        <View style={styles.quickActions}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('CreateLab')}
            style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
          >
            Create Lab
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('PostCreator', { initialData: undefined })}
            style={[styles.actionButton, { borderColor: theme.colors.primary }]}
            textColor={theme.colors.primary}
          >
            Quick Post
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}; 