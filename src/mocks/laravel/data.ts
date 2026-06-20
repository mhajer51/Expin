import type { Campaign } from '@/features/campaigns/types';
import type { WalletData } from '@/features/wallet/types/wallet.types';

export type Transaction = {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  currency: 'AED';
  description: string;
  created_at: string;
};

export type Notification = {
  id: string;
  type: 'campaign' | 'wallet' | 'system';
  title: string;
  body: string;
  read_at: string | null;
  created_at: string;
};

export const wallet: WalletData = {
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

export const campaigns: Campaign[] = Array.from({ length: 240 }, (_, index) => ({
  id: `camp_${index + 1}`,
  title: `GCC Creator Campaign ${index + 1}`,
  budget: 1_000 + (index % 25) * 175,
  status: 'active',
  updatedAt: new Date(Date.now() - index * 86_400_000).toISOString(),
}));

export const transactions: Transaction[] = Array.from({ length: 96 }, (_, index) => ({
  id: `txn_${index + 1}`,
  type: index % 5 === 0 ? 'debit' : 'credit',
  amount: index % 5 === 0 ? 250 : 80 + (index % 12) * 25,
  currency: 'AED',
  description: index % 5 === 0 ? 'Withdrawal request' : `Campaign payout #${index + 1}`,
  created_at: new Date(Date.now() - index * 43_200_000).toISOString(),
}));

export const notifications: Notification[] = Array.from({ length: 28 }, (_, index) => ({
  id: `notif_${index + 1}`,
  type: index % 3 === 0 ? 'wallet' : index % 3 === 1 ? 'campaign' : 'system',
  title:
    index % 3 === 0 ? 'Wallet update' : index % 3 === 1 ? 'Campaign milestone' : 'Expin notice',
  body: `Mock Laravel notification ${index + 1}`,
  read_at: index % 4 === 0 ? null : new Date(Date.now() - index * 3_600_000).toISOString(),
  created_at: new Date(Date.now() - index * 3_600_000).toISOString(),
}));
