import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Switch, useTheme, Surface, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Platform {
  id: string;
  name: string;
  connected: boolean;
}

interface ConnectedPlatformsProps {
  platforms: Platform[];
  onToggle: (platformId: string) => void;
}

export const ConnectedPlatforms: React.FC<ConnectedPlatformsProps> = ({
  platforms,
  onToggle,
}) => {
  const theme = useTheme();

  const getPlatformIcon = (platformId: string) => {
    switch (platformId.toLowerCase()) {
      case 'instagram':
        return 'instagram';
      case 'twitter':
        return 'twitter';
      case 'facebook':
        return 'facebook';
      case 'linkedin':
        return 'linkedin';
      case 'tiktok':
        return 'tiktok';
      default:
        return 'web';
    }
  };

  return (
    <Card style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Card.Title title="Connected Platforms" />
      <Card.Content>
        {platforms.map((platform) => (
          <Surface key={platform.id} style={styles.item}>
            <View style={styles.itemContent}>
              <MaterialCommunityIcons
                name={getPlatformIcon(platform.id)}
                size={24}
                color={theme.colors.primary}
                style={styles.icon}
              />
              <Text variant="bodyLarge">{platform.name}</Text>
            </View>
            <Switch
              value={platform.connected}
              onValueChange={() => onToggle(platform.id)}
              testID={`platform-toggle-${platform.id}`}
              accessibilityLabel={`Toggle ${platform.name} connection`}
            />
          </Surface>
        ))}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
}); 