import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { ToolType } from '../../screens/CreateLabScreen';

interface InputAreaProps {
  toolType: ToolType;
  value: string;
  onChangeText: (text: string) => void;
}

const PLACEHOLDERS: Record<ToolType, string> = {
  'text-analysis': 'Enter text to analyze...',
  'image-generation': 'Describe the image you want to generate...',
  'code-generation': 'Describe the code you need...',
  'translation': 'Enter text to translate...',
  'summarization': 'Enter text to summarize...',
};

export const InputArea: React.FC<InputAreaProps> = ({
  toolType,
  value,
  onChangeText,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        multiline
        numberOfLines={6}
        placeholder={PLACEHOLDERS[toolType]}
        value={value}
        onChangeText={onChangeText}
        style={[
          styles.input,
          { backgroundColor: theme.colors.surface }
        ]}
        outlineStyle={{
          borderRadius: 12,
        }}
        contentStyle={styles.contentStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    minHeight: 120,
  },
  contentStyle: {
    paddingTop: 12,
    textAlignVertical: 'top',
  },
}); 