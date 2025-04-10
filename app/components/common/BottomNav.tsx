import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeScreen } from '../../features/home/HomeScreen';
import { LaunchPadScreen } from '../../features/launchpad/LaunchPadScreen';
import { CreateLabScreen } from '../../features/createlab/CreateLabScreen';
import { ProfileScreen } from '../../features/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

export const BottomNav = () => {
  const theme = useTheme();

  const getTabBarIcon = (iconName: string) => {
    return ({ color, size }: TabBarIconProps) => (
      <MaterialCommunityIcons name={iconName} size={size} color={color} />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.outline,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: theme.colors.shadow,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
        },
        tabBarLabelStyle: {
          fontFamily: theme.fonts.labelMedium.fontFamily,
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: getTabBarIcon('home-outline'),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="LaunchPad"
        component={LaunchPadScreen}
        options={{
          tabBarIcon: getTabBarIcon('rocket-launch-outline'),
          tabBarLabel: 'LaunchPad',
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateLabScreen}
        options={{
          tabBarIcon: getTabBarIcon('plus-circle-outline'),
          tabBarLabel: 'Create',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: getTabBarIcon('account-outline'),
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}; 