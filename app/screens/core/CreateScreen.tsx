import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps } from '../../types/navigation';

const CreateScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<RootStackScreenProps<'CreateLab'>['navigation']>();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.onSurface }]}>
        Create
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

export default CreateScreen; 