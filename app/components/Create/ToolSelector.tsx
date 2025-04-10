import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';
import { ToolType } from '../../screens/CreateLabScreen';

interface ToolSelectorProps {
  selectedTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
}

export const ToolSelector: React.FC<ToolSelectorProps> = ({
  selectedTool,
  onSelectTool,
}) => {
  const theme = useTheme();

  const tools = [
    { value: 'text-analysis', label: '📝 Text Analysis' },
    { value: 'image-generation', label: '🎨 Image Generation' },
    { value: 'code-generation', label: '💻 Code Generation' },
    { value: 'translation', label: '🌐 Translation' },
    { value: 'summarization', label: '📋 Summarization' },
  ] as const;

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {tools.map((tool) => (
        <Chip
          key={tool.value}
          selected={selectedTool === tool.value}
          onPress={() => onSelectTool(tool.value as ToolType)}
          style={[
            styles.chip,
            {
              backgroundColor: 
                selectedTool === tool.value 
                  ? theme.colors.primaryContainer 
                  : theme.colors.surfaceVariant,
            }
          ]}
          textStyle={{
            color: selectedTool === tool.value
              ? theme.colors.onPrimaryContainer
              : theme.colors.onSurfaceVariant,
          }}
        >
          {tool.label}
        </Chip>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  content: {
    paddingVertical: 8,
    gap: 8,
    flexDirection: 'row',
  },
  chip: {
    marginRight: 8,
  },
}); 