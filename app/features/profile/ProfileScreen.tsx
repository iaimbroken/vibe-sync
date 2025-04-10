import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import { Avatar } from 'react-native-paper/lib/typescript';

export const ProfileScreen = () => {
  const [profileImage] = useState('https://via.placeholder.com/150');
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Avatar.Image 
          size={120} 
          source={{ uri: profileImage }}
          style={styles.avatar}
        />
        <Text variant="headlineMedium" style={styles.name}>John Smith</Text>
        <Text variant="bodyLarge" style={styles.email}>john.smith@example.com</Text>
      </View>

      <Card style={styles.statsCard}>
        <Card.Content>
          <Text variant="titleMedium">Account Statistics</Text>
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text variant="headlineSmall">12</Text>
              <Text variant="bodyMedium">Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="headlineSmall">48</Text>
              <Text variant="bodyMedium">Drafts</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="headlineSmall">156</Text>
              <Text variant="bodyMedium">AI Assists</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginVertical: 24,
  },
  name: {
    marginTop: 16,
  },
  email: {
    marginTop: 4,
    opacity: 0.7,
  },
  statsCard: {
    marginTop: 24,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 16,
  },
}); 