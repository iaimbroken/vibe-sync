import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import { ToolSelector } from './components/ToolSelector';
import { FormatPresets } from './components/FormatPresets';
import { InputArea } from './components/InputArea';
import { CustomOptionsPanel } from './components/CustomOptionsPanel';
import { GenerateButton } from './components/GenerateButton';
import { ResultDisplay } from './components/ResultDisplay';

export type ToolType = 'image-edit' | 'ai-art' | 'text-analysis' | 'batch-tools';
export type FormatType = 'carousel' | 'reel' | 'text-post';

export const CreateLabScreen: React.FC = () => {
  const theme = useTheme();
  const [selectedTool, setSelectedTool] = useState<ToolType>('image-edit');
  const [selectedFormat, setSelectedFormat] = useState<FormatType | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setResult({
        type: selectedTool,
        content: 'Generated content here',
        timestamp: new Date().toISOString(),
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <ToolSelector 
            selectedTool={selectedTool}
            onSelectTool={setSelectedTool}
          />

          <FormatPresets 
            selectedFormat={selectedFormat}
            onSelectFormat={setSelectedFormat}
          />

          <InputArea 
            toolType={selectedTool}
            formatType={selectedFormat}
          />

          <CustomOptionsPanel 
            toolType={selectedTool}
            formatType={selectedFormat}
          />

          <GenerateButton 
            onPress={handleGenerate}
            isLoading={isGenerating}
          />

          {result && (
            <ResultDisplay 
              result={result}
              onSave={() => {}}
              onSchedule={() => {}}
              onPost={() => {}}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
    gap: 16,
  },
}); 