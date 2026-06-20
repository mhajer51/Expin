import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/shared/lib/language';
import { fetchWallet } from './walletApi';

export const walletQueryKey = ['wallet', 'dashboard'] as const;

export function useWalletQuery() {
  const { language } = useLanguage();
  return useQuery({
    queryKey: walletQueryKey,
    queryFn: () => fetchWallet(language),
    staleTime: 20_000,
    gcTime: 5 * 60_000,
  });
}
