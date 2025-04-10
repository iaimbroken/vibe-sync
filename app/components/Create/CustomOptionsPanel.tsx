import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Switch, Slider, useTheme, Chip } from 'react-native-paper';
import { ToolType } from '../../screens/CreateLabScreen';

interface CustomOptionsPanelProps {
  toolType: ToolType;
}

const PLATFORMS = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'twitter', label: 'Twitter' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'linkedin', label: 'LinkedIn' },
];

const STYLES = [
  { id: 'professional', label: '👔 Professional' },
  { id: 'casual', label: '😊 Casual' },
  { id: 'creative', label: '🎨 Creative' },
  { id: 'technical', label: '💻 Technical' },
];

export const CustomOptionsPanel: React.FC<CustomOptionsPanelProps> = ({
  toolType,
}) => {
  const theme = useTheme();
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [intensity, setIntensity] = useState(50);
  const [advancedMode, setAdvancedMode] = useState(false);

  return (
    <Card style={styles.container}>
      <Card.Content style={styles.content}>
        <View style={styles.section}>
          <Text variant="titleSmall" style={styles.sectionTitle}>Style</Text>
          <View style={styles.chipGroup}>
            {STYLES.map((style) => (
              <Chip
                key={style.id}
                selected={selectedStyle === style.id}
                onPress={() => setSelectedStyle(
                  selectedStyle === style.id ? null : style.id
                )}
                style={[
                  styles.chip,
                  {
                    backgroundColor: 
                      selectedStyle === style.id
                        ? theme.colors.secondaryContainer
                        : theme.colors.surfaceVariant,
                  }
                ]}
              >
                {style.label}
              </Chip>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="titleSmall" style={styles.sectionTitle}>Platform</Text>
          <View style={styles.chipGroup}>
            {PLATFORMS.map((platform) => (
              <Chip
                key={platform.id}
                selected={selectedPlatform === platform.id}
                onPress={() => setSelectedPlatform(
                  selectedPlatform === platform.id ? null : platform.id
                )}
                style={[
                  styles.chip,
                  {
                    backgroundColor: 
                      selectedPlatform === platform.id
                        ? theme.colors.secondaryContainer
                        : theme.colors.surfaceVariant,
                  }
                ]}
              >
                {platform.label}
              </Chip>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="titleSmall" style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.sliderContainer}>
            <Slider
              value={quantity}
              onValueChange={setQuantity}
              minimumValue={1}
              maximumValue={10}
              step={1}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor={theme.colors.surfaceVariant}
              thumbTintColor={theme.colors.primary}
            />
            <Text variant="bodyMedium">{quantity}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="titleSmall" style={styles.sectionTitle}>Intensity</Text>
          <View style={styles.sliderContainer}>
            <Slider
              value={intensity}
              onValueChange={setIntensity}
              minimumValue={0}
              maximumValue={100}
              step={10}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor={theme.colors.surfaceVariant}
              thumbTintColor={theme.colors.primary}
            />
            <Text variant="bodyMedium">{intensity}%</Text>
          </View>
        </View>

        <View style={styles.switchContainer}>
          <Text variant="bodyMedium">Advanced Mode</Text>
          <Switch
            value={advancedMode}
            onValueChange={setAdvancedMode}
            color={theme.colors.primary}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  content: {
    gap: 16,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    marginBottom: 4,
  },
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginRight: 8,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}); 