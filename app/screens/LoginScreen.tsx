import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/shared/services/firebase';
import { createLogger } from '@/shared/utils/debug';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { validateEmail } from '@/shared/utils/validation';

const logger = createLogger('LoginScreen');

export const LoginScreen: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [loading, setLoading] = useState({ email: false, google: false });
  const [error, setError] = useState<string | null>(null);

  // Validation
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 6;
  const canSubmit = isEmailValid && isPasswordValid && !loading.email && !loading.google;

  // Error messages
  const getEmailError = () => {
    if (!touched.email) return '';
    if (!email) return 'Email is required';
    if (!isEmailValid) return 'Please enter a valid email';
    return '';
  };

  const getPasswordError = () => {
    if (!touched.password) return '';
    if (!password) return 'Password is required';
    if (!isPasswordValid) return 'Password must be at least 6 characters';
    return '';
  };

  // Handlers
  const handleEmailLogin = async () => {
    if (!canSubmit) return;

    setLoading({ ...loading, email: true });
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      logger.info('Email login successful');
      router.replace('/(tabs)/index');
    } catch (err) {
      logger.error('Email login failed', err);
      setError('Invalid email or password');
    } finally {
      setLoading({ ...loading, email: false });
    }
  };

  const handleGoogleLogin = async () => {
    setLoading({ ...loading, google: true });
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      logger.info('Google login successful');
      router.replace('/(tabs)/index');
    } catch (err) {
      logger.error('Google login failed', err);
      setError('Google login failed. Please try again.');
    } finally {
      setLoading({ ...loading, google: false });
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[
        styles.wrapper,
        { backgroundColor: theme.colors.background }
      ]}
    >
      <View style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 16,
        }
      ]}>
        <View style={styles.header}>
          <Text 
            variant="headlineLarge" 
            style={[styles.title, { color: theme.colors.primary }]}
          >
            Welcome Back
          </Text>
          <Text 
            variant="bodyLarge" 
            style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
          >
            Sign in to continue
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            onBlur={() => setTouched({ ...touched, email: true })}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
            error={!!getEmailError()}
            style={styles.input}
            mode="outlined"
          />
          {getEmailError() && (
            <Text 
              variant="bodySmall" 
              style={[styles.fieldError, { color: theme.colors.error }]}
            >
              {getEmailError()}
            </Text>
          )}

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            onBlur={() => setTouched({ ...touched, password: true })}
            secureTextEntry={!showPassword}
            error={!!getPasswordError()}
            style={styles.input}
            mode="outlined"
            right={
              <TextInput.Icon 
                icon={showPassword ? 'eye-off' : 'eye'} 
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
          {getPasswordError() && (
            <Text 
              variant="bodySmall" 
              style={[styles.fieldError, { color: theme.colors.error }]}
            >
              {getPasswordError()}
            </Text>
          )}

          {error && (
            <Text 
              style={[styles.error, { color: theme.colors.error }]}
            >
              {error}
            </Text>
          )}

          <Button
            mode="contained"
            onPress={handleEmailLogin}
            loading={loading.email}
            disabled={!canSubmit}
            style={[styles.button, styles.emailButton]}
            contentStyle={styles.buttonContent}
          >
            Sign In with Email
          </Button>

          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: theme.colors.outlineVariant }]} />
            <Text 
              variant="bodySmall" 
              style={[styles.dividerText, { color: theme.colors.onSurfaceVariant }]}
            >
              or continue with
            </Text>
            <View style={[styles.dividerLine, { backgroundColor: theme.colors.outlineVariant }]} />
          </View>

          <Button
            mode="outlined"
            onPress={handleGoogleLogin}
            loading={loading.google}
            disabled={loading.email}
            icon="google"
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Sign In with Google
          </Button>
        </View>

        <View style={styles.footer}>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            Don't have an account?{' '}
          </Text>
          <Button
            mode="text"
            onPress={() => router.push('/Register')}
            style={styles.registerButton}
          >
            Register
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 4,
  },
  error: {
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    borderRadius: 12,
  },
  emailButton: {
    marginBottom: 24,
  },
  buttonContent: {
    height: 48,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButton: {
    marginLeft: -8,
  },
  fieldError: {
    marginBottom: 12,
    marginTop: -2,
    marginLeft: 4,
  },
}); 