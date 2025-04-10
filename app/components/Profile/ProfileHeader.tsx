import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';

interface ProfileHeaderProps {
  displayName: string;
  email: string;
  photoURL?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  displayName,
  email,
  photoURL,
}) => {
  const theme = useTheme();

  return (
    <View 
      style={[styles.container, { backgroundColor: theme.colors.surface }]}
      testID="profile-header"
    >
      <Avatar.Image
        size={80}
        source={photoURL ? { uri: photoURL } : undefined}
        testID="profile-avatar"
        accessibilityLabel={`${displayName}'s profile picture`}
      />
      {!photoURL && (
        <Avatar.Text
          size={80}
          label={displayName.split(' ').map(n => n[0]).join('')}
          testID="profile-avatar-fallback"
          accessibilityLabel={`${displayName}'s profile picture`}
        />
      )}
      
      <Text 
        variant="headlineSmall" 
        style={[styles.name, { color: theme.colors.onSurface }]}
        testID="profile-name"
      >
        {displayName}
      </Text>
      
      <Text 
        variant="bodyMedium" 
        style={[styles.email, { color: theme.colors.onSurfaceVariant }]}
        testID="profile-email"
      >
        {email}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 8,
    elevation: 2,
  },
  name: {
    marginTop: 16,
    fontWeight: 'bold',
  },
  email: {
    marginTop: 4,
  },
}); 