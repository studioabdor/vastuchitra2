import axios from 'axios';
import { ImageGenerationRequest, ImageGenerationResponse } from './api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const generateImage = async (request: ImageGenerationRequest): Promise<ImageGenerationResponse> => {
  try {
    const response = await api.post<ImageGenerationResponse>('/api/generate-image', request);
    return response.data;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};