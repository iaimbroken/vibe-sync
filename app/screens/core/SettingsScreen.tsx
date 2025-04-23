import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme, Card, Switch, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps } from '../../types/navigation';
import { CustomTheme } from '../../types/theme';
import { useThemeContext } from '../../contexts/ThemeContext';

const SettingsScreen: React.FC = () => {
  const theme = useTheme<CustomTheme>();
  const { isDark, toggleTheme } = useThemeContext();
  const navigation = useNavigation<RootStackScreenProps<'Settings'>['navigation']>();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>
            Settings
          </Text>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.onSurface }]}>
              Dark Mode
            </Text>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              color={theme.colors.primary}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.onSurface }]}>
              Notifications
            </Text>
            <Switch
              value={true}
              onValueChange={() => {}}
              color={theme.colors.primary}
            />
          </View>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Profile')}
          style={styles.button}
        >
          View Profile
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('EditProfile')}
          style={styles.button}
        >
          Edit Profile
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
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingLabel: {
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

export default SettingsScreen; 