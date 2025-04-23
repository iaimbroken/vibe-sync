import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AITextToolScreen } from '@/screens/ai/AITextToolScreen';
import { AIImageToolScreen } from '@/screens/ai/AIImageToolScreen';
import { AIToolDetailScreen } from '@/screens/ai/AIToolDetailScreen';
import { AIHistoryScreen } from '@/screens/ai/AIHistoryScreen';
import type { RootStackParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AiNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AITextTool"
        component={AITextToolScreen}
        options={{ title: 'AI Text Tool' }}
      />
      <Stack.Screen
        name="AIImageTool"
        component={AIImageToolScreen}
        options={{ title: 'AI Image Tool' }}
      />
      <Stack.Screen
        name="AIToolDetail"
        component={AIToolDetailScreen}
        options={{ title: 'AI Tool Details' }}
      />
      <Stack.Screen
        name="AIHistory"
        component={AIHistoryScreen}
        options={{ title: 'AI History' }}
      />
    </Stack.Navigator>
  );
}; 