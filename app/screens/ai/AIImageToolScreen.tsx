import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import type { RootStackScreenProps } from '@/types/navigation';
import type { CustomTheme } from '@/types/theme';

type Props = RootStackScreenProps<'AIImageTool'>;

export const AIImageToolScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme<CustomTheme>();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.onSurface }]}>
        AI Image Tool
      </Text>
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
}); 