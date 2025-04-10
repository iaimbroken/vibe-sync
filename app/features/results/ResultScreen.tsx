import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, Card, Button, Chip, Snackbar, useTheme } from 'react-native-paper';

const mockResult = {
  sentiment: 'Positive',
  keywords: ['tech', 'innovation', 'AI'],
  summary: 'This text highlights the benefits of AI-driven innovation in modern technology.',
};

export const ResultScreen: React.FC = () => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'emoticon-happy';
      case 'negative':
        return 'emoticon-sad';
      default:
        return 'emoticon-neutral';
    }
  };

  const handleSave = () => {
    setVisible(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text 
            variant="headlineMedium" 
            style={styles.header}
            accessibilityLabel="Results"
          >
            Results
          </Text>

          <Card 
            style={[
              styles.resultCard,
              { backgroundColor: theme.colors.surfaceVariant }
            ]}
          >
            <Card.Content>
              <View style={styles.sentimentContainer}>
                <Text 
                  variant="titleLarge"
                  style={[styles.sentimentText, { color: theme.colors.onSurfaceVariant }]}
                >
                  Sentiment: {mockResult.sentiment}
                </Text>
                <Text 
                  variant="titleLarge"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  {getSentimentIcon(mockResult.sentiment)}
                </Text>
              </View>

              <View style={styles.keywordsContainer}>
                <Text 
                  variant="titleMedium"
                  style={[styles.sectionTitle, { color: theme.colors.onSurfaceVariant }]}
                >
                  Keywords:
                </Text>
                <View style={styles.chipsContainer}>
                  {mockResult.keywords.map((keyword, index) => (
                    <Chip
                      key={index}
                      style={[
                        styles.chip,
                        { backgroundColor: theme.colors.primaryContainer }
                      ]}
                      textStyle={{ color: theme.colors.onPrimaryContainer }}
                    >
                      {keyword}
                    </Chip>
                  ))}
                </View>
              </View>

              <View style={styles.summaryContainer}>
                <Text 
                  variant="titleMedium"
                  style={[styles.sectionTitle, { color: theme.colors.onSurfaceVariant }]}
                >
                  Summary:
                </Text>
                <Text 
                  variant="bodyLarge"
                  style={[styles.summaryText, { color: theme.colors.onSurface }]}
                >
                  {mockResult.summary}
                </Text>
              </View>
            </Card.Content>
          </Card>

          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.saveButton}
            accessibilityLabel="Save result"
          >
            Save Result
          </Button>
        </View>
      </ScrollView>

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={2000}
        style={styles.snackbar}
      >
        Saved successfully
      </Snackbar>
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
  resultCard: {
    borderRadius: 12,
    elevation: 2,
  },
  sentimentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sentimentText: {
    fontWeight: 'bold',
  },
  keywordsContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  summaryContainer: {
    marginBottom: 8,
  },
  summaryText: {
    lineHeight: 24,
  },
  saveButton: {
    marginTop: 16,
    borderRadius: 8,
  },
  snackbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
}); 