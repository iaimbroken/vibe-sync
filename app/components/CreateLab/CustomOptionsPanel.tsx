import React from 'react';
import { View, StyleSheet } from 'react-native';
import { 
  Text, 
  TextInput, 
  Switch, 
  useTheme, 
  Surface,
  Button,
} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ToolType } from '../../types/tools';
import { AIGenerationOptions } from '../../types/ai';

type StyleOption = 'dreamy' | 'bold' | 'vintage' | 'minimal';
type PlatformOption = 'instagram' | 'x' | 'threads' | 'facebook';

interface CustomOptionsPanelProps {
  toolType: ToolType;
  currentOptions: AIGenerationOptions;
  onOptionsChange: (options: AIGenerationOptions) => void;
}

const STYLE_OPTIONS = [
  { value: 'dreamy', label: 'Dreamy', icon: 'cloud-outline' as const },
  { value: 'bold', label: 'Bold', icon: 'lightning-bolt' as const },
  { value: 'vintage', label: 'Vintage', icon: 'image-filter-vintage' as const },
  { value: 'minimal', label: 'Minimal', icon: 'minus-circle-outline' as const },
] as const;

const PLATFORM_OPTIONS = [
  { value: 'instagram', label: 'Instagram', icon: 'instagram' as const },
  { value: 'x', label: 'X (Twitter)', icon: 'twitter' as const },
  { value: 'threads', label: 'Threads', icon: 'at' as const },
  { value: 'facebook', label: 'Facebook', icon: 'facebook' as const },
] as const;

export const CustomOptionsPanel: React.FC<CustomOptionsPanelProps> = ({
  toolType,
  currentOptions,
  onOptionsChange,
}) => {
  const theme = useTheme();

  const handleOptionChange = (key: keyof AIGenerationOptions, value: number | boolean) => {
    onOptionsChange({
      ...currentOptions,
      [key]: value,
    });
  };

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={[styles.title, { color: theme.colors.onSurface }]}>
        Customize
      </Text>

      <View style={styles.optionsGrid}>
        {toolType === 'art-generator' && (
          <>
            <View style={styles.option}>
              <Text>Style Intensity</Text>
              <Slider
                value={currentOptions.intensity || 50}
                onValueChange={(value: number) => handleOptionChange('intensity', value)}
                minimumValue={0}
                maximumValue={100}
                step={1}
                minimumTrackTintColor={theme.colors.primary}
                maximumTrackTintColor={theme.colors.surfaceVariant}
                thumbTintColor={theme.colors.primary}
              />
            </View>

            <View style={styles.option}>
              <Text>Quantity</Text>
              <Slider
                value={currentOptions.quantity || 1}
                onValueChange={(value: number) => handleOptionChange('quantity', value)}
                minimumValue={1}
                maximumValue={4}
                step={1}
                minimumTrackTintColor={theme.colors.primary}
                maximumTrackTintColor={theme.colors.surfaceVariant}
                thumbTintColor={theme.colors.primary}
              />
            </View>
          </>
        )}

        <View style={styles.switchOption}>
          <Text>Advanced Mode</Text>
          <Switch
            value={currentOptions.advancedMode || false}
            onValueChange={(value: boolean) => handleOptionChange('advancedMode', value)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  title: {
    marginBottom: 8,
  },
  optionsGrid: {
    gap: 16,
  },
  option: {
    gap: 8,
  },
  switchOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}); 