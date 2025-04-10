import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, TextInput, Button, Card, ActivityIndicator, useTheme } from 'react-native-paper';

export const TextAnalysisScreen: React.FC = () => {
  const theme = useTheme();
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleAnalyze = () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);

    // Simulate analysis with setTimeout
    setTimeout(() => {
      const wordCount = text.trim().split(/\s+/).length;
      const charCount = text.length;
      const result = `Analysis Complete!\n\nWord Count: ${wordCount}\nCharacter Count: ${charCount}\n\nThis is a simulated analysis. In a real app, this would use AI to analyze the text.`;
      
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <TextInput
            mode="outlined"
            label="Enter text to analyze"
            value={text}
            onChangeText={setText}
            multiline
            numberOfLines={6}
            style={styles.input}
            accessibilityLabel="Text input for analysis"
          />

          <Button
            mode="contained"
            onPress={handleAnalyze}
            style={styles.button}
            disabled={!text.trim() || isAnalyzing}
            accessibilityLabel="Analyze text"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
          </Button>

          {isAnalyzing && (
            <ActivityIndicator 
              animating={true} 
              color={theme.colors.primary}
              style={styles.loader}
            />
          )}

          {analysisResult && (
            <Card style={styles.resultCard}>
              <Card.Content>
                <Text 
                  variant="bodyLarge"
                  style={{ color: theme.colors.onSurface }}
                >
                  {analysisResult}
                </Text>
              </Card.Content>
            </Card>
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
  input: {
    minHeight: 120,
  },
  button: {
    marginTop: 8,
  },
  loader: {
    marginTop: 16,
  },
  resultCard: {
    marginTop: 16,
  },
}); 