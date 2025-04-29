import axios from 'axios';
import type { PaymentIntentRequest } from './api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createPaymentIntent = async (request: PaymentIntentRequest) => {
  try {
    const response = await api.post('/api/create-payment-intent', request);
    return response.data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};