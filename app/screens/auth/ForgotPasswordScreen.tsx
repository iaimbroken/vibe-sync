// app/screens/ForgotPasswordScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/services/firebase';
import type { RootStackScreenProps } from '@/types/navigation';
import type { CustomTheme } from '@/types/theme';

type Props = RootStackScreenProps<'ForgotPassword'>;

export const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme<CustomTheme>();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Password reset email sent. Please check your inbox.');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.onSurface }]}>
          Forgot Password
        </Text>
        
        <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
          Enter your email address and we'll send you a link to reset your password.
        </Text>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          mode="outlined"
          style={styles.input}
        />

        {error ? (
          <Text style={[styles.error, { color: theme.colors.error }]}>
            {error}
          </Text>
        ) : null}

        {success ? (
          <Text style={[styles.success, { color: theme.colors.primary }]}>
            {success}
          </Text>
        ) : null}

        <Button
          mode="contained"
          onPress={handleResetPassword}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          Send Reset Link
        </Button>

        <View style={styles.links}>
          <Button
            mode="text"
            onPress={() => navigation.navigate('Login')}
            style={styles.linkButton}
          >
            Back to Sign In
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  error: {
    marginBottom: 16,
    textAlign: 'center',
  },
  success: {
    marginBottom: 16,
    textAlign: 'center',
  },
  links: {
    marginTop: 24,
    alignItems: 'center',
  },
  linkButton: {
    marginTop: 8,
  },
});
