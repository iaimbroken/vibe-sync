import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import type { RootStackScreenProps } from '@/types/navigation';
import type { CustomTheme } from '@/types/theme';

type Props = RootStackScreenProps<'AIToolDetail'>;

export const AIToolDetailScreen: React.FC<Props> = ({ route }) => {
  const theme = useTheme<CustomTheme>();
  const { toolId } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.onSurface }]}>
        AI Tool Detail
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
        Tool ID: {toolId}
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
}); 