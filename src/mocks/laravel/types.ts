export type LaravelResource<T> = { data: T };
export type LaravelCollection<T> = { data: T[] };

export type LaravelPaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

export type LaravelPaginated<T> = LaravelCollection<T> & {
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number | null;
    last_page: number;
    links: LaravelPaginationLink[];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
  };
};

export type LaravelValidationErrors = Record<string, string[]>;

export type LaravelErrorBody = {
  message: string;
  errors?: LaravelValidationErrors;
};

export type MockResponseHeaders = {
  'X-RateLimit-Limit': string;
  'X-RateLimit-Remaining': string;
  'X-Next-Cursor'?: string;
};

export type MockMode = 'dev' | 'production';
export type NetworkProfile = 'gcc' | 'slow-3g';
