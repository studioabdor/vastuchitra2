import { getCurrentUser, login, logout, register } from "./auth";
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { login, register, getCurrentUser, logout };
export { generateImage } from './imageGeneration';

export interface GenerationRequest {
  sketch: File;
  style: string;
  textPrompt?: string;
}

export interface GenerationResponse {
  imageUrl: string;
  status: string;
  id?: string;
  createdAt?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'premium' | 'professional';
  createdAt: string;
  imagesRemaining: number;
}

export interface SavedImage {
  id: string;
  userId: string;
  imageUrl: string;
  style: string;
  textPrompt?: string;
  createdAt: string;
}

export interface ImageGenerationRequest {
  prompt: string;
  style: string;
  negative_prompt?: string;
}

export interface ImageGenerationResponse {
  status: string;
  image: string; // Base64 encoded image
  seed?: number;
  prompt: string;
  style: string;
}

export interface PaymentIntentRequest {
  amount: number;
}

export { createPaymentIntent } from './payment'
export { getUserImages } from './userImages'




export default api;
