import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, useTheme, ActivityIndicator, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useAuth } from '@/contexts/AuthContext';
import type { RootStackScreenProps } from '@/types/navigation';
import type { CustomTheme } from '@/types/theme';

interface UserProfile {
  displayName: string;
  bio: string;
  profileImage?: string;
}

type Props = RootStackScreenProps<'EditProfile'>;

export const EditProfileScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme<CustomTheme>();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    displayName: '',
    bio: '',
    profileImage: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
          const data = userDoc.data() as UserProfile;
          setProfile(data);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      await setDoc(doc(db, 'users', user.uid), {
        ...profile,
        updatedAt: new Date(),
      });

      setSuccess(true);
      navigation.goBack();
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Failed to save profile. Please try again later.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.colors.onBackground, fontSize: 24, fontWeight: 'bold' }]}>
          Edit Profile
        </Text>
        
        <TextInput
          label="Name"
          value={profile.displayName}
          onChangeText={(text) => setProfile({ ...profile, displayName: text })}
          autoCapitalize="words"
          style={{ fontSize: 16 }}
          contentStyle={{ fontSize: 16 }}
          mode="outlined"
          theme={{
            fonts: {
              labelMedium: { fontSize: 14 },
              bodyMedium: { fontSize: 16 },
              bodySmall: { fontSize: 14 }
            }
          }}
        />
        
        <TextInput
          label="Email"
          value={user?.email || ''}
          onChangeText={(text) => {
            // Handle email change
          }}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{ fontSize: 16 }}
          contentStyle={{ fontSize: 16 }}
          mode="outlined"
          theme={{
            fonts: {
              labelMedium: { fontSize: 14 },
              bodyMedium: { fontSize: 16 },
              bodySmall: { fontSize: 14 }
            }
          }}
        />
        
        <TextInput
          label="Bio"
          value={profile.bio}
          onChangeText={(text) => setProfile({ ...profile, bio: text })}
          multiline
          numberOfLines={4}
          style={{ marginTop: 16, fontSize: 16 }}
          contentStyle={{ fontSize: 16 }}
          mode="outlined"
          theme={{
            fonts: {
              labelMedium: { fontSize: 14 },
              bodyMedium: { fontSize: 16 },
              bodySmall: { fontSize: 14 }
            }
          }}
        />
        
        <TextInput
          label="Profile Image URL"
          value={profile.profileImage || ''}
          onChangeText={(text) => setProfile({ ...profile, profileImage: text })}
          style={styles.input}
          contentStyle={{ fontSize: 16 }}
          mode="outlined"
          disabled={saving}
          theme={{
            fonts: {
              labelMedium: { fontSize: 14 },
              bodyMedium: { fontSize: 16 },
              bodySmall: { fontSize: 14 }
            }
          }}
        />
        
        <Button
          mode="contained"
          onPress={handleSave}
          loading={saving}
          disabled={saving}
          style={{ marginTop: 24 }}
        >
          Save Changes
        </Button>

        <Snackbar
          visible={!!error}
          onDismiss={() => setError('')}
          action={{
            label: 'Dismiss',
            onPress: () => setError(''),
          }}
        >
          {error}
        </Snackbar>

        <Snackbar
          visible={success}
          onDismiss={() => setSuccess(false)}
          action={{
            label: 'OK',
            onPress: () => setSuccess(false),
          }}
        >
          Profile updated successfully!
        </Snackbar>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 