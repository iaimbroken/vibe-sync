import React, { useState } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { Card, Text, Button, Menu, useTheme } from 'react-native-paper';
import { auth } from '../../config/firebase';

type ThemeMode = 'light' | 'dark';
type Language = 'en' | 'es' | 'fr';
type AIMode = 'standard' | 'creative' | 'technical';

export const SettingsScreen = () => {
  const theme = useTheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [language, setLanguage] = useState<Language>('en');
  const [aiMode, setAIMode] = useState<AIMode>('standard');
  const [languageMenuVisible, setLanguageMenuVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Navigation to login screen would be handled by the navigation stack
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  const handleCheckUpdates = () => {
    Alert.alert('Updates', 'You are using the latest version of the app.');
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Account Section */}
      <Card style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <Card.Title title="Account" />
        <Card.Content>
          <Card style={styles.item}>
            <Card.Title title="Personal Info" subtitle="Update your profile information" />
            <Card.Actions>
              <Button onPress={() => console.log('Navigate to Personal Info')}>Edit</Button>
            </Card.Actions>
          </Card>
          <Card style={styles.item}>
            <Card.Title title="Security" subtitle="Manage your security settings" />
            <Card.Actions>
              <Button onPress={() => console.log('Navigate to Security')}>Edit</Button>
            </Card.Actions>
          </Card>
          <Card style={styles.item}>
            <Card.Title title="Notifications" subtitle="Configure your notification preferences" />
            <Card.Actions>
              <Button onPress={() => console.log('Navigate to Notifications')}>Edit</Button>
            </Card.Actions>
          </Card>
        </Card.Content>
      </Card>

      {/* Preferences Section */}
      <Card style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <Card.Title title="Preferences" />
        <Card.Content>
          <Text variant="titleMedium" style={styles.preferenceLabel}>Theme</Text>
          <Button.Group>
            <Button mode={themeMode === 'light' ? 'contained' : 'outlined'} onPress={() => setThemeMode('light')}>Light</Button>
            <Button mode={themeMode === 'dark' ? 'contained' : 'outlined'} onPress={() => setThemeMode('dark')}>Dark</Button>
          </Button.Group>

          <Text variant="titleMedium" style={styles.preferenceLabel}>Language</Text>
          <Menu
            visible={languageMenuVisible}
            onDismiss={() => setLanguageMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setLanguageMenuVisible(true)}
                style={styles.languageButton}
              >
                {language === 'en' ? 'English' : language === 'es' ? 'Spanish' : 'French'}
              </Button>
            }
          >
            <Menu.Item
              onPress={() => {
                setLanguage('en');
                setLanguageMenuVisible(false);
              }}
              title="English"
            />
            <Menu.Item
              onPress={() => {
                setLanguage('es');
                setLanguageMenuVisible(false);
              }}
              title="Spanish"
            />
            <Menu.Item
              onPress={() => {
                setLanguage('fr');
                setLanguageMenuVisible(false);
              }}
              title="French"
            />
          </Menu>

          <Text variant="titleMedium" style={styles.preferenceLabel}>AI Mode</Text>
          <Button.Group>
            <Button mode={aiMode === 'standard' ? 'contained' : 'outlined'} onPress={() => setAIMode('standard')}>Standard</Button>
            <Button mode={aiMode === 'creative' ? 'contained' : 'outlined'} onPress={() => setAIMode('creative')}>Creative</Button>
            <Button mode={aiMode === 'technical' ? 'contained' : 'outlined'} onPress={() => setAIMode('technical')}>Technical</Button>
          </Button.Group>
        </Card.Content>
      </Card>

      {/* App Info Section */}
      <Card style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <Card.Title title="App Info" />
        <Card.Content>
          <Card style={styles.item}>
            <Card.Title title="Version" subtitle="1.0.0" />
          </Card>
          <Card style={styles.item}>
            <Card.Title title="Build" subtitle="100" />
          </Card>
          <Button
            mode="outlined"
            onPress={handleCheckUpdates}
            style={styles.checkUpdatesButton}
          >
            Check for Updates
          </Button>
        </Card.Content>
      </Card>

      {/* Log Out Section */}
      <Button
        mode="contained"
        onPress={handleLogout}
        style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
        textColor={theme.colors.onError}
      >
        Log Out
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  section: {
    marginBottom: 16,
  },
  item: {
    marginBottom: 8,
  },
  preferenceLabel: {
    marginTop: 16,
    marginBottom: 8,
  },
  languageButton: {
    marginBottom: 16,
  },
  checkUpdatesButton: {
    marginTop: 8,
  },
  logoutButton: {
    marginTop: 8,
    marginBottom: 32,
  },
}); 