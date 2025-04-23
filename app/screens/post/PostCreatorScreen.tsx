import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import type { PostStackScreenProps } from '@/navigators/types';
import type { CustomTheme } from '@/types/theme';

type Props = PostStackScreenProps<'PostCreator'>;

export const PostCreatorScreen: React.FC<Props> = ({ route }) => {
  const theme = useTheme<CustomTheme>();
  const { initialData } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.onSurface }]}>
        Post Creator
      </Text>
      {initialData && (
        <Text style={[styles.content, { color: theme.colors.onSurfaceVariant }]}>
          Initial Data: {JSON.stringify(initialData)}
        </Text>
      )}
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
    fontSize: 16,
  },
}); 