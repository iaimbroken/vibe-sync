import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AppNavigator } from '@/navigators/AppNavigator';
import { AuthNavigator } from '@/navigators/AuthNavigator';
import { LoadingScreen } from '@/components/common/LoadingScreen';

export const RootNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return user ? <AppNavigator /> : <AuthNavigator />;
}; 