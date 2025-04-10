import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

interface GenerateButtonProps {
  onPress: () => void;
  loading: boolean;
  disabled?: boolean;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({
  onPress,
  loading,
  disabled = false,
}) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      style={styles.button}
      contentStyle={styles.buttonContent}
      icon="sparkles"
    >
      {loading ? 'Generating...' : 'Generate'}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
  },
  buttonContent: {
    height: 48,
  },
}); 