import axios, { AxiosError } from 'axios';
import * as SecureStore from 'expo-secure-store';

export type LaravelValidationErrors = Record<string, string[]>;
export class ApiError extends Error { constructor(public status: number, message: string, public errors?: LaravelValidationErrors) { super(message); } }

export const api = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL ?? 'https://api.example.test', timeout: 20_000, headers: { Accept: 'application/json' } });
api.interceptors.request.use(async (config) => { const token = await SecureStore.getItemAsync('auth.token'); if (token) config.headers.Authorization = `Bearer ${token}`; return config; });
api.interceptors.response.use((r) => r, (error: AxiosError<{ message?: string; errors?: LaravelValidationErrors }>) => { const status = error.response?.status ?? 0; throw new ApiError(status, error.response?.data?.message ?? 'Network request failed', error.response?.data?.errors); });
