import { Text, View } from 'react-native';
import { useLanguage } from '@/shared/lib/language';
import type { WalletEarnings } from '../types/wallet.types';
import { formatCurrency } from '../utils/formatCurrency';

export function EarningsBreakdown({ earnings }: { earnings: WalletEarnings }) {
  const { language } = useLanguage();
  return (
    <View className="rounded-[28px] bg-slate-900/80 p-5">
      <Text className="text-lg font-bold text-white">
        {language === 'ar' ? 'تفصيل الأرباح' : 'Earnings breakdown'}
      </Text>
      <View className="mt-4 flex-row gap-3">
        <Tile
          label={language === 'ar' ? 'هذا الشهر' : 'This month'}
          value={formatCurrency(earnings.thisMonth, language)}
        />
        <Tile
          label={language === 'ar' ? 'الإجمالي' : 'Lifetime'}
          value={formatCurrency(earnings.total, language)}
        />
      </View>
      {earnings.byCampaign.map((item) => (
        <View key={item.campaignId} className="mt-4">
          <View className="flex-row justify-between">
            <Text className="text-slate-200">{item.title}</Text>
            <Text style={{ writingDirection: 'ltr' }} className="font-semibold text-emerald-300">
              {formatCurrency(item.amount, language)}
            </Text>
          </View>
          <View className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
            <View
              style={{ width: `${item.progress * 100}%` }}
              className="h-2 rounded-full bg-emerald-400"
            />
          </View>
        </View>
      ))}
    </View>
  );
}
function Tile({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 rounded-3xl bg-white/5 p-4">
      <Text className="text-xs text-slate-400">{label}</Text>
      <Text
        style={{ writingDirection: 'ltr', fontVariant: ['tabular-nums'] }}
        className="mt-2 text-xl font-black text-white"
      >
        {value}
      </Text>
    </View>
  );
}
