import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, Text, useTheme } from 'react-native-paper';
import { ToolType } from '../../screens/CreateLabScreen';

interface FormatPresetsProps {
  selectedTool: ToolType;
}

interface Preset {
  id: string;
  label: string;
  description: string;
  tools: ToolType[];
}

const PRESETS: Preset[] = [
  {
    id: 'social-post',
    label: '📱 Social Post',
    description: 'Engaging social media content',
    tools: ['text-analysis', 'image-generation'],
  },
  {
    id: 'blog-article',
    label: '📝 Blog Article',
    description: 'Long-form content with sections',
    tools: ['text-analysis', 'summarization'],
  },
  {
    id: 'code-docs',
    label: '💻 Code Docs',
    description: 'Technical documentation',
    tools: ['code-generation', 'text-analysis'],
  },
  {
    id: 'translation-pack',
    label: '🌐 Translation Pack',
    description: 'Multi-language content',
    tools: ['translation', 'text-analysis'],
  },
];

export const FormatPresets: React.FC<FormatPresetsProps> = ({
  selectedTool,
}) => {
  const theme = useTheme();
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const availablePresets = PRESETS.filter(
    preset => preset.tools.includes(selectedTool)
  );

  if (availablePresets.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text 
        variant="titleSmall" 
        style={[styles.title, { color: theme.colors.onSurfaceVariant }]}
      >
        Suggested Formats
      </Text>
      <View style={styles.presetList}>
        {availablePresets.map((preset) => (
          <Chip
            key={preset.id}
            selected={selectedPreset === preset.id}
            onPress={() => setSelectedPreset(
              selectedPreset === preset.id ? null : preset.id
            )}
            style={[
              styles.preset,
              {
                backgroundColor: 
                  selectedPreset === preset.id
                    ? theme.colors.secondaryContainer
                    : theme.colors.surfaceVariant,
              }
            ]}
            textStyle={{
              color: selectedPreset === preset.id
                ? theme.colors.onSecondaryContainer
                : theme.colors.onSurfaceVariant,
            }}
          >
            {preset.label}
          </Chip>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  title: {
    marginLeft: 4,
  },
  presetList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  preset: {
    marginRight: 8,
  },
}); 