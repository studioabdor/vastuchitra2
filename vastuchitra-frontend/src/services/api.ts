import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  
  // Get user profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();
    
  return {
    id: data.user.id,
    email: data.user.email!,
    name: profile?.full_name || 'User',
    plan: profile?.plan_type || 'free',
    createdAt: data.user.created_at,
    imagesRemaining: profile?.images_remaining || 0
  };
};

export const register = async (name: string, email: string, password: string): Promise<User> => {
  const { data: { user }, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name
      }
    }
  });
  
  if (error) throw error;
  if (!user) throw new Error('Registration failed');

  // Profile is created automatically via database trigger
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
    
  const newUser: User = {
    id: user.id,
    email: user.email!,
    name: profile?.full_name || name,
    plan: 'free' as 'free' | 'premium' | 'professional',
    createdAt: user.created_at,
    imagesRemaining: 5
  };
  
  return newUser;
};

export const generateImage = async (request: ImageGenerationRequest): Promise<ImageGenerationResponse> => {
  try {
    const response = await api.post<ImageGenerationResponse>('/api/generate-image', request);
    return response.data;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};

export const createPaymentIntent = async (request: PaymentIntentRequest) => {
  try {
    const response = await api.post('/api/create-payment-intent', request);
    return response.data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

export const getUserImages = async (): Promise<SavedImage[]> => {
  const { data: images, error } = await supabase
    .from('images')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  
  return images.map(img => ({
    id: img.id,
    userId: img.user_id,
    imageUrl: img.image_url,
    style: img.style || '',
    textPrompt: img.prompt,
    createdAt: img.created_at
  }));
};

export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();
    
  if (!profile) return null;

  return {
    id: session.user.id,
    email: session.user.email!,
    name: profile.full_name || 'User',
    plan: profile.plan_type,
    createdAt: session.user.created_at,
    imagesRemaining: profile.images_remaining
  };
};

export const logout = async (): Promise<void> => {
  await supabase.auth.signOut();
};

export default api;
