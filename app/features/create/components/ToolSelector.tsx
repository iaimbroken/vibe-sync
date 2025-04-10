import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { ToolType } from '../CreateLabScreen';

interface ToolSelectorProps {
  selectedTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
}

const tools = [
  { id: 'image-edit', label: 'Image Edit', icon: '📸' },
  { id: 'ai-art', label: 'AI Art', icon: '🎨' },
  { id: 'text-analysis', label: 'Text Analysis', icon: '💬' },
  { id: 'batch-tools', label: 'Batch Tools', icon: '🧪' },
] as const;

export const ToolSelector: React.FC<ToolSelectorProps> = ({ selectedTool, onSelectTool }) => {
  const theme = useTheme();

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {tools.map((tool) => (
        <Card
          key={tool.id}
          style={[
            styles.toolCard,
            { 
              backgroundColor: selectedTool === tool.id 
                ? theme.colors.primaryContainer 
                : theme.colors.surfaceVariant 
            }
          ]}
          onPress={() => onSelectTool(tool.id as ToolType)}
        >
          <Card.Content style={styles.cardContent}>
            <Text variant="headlineMedium">{tool.icon}</Text>
            <Text 
              variant="labelLarge"
              style={[
                styles.toolLabel,
                { 
                  color: selectedTool === tool.id 
                    ? theme.colors.onPrimaryContainer 
                    : theme.colors.onSurfaceVariant 
                }
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
  scrollContent: {
    paddingVertical: 8,
    gap: 12,
  },
  toolCard: {
    width: 120,
    marginRight: 12,
    borderRadius: 12,
  },
  cardContent: {
    alignItems: 'center',
    padding: 12,
  },
  toolLabel: {
    marginTop: 8,
    textAlign: 'center',
  },
}); 