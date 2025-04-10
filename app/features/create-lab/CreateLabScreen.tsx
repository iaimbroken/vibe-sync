import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import type { CustomTheme } from '../../shared/types';
import ToolSelector from './components/ToolSelector';
import FormatPresets from './components/FormatPresets';
import InputArea from './components/InputArea';
import CustomOptionsPanel from './components/CustomOptionsPanel';
import { GenerateButton } from './components/GenerateButton';
import ResultDisplay from './components/ResultDisplay';

const CreateLabScreen: React.FC = () => {
  const theme = useTheme() as CustomTheme;
  const [selectedTool, setSelectedTool] = useState<string>('');
  const [selectedPresets, setSelectedPresets] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const [options, setOptions] = useState({
    style: 'Dreamy',
    platform: 'IG',
    quantity: 1,
  });
  const [result, setResult] = useState<{
    type: 'image' | 'text';
    content: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleToolSelect = (tool: string) => {
    setSelectedTool(tool);
    setResult(null);
  };

  const handlePresetToggle = (preset: string) => {
    setSelectedPresets((prev) =>
      prev.includes(preset)
        ? prev.filter((p) => p !== preset)
        : [...prev, preset]
    );
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));
    setResult({
      type: selectedTool === 'text-analysis' ? 'text' : 'image',
      content: 'Generated content',
    });
    setIsLoading(false);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.section}>
        <ToolSelector onSelect={handleToolSelect} selectedTool={selectedTool} />
      </View>

      {selectedTool && (
        <>
          <View style={styles.section}>
            <FormatPresets
              selectedPresets={selectedPresets}
              onToggle={handlePresetToggle}
            />
          </View>

          <View style={styles.section}>
            <InputArea
              toolType={selectedTool}
              value={input}
              onChangeText={setInput}
              isLoading={isLoading}
            />
          </View>

          <View style={styles.section}>
            <CustomOptionsPanel
              toolType={selectedTool}
              options={options}
              onChange={setOptions}
            />
          </View>

          <View style={styles.section}>
            <GenerateButton
              onPress={handleGenerate}
              isLoading={isLoading}
              disabled={!input}
            />
          </View>

          {result && (
            <View style={styles.section}>
              <ResultDisplay
                result={result}
                onSave={() => {}}
                onSchedule={() => {}}
                onPost={() => {}}
              />
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
});

export default CreateLabScreen; 