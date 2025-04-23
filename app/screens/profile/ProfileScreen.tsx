import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackScreenProps } from '@/types/navigation';
import type { CustomTheme } from '@/types/theme';

type Props = RootStackScreenProps<'Profile'>;

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme<CustomTheme>();

  // Mock user data
  const user = {
    displayName: 'John Doe',
    email: 'john@example.com',
    posts: 42,
    followers: 1337,
    following: 420,
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    header: {
      alignItems: 'center',
      marginBottom: 24,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    email: {
      fontSize: 16,
      opacity: 0.7,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 24,
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 14,
      opacity: 0.7,
    },
    actionsContainer: {
      gap: 12,
    },
    actionButton: {
      marginVertical: 4,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.onSurface }]}>
        Profile
      </Text>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.name, { color: theme.colors.onSurface }]}>
            {user.displayName}
          </Text>
          <Text style={[styles.email, { color: theme.colors.onSurface }]}>
            {user.email}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.onSurface }]}>
              {user.posts}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.onSurface }]}>
              Posts
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.onSurface }]}>
              {user.followers}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.onSurface }]}>
              Followers
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.onSurface }]}>
              {user.following}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.onSurface }]}>
              Following
            </Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('EditProfile')}
            style={styles.actionButton}
          >
            Edit Profile
          </Button>
          <Button
            mode="outlined"
            onPress={() => {}}
            style={styles.actionButton}
          >
            Share Profile
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}; 