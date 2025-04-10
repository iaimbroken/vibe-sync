import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import type { CustomTheme } from '../../../shared/types';

interface InputAreaProps {
  toolType: string;
  value: string;
  onChangeText: (text: string) => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({
  toolType,
  value,
  onChangeText,
  isLoading,
}) => {
  const theme = useTheme() as CustomTheme;

  const getPlaceholder = () => {
    switch (toolType) {
      case 'image-edit':
        return 'Upload an image to edit...';
      case 'ai-art':
        return 'Describe the image you want to create...';
      case 'text-analysis':
        return 'Paste your caption or text to analyze...';
      case 'batch-tools':
        return 'Upload multiple files...';
      default:
        return 'Enter your input...';
    }
  };

  const getInputType = () => {
    switch (toolType) {
      case 'text-analysis':
        return 'multiline';
      default:
        return 'single';
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        placeholder={getPlaceholder()}
        value={value}
        onChangeText={onChangeText}
        multiline={getInputType() === 'multiline'}
        numberOfLines={getInputType() === 'multiline' ? 4 : 1}
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surface,
          },
        ]}
        disabled={isLoading}
        testID="input-area"
      />
      {toolType === 'image-edit' && (
        <Button
          mode="contained"
          onPress={() => {}}
          style={styles.uploadButton}
          disabled={isLoading}
          testID="upload-button"
        >
          Upload Image
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  input: {
    minHeight: 48,
  },
  uploadButton: {
    alignSelf: 'flex-start',
  },
});

export default InputArea; 