interface Result {
  content: string | string[];
  type: 'image' | 'text';
  metadata?: {
    sentiment?: string;
    summary?: string;
    tags?: string[];
    timestamp?: string;
  };
}

export type RootStackParamList = {
  Home: undefined;
  LaunchPad: undefined;
  Create: undefined;
  Profile: undefined;
  Settings: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  EditProfile: undefined;
  PostDetails: { postId: string };
  CreatePost: undefined;
  EditPost: { postId: string };
  Notifications: undefined;
  Search: undefined;
  'transform': undefined;
  'text-analysis': undefined;
  'batch-analysis': undefined;
  'sentiment-analysis': undefined;
  results: { result: Result };
}; 