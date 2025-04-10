import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text, Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Suggestion {
  id: string;
  icon: string;
  title: string;
  description: string;
  action: string;
}

interface IconProps {
  size: number;
  color: string;
}

const SUGGESTIONS: Suggestion[] = [
  {
    id: '1',
    icon: '🎨',
    title: 'Turn your AI art into a Reel',
    description: 'Your recent AI artwork would make a great Reel cover.',
    action: 'Create Reel',
  },
  {
    id: '2',
    icon: '📝',
    title: 'Schedule your drafts',
    description: 'You have 3 completed drafts ready to schedule.',
    action: 'Schedule Now',
  },
  {
    id: '3',
    icon: '🔄',
    title: 'Repurpose top content',
    description: 'Your most engaging post can be transformed into a carousel.',
    action: 'Transform',
  },
];

export const SmartSuggestions: React.FC = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {SUGGESTIONS.map((suggestion) => (
        <Surface
          key={suggestion.id}
          style={[
            styles.card,
            { backgroundColor: theme.colors.surfaceVariant }
          ]}
          elevation={0}
        >
          <View style={styles.content}>
            <Text style={styles.icon}>{suggestion.icon}</Text>
            <View style={styles.textContent}>
              <Text
                variant="titleMedium"
                style={[styles.title, { color: theme.colors.onSurface }]}
              >
                {suggestion.title}
              </Text>
              <Text
                variant="bodySmall"
                style={[styles.description, { color: theme.colors.onSurfaceVariant }]}
              >
                {suggestion.description}
              </Text>
            </View>
          </View>
          <Button
            mode="outlined"
            onPress={() => {}}
            style={[styles.button, { borderColor: theme.colors.primary }]}
            labelStyle={{ color: theme.colors.primary }}
            icon={({ size, color }: IconProps) => (
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={size}
                color={color}
              />
            )}
          >
            {suggestion.action}
          </Button>
        </Surface>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    gap: 8,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  content: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  icon: {
    fontSize: 24,
  },
  textContent: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontWeight: '600',
  },
  description: {
    opacity: 0.7,
  },
  button: {
    alignSelf: 'flex-start',
  },
}); 