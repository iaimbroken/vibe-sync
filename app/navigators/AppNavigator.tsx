// app/navigators/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabNavigator } from '@/navigators/MainTabNavigator';
import { PostNavigator } from '@/navigators/PostNavigator';
import { AiNavigator } from '@/navigators/AiNavigator';
import { ProfileNavigator } from '@/navigators/ProfileNavigator';
import type { RootStackParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
      />
      <Stack.Screen
        name="Post"
        component={PostNavigator}
      />
      <Stack.Screen
        name="AI"
        component={AiNavigator}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileNavigator}
      />
    </Stack.Navigator>
  );
};
