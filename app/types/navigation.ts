import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';

// Define shared types
export type PostData = {
  prompt: string;
  caption: string;
  hashtags: string[];
};

// Define the Root Stack parameters
export type RootStackParamList = {
  // Core Screens
  Home: undefined;
  CreateLab: undefined;
  LaunchPad: undefined;
  Settings: undefined;
  Profile: undefined;
  EditProfile: undefined;
  Results: {
    data: PostData;
  };
  Result: {
    result: {
      title: string;
      content: string;
      tags?: string[];
    };
  };
  
  // Auth Screens
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  
  // AI Screens
  AIToolDetail: { toolId: string };
  AIImageTool: undefined;
  AITextTool: undefined;
  BatchAnalysis: undefined;
  AIHistory: undefined;
  
  // Post Screens
  PostCreator: {
    initialData?: {
      title?: string;
      content?: string;
      tags?: string[];
    };
  };
  PostEditor: { postId: string };
  PostViewer: { postId: string };
  PostSettings: { postId: string };
  PostAnalytics: { postId: string };
  PostDetails: { postId: string };
  PostHistory: undefined;

  // Navigator Screens
  MainTabs: undefined;
  Post: undefined;
  AI: undefined;
  Notifications: undefined;
};

// Define the Post Stack parameters
export type PostStackParamList = {
  PostCreator: {
    initialData?: PostData;
  };
  PostEditor: { postId: string };
  PostViewer: { postId: string };
  PostSettings: { postId: string };
  PostAnalytics: { postId: string };
  PostDetails: { postId: string };
};

// Define the AI Stack parameters
export type AINavigatorParamList = {
  AIToolDetail: { toolId: string };
  AIImageTool: undefined;
  AITextTool: undefined;
  BatchAnalysis: undefined;
  AIHistory: undefined;
};

// Define the Tab parameters
export type TabParamList = {
  Home: undefined;
  Create: undefined;
  LaunchPad: undefined;
};

// Navigation prop types
export type RootStackNavigationProp<T extends keyof RootStackParamList> = RootStackScreenProps<T>['navigation'];
export type PostStackNavigationProp = NativeStackNavigationProp<PostStackParamList>;
export type AINavigatorNavigationProp = NativeStackNavigationProp<AINavigatorParamList>;
export type TabNavigationProp = BottomTabNavigationProp<TabParamList>;

// Screen prop types
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
export type PostStackScreenProps<T extends keyof PostStackParamList> = NativeStackScreenProps<PostStackParamList, T>;
export type AINavigatorScreenProps<T extends keyof AINavigatorParamList> = NativeStackScreenProps<AINavigatorParamList, T>;
export type TabScreenProps<T extends keyof TabParamList> = BottomTabScreenProps<TabParamList, T>; 