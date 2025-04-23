import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme, TextInput, Button } from 'react-native-paper';
import type { RootStackScreenProps } from '@/types/navigation';
import type { CustomTheme } from '@/types/theme';

type Props = RootStackScreenProps<'AITextTool'>;

export const AITextToolScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme<CustomTheme>();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    // TODO: Implement AI text generation
    setLoading(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.onSurface }]}>
        AI Text Tool
      </Text>
      <ScrollView style={styles.content}>
        <TextInput
          label="Enter your prompt"
          value={input}
          onChangeText={setInput}
          multiline
          style={[styles.input, { backgroundColor: theme.colors.surfaceVariant }]}
          textColor={theme.colors.onSurface}
        />
        <Button
          mode="contained"
          onPress={handleGenerate}
          loading={loading}
          style={styles.button}
        >
          Generate
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    flex: 1,
  },
  input: {
    marginBottom: 16,
    minHeight: 120,
  },
  button: {
    marginTop: 8,
  },
}); 