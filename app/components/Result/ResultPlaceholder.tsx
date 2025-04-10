import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const ResultPlaceholder: React.FC = () => {
  const theme = useTheme();

  return (
    <View 
      style={[styles.container, { borderColor: theme.colors.surfaceVariant }]}
      testID="result-placeholder"
    >
      <Icon 
        name="lightbulb-outline" 
        size={48} 
        color={theme.colors.primary}
        testID="placeholder-icon"
      />
      <Text 
        style={[styles.text, { color: theme.colors.onSurfaceVariant }]}
        testID="placeholder-text"
      >
        No result yet. Generate something cool!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 8,
    marginVertical: 16,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
}); 