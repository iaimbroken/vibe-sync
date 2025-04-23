import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import type { CustomTheme } from '@/types/theme';

interface GreetingHeaderProps {
  name: string;
  subtitle?: string;
  onPress?: () => void;
}

export const GreetingHeader: React.FC<GreetingHeaderProps> = ({ 
  name, 
  subtitle = 'Welcome back to Aura Sync',
  onPress 
}) => {
  const theme = useTheme<CustomTheme>();
  const spacing = theme.custom.spacing;

  return (
    <View style={styles.container}>
      <Text 
        style={[styles.greeting, { color: theme.colors.onSurface }]}
        onPress={onPress}
      >
        Hello, {name}!
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
}); 