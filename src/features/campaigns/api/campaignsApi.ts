import { api } from '@/shared/lib/api';
import type { CampaignPage } from '../types';

export async function fetchCampaigns({ cursor }: { cursor?: string }) {
  const { data } = await api.get<CampaignPage>('/campaigns', { params: { cursor } });
  return data;
}
