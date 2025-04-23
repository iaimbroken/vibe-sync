import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import { CustomTheme } from '../theme/theme';
import { HomeScreen } from '../screens/core/HomeScreen';
import { LaunchPadScreen } from '../screens/core/LaunchPadScreen';
import { PostHistoryScreen } from '../screens/post/PostHistoryScreen';
import { AIHistoryScreen } from '../screens/ai/AIHistoryScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

// Placeholder SettingsScreen
const SettingsScreen: React.FC = () => {
  const theme = useTheme<CustomTheme>();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>Settings Screen</Text>
    </View>
  );
};

export type MainTabParamList = {
  Home: undefined;
  LaunchPad: undefined;
  PostHistory: undefined;
  AIHistory: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC = () => {
  const theme = useTheme<CustomTheme>();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
        },
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTintColor: theme.colors.text,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="LaunchPad"
        component={LaunchPadScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="rocket-launch" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="PostHistory"
        component={PostHistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AIHistory"
        component={AIHistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="robot" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}; 