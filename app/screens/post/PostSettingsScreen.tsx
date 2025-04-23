import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, useTheme, Surface, List, Switch } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PostStackScreenProps } from '@/navigators/types';
import { CustomTheme } from '@/theme/theme';

type Props = PostStackScreenProps<'PostSettings'>;

export const PostSettingsScreen: React.FC<Props> = ({ route, navigation }) => {
  const theme = useTheme<CustomTheme>();
  const { postId } = route.params;
  const [isPublic, setIsPublic] = React.useState(true);
  const [allowComments, setAllowComments] = React.useState(true);
  const [showAnalytics, setShowAnalytics] = React.useState(true);

  const handleSaveSettings = () => {
    // TODO: Implement settings save logic
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.title, { color: theme.colors.onSurface, fontSize: 20, fontWeight: 'bold' }]}>
            Post Settings
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurface }]}>
            Configure your post visibility and interaction settings
          </Text>
        </View>

        <Surface style={[styles.settingsCard, { backgroundColor: theme.colors.surfaceVariant }]}>
          <List.Section>
            <List.Item
              title="Public Post"
              description="Make this post visible to everyone"
              left={props => <List.Icon {...props} icon="earth" />}
              right={() => (
                <Switch
                  value={isPublic}
                  onValueChange={setIsPublic}
                />
              )}
              titleStyle={{ fontSize: 16, fontWeight: 'medium' }}
              descriptionStyle={{ fontSize: 14, fontWeight: 'regular' }}
            />
            <List.Item
              title="Allow Comments"
              description="Let others comment on your post"
              left={props => <List.Icon {...props} icon="comment" />}
              right={() => (
                <Switch
                  value={allowComments}
                  onValueChange={setAllowComments}
                />
              )}
              titleStyle={{ fontSize: 16, fontWeight: 'medium' }}
              descriptionStyle={{ fontSize: 14, fontWeight: 'regular' }}
            />
            <List.Item
              title="Show Analytics"
              description="Display post performance metrics"
              left={props => <List.Icon {...props} icon="chart-line" />}
              right={() => (
                <Switch
                  value={showAnalytics}
                  onValueChange={setShowAnalytics}
                />
              )}
              titleStyle={{ fontSize: 16, fontWeight: 'medium' }}
              descriptionStyle={{ fontSize: 14, fontWeight: 'regular' }}
            />
          </List.Section>
        </Surface>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleSaveSettings}
            style={styles.button}
          >
            Save Settings
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('PostAnalytics', { postId })}
            style={styles.button}
          >
            View Analytics
          </Button>
        </View>
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
  },
  subtitle: {
    opacity: 0.7,
  },
  settingsCard: {
    borderRadius: 8,
    marginBottom: 24,
    elevation: 2,
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