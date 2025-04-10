import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Card, List, Switch, Text, useTheme } from 'react-native-paper';

interface Platform {
  id: string;
  name: string;
  connected: boolean;
}

interface ConnectedPlatformsProps {
  platforms: Platform[];
  onTogglePlatform: (platformId: string) => Promise<void>;
}

export const ConnectedPlatforms: React.FC<ConnectedPlatformsProps> = ({
  platforms,
  onTogglePlatform,
}) => {
  const theme = useTheme();
  const [loadingPlatform, setLoadingPlatform] = useState<string | null>(null);

  const handleToggle = async (platformId: string) => {
    setLoadingPlatform(platformId);
    try {
      await onTogglePlatform(platformId);
    } catch (error) {
      Alert.alert(
        'Connection Error',
        'Failed to update platform connection. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoadingPlatform(null);
    }
  };

  const getPlatformIcon = (platformId: string) => {
    switch (platformId) {
      case 'instagram':
        return 'instagram';
      case 'threads':
        return 'message-text';
      case 'x':
        return 'twitter';
      case 'facebook':
        return 'facebook';
      default:
        return 'web';
    }
  };

  return (
    <Card style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Card.Title title="Connected Platforms" />
      <Card.Content>
        {platforms.map((platform) => (
          <List.Item
            key={platform.id}
            title={platform.name}
            left={(props) => (
              <List.Icon {...props} icon={getPlatformIcon(platform.id)} />
            )}
            right={() => (
              <Switch
                value={platform.connected}
                onValueChange={() => handleToggle(platform.id)}
                disabled={loadingPlatform === platform.id}
              />
            )}
          />
        ))}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
}); 