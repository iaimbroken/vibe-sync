import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ToolSelector } from '../components/Create/ToolSelector';
import { FormatPresets } from '../components/Create/FormatPresets';
import { InputArea } from '../components/Create/InputArea';
import { CustomOptionsPanel } from '../components/Create/CustomOptionsPanel';
import { GenerateButton } from '../components/Create/GenerateButton';
import { ResultDisplay } from '../components/Create/ResultDisplay';

// Define available tool types
export type ToolType = 
  | 'text-analysis' 
  | 'image-generation' 
  | 'code-generation'
  | 'translation'
  | 'summarization';

export const CreateLabScreen: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  // State management
  const [selectedTool, setSelectedTool] = useState<ToolType>('text-analysis');
  const [result, setResult] = useState<{
    type: ToolType;
    content: string | string[];
    metadata?: Record<string, any>;
  } | null>(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock generate function - replace with actual API call
  const handleGenerate = async () => {
    if (!input.trim()) {
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // Simulate API call
      await new Promise((resolve: () => void) => setTimeout(resolve, 1500));
      
      setResult({ 
        type: selectedTool, 
        content: `✨ Generated content for "${input}" using ${selectedTool}`,
        metadata: {
          timestamp: new Date().toISOString(),
          toolType: selectedTool,
        }
      });
    } catch (error) {
      console.error('Generation failed:', error);
      // Handle error state here
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      style={[styles.wrapper, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={[
        styles.container,
        { paddingBottom: insets.bottom + 16 }
      ]}
    >
      <Text 
        variant="headlineMedium" 
        style={[styles.title, { color: theme.colors.onSurface }]}
      >
        Create Lab
      </Text>

      <View style={styles.section}>
        <ToolSelector 
          selectedTool={selectedTool} 
          onSelectTool={setSelectedTool} 
        />
      </View>

      <View style={styles.section}>
        <FormatPresets selectedTool={selectedTool} />
      </View>

      <View style={styles.section}>
        <InputArea
          toolType={selectedTool}
          value={input}
          onChangeText={setInput}
        />
      </View>

      <View style={styles.section}>
        <CustomOptionsPanel toolType={selectedTool} />
      </View>

      <View style={styles.section}>
        <GenerateButton 
          onPress={handleGenerate} 
          loading={loading}
          disabled={!input.trim()}
        />
      </View>

      <View style={styles.section}>
        <ResultDisplay 
          result={result} 
          loading={loading} 
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 24,
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
  },
}); 