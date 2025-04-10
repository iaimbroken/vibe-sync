import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Text, TextInput, useTheme, Surface, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

type ToolType = 'image-edit' | 'ai-art' | 'text-analysis' | 'batch-tools';

interface InputAreaProps {
  toolType: ToolType;
  value: string;
  onChangeText: (text: string) => void;
  selectedImage?: string | null;
  onImageSelect?: (uri: string | null) => void;
  loading?: boolean;
  error?: string;
}

export const InputArea: React.FC<InputAreaProps> = ({
  toolType,
  value,
  onChangeText,
  selectedImage,
  onImageSelect,
  loading = false,
  error,
}) => {
  const theme = useTheme();

  const handlePickImage = async () => {
    try {
      // Request permissions first
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        console.error('Permission to access media library was denied');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1],
      });

      if (!result.canceled && result.assets.length > 0) {
        onImageSelect?.(result.assets[0].uri);
      }
    } catch (err) {
      console.error('Error picking image:', err);
      onImageSelect?.(null);
    }
  };

  const renderImageSection = () => {
    if (selectedImage) {
      return (
        <Surface style={styles.imagePreviewContainer}>
          <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
          <TouchableOpacity
            style={[styles.removeButton, { backgroundColor: theme.colors.error }]}
            onPress={() => onImageSelect?.(null)}
          >
            <MaterialCommunityIcons name="close" size={20} color={theme.colors.onError} />
          </TouchableOpacity>
        </Surface>
      );
    }

    return (
      <TouchableOpacity onPress={handlePickImage}>
        <Surface 
          style={[
            styles.uploadBox,
            { 
              borderColor: theme.colors.outline,
              backgroundColor: theme.colors.surface,
            }
          ]}
        >
          {loading ? (
            <ActivityIndicator animating={true} color={theme.colors.primary} />
          ) : (
            <>
              <MaterialCommunityIcons
                name="image-plus"
                size={32}
                color={theme.colors.primary}
              />
              <Text
                variant="bodyLarge"
                style={[styles.uploadText, { color: theme.colors.primary }]}
              >
                Upload Image
              </Text>
              <Text
                variant="bodySmall"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                Tap to browse your gallery
              </Text>
            </>
          )}
        </Surface>
      </TouchableOpacity>
    );
  };

  const renderTextInput = () => (
    <TextInput
      mode="outlined"
      multiline
      numberOfLines={Platform.OS === 'ios' ? undefined : 4}
      minHeight={Platform.OS === 'ios' ? 100 : undefined}
      placeholder={getPlaceholder()}
      value={value}
      onChangeText={onChangeText}
      style={styles.textInput}
      error={!!error}
    />
  );

  const getPlaceholder = () => {
    switch (toolType) {
      case 'image-edit':
        return 'Describe how you want to edit the image...';
      case 'ai-art':
        return 'Describe the image you want to generate...';
      case 'text-analysis':
        return 'Paste your text here for analysis...';
      case 'batch-tools':
        return 'Enter multiple items, one per line...';
      default:
        return 'Enter text...';
    }
  };

  return (
    <View style={styles.container}>
      {(toolType === 'image-edit' || toolType === 'ai-art') && renderImageSection()}
      {renderTextInput()}
      {error && (
        <Text 
          variant="bodySmall" 
          style={[styles.errorText, { color: theme.colors.error }]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    gap: 8,
  },
  uploadText: {
    marginTop: 8,
    fontWeight: '500',
  },
  imagePreviewContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: 'transparent',
  },
  errorText: {
    marginTop: -8,
  },
}); 