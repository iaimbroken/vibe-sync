import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PostCreatorScreen } from '@/screens/post/PostCreatorScreen';
import { PostEditorScreen } from '@/screens/post/PostEditorScreen';
import { PostViewerScreen } from '@/screens/post/PostViewerScreen';
import { PostSettingsScreen } from '@/screens/post/PostSettingsScreen';
import { PostAnalyticsScreen } from '@/screens/post/PostAnalyticsScreen';
import type { PostStackParamList } from './types';

const Stack = createNativeStackNavigator<PostStackParamList>();

export const PostNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="PostCreator"
        component={PostCreatorScreen}
      />
      <Stack.Screen
        name="PostEditor"
        component={PostEditorScreen}
      />
      <Stack.Screen
        name="PostViewer"
        component={PostViewerScreen}
      />
      <Stack.Screen
        name="PostSettings"
        component={PostSettingsScreen}
      />
      <Stack.Screen
        name="PostAnalytics"
        component={PostAnalyticsScreen}
      />
    </Stack.Navigator>
  );
}; 