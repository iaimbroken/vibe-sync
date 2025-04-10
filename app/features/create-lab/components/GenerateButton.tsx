import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import type { CustomTheme } from '../../../shared/types';

interface GenerateButtonProps {
  onPress: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({
  onPress,
  isLoading,
  disabled = false,
}) => {
  const theme = useTheme() as CustomTheme;

  return (
    <Button
      mode="contained"
      onPress={onPress}
      loading={isLoading}
      disabled={disabled || isLoading}
      style={[
        styles.button,
        {
          backgroundColor: theme.colors.primary,
        },
      ]}
      contentStyle={styles.content}
      labelStyle={styles.label}
      testID="generate-button"
    >
      ⚡ Generate Magic
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 8,
  },
  content: {
    height: 56,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 