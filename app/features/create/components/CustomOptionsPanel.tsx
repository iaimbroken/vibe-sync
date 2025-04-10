import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Chip, Text, useTheme } from 'react-native-paper';
import { ToolType } from '../CreateLabScreen';

interface CustomOptionsPanelProps {
  selectedTool: ToolType;
  customOptions: Record<string, any>;
  onOptionChange: (key: string, value: any) => void;
}

export const CustomOptionsPanel: React.FC<CustomOptionsPanelProps> = ({
  selectedTool,
  customOptions,
  onOptionChange,
}) => {
  const theme = useTheme();

  const renderOptions = () => {
    switch (selectedTool) {
      case 'image-edit':
        return (
          <>
            <Text variant="labelMedium" style={styles.optionLabel}>Adjustments</Text>
            <View style={styles.chipContainer}>
              {['Brightness', 'Contrast', 'Saturation', 'Sharpness'].map((option) => (
                <Chip
                  key={option}
                  selected={customOptions[option.toLowerCase()]}
                  onPress={() => onOptionChange(option.toLowerCase(), !customOptions[option.toLowerCase()])}
                  style={styles.chip}
                >
                  {option}
                </Chip>
              ))}
            </View>
          </>
        );
      case 'ai-art':
        return (
          <>
            <Text variant="labelMedium" style={styles.optionLabel}>Style</Text>
            <View style={styles.chipContainer}>
              {['Realistic', 'Anime', 'Watercolor', 'Pixel Art'].map((style) => (
                <Chip
                  key={style}
                  selected={customOptions.style === style}
                  onPress={() => onOptionChange('style', style)}
                  style={styles.chip}
                >
                  {style}
                </Chip>
              ))}
            </View>
          </>
        );
      case 'text-analysis':
        return (
          <>
            <Text variant="labelMedium" style={styles.optionLabel}>Analysis Type</Text>
            <View style={styles.chipContainer}>
              {['Sentiment', 'Keywords', 'Summary', 'Translation'].map((type) => (
                <Chip
                  key={type}
                  selected={customOptions.analysisType === type}
                  onPress={() => onOptionChange('analysisType', type)}
                  style={styles.chip}
                >
                  {type}
                </Chip>
              ))}
            </View>
          </>
        );
      case 'batch-tools':
        return (
          <>
            <Text variant="labelMedium" style={styles.optionLabel}>Batch Options</Text>
            <View style={styles.chipContainer}>
              {['Resize', 'Format', 'Watermark', 'Metadata'].map((option) => (
                <Chip
                  key={option}
                  selected={customOptions[option.toLowerCase()]}
                  onPress={() => onOptionChange(option.toLowerCase(), !customOptions[option.toLowerCase()])}
                  style={styles.chip}
                >
                  {option}
                </Chip>
              ))}
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text 
        variant="titleMedium" 
        style={[styles.title, { color: theme.colors.onSurfaceVariant }]}
      >
        Custom Options
      </Text>
      {renderOptions()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  title: {
    marginBottom: 8,
  },
  optionLabel: {
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginRight: 8,
  },
}); 