import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { CustomTheme } from '@/types/theme';

interface ThemeToggleButtonProps {
  onToggle: () => void;
}

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ onToggle }) => {
  const theme = useTheme<CustomTheme>();

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: theme.colors.surfaceVariant }]}
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
  button: {
    padding: 8,
    borderRadius: 20,
    marginRight: 16,
  },
}); 