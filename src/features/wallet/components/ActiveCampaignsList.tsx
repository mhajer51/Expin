import { Text, View } from 'react-native';
import { useLanguage } from '@/shared/lib/language';
import type { ActiveCampaign } from '../types/wallet.types';
import { formatCurrency } from '../utils/formatCurrency';

export function ActiveCampaignsList({ campaigns }: { campaigns: ActiveCampaign[] }) {
  const { language } = useLanguage();
  if (campaigns.length === 0)
    return (
      <View className="rounded-[28px] border border-dashed border-slate-700 p-6">
        <Text className="text-center text-slate-300">
          {language === 'ar' ? 'لا توجد حملات نشطة حالياً.' : 'No active campaigns yet.'}
        </Text>
      </View>
    );
  return (
    <View className="gap-3">
      <Text className="text-lg font-bold text-white">
        {language === 'ar' ? 'الحملات النشطة' : 'Active campaigns'}
      </Text>
      {campaigns.map((c) => (
        <View key={c.id} className="rounded-[24px] bg-slate-900 p-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-bold text-white">{c.title}</Text>
              <Text className="mt-1 text-xs text-slate-400">
                {c.brand} · {c.status.replace('_', ' ')}
              </Text>
            </View>
            <Text style={{ writingDirection: 'ltr' }} className="font-black text-emerald-300">
              {formatCurrency(c.expectedReturn, language)}
            </Text>
          </View>
          <View className="mt-3 h-2 rounded-full bg-slate-800">
            <View
              style={{ width: `${c.progress * 100}%` }}
              className="h-2 rounded-full bg-violet-400"
            />
          </View>
        </View>
      ))}
    </View>
  );
}
