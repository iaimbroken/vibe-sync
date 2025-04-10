import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Surface, Text, TextInput, Button, ActivityIndicator, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SentimentResult {
    label: string;
    score: number;
}

export const SentimentScreen = () => {
    const [text, setText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<SentimentResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const theme = useTheme();

    const analyzeSentiment = async () => {
        if (!text.trim()) {
            setError('Please enter some text to analyze');
            return;
        }

        setIsAnalyzing(true);
        setError(null);

        try {
            // Mock API call - replace with actual API integration
            await new Promise<void>((resolve) => setTimeout(resolve, 1500));
            const mockResult: SentimentResult = {
                label: 'Positive',
                score: 0.85
            };
            setResult(mockResult);
        } catch (err) {
            setError('Failed to analyze sentiment. Please try again.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Surface style={styles.card} elevation={1}>
                    <View style={styles.cardContent}>
                        <Text variant="titleLarge" style={styles.title}>
                            Sentiment Analysis
                        </Text>
                        <TextInput
                            mode="outlined"
                            label="Enter text to analyze"
                            value={text}
                            onChangeText={setText}
                            multiline
                            numberOfLines={4}
                            style={styles.input}
                        />
                        {error && (
                            <Text style={[styles.error, { color: theme.colors.error }]}>
                                {error}
                            </Text>
                        )}
                        <Button
                            mode="contained"
                            onPress={analyzeSentiment}
                            style={styles.button}
                            disabled={isAnalyzing || !text.trim()}
                        >
                            {isAnalyzing ? 'Analyzing...' : 'Analyze Sentiment'}
                        </Button>
                        {isAnalyzing && (
                            <ActivityIndicator style={styles.loading} />
                        )}
                        {result && (
                            <Surface style={styles.resultCard} elevation={1}>
                                <View style={styles.cardContent}>
                                    <Text variant="titleMedium">Results:</Text>
                                    <Text variant="bodyLarge" style={styles.resultText}>
                                        Sentiment: {result.label}
                                    </Text>
                                    <Text variant="bodyLarge" style={styles.resultText}>
                                        Confidence: {(result.score * 100).toFixed(1)}%
                                    </Text>
                                </View>
                            </Surface>
                        )}
                    </View>
                </Surface>
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
        padding: 16,
    },
    card: {
        marginBottom: 16,
        borderRadius: 8,
    },
    cardContent: {
        padding: 16,
    },
    title: {
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 8,
    },
    loading: {
        marginTop: 16,
    },
    error: {
        marginBottom: 8,
    },
    resultCard: {
        marginTop: 16,
        borderRadius: 8,
    },
    resultText: {
        marginTop: 8,
    },
}); 