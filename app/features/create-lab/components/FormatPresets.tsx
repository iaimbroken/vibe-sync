import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';
import type { CustomTheme } from '../../../shared/types';

interface FormatPresetsProps {
  selectedPresets: string[];
  onToggle: (preset: string) => void;
}

const formats = [
  { id: 'ig-carousel', label: 'IG Carousel', icon: '🖼' },
  { id: 'reel-cover', label: 'Reel Cover', icon: '🎞' },
  { id: 'text-post', label: 'Text Post', icon: '✏️' },
];

const FormatPresets: React.FC<FormatPresetsProps> = ({
  selectedPresets,
  onToggle,
}) => {
  const theme = useTheme() as CustomTheme;

  return (
    <View style={styles.container}>
      {formats.map((format) => (
        <Chip
          key={format.id}
          selected={selectedPresets.includes(format.id)}
          onPress={() => onToggle(format.id)}
          style={[
            styles.chip,
            {
              backgroundColor: selectedPresets.includes(format.id)
                ? theme.colors.primaryContainer
                : theme.colors.surfaceVariant,
            },
          ]}
          textStyle={{
            color: selectedPresets.includes(format.id)
              ? theme.colors.onPrimaryContainer
              : theme.colors.onSurfaceVariant,
          }}
          testID={`format-${format.id}`}
        >
          {`${format.icon} ${format.label}`}
        </Chip>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginRight: 8,
  },
});

export default FormatPresets; 