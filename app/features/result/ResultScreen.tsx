import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Chip, Text, useTheme } from 'react-native-paper';

interface Analysis {
  sentiment: string;
  summary: string;
  keywords: string[];
}

interface ResultScreenProps {
  result: {
    type: 'text' | 'image' | 'batch';
    content: string | string[];
    previewUrl?: string;
  };
  analysis?: Analysis;
  onSave: () => void;
  onSchedule: () => void;
  onPost: () => void;
  onBack: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  analysis,
  onSave,
  onSchedule,
  onPost,
  onBack,
}) => {
  const theme = useTheme();

  const renderResultPreview = () => {
    switch (result.type) {
      case 'text':
        return (
          <Card style={styles.previewCard} testID="result-preview">
            <Card.Content>
              <Text variant="bodyLarge" style={styles.textContent}>
                {result.content as string}
              </Text>
            </Card.Content>
          </Card>
        );
      case 'image':
        return (
          <Card style={styles.previewCard} testID="result-preview">
            <Card.Content>
              <View style={styles.imageContainer}>
                {/* TODO: Implement image zoom functionality */}
                <Text variant="bodyMedium">
                  Image preview would be here with zoom support
                </Text>
              </View>
            </Card.Content>
          </Card>
        );
      case 'batch':
        return (
          <View style={styles.batchContainer} testID="result-preview">
            {(result.content as string[]).map((item, index) => (
              <Card key={index} style={styles.batchCard}>
                <Card.Content>
                  <Text variant="bodyMedium">{item}</Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  const renderAnalysisPanel = () => {
    if (!analysis) return null;

    return (
      <Card style={styles.analysisCard} testID="analysis-panel">
        <Card.Content>
          <Text 
            variant="titleMedium" 
            style={[styles.sectionTitle, { color: theme.colors.onSurfaceVariant }]}
          >
            Analysis
          </Text>

          <View style={styles.analysisSection}>
            <Text variant="bodyLarge" style={styles.analysisLabel}>
              Sentiment
            </Text>
            <Text variant="bodyMedium">{analysis.sentiment}</Text>
          </View>

          <View style={styles.analysisSection}>
            <Text variant="bodyLarge" style={styles.analysisLabel}>
              Summary
            </Text>
            <Text variant="bodyMedium">{analysis.summary}</Text>
          </View>

          <View style={styles.analysisSection}>
            <Text variant="bodyLarge" style={styles.analysisLabel}>
              Keywords
            </Text>
            <View style={styles.keywordsContainer}>
              {analysis.keywords.map((keyword, index) => (
                <Chip
                  key={index}
                  style={styles.keywordChip}
                  testID={`keyword-chip-${index}`}
                  children={keyword}
                />
              ))}
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      testID="result-screen"
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text 
            variant="headlineMedium" 
            style={[styles.title, { color: theme.colors.onSurface }]}
          >
            Result
          </Text>
          <Text 
            variant="bodyLarge" 
            style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
          >
            Here's what AuraSync generated for you
          </Text>
        </View>

        {renderResultPreview()}

        {renderAnalysisPanel()}

        <View style={styles.actionsContainer}>
          <Button
            mode="outlined"
            onPress={onSave}
            icon="content-save"
            style={styles.actionButton}
            testID="action-save"
          >
            Save to Vault
          </Button>
          <Button
            mode="outlined"
            onPress={onSchedule}
            icon="calendar"
            style={styles.actionButton}
            testID="action-schedule"
          >
            Schedule Post
          </Button>
          <Button
            mode="contained"
            onPress={onPost}
            icon="send"
            style={styles.actionButton}
            testID="action-post"
          >
            Post Now
          </Button>
          <Button
            mode="outlined"
            onPress={onBack}
            icon="arrow-left"
            style={styles.actionButton}
          >
            Back to Edit
          </Button>
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
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.7,
  },
  previewCard: {
    marginBottom: 24,
  },
  textContent: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
  },
  imageContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
  },
  batchContainer: {
    gap: 12,
  },
  batchCard: {
    marginBottom: 12,
  },
  analysisCard: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  analysisSection: {
    marginBottom: 16,
  },
  analysisLabel: {
    marginBottom: 8,
    opacity: 0.7,
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  keywordChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    width: '100%',
  },
}); 