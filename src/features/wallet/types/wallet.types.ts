export type CurrencyCode = 'AED';
export type WithdrawalState = 'idle' | 'processing' | 'success' | 'error';

export type LaravelResponse<T> = {
  data: T;
  meta: { requestId: string; servedAt: string; locale: 'en' | 'ar'; currency: CurrencyCode };
};

export type WalletBalance = {
  available: number;
  pending: number;
  currency: CurrencyCode;
  lastSyncedAt: string;
};
export type CampaignEarning = {
  campaignId: string;
  title: string;
  amount: number;
  progress: number;
  expectedPayout: number;
};
export type WalletEarnings = { thisMonth: number; total: number; byCampaign: CampaignEarning[] };
export type ActiveCampaign = {
  id: string;
  title: string;
  brand: string;
  progress: number;
  expectedReturn: number;
  status: 'live' | 'reviewing' | 'ending_soon';
};
export type WalletData = {
  balance: WalletBalance;
  earnings: WalletEarnings;
  activeCampaigns: ActiveCampaign[];
};
export type WithdrawPayload = { amount: number; currency: CurrencyCode };
export type WithdrawResult = {
  withdrawalId: string;
  amount: number;
  status: 'queued';
  createdAt: string;
};
export type WalletQueryKey = readonly ['wallet', 'dashboard'];
