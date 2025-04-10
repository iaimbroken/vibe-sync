import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, TextInput, Button, Card, ActivityIndicator, useTheme } from 'react-native-paper';

type TransformType = 'formal' | 'casual' | 'shorten' | 'elaborate';

export const TransformScreen: React.FC = () => {
  const theme = useTheme();
  const [text, setText] = useState('');
  const [transformType, setTransformType] = useState<TransformType>('formal');
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformedText, setTransformedText] = useState<string | null>(null);

  const getMockTransformation = (input: string, type: TransformType): string => {
    switch (type) {
      case 'formal':
        return `In accordance with the provided text, it is evident that "${input}" demonstrates a formal transformation.`;
      case 'casual':
        return `Hey! So like, "${input}" - pretty cool, right? Just chillin' and transforming text!`;
      case 'shorten':
        return input.split(' ').slice(0, 5).join(' ') + '...';
      case 'elaborate':
        return `Upon careful consideration and detailed analysis, it becomes apparent that the following text: "${input}" can be expanded upon to provide a more comprehensive understanding of the subject matter at hand.`;
    }
  };

  const handleTransform = () => {
    if (!text.trim()) return;

    setIsTransforming(true);
    setTransformedText(null);

    // Simulate transformation with setTimeout
    setTimeout(() => {
      const result = getMockTransformation(text, transformType);
      setTransformedText(result);
      setIsTransforming(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <TextInput
            mode="outlined"
            label="Enter text to transform"
            value={text}
            onChangeText={setText}
            multiline
            numberOfLines={6}
            style={styles.input}
            accessibilityLabel="Text input for transformation"
          />

          <View style={styles.buttonGroup}>
            {[
              { value: 'formal', label: 'Formal' },
              { value: 'casual', label: 'Casual' },
              { value: 'shorten', label: 'Shorten' },
              { value: 'elaborate', label: 'Elaborate' },
            ].map(({ value, label }) => (
              <Button
                key={value}
                mode={transformType === value ? "contained" : "outlined"}
                onPress={() => setTransformType(value as TransformType)}
                style={styles.segmentButton}
              >
                {label}
              </Button>
            ))}
          </View>

          <Button
            mode="contained"
            onPress={handleTransform}
            style={styles.button}
            disabled={!text.trim() || isTransforming}
            accessibilityLabel="Transform text"
          >
            {isTransforming ? 'Transforming...' : 'Transform Text'}
          </Button>

          {isTransforming && (
            <ActivityIndicator 
              animating={true} 
              color={theme.colors.primary}
              style={styles.loader}
            />
          )}

          {transformedText && (
            <Card 
              style={[
                styles.resultCard,
                { backgroundColor: theme.colors.surfaceVariant }
              ]}
            >
              <Card.Content>
                <Text 
                  variant="titleMedium"
                  style={[styles.resultTitle, { color: theme.colors.onSurfaceVariant }]}
                >
                  Transformed Text
                </Text>
                <Text 
                  variant="bodyLarge"
                  style={[styles.resultText, { color: theme.colors.onSurface }]}
                >
                  {transformedText}
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
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  segmentButton: {
    flex: 1,
    minWidth: 80,
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
  },
  loader: {
    marginTop: 16,
  },
  resultCard: {
    marginTop: 16,
    borderRadius: 12,
    elevation: 2,
  },
  resultTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  resultText: {
    lineHeight: 24,
  },
}); 