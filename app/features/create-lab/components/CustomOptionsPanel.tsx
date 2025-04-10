import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, Slider, Text, useTheme } from 'react-native-paper';
import type { CustomTheme } from '../../../shared/types';

interface Options {
  style: string;
  platform: string;
  quantity: number;
}

interface CustomOptionsPanelProps {
  toolType: string;
  options: Options;
  onChange: (options: Options) => void;
}

const styleOptions = [
  { id: 'dreamy', label: 'Dreamy' },
  { id: 'bold', label: 'Bold' },
  { id: 'vintage', label: 'Vintage' },
];

const platforms = [
  { id: 'ig', label: 'Instagram' },
  { id: 'x', label: 'X' },
  { id: 'threads', label: 'Threads' },
  { id: 'fb', label: 'Facebook' },
];

const CustomOptionsPanel: React.FC<CustomOptionsPanelProps> = ({
  toolType,
  options,
  onChange,
}) => {
  const theme = useTheme() as CustomTheme;

  const handleStyleChange = (style: string) => {
    onChange({ ...options, style });
  };

  const handlePlatformChange = (platform: string) => {
    onChange({ ...options, platform });
  };

  const handleQuantityChange = (quantity: number) => {
    onChange({ ...options, quantity });
  };

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Customize Output
      </Text>

      <View style={styles.section}>
        <Text variant="bodyMedium" style={styles.label}>
          Style
        </Text>
        <View style={styles.chipContainer}>
          {styleOptions.map((style) => (
            <Chip
              key={style.id}
              selected={options.style === style.id}
              onPress={() => handleStyleChange(style.id)}
              style={[
                styles.chip,
                {
                  backgroundColor:
                    options.style === style.id
                      ? theme.colors.primaryContainer
                      : theme.colors.surfaceVariant,
                },
              ]}
              textStyle={{
                color:
                  options.style === style.id
                    ? theme.colors.onPrimaryContainer
                    : theme.colors.onSurfaceVariant,
              }}
              testID={`style-${style.id}`}
            >
              {style.label}
            </Chip>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="bodyMedium" style={styles.label}>
          Platform
        </Text>
        <View style={styles.chipContainer}>
          {platforms.map((platform) => (
            <Chip
              key={platform.id}
              selected={options.platform === platform.id}
              onPress={() => handlePlatformChange(platform.id)}
              style={[
                styles.chip,
                {
                  backgroundColor:
                    options.platform === platform.id
                      ? theme.colors.primaryContainer
                      : theme.colors.surfaceVariant,
                },
              ]}
              textStyle={{
                color:
                  options.platform === platform.id
                    ? theme.colors.onPrimaryContainer
                    : theme.colors.onSurfaceVariant,
              }}
              testID={`platform-${platform.id}`}
            >
              {platform.label}
            </Chip>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="bodyMedium" style={styles.label}>
          Quantity: {options.quantity}
        </Text>
        <Slider
          value={options.quantity}
          onValueChange={handleQuantityChange}
          minimumValue={1}
          maximumValue={10}
          step={1}
          style={styles.slider}
          testID="quantity-slider"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  section: {
    gap: 8,
  },
  label: {
    marginBottom: 4,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginRight: 8,
  },
  slider: {
    width: '100%',
  },
});

export default CustomOptionsPanel; 