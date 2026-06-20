import { useEffect, useState } from 'react';
import { I18nManager, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeIn,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useLanguage } from '@/shared/lib/language';
import { formatCurrency } from '../utils/formatCurrency';
import type { WalletBalance, WithdrawalState } from '../types/wallet.types';

export function BalanceCard({
  balance,
  state,
}: {
  balance: WalletBalance;
  state: WithdrawalState;
}) {
  const { language, direction } = useLanguage();
  const displayed = useSharedValue(balance.available);
  const shake = useSharedValue(0);
  const [label, setLabel] = useState(formatCurrency(balance.available, language, balance.currency));

  useEffect(() => {
    displayed.value = withTiming(balance.available, { duration: 650 });
    const id = setInterval(
      () => setLabel(formatCurrency(displayed.value, language, balance.currency)),
      32,
    );
    return () => clearInterval(id);
  }, [balance.available, balance.currency, displayed, language]);

  useEffect(() => {
    if (state === 'error')
      shake.value = withSequence(withTiming(-8), withTiming(8), withTiming(-5), withSpring(0));
  }, [shake, state]);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateX: shake.value }] }));

  return (
    <Animated.View
      layout={Layout.springify()}
      style={animatedStyle}
      entering={FadeIn}
      className="overflow-hidden rounded-[32px] shadow-2xl shadow-emerald-950/40"
    >
      <LinearGradient
        colors={['#10201f', '#142b3a', '#0b1020'] as const}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-6"
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-semibold uppercase tracking-[3px] text-emerald-200/80">
            {language === 'ar' ? 'الرصيد المتاح' : 'Available balance'}
          </Text>
          <Text
            style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
            className="text-2xl text-emerald-300"
          >
            ↗
          </Text>
        </View>
        <Text
          style={{
            writingDirection: 'ltr',
            fontVariant: ['tabular-nums'],
            textAlign: direction === 'rtl' ? 'right' : 'left',
          }}
          className="mt-5 text-5xl font-black text-white"
        >
          {label}
        </Text>
        <View className="mt-6 flex-row justify-between rounded-3xl bg-white/10 p-4">
          <View>
            <Text className="text-xs text-slate-300">
              {language === 'ar' ? 'قيد الانتظار' : 'Pending'}
            </Text>
            <Text
              style={{ writingDirection: 'ltr' }}
              className="mt-1 text-base font-bold text-white"
            >
              {formatCurrency(balance.pending, language, balance.currency)}
            </Text>
          </View>
          <View>
            <Text className="text-xs text-slate-300">{language === 'ar' ? 'الحالة' : 'State'}</Text>
            <Text className="mt-1 text-base font-bold text-emerald-300">
              {state === 'idle' ? (language === 'ar' ? 'جاهز' : 'Ready') : state}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}
