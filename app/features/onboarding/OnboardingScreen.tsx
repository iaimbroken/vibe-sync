import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import { useRouter } from 'expo-router';

interface OnboardingItem {
  id: number;
  title: string;
  description: string;
  image: any;
}

const onboardingData: OnboardingItem[] = [
  {
    id: 1,
    title: 'Welcome to AuraSync',
    description: 'Create and schedule content with the power of AI',
    image: require('@/assets/onboarding1.png'),
  },
  {
    id: 2,
    title: 'Smart Content Creation',
    description: 'Generate engaging posts tailored to your brand',
    image: require('@/assets/onboarding2.png'),
  },
  {
    id: 3,
    title: 'Schedule & Launch',
    description: 'Plan your content calendar and publish with ease',
    image: require('@/assets/onboarding3.png'),
  },
];

const { width: screenWidth } = Dimensions.get('window');

export const OnboardingScreen: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({ item }: { item: OnboardingItem }) => (
    <View 
      style={styles.slide}
      accessibilityLabel={`Onboarding slide ${item.id}: ${item.title}`}
    >
      <Image
        source={item.image}
        style={styles.image}
        resizeMode="contain"
        accessibilityLabel={`Onboarding illustration ${item.id}`}
      />
      <Text 
        variant="headlineMedium" 
        style={[styles.title, { color: theme.colors.primary }]}
      >
        {item.title}
      </Text>
      <Text 
        variant="bodyLarge" 
        style={[styles.description, { color: theme.colors.onSurfaceVariant }]}
      >
        {item.description}
      </Text>
    </View>
  );

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      {onboardingData.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            {
              backgroundColor: index === activeIndex 
                ? theme.colors.primary 
                : theme.colors.surfaceVariant,
            },
          ]}
        />
      ))}
    </View>
  );

  const handleGetStarted = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      testID="onboarding-screen"
    >
      <Carousel
        ref={carouselRef}
        data={onboardingData}
        renderItem={({ item }: { item: unknown }) => renderItem({ item: item as OnboardingItem })}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        onSnapToItem={setActiveIndex}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        vertical={false}
      />
      {renderPagination()}
      
      {activeIndex === onboardingData.length - 1 && (
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleGetStarted}
            style={styles.button}
            contentStyle={styles.buttonContent}
            accessibilityLabel="Get Started button"
          >
            Get Started
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
    marginBottom: 40,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
  },
  description: {
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  button: {
    borderRadius: 12,
  },
  buttonContent: {
    height: 48,
  },
}); 