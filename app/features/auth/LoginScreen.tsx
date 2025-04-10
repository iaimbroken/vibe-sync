import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, useTheme, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useAuth } from '../../shared/contexts/AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const LoginScreen: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const { setUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      // Note: This is a placeholder. You'll need to implement Google Sign-In flow
      // using expo-auth-session or similar
      const credential = GoogleAuthProvider.credential(/* token info */);
      const userCredential = await signInWithCredential(auth, credential);
      setUser(userCredential.user);
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text variant="headlineLarge" style={[styles.title, { color: theme.colors.primary }]}>
              Welcome Back
            </Text>
            <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
              Sign in to continue
            </Text>
          </View>

          <View style={styles.form}>
            <TextInput
              mode="outlined"
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              disabled={loading}
              left={<TextInput.Icon icon="email" />}
              style={styles.input}
              testID="email-input"
            />

            <TextInput
              mode="outlined"
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              disabled={loading}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              style={styles.input}
              testID="password-input"
            />

            {error ? (
              <Surface style={[styles.errorContainer, { backgroundColor: theme.colors.errorContainer }]}>
                <Text style={{ color: theme.colors.error }}>{error}</Text>
              </Surface>
            ) : null}

            <Button
              mode="text"
              onPress={() => {}}
              style={styles.forgotPassword}
              labelStyle={{ color: theme.colors.primary }}
            >
              Forgot Password?
            </Button>

            <Button
              mode="contained"
              onPress={handleEmailLogin}
              loading={loading}
              style={styles.button}
              contentStyle={styles.buttonContent}
              testID="login-button"
            >
              Login
            </Button>

            <Button
              mode="outlined"
              onPress={handleGoogleLogin}
              disabled={loading}
              style={[styles.button, styles.googleButton]}
              contentStyle={styles.buttonContent}
              icon={({ size, color }: { size: number; color: string }) => (
                <MaterialCommunityIcons name="google" size={size} color={color} />
              )}
              testID="google-button"
            >
              Continue with Google
            </Button>
          </View>

          <View style={styles.footer}>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              Don't have an account?{' '}
            </Text>
            <Button
              mode="text"
              onPress={() => router.push('/register')}
              labelStyle={{ color: theme.colors.primary }}
            >
              Register
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginVertical: 32,
  },
  title: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  form: {
    gap: 16,
  },
  input: {
    marginBottom: 8,
  },
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -8,
    marginBottom: 16,
  },
  button: {
    borderRadius: 12,
  },
  buttonContent: {
    height: 48,
  },
  googleButton: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
}); 