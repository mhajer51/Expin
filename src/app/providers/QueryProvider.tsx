import NetInfo from '@react-native-community/netinfo';
import { onlineManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

onlineManager.setEventListener((setOnline) =>
  NetInfo.addEventListener((state) => setOnline(Boolean(state.isConnected))),
);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 10 * 60_000,
      refetchOnReconnect: true,
      retry: (failureCount, error: { response?: { status?: number } }) => {
        const status = error.response?.status;
        if (status && status >= 400 && status < 500) return false;
        return failureCount < 3;
      },
      structuralSharing: true,
    },
    mutations: { retry: 1 },
  },
});

export function QueryProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
