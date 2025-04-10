export type ToolType = 'text-analysis' | 'image-edit' | 'art-generator' | 'batch-tools';

export interface AIGenerationOptions {
    style?: string;
    platform?: string;
    quantity?: number;
    intensity?: number;
    advancedMode?: boolean;
} 