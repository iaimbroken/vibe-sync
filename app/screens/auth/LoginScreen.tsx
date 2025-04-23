// app/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import type { CustomTheme } from '@/types/theme';
import { useNavigation } from '@react-navigation/native';
import type { RootStackScreenProps } from '@/types/navigation';

export const LoginScreen: React.FC = () => {
  const theme = useTheme<CustomTheme>();
  const { signIn } = useAuth();
  const navigation = useNavigation<RootStackScreenProps<'Login'>['navigation']>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={[styles.logoContainer, { backgroundColor: theme.colors.primary }]}>
              <Text style={[styles.logoText, { color: theme.colors.onPrimary }]}>A</Text>
            </View>
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>
              Welcome Back
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
              Sign in to continue
            </Text>
          </View>

          <View style={styles.form}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              mode="outlined"
              style={styles.input}
            />

            {error ? (
              <Text style={[styles.error, { color: theme.colors.error }]}>
                {error}
              </Text>
            ) : null}

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={styles.button}
            >
              Sign In
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: 16,
  },
  error: {
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});
