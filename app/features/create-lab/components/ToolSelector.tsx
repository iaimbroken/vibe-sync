import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import type { CustomTheme } from '../../../shared/types';

interface Tool {
  id: string;
  label: string;
  icon: string;
}

const tools: Tool[] = [
  { id: 'image-edit', label: 'Image Edit', icon: '📸' },
  { id: 'ai-art', label: 'AI Art', icon: '🎨' },
  { id: 'text-analysis', label: 'Caption/Text', icon: '💬' },
  { id: 'batch-tools', label: 'Batch Tools', icon: '🧪' },
];

interface ToolSelectorProps {
  selectedTool: string;
  onSelect: (tool: string) => void;
}

const ToolSelector: React.FC<ToolSelectorProps> = ({ selectedTool, onSelect }) => {
  const theme = useTheme() as CustomTheme;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {tools.map((tool) => (
        <Card
          key={tool.id}
          style={[
            styles.card,
            {
              backgroundColor:
                selectedTool === tool.id
                  ? theme.colors.primaryContainer
                  : theme.colors.surface,
            },
          ]}
          onPress={() => onSelect(tool.id)}
          testID={`tool-${tool.id}`}
        >
          <Card.Content style={styles.content}>
            <Text variant="headlineMedium" style={styles.icon}>
              {tool.icon}
            </Text>
            <Text
              variant="bodyLarge"
              style={[
                styles.label,
                {
                  color:
                    selectedTool === tool.id
                      ? theme.colors.onPrimaryContainer
                      : theme.colors.onSurface,
                },
              ]}
            >
              {tool.label}
            </Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    gap: 12,
  },
  card: {
    width: 120,
    marginRight: 8,
  },
  content: {
    alignItems: 'center',
    padding: 12,
  },
  icon: {
    marginBottom: 8,
  },
  label: {
    textAlign: 'center',
  },
});

export default ToolSelector; 