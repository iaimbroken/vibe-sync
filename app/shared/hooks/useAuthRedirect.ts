import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { useNavigation } from './useNavigation';

/**
 * Hook to handle authentication-based navigation.
 * @param requireAuth - If true, redirects to login when not authenticated. If false, redirects to home when authenticated.
 */
export const useAuthRedirect = (requireAuth: boolean = true) => {
  const { user, loading } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        // Redirect to login if authentication is required and user is not logged in
        navigation.replace('Login');
      } else if (!requireAuth && user) {
        // Redirect to home if authentication is not required and user is logged in
        navigation.replace('Home');
      }
    }
  }, [user, loading, navigation, requireAuth]);

  return { user, loading };
}; 