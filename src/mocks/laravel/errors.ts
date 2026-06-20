import type { LaravelErrorBody, LaravelValidationErrors, MockMode } from './types';

export function validationError(errors: LaravelValidationErrors): LaravelErrorBody {
  return { message: 'The given data was invalid.', errors };
}

export const unauthenticatedError = (): LaravelErrorBody => ({ message: 'Unauthenticated.' });
export const forbiddenError = (): LaravelErrorBody => ({ message: 'This action is unauthorized.' });
export const serverError = (): LaravelErrorBody => ({ message: 'Server Error' });

export function notFoundError(
  model: string,
  id: string | number,
  mode: MockMode,
): LaravelErrorBody {
  return {
    message:
      mode === 'dev'
        ? `No query results for model [App\\Models\\${model}] ${id}`
        : 'Resource not found.',
  };
}
