import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { LaravelResponse, WalletData, WithdrawPayload } from '../types/wallet.types';
import { withdrawFunds } from './walletApi';
import { walletQueryKey } from './useWalletQuery';

type Context = { previousData: LaravelResponse<WalletData> | undefined };

export function useWithdrawMutation() {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, WithdrawPayload, Context>({
    mutationFn: withdrawFunds,
    onMutate: async (payload) => {
      // Cancel in-flight reads so an older response cannot overwrite our optimistic balance.
      await queryClient.cancelQueries({ queryKey: walletQueryKey });
      // Snapshot the exact Laravel-shaped envelope; rollback must restore meta + data, not just balance.
      const previousData = queryClient.getQueryData<LaravelResponse<WalletData>>(walletQueryKey);
      queryClient.setQueryData<LaravelResponse<WalletData>>(walletQueryKey, (current) => {
        if (!current) return current;
        return {
          ...current,
          data: {
            ...current.data,
            balance: {
              ...current.data.balance,
              available: Math.max(0, current.data.balance.available - payload.amount),
              lastSyncedAt: new Date().toISOString(),
            },
          },
        };
      });
      return { previousData };
    },
    onError: (_error, _payload, context) => {
      // Full rollback: restore the saved cache snapshot when the server rejects the withdrawal.
      if (context?.previousData) queryClient.setQueryData(walletQueryKey, context.previousData);
    },
    onSuccess: () => {
      // Success still invalidates because financial truth belongs to the server ledger.
      void queryClient.invalidateQueries({ queryKey: walletQueryKey });
    },
    onSettled: () => {
      // Final reconciliation runs for both success and failure after optimistic UI/rollback settles.
      void queryClient.invalidateQueries({ queryKey: walletQueryKey });
    },
  });
}
