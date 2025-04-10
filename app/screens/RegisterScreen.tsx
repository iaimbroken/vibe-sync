import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/shared/services/firebase';
import { createLogger } from '@/shared/utils/debug';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { validateEmail } from '@/shared/utils/validation';

const logger = createLogger('RegisterScreen');

interface FormState {
  email: string;
  password: string;
  confirm: string;
}

interface TouchedState {
  email: boolean;
  password: boolean;
  confirm: boolean;
}

export const RegisterScreen: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Form state
  const [form, setForm] = useState<FormState>({
    email: '',
    password: '',
    confirm: '',
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });
  const [touched, setTouched] = useState<TouchedState>({
    email: false,
    password: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validation
  const isEmailValid = validateEmail(form.email);
  const isPasswordValid = form.password.length >= 6;
  const doPasswordsMatch = form.password === form.confirm;
  const canSubmit = isEmailValid && isPasswordValid && doPasswordsMatch && !loading;

  // Error messages
  const getEmailError = () => {
    if (!touched.email) return '';
    if (!form.email) return 'Email is required';
    if (!isEmailValid) return 'Please enter a valid email';
    return '';
  };

  const getPasswordError = () => {
    if (!touched.password) return '';
    if (!form.password) return 'Password is required';
    if (!isPasswordValid) return 'Password must be at least 6 characters';
    return '';
  };

  const getConfirmError = () => {
    if (!touched.confirm) return '';
    if (!form.confirm) return 'Please confirm your password';
    if (!doPasswordsMatch) return 'Passwords do not match';
    return '';
  };

  // Handlers
  const handleRegister = async () => {
    if (!canSubmit) return;

    setLoading(true);
    setError(null);

    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      logger.info('Registration successful');
      router.replace('/(tabs)/index');
    } catch (err) {
      logger.error('Registration failed', err);
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.wrapper, { backgroundColor: theme.colors.background }]}
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
            Create Account
          </Text>
          <Text
            variant="bodyLarge"
            style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
          >
            Join us to get started
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Email"
            value={form.email}
            onChangeText={(text: string) => setForm({ ...form, email: text })}
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
            value={form.password}
            onChangeText={(text: string) => setForm({ ...form, password: text })}
            onBlur={() => setTouched({ ...touched, password: true })}
            secureTextEntry={!showPassword.password}
            error={!!getPasswordError()}
            style={styles.input}
            mode="outlined"
            right={
              <TextInput.Icon
                icon={showPassword.password ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword({
                  ...showPassword,
                  password: !showPassword.password
                })}
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

          <TextInput
            label="Confirm Password"
            value={form.confirm}
            onChangeText={(text: string) => setForm({ ...form, confirm: text })}
            onBlur={() => setTouched({ ...touched, confirm: true })}
            secureTextEntry={!showPassword.confirm}
            error={!!getConfirmError()}
            style={styles.input}
            mode="outlined"
            right={
              <TextInput.Icon
                icon={showPassword.confirm ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword({
                  ...showPassword,
                  confirm: !showPassword.confirm
                })}
              />
            }
          />
          {getConfirmError() && (
            <Text
              variant="bodySmall"
              style={[styles.fieldError, { color: theme.colors.error }]}
            >
              {getConfirmError()}
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
            onPress={handleRegister}
            loading={loading}
            disabled={!canSubmit}
            style={styles.button}
            contentStyle={styles.buttonContent}
            icon="account-plus"
          >
            Create Account
          </Button>
        </View>

        <View style={styles.footer}>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            Already have an account?{' '}
          </Text>
          <Button
            mode="text"
            onPress={() => router.push('/Login')}
            style={styles.loginButton}
          >
            Sign In
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
  fieldError: {
    marginBottom: 12,
    marginTop: -2,
    marginLeft: 4,
  },
  error: {
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
    borderRadius: 12,
  },
  buttonContent: {
    height: 48,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    marginLeft: -8,
  },
}); 