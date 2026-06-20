import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppText } from '@/shared/components/AppText';
import { Button } from '@/shared/components/Button';
import { useBoostCampaign } from '../api/useBoostCampaign';

export function WalletScreen() { const { t } = useTranslation(); const boost = useBoostCampaign(); return <View className="flex-1 gap-4 bg-background p-4"><AppText variant="title">{t('wallet.title')}</AppText><Button title={t('wallet.boost')} onPress={() => boost.mutate('demo-campaign')} /></View>; }
