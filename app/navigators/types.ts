// types.ts

import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Define shared types
export type PostData = {
  prompt: string;
  caption: string;
  hashtags: string[];
};

// Define the Root Stack parameters (for our native stack navigator)
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
  
  // Auth Screens
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  
  // AI Screens
  AIToolDetail: { toolId: string };
  AIImageTool: undefined;
  BatchAnalysis: undefined;
  AIHistory: undefined;
  
  // Post Screens
  PostCreator: {
    initialData?: PostData;
  };
  PostEditor: { postId: string };
  PostViewer: { postId: string };
  PostSettings: { postId: string };
  PostAnalytics: { postId: string };

  // Navigator Screens
  MainTabs: undefined;
  Post: undefined;
  AI: undefined;
  Notifications: undefined;
};

export type PostStackParamList = {
  PostCreator: {
    initialData?: PostData;
  };
  PostEditor: { postId: string };
  PostViewer: { postId: string };
  PostSettings: { postId: string };
  PostAnalytics: { postId: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
export type PostStackScreenProps<T extends keyof PostStackParamList> = NativeStackScreenProps<PostStackParamList, T>;

// Define the Tab Navigator parameters (for the bottom tabs)
export type MainTabParamList = {
  Home: undefined;
  LaunchPad: undefined;
  PostHistory: undefined;
  AIHistory: undefined;
  Settings: undefined;
};

export type AINavigatorParamList = {
  AIToolDetail: { toolId: string };
  AIImageTool: undefined;
  BatchAnalysis: undefined;
  AIHistory: undefined;
};

export type AINavigatorScreenProps<T extends keyof AINavigatorParamList> = NativeStackScreenProps<AINavigatorParamList, T>;
