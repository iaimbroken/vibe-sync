import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type IconNames = 'rocket-launch' | 'palette' | 'brain';

interface FeatureProps {
  icon: IconNames;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: 'rocket-launch',
    title: 'Quick Start',
    description: 'Get started with AI-powered content creation in seconds',
  },
  {
    icon: 'palette',
    title: 'Style Options',
    description: 'Choose from various creative styles and tones',
  },
  {
    icon: 'brain',
    title: 'Smart Generation',
    description: 'Advanced AI algorithms for high-quality content',
  },
];

export const OnboardingScreen: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Animation values
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(20);

  useEffect(() => {
    // Fade in and slide up animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={[
      styles.wrapper,
      { backgroundColor: theme.colors.background }
    ]}>
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
      
      <View style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 16,
        }
      ]}>
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <Image
            source={require('@/assets/onboarding-preview.png')}
            style={styles.image}
            resizeMode="contain"
          />

          <Text 
            variant="headlineLarge" 
            style={[styles.title, { color: theme.colors.primary }]}
          >
            Welcome to AuraSync
          </Text>

          <Text 
            variant="bodyLarge" 
            style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
          >
            Where creators spark ideas, schedule posts, and build with AI.
          </Text>

          <View style={styles.features}>
            {features.map((feature, index) => (
              <Feature 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </View>

          <Button
            mode="contained"
            onPress={() => router.replace('/(tabs)/index')}
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            contentStyle={styles.buttonContent}
            icon="rocket-launch"
          >
            Get Started
          </Button>
        </Animated.View>
      </View>
    </View>
  );
};

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  const theme = useTheme();
  return (
    <View style={styles.featureContainer}>
      <MaterialCommunityIcons
        name={icon}
        size={32}
        color={theme.colors.primary}
      />
      <View style={styles.featureText}>
        <Text variant="titleMedium" style={styles.featureTitle}>
          {title}
        </Text>
        <Text
          variant="bodyMedium"
          style={[styles.featureDescription, { color: theme.colors.onSurfaceVariant }]}
        >
          {description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 40,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  features: {
    width: '100%',
    marginBottom: 32,
  },
  featureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  featureText: {
    flex: 1,
    marginLeft: 16,
  },
  featureTitle: {
    marginBottom: 4,
  },
  featureDescription: {
    opacity: 0.8,
  },
  button: {
    width: '100%',
    marginHorizontal: 20,
    borderRadius: 12,
  },
  buttonContent: {
    height: 48,
  },
}); 