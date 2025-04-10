import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { FormatType } from '../CreateLabScreen';

interface FormatPresetsProps {
  selectedFormat: FormatType | null;
  onSelectFormat: (format: FormatType | null) => void;
}

const formats = [
  { id: 'carousel', label: 'IG Carousel', icon: '🖼' },
  { id: 'reel', label: 'Reel Cover', icon: '🎞' },
  { id: 'text-post', label: 'Text Post', icon: '✏️' },
] as const;

export const FormatPresets: React.FC<FormatPresetsProps> = ({ selectedFormat, onSelectFormat }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text 
        variant="titleMedium" 
        style={[styles.title, { color: theme.colors.onSurfaceVariant }]}
      >
        Format Presets
      </Text>
      <View style={styles.formatsContainer}>
        {formats.map((format) => (
          <Card
            key={format.id}
            style={[
              styles.formatCard,
              { 
                backgroundColor: selectedFormat === format.id 
                  ? theme.colors.primaryContainer 
                  : theme.colors.surfaceVariant 
              }
            ]}
            onPress={() => onSelectFormat(format.id as FormatType)}
          >
            <Card.Content style={styles.cardContent}>
              <Text variant="headlineSmall">{format.icon}</Text>
              <Text 
                variant="labelMedium"
                style={[
                  styles.formatLabel,
                  { 
                    color: selectedFormat === format.id 
                      ? theme.colors.onPrimaryContainer 
                      : theme.colors.onSurfaceVariant 
                  }
                ]}
              >
                {format.label}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  title: {
    marginBottom: 8,
  },
  formatsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  formatCard: {
    flex: 1,
    borderRadius: 12,
  },
  cardContent: {
    alignItems: 'center',
    padding: 12,
  },
  formatLabel: {
    marginTop: 8,
    textAlign: 'center',
  },
}); 