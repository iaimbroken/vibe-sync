export type ToolType = 'image-edit' | 'ai-art' | 'text-analysis' | 'batch-tools';
export type PresetId = 'carousel' | 'single' | 'story' | 'reel';

export interface ToolSelectorProps {
  selectedTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
}

export interface FormatPresetsProps {
  selectedPresets: PresetId[];
  onSelectPresets: (presets: PresetId[]) => void;
}

export interface InputAreaProps {
  toolType: ToolType;
  value: string;
  onChangeText: (text: string) => void;
}

export interface CustomOptionsPanelProps {
  toolType: ToolType;
  currentOptions: {
    style?: string;
    platform?: string;
    quantity?: number;
    intensity?: number;
    advancedMode?: boolean;
  };
  onOptionsChange: (options: any) => void;
} 