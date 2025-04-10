import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { PresetId } from '../../types/tools';

interface FormatPresetsProps {
  selectedPresets: PresetId[];
  onSelectPresets: (presets: PresetId[]) => void;
}

export const FormatPresets: React.FC<FormatPresetsProps> = ({
  selectedPresets,
  onSelectPresets,
}) => {
  const theme = useTheme();
  const currentPreset = selectedPresets[0] || 'single';

  const presetOptions: Array<{ label: string; value: PresetId }> = [
    { label: 'Single Post', value: 'single' },
    { label: 'Carousel', value: 'carousel' },
    { label: 'Story', value: 'story' },
    { label: 'Reel', value: 'reel' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        {presetOptions.map((option) => (
          <Button
            key={option.value}
            mode={currentPreset === option.value ? 'contained' : 'outlined'}
            onPress={() => onSelectPresets([option.value])}
            style={[
              styles.button,
              { 
                backgroundColor: currentPreset === option.value 
                  ? theme.colors.primaryContainer 
                  : theme.colors.surface
              }
            ]}
            labelStyle={{
              color: currentPreset === option.value
                ? theme.colors.onPrimaryContainer
                : theme.colors.onSurface
            }}
          >
            {option.label}
          </Button>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  button: {
    flex: 1,
    minWidth: 100,
  },
}); 