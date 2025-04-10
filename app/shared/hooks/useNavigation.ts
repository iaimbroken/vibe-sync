import { useNavigation as useDefaultNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

export const useNavigation = () =>
  useDefaultNavigation<NativeStackNavigationProp<RootStackParamList>>(); 