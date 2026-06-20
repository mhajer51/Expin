import { api } from '@/shared/lib/api';
import type {
  LaravelResponse,
  WalletData,
  WithdrawPayload,
  WithdrawResult,
} from '../types/wallet.types';

export async function fetchWallet(_locale: 'en' | 'ar' = 'en') {
  const { data } = await api.get<LaravelResponse<WalletData>>('/wallet');
  return data;
}

export async function fetchWalletTransactions(page = 1) {
  const { data } = await api.get('/wallet/transactions', { params: { page } });
  return data;
}

export async function withdrawFunds(payload: WithdrawPayload) {
  const { data } = await api.post<LaravelResponse<WithdrawResult>>('/wallet/withdraw', payload);
  return data;
}
