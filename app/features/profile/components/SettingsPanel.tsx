import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, List, Switch, Button, Menu, useTheme } from 'react-native-paper';

interface Setting {
  id: string;
  label: string;
  value: boolean;
  type: 'toggle';
}

interface SettingsPanelProps {
  settings: Setting[];
  onToggleSetting: (settingId: string) => Promise<void>;
  onLogout: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onToggleSetting,
  onLogout,
}) => {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState('en');

  const languages = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
  ];

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Card style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Card.Title title="Settings" />
      <Card.Content>
        {settings.map((setting) => (
          <List.Item
            key={setting.id}
            title={setting.label}
            right={() => (
              <Switch
                value={setting.value}
                onValueChange={() => onToggleSetting(setting.id)}
              />
            )}
          />
        ))}
        <List.Item
          title="Language"
          right={() => (
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <Button onPress={openMenu}>
                  {languages.find(lang => lang.value === selectedLanguage)?.label}
                </Button>
              }
            >
              {languages.map((lang) => (
                <Menu.Item
                  key={lang.value}
                  onPress={() => {
                    setSelectedLanguage(lang.value);
                    closeMenu();
                  }}
                  title={lang.label}
                />
              ))}
            </Menu>
          )}
        />
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={onLogout}
          style={styles.logoutButton}
          testID="logout-button"
        >
          Log Out
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  logoutButton: {
    marginTop: 16,
    width: '100%',
  },
}); 