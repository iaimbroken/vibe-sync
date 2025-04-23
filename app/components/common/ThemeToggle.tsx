import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { CustomTheme } from '@/types/theme';

interface ThemeToggleProps {
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ onToggle }) => {
  const theme = useTheme<CustomTheme>();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.colors.surfaceVariant }]}
      onPress={onToggle}
    >
      <MaterialCommunityIcons
        name={theme.dark ? 'weather-sunny' : 'weather-night'}
        size={24}
        color={theme.colors.primary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 20,
  },
}); 