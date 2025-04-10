// Tool Types
export type ToolType = 'image-edit' | 'ai-art' | 'text-analysis' | 'batch-tools';

// Result Types
export interface AnalysisResult {
  sentiment: 'positive' | 'neutral' | 'negative';
  keywords: string[];
  summary: string;
}

export interface Result {
  type: 'image' | 'text' | 'batch';
  content: string | string[];
  previewUrl?: string;
  analysis?: AnalysisResult;
}

// Settings Types
export interface Settings {
  notifications: boolean;
  darkMode: boolean;
  autoSave: boolean;
  defaultFormat: string;
  language: string;
}

// Profile Types
export interface UserProfile {
  displayName: string;
  email: string;
  photoURL: string | null;
  createdAt: string;
  lastLogin: string;
}

// Navigation Types
export type RootStackParamList = {
  Home: undefined;
  'text-analysis': undefined;
  'sentiment-analysis': undefined;
  'transform': undefined;
  'batch-analysis': undefined;
  'results': { result: Result };
  'profile': undefined;
  'settings': undefined;
};

// Batch Analysis Types
export interface BatchItem {
  id: string;
  text: string;
  isAnalyzing: boolean;
  result: AnalysisResult | null;
}

// Format Types
export type FormatType = 'ig-carousel' | 'reel-cover' | 'text-post';

// Theme Types
export type CustomTheme = typeof import('../styles/theme').theme; 