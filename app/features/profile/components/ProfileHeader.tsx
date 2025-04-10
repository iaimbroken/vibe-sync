import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text, Button, useTheme } from 'react-native-paper';

interface ProfileHeaderProps {
  user: {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
  };
  onEditProfile: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onEditProfile }) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.avatarContainer}>
        {user.photoURL ? (
          <Avatar.Image size={80} source={{ uri: user.photoURL }} />
        ) : (
          <Avatar.Text size={80} label={user.displayName?.charAt(0) || 'U'} />
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text variant="headlineMedium" style={styles.name}>
          {user.displayName || 'Anonymous User'}
        </Text>
        <Text variant="bodyMedium" style={[styles.email, { color: theme.colors.onSurfaceVariant }]}>
          {user.email || 'No email provided'}
        </Text>
      </View>
      <Button
        mode="outlined"
        onPress={onEditProfile}
        style={styles.editButton}
        testID="edit-profile-button"
      >
        Edit Profile
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    marginBottom: 4,
  },
  email: {
    opacity: 0.7,
  },
  editButton: {
    width: '100%',
  },
}); 