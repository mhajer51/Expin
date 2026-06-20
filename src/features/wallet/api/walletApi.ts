import type {
  LaravelResponse,
  WalletData,
  WithdrawPayload,
  WithdrawResult,
} from '../types/wallet.types';

const randomLatency = () => 300 + Math.floor(Math.random() * 501);
const requestId = () => `req_${Math.random().toString(36).slice(2, 10)}`;

let serverWallet: WalletData = {
  balance: {
    available: 8420.75,
    pending: 1280.25,
    currency: 'AED',
    lastSyncedAt: new Date().toISOString(),
  },
  earnings: {
    thisMonth: 3120.5,
    total: 48670,
    byCampaign: [
      {
        campaignId: 'c1',
        title: 'Dubai Marina Launch',
        amount: 1450,
        progress: 0.82,
        expectedPayout: 1780,
      },
      {
        campaignId: 'c2',
        title: 'Ramadan Creator Pack',
        amount: 920.5,
        progress: 0.64,
        expectedPayout: 1440,
      },
      {
        campaignId: 'c3',
        title: 'Fintech Week Stories',
        amount: 750,
        progress: 0.48,
        expectedPayout: 1560,
      },
    ],
  },
  activeCampaigns: [
    {
      id: 'c1',
      title: 'Dubai Marina Launch',
      brand: 'Nura Living',
      progress: 0.82,
      expectedReturn: 1780,
      status: 'ending_soon',
    },
    {
      id: 'c2',
      title: 'Ramadan Creator Pack',
      brand: 'Saffron Pay',
      progress: 0.64,
      expectedReturn: 1440,
      status: 'live',
    },
    {
      id: 'c3',
      title: 'Fintech Week Stories',
      brand: 'Stripe MENA',
      progress: 0.48,
      expectedReturn: 1560,
      status: 'reviewing',
    },
  ],
};

const envelope = <T>(data: T, locale: 'en' | 'ar' = 'en'): LaravelResponse<T> => ({
  data,
  meta: { requestId: requestId(), servedAt: new Date().toISOString(), locale, currency: 'AED' },
});

export async function fetchWallet(locale: 'en' | 'ar' = 'en') {
  await new Promise((resolve) => setTimeout(resolve, randomLatency()));
  return envelope(structuredClone(serverWallet), locale);
}

export async function withdrawFunds(payload: WithdrawPayload) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  if (Math.random() < 0.2) throw new Error('Withdrawal could not be queued. Please try again.');
  serverWallet = {
    ...serverWallet,
    balance: {
      ...serverWallet.balance,
      available: Math.max(0, serverWallet.balance.available - payload.amount),
      lastSyncedAt: new Date().toISOString(),
    },
  };
  return envelope<WithdrawResult>({
    withdrawalId: `wd_${Date.now()}`,
    amount: payload.amount,
    status: 'queued',
    createdAt: new Date().toISOString(),
  });
}
