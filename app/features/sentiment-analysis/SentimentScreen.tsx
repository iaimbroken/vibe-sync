import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, TextInput, Button, Card, ActivityIndicator, useTheme } from 'react-native-paper';

type Sentiment = 'positive' | 'negative' | 'neutral';

export const SentimentScreen: React.FC = () => {
  const theme = useTheme();
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sentiment, setSentiment] = useState<Sentiment | null>(null);

  const getSentimentColor = (sentiment: Sentiment) => {
    switch (sentiment) {
      case 'positive':
        return theme.colors.success;
      case 'negative':
        return theme.colors.error;
      case 'neutral':
        return theme.colors.outline;
    }
  };

  const handleAnalyze = () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setSentiment(null);

    // Simulate sentiment analysis with setTimeout
    setTimeout(() => {
      // Mock sentiment analysis
      const mockSentiments: Sentiment[] = ['positive', 'negative', 'neutral'];
      const randomSentiment = mockSentiments[Math.floor(Math.random() * mockSentiments.length)];
      
      setSentiment(randomSentiment);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <TextInput
            mode="outlined"
            label="Enter text to analyze sentiment"
            value={text}
            onChangeText={setText}
            multiline
            numberOfLines={6}
            style={styles.input}
            accessibilityLabel="Text input for sentiment analysis"
          />

          <Button
            mode="contained"
            onPress={handleAnalyze}
            style={styles.button}
            disabled={!text.trim() || isAnalyzing}
            accessibilityLabel="Analyze sentiment"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Sentiment'}
          </Button>

          {isAnalyzing && (
            <ActivityIndicator 
              animating={true} 
              color={theme.colors.primary}
              style={styles.loader}
            />
          )}

          {sentiment && (
            <Card 
              style={[
                styles.resultCard,
                { backgroundColor: getSentimentColor(sentiment) + '20' }
              ]}
            >
              <Card.Content>
                <Text 
                  variant="headlineSmall"
                  style={[
                    styles.resultText,
                    { color: getSentimentColor(sentiment) }
                  ]}
                >
                  {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)} Sentiment
                </Text>
                <Text 
                  variant="bodyMedium"
                  style={styles.resultDescription}
                >
                  {sentiment === 'positive' && 'The text expresses positive emotions and outlook.'}
                  {sentiment === 'negative' && 'The text contains negative emotions or concerns.'}
                  {sentiment === 'neutral' && 'The text appears to be neutral in tone and emotion.'}
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
    borderRadius: 12,
  },
  resultText: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resultDescription: {
    opacity: 0.8,
  },
}); 