import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text, useTheme, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ToolType } from '../../types/tools';

interface Tool {
  id: ToolType;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  description: string;
}

const TOOLS: Tool[] = [
  { 
    id: 'image-edit', 
    label: 'Edit Image', 
    icon: 'image-edit',
    description: 'Enhance and modify images'
  },
  { 
    id: 'ai-art', 
    label: 'AI Art', 
    icon: 'palette',
    description: 'Generate unique artwork'
  },
  { 
    id: 'text-analysis', 
    label: 'Text Analysis', 
    icon: 'text-box-search',
    description: 'Analyze and improve text'
  },
  { 
    id: 'batch-tools', 
    label: 'Batch Tools', 
    icon: 'folder-multiple',
    description: 'Process multiple items'
  },
];

interface Props {
  selectedTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
}

export const ToolSelector: React.FC<Props> = ({ selectedTool, onSelectTool }) => {
  const theme = useTheme();

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {TOOLS.map((tool) => {
        const isActive = selectedTool === tool.id;
        return (
          <Pressable
            key={tool.id}
            onPress={() => onSelectTool(tool.id)}
            style={({ pressed }) => [
              styles.cardWrapper,
              { opacity: pressed ? 0.7 : 1 }
            ]}
          >
            <Surface
              style={[
                styles.card,
                {
                  backgroundColor: isActive ? theme.colors.primaryContainer : theme.colors.surface,
                  borderColor: isActive ? theme.colors.primary : theme.colors.outline,
                }
              ]}
            >
              <MaterialCommunityIcons 
                name={tool.icon} 
                size={28} 
                color={isActive ? theme.colors.primary : theme.colors.onSurfaceVariant} 
              />
              <Text 
                variant="titleMedium"
                style={[
                  styles.label,
                  { 
                    color: isActive ? theme.colors.onPrimaryContainer : theme.colors.onSurface
                  }
                ]}
              >
                {tool.label}
              </Text>
              <Text
                variant="bodySmall"
                style={[
                  styles.description,
                  {
                    color: isActive ? theme.colors.onPrimaryContainer : theme.colors.onSurfaceVariant
                  }
                ]}
              >
                {tool.description}
              </Text>
            </Surface>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  contentContainer: {
    paddingHorizontal: 4,
    gap: 12,
  },
  cardWrapper: {
    width: 160,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  label: {
    fontWeight: '600',
  },
  description: {
    opacity: 0.8,
  },
}); 