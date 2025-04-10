import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type FeatureCardProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
};

type FeatureChipProps = {
  label: string;
};

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="headlineMedium" style={[styles.welcome, { color: theme.colors.primary }]}>
          Welcome, Alex 👋
        </Text>
        <Text variant="bodyLarge" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          Let's create something magical today.
        </Text>

        <View style={styles.grid}>
          <FeatureCard icon="image-edit" label="Edit Image" />
          <FeatureCard icon="text-box-search-outline" label="Text Analysis" />
          <FeatureCard icon="palette" label="AI Art Generator" />
          <FeatureCard icon="beaker" label="Batch Tools" />
        </View>

        <Text variant="titleMedium" style={[styles.recentLabel, { color: theme.colors.onSurface }]}>
          Recent AI Edits
        </Text>
        <View style={styles.recentGrid}>
          <FeatureChip label="Face Detect" />
          <FeatureChip label="Emotion" />
          <FeatureChip label="Object Tag" />
        </View>

        <Button 
          mode="contained" 
          style={styles.actionButton}
          contentStyle={{ height: 48 }}
          labelStyle={{ fontSize: 16 }}
        >
          🚀 Start Something New
        </Button>
        <Button 
          mode="outlined" 
          style={styles.actionButton}
          contentStyle={{ height: 48 }}
          labelStyle={{ fontSize: 16 }}
        >
          ✨ Surprise Me with a Prompt
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

function FeatureCard({ icon, label }: FeatureCardProps) {
  const theme = useTheme();
  
  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surfaceVariant }]}>
      <MaterialCommunityIcons name={icon} size={32} color={theme.colors.primary} />
      <Text variant="labelLarge" style={[styles.cardText, { color: theme.colors.onSurfaceVariant }]}>
        {label}
      </Text>
    </View>
  );
}

function FeatureChip({ label }: FeatureChipProps) {
  const theme = useTheme();
  
  return (
    <View style={[styles.chip, { backgroundColor: theme.colors.surfaceVariant }]}>
      <Text variant="labelLarge" style={[styles.chipText, { color: theme.colors.onSurfaceVariant }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 24,
  },
  welcome: {
    fontWeight: '600',
  },
  subtitle: {
    marginTop: -8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  card: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardText: {
    marginTop: 12,
    textAlign: 'center',
  },
  recentLabel: {
    fontWeight: '600',
  },
  recentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  chip: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  chipText: {
    fontWeight: '500',
  },
  actionButton: {
    borderRadius: 12,
  },
}); 