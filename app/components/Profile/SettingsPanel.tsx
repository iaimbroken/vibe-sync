import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, List, Switch, useTheme } from 'react-native-paper';

interface Setting {
  id: string;
  label: string;
  type: 'toggle' | 'select';
  value: boolean | string;
  options?: string[];
}

interface SettingsPanelProps {
  settings: Setting[];
  onToggle: (settingId: string) => void;
  onChange: (settingId: string, value: string) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onToggle,
  onChange,
}) => {
  const theme = useTheme();

  const getSettingIcon = (settingId: string) => {
    switch (settingId) {
      case 'darkMode':
        return 'theme-light-dark';
      case 'language':
        return 'translate';
      case 'autoSave':
        return 'content-save';
      default:
        return 'cog';
    }
  };

  return (
    <Card style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Card.Title title="Settings" />
      <Card.Content>
        <List.Section>
          {settings.map((setting) => (
            <List.Item
              key={setting.id}
              title={setting.label}
              left={props => (
                <List.Icon 
                  {...props} 
                  icon={getSettingIcon(setting.id)}
                  testID={`setting-icon-${setting.id}`}
                />
              )}
              right={props => (
                setting.type === 'toggle' ? (
                  <Switch
                    value={setting.value as boolean}
                    onValueChange={() => onToggle(setting.id)}
                    testID={`setting-toggle-${setting.id}`}
                    accessibilityLabel={`Toggle ${setting.label}`}
                  />
                ) : (
                  <List.Icon 
                    {...props} 
                    icon="chevron-right"
                    testID={`setting-chevron-${setting.id}`}
                  />
                )
              )}
              onPress={() => setting.type === 'select' && onChange(setting.id, setting.value as string)}
              testID={`setting-${setting.id}`}
            />
          ))}
        </List.Section>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
}); 