import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, useTheme } from 'react-native-paper';

interface GreetingHeaderProps {
  name?: string;
}

const GreetingHeader: React.FC<GreetingHeaderProps> = ({ name }) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text
          variant="titleLarge"
          style={[styles.greeting, { color: theme.colors.onBackground }]}
          testID="greeting-text"
        >
          Welcome, {name || 'there'} 👋
        </Text>
        <Text
          variant="bodyMedium"
          style={[styles.subtitle, { color: theme.colors.onBackground }]}
          testID="subtitle-text"
        >
          Let's create something magical today.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
  },
  container: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  greeting: {
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.8,
  },
});

export default GreetingHeader; 