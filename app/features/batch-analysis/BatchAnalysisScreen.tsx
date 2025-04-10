import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, TextInput, Button, Card, ActivityIndicator, useTheme } from 'react-native-paper';

interface TextBlock {
  id: string;
  text: string;
  isAnalyzing: boolean;
  result: string | null;
}

export const BatchAnalysisScreen: React.FC = () => {
  const theme = useTheme();
  const [textBlocks, setTextBlocks] = useState<TextBlock[]>([]);

  const addTextBlock = () => {
    const newBlock: TextBlock = {
      id: Date.now().toString(),
      text: '',
      isAnalyzing: false,
      result: null,
    };
    setTextBlocks([...textBlocks, newBlock]);
  };

  const removeTextBlock = (id: string) => {
    setTextBlocks(textBlocks.filter(block => block.id !== id));
  };

  const updateTextBlock = (id: string, text: string) => {
    setTextBlocks(textBlocks.map(block => 
      block.id === id ? { ...block, text } : block
    ));
  };

  const analyzeTextBlock = (id: string) => {
    setTextBlocks(textBlocks.map(block => 
      block.id === id ? { ...block, isAnalyzing: true, result: null } : block
    ));

    // Simulate analysis with setTimeout
    setTimeout(() => {
      const mockResults = [
        'Sentiment: Positive',
        'Category: Tech',
        'Sentiment: Neutral',
        'Category: Business',
        'Sentiment: Negative',
        'Category: Lifestyle'
      ];
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      
      setTextBlocks(textBlocks.map(block => 
        block.id === id ? { ...block, isAnalyzing: false, result: randomResult } : block
      ));
    }, 2000);
  };

  const handleAnalyzeAll = () => {
    textBlocks.forEach(block => {
      if (block.text.trim()) {
        analyzeTextBlock(block.id);
      }
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text 
            variant="headlineMedium" 
            style={styles.header}
            accessibilityLabel="Batch Analysis"
          >
            Batch Analysis
          </Text>

          {textBlocks.map((block) => (
            <Card 
              key={block.id}
              style={[
                styles.textBlock,
                { backgroundColor: theme.colors.surfaceVariant }
              ]}
            >
              <Card.Content>
                <View style={styles.textBlockHeader}>
                  <TextInput
                    mode="outlined"
                    label="Enter text to analyze"
                    value={block.text}
                    onChangeText={(text: string) => updateTextBlock(block.id, text)}
                    multiline
                    numberOfLines={4}
                    style={styles.input}
                    accessibilityLabel={`Text input block ${block.id}`}
                  />
                  <Button
                    icon="delete"
                    mode="text"
                    style={styles.deleteButton}
                    onPress={() => removeTextBlock(block.id)}
                    accessibilityLabel={`Remove text block ${block.id}`}
                  />
                </View>

                {block.isAnalyzing && (
                  <ActivityIndicator 
                    animating={true} 
                    color={theme.colors.primary}
                    style={styles.loader}
                  />
                )}

                {block.result && (
                  <Text 
                    variant="bodyLarge"
                    style={[
                      styles.result,
                      { color: theme.colors.onSurfaceVariant }
                    ]}
                  >
                    {block.result}
                  </Text>
                )}
              </Card.Content>
            </Card>
          ))}

          <Button
            mode="contained"
            onPress={addTextBlock}
            style={styles.addButton}
            icon="plus"
            accessibilityLabel="Add text block"
          >
            Add Text
          </Button>

          {textBlocks.length > 0 && (
            <Button
              mode="contained"
              onPress={handleAnalyzeAll}
              style={styles.analyzeButton}
              disabled={textBlocks.every(block => !block.text.trim())}
              accessibilityLabel="Analyze all text blocks"
            >
              Analyze All
            </Button>
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
  header: {
    marginBottom: 16,
    textAlign: 'center',
  },
  textBlock: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  textBlockHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  input: {
    flex: 1,
    minHeight: 100,
  },
  deleteButton: {
    marginTop: 8,
    margin: 0,
    padding: 0,
  },
  loader: {
    marginTop: 8,
  },
  result: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  addButton: {
    marginTop: 8,
    borderRadius: 8,
  },
  analyzeButton: {
    marginTop: 8,
    borderRadius: 8,
  },
}); 