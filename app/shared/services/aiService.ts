import axios from 'axios';
import Constants from 'expo-constants';

const HF_API_TOKEN = Constants.expoConfig?.extra?.HUGGING_FACE_API_KEY;

const callHuggingFace = async (model: string, payload: any) => {
  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${HF_API_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('HuggingFace API Error:', error);
    throw error;
  }
};

// Text Analysis
export const analyzeSentiment = (text: string) =>
  callHuggingFace('distilbert-base-uncased-finetuned-sst-2-english', { inputs: text });

export const analyzeEmotion = (text: string) =>
  callHuggingFace('finiteautomata/bertweet-base-emotion-analysis', { inputs: text });

// Text Transformation
export const summarizeText = (text: string) =>
  callHuggingFace('facebook/bart-large-cnn', { inputs: text });

export const paraphraseText = (text: string) =>
  callHuggingFace('tuner007/pegasus_paraphrase', { inputs: text });

// Image Analysis
export const detectObjects = (imageBase64: string) =>
  callHuggingFace('facebook/detr-resnet-50', {
    inputs: {
      image: `data:image/jpeg;base64,${imageBase64}`,
    },
  });

// Image Generation
export const generateArt = (prompt: string) =>
  callHuggingFace('stabilityai/stable-diffusion-2', {
    inputs: prompt,
  });

// Export the base function for custom model usage
export { callHuggingFace }; 