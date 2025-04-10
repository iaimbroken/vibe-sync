import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { ProfileHeader } from '../components/Profile/ProfileHeader';
import { ConnectedPlatforms } from '../components/Profile/ConnectedPlatforms';
import { CreatorStats } from '../components/Profile/CreatorStats';
import { CampaignFolders } from '../components/Profile/CampaignFolders';
import { SettingsPanel } from '../components/Profile/SettingsPanel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Setting {
  id: string;
  label: string;
  type: 'toggle' | 'select';
  value: boolean | string;
  options?: string[];
}

export const ProfileScreen: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [folders, setFolders] = useState([
    { id: '1', name: 'Summer Campaign' },
    { id: '2', name: 'Product Launch' },
    { id: '3', name: 'Holiday Content' },
  ]);

  const [platforms, setPlatforms] = useState([
    { id: 'instagram', name: 'Instagram', connected: true },
    { id: 'twitter', name: 'Twitter', connected: false },
    { id: 'facebook', name: 'Facebook', connected: true },
    { id: 'linkedin', name: 'LinkedIn', connected: false },
  ]);

  const [settings, setSettings] = useState<Setting[]>([
    { id: 'darkMode', label: 'Dark Mode', type: 'toggle', value: false },
    { id: 'language', label: 'Language', type: 'select', value: 'English', options: ['English', 'Spanish', 'French'] },
    { id: 'notifications', label: 'Push Notifications', type: 'toggle', value: true },
  ]);

  const handleAddFolder = (name: string) => {
    setFolders([...folders, { id: Date.now().toString(), name }]);
  };

  const handleDeleteFolder = (id: string) => {
    setFolders(folders.filter(folder => folder.id !== id));
  };

  const handleTogglePlatform = (platformId: string) => {
    setPlatforms(platforms.map(platform => 
      platform.id === platformId 
        ? { ...platform, connected: !platform.connected }
        : platform
    ));
  };

  const handleToggleSetting = (settingId: string) => {
    setSettings(settings.map(setting => 
      setting.id === settingId && setting.type === 'toggle'
        ? { ...setting, value: !setting.value }
        : setting
    ));
  };

  const handleChangeSetting = (settingId: string, value: string) => {
    setSettings(settings.map(setting => 
      setting.id === settingId
        ? { ...setting, value }
        : setting
    ));
  };

  return (
    <ScrollView 
      style={[styles.wrapper, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={[
        styles.container,
        { paddingBottom: insets.bottom + 16 }
      ]}
    >
      <ProfileHeader 
        displayName="John Doe"
        email="john@example.com"
        photoURL="https://example.com/avatar.jpg"
      />

      <View style={styles.section}>
        <Text 
          variant="titleMedium" 
          style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
        >
          📊 Creator Stats
        </Text>
        <CreatorStats 
          stats={[
            { label: 'Posts Created', value: 42 },
            { label: 'Followers', value: 1024 },
            { label: 'Engagement', value: 4.8 },
          ]}
        />
      </View>

      <View style={styles.section}>
        <Text 
          variant="titleMedium" 
          style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
        >
          🔗 Connected Platforms
        </Text>
        <ConnectedPlatforms 
          platforms={platforms}
          onToggle={handleTogglePlatform}
        />
      </View>

      <View style={styles.section}>
        <Text 
          variant="titleMedium" 
          style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
        >
          📁 Campaign Folders
        </Text>
        <CampaignFolders 
          folders={folders}
          onAdd={handleAddFolder}
          onDelete={handleDeleteFolder}
        />
      </View>

      <View style={styles.section}>
        <Text 
          variant="titleMedium" 
          style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
        >
          ⚙️ Settings
        </Text>
        <SettingsPanel 
          settings={settings}
          onToggle={handleToggleSetting}
          onChange={handleChangeSetting}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: '600',
  },
}); 