import axios, { AxiosError } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { env } from '@/shared/lib/env';

export type LaravelValidationErrors = Record<string, string[]>;

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public errors?: LaravelValidationErrors,
    public isNetworkError = false,
  ) {
    super(message);
  }
}

export function parseLaravelErrors(error: unknown): Record<string, string> {
  if (!(error instanceof ApiError) || !error.errors) return {};
  return Object.fromEntries(
    Object.entries(error.errors).map(([field, messages]) => [
      field,
      messages[0] ?? 'Invalid value',
    ]),
  );
}

export function isNetworkError(error: unknown) {
  return error instanceof ApiError && error.isNetworkError;
}

export const api = axios.create({
  baseURL: env.EXPO_PUBLIC_API_URL ?? 'https://api.expin.com/api/v1',
  timeout: 20_000,
  headers: { Accept: 'application/json' },
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('auth.token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; errors?: LaravelValidationErrors }>) => {
    const status = error.response?.status ?? 0;
    const isTransportFailure = !error.response;
    throw new ApiError(
      status,
      error.response?.data?.message ?? 'Network request failed',
      error.response?.data?.errors,
      isTransportFailure,
    );
  },
);
