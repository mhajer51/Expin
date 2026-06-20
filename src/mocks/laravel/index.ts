import { api } from '@/shared/lib/api';
import { laravelMockAxiosAdapter } from './axiosAdapter';
import { env } from '@/shared/lib/env';

// React Native/Expo cannot rely on a browser Service Worker. MSW's native interceptor is
// excellent when installed, but this Expo-safe adapter keeps axios calls on the same network
// boundary without replacing feature API functions.
export function startLaravelMockApi() {
  if (env.EXPO_PUBLIC_USE_MOCK_API === 'true') {
    api.defaults.baseURL = env.EXPO_PUBLIC_API_URL ?? 'https://api.expin.com/api/v1';
    api.defaults.adapter = laravelMockAxiosAdapter;
  }
}

export { paginateMock } from './pagination';
export {
  validationError,
  unauthenticatedError,
  forbiddenError,
  notFoundError,
  serverError,
} from './errors';
export type {
  LaravelPaginated,
  LaravelResource,
  LaravelCollection,
  LaravelValidationErrors,
} from './types';
