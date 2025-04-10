import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { ToolType } from '../CreateLabScreen';

interface InputAreaProps {
  selectedTool: ToolType;
  inputValue: string;
  onInputChange: (value: string) => void;
  onUpload: () => void;
}

export const InputArea: React.FC<InputAreaProps> = ({
  selectedTool,
  inputValue,
  onInputChange,
  onUpload,
}) => {
  const theme = useTheme();

  const getPlaceholder = () => {
    switch (selectedTool) {
      case 'image-edit':
        return 'Upload an image to edit...';
      case 'ai-art':
        return 'Describe the image you want to generate...';
      case 'text-analysis':
        return 'Paste your text for analysis...';
      case 'batch-tools':
        return 'Upload multiple files for batch processing...';
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <Text 
        variant="titleMedium" 
        style={[styles.title, { color: theme.colors.onSurfaceVariant }]}
      >
        Input
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          placeholder={getPlaceholder()}
          value={inputValue}
          onChangeText={onInputChange}
          multiline
          numberOfLines={4}
          style={styles.input}
        />
        <Button
          mode="contained"
          onPress={onUpload}
          style={styles.uploadButton}
        >
          Upload
        </Button>
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
  inputContainer: {
    gap: 12,
  },
  input: {
    minHeight: 120,
  },
  uploadButton: {
    alignSelf: 'flex-end',
  },
}); 