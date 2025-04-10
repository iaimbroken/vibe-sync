import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import type { CustomTheme } from '../../shared/types';

interface BonusActionsProps {
  onStartNew: () => void;
  onSurprise: () => void;
}

const BonusActions: React.FC<BonusActionsProps> = ({ onStartNew, onSurprise }) => {
  const theme = useTheme() as CustomTheme;

  const getButtonStyle = (): ViewStyle => ({
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.sm,
  });

  return (
    <View style={[styles.container, { gap: theme.spacing.md }]}>
      <Button
        mode="contained"
        onPress={onStartNew}
        style={getButtonStyle()}
        accessibilityLabel="Start something new"
        testID="start-new-button"
      >
        🚀 Start Something New
      </Button>
      <Button
        mode="contained"
        onPress={onSurprise}
        style={getButtonStyle()}
        accessibilityLabel="Surprise me with a prompt"
        testID="surprise-button"
      >
        ✨ Surprise Me with a Prompt
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default BonusActions; 