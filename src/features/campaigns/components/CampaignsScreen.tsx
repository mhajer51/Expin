import { FlashList } from '@shopify/flash-list';
import { useCallback } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppText } from '@/shared/components/AppText';
import { useCampaigns } from '../api/useCampaigns';
import { CampaignRow } from './CampaignRow';
import type { Campaign } from '../types';

export function CampaignsScreen() {
  const { t } = useTranslation();
  const { data = [], fetchNextPage, hasNextPage, isFetchingNextPage } = useCampaigns();
  const renderItem = useCallback(({ item }: { item: Campaign }) => <CampaignRow campaign={item} />, []);
  const keyExtractor = useCallback((item: Campaign) => item.id, []);
  return <View className="flex-1 bg-background p-4"><AppText variant="title">{t('campaigns.title')}</AppText><FlashList data={data} renderItem={renderItem} keyExtractor={keyExtractor} estimatedItemSize={88} onEndReached={() => { if (hasNextPage && !isFetchingNextPage) void fetchNextPage(); }} onEndReachedThreshold={0.5} /></View>;
}
