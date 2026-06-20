import { api } from '@/shared/lib/api';
import type { CampaignPage } from '../types';

export async function fetchCampaigns({ pageParam }: { pageParam?: number }) {
  const { data } = await api.get<CampaignPage>('/campaigns/active', {
    params: { page: pageParam ?? 1 },
  });
  return data;
}
