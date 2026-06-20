import type { LaravelPaginated } from '@/mocks/laravel';

export type Campaign = {
  id: string;
  title: string;
  budget: number;
  status: 'draft' | 'active' | 'paused';
  updatedAt: string;
};
export type CampaignPage = LaravelPaginated<Campaign>;
