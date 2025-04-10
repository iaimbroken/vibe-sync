import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, Button, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '../../shared/hooks/useNavigation';
import { RootStackParamList } from '../../navigation/types';

export const AIScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const tools = [
    { title: 'Text Analysis', route: 'text-analysis' as keyof RootStackParamList },
    { title: 'Sentiment', route: 'sentiment-analysis' as keyof RootStackParamList },
    { title: 'Transform', route: 'transform' as keyof RootStackParamList },
    { title: 'Batch Analysis', route: 'batch-analysis' as keyof RootStackParamList },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryContainer]}
        style={styles.header}
      >
        <Text 
          variant="headlineMedium" 
          style={styles.title}
          accessibilityLabel="AI Tools"
        >
          AI Tools
        </Text>
      </LinearGradient>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {tools.map((tool, index) => (
            <Button
              key={index}
              mode="contained"
              onPress={() => navigation.navigate(tool.route)}
              style={styles.button}
              accessibilityLabel={tool.title}
            >
              {tool.title}
            </Button>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 30,
  },
  title: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  button: {
    width: '100%',
  },
}); 