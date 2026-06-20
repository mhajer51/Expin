import { memo, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { Link } from 'expo-router';
import { AppText } from '@/shared/components/AppText';
import type { Campaign } from '../types';

export const CampaignRow = memo(function CampaignRow({ campaign }: { campaign: Campaign }) {
  const formattedBudget = useMemo(() => new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED' }).format(campaign.budget), [campaign.budget]);
  return <Link href={{ pathname: '/campaigns/[id]', params: { id: campaign.id } }} asChild><Pressable className="mb-3 rounded-xl bg-surface p-4"><View className="flex-row items-center justify-between"><AppText>{campaign.title}</AppText><AppText variant="muted">{formattedBudget}</AppText></View></Pressable></Link>;
});
