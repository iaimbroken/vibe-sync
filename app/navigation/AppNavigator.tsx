import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import screens from features
import { HomeScreen } from '../features/home/HomeScreen';
import { LaunchPadScreen } from '../features/launchpad/LaunchPadScreen';
import { CreateLabScreen } from '../features/createlab/CreateLabScreen';
import { ProfileScreen } from '../features/profile/ProfileScreen';

type RootTabParamList = {
  Home: undefined;
  LaunchPad: undefined;
  Create: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function AppNavigator() {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.outline,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.outline,
            elevation: 8,
            shadowColor: theme.colors.shadow,
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof MaterialCommunityIcons.glyphMap = 'home';

            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'LaunchPad':
                iconName = 'rocket-launch';
                break;
              case 'Create':
                iconName = 'plus-box';
                break;
              case 'Profile':
                iconName = 'account';
                break;
            }

            return (
              <MaterialCommunityIcons name={iconName} size={size} color={color} />
            );
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'Home'
          }}
        />
        <Tab.Screen 
          name="LaunchPad" 
          component={LaunchPadScreen}
          options={{
            title: 'Launch Pad'
          }}
        />
        <Tab.Screen 
          name="Create" 
          component={CreateLabScreen}
          options={{
            title: 'Create'
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{
            title: 'Profile'
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
