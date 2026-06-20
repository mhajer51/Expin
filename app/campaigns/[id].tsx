import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { AppText } from '@/shared/components/AppText';

export default function CampaignDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <View className="flex-1 bg-background p-4"><AppText variant="title">Campaign #{id}</AppText></View>;
}
