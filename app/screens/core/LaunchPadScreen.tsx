import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme, Card, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps } from '../../types/navigation';

export const LaunchPadScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<RootStackScreenProps<'LaunchPad'>['navigation']>();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surfaceVariant }]}>
        <Card.Content>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>
            Launch Pad
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Choose your AI tool
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('AITextTool')}
          style={styles.button}
        >
          Text Tool
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('AIImageTool')}
          style={styles.button}
        >
          Image Tool
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
}); 