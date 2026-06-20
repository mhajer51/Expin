import { Pressable, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { useLanguage } from '@/shared/lib/language';
import type { WithdrawalState } from '../types/wallet.types';

export function WithdrawButton({
  state,
  disabled,
  onPress,
}: {
  state: WithdrawalState;
  disabled: boolean;
  onPress: () => void;
}) {
  const { language } = useLanguage();
  const spin = useSharedValue(0);
  useEffect(() => {
    if (state === 'processing') spin.value = withRepeat(withTiming(360, { duration: 900 }), -1);
    else spin.value = 0;
  }, [spin, state]);
  const spinner = useAnimatedStyle(() => ({ transform: [{ rotate: `${spin.value}deg` }] }));
  const title =
    state === 'processing'
      ? language === 'ar'
        ? 'جارٍ التحويل...'
        : 'Processing...'
      : state === 'success'
        ? '✓'
        : language === 'ar'
          ? 'سحب الأموال'
          : 'Withdraw Funds';
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={`mt-4 h-16 items-center justify-center rounded-[24px] ${disabled ? 'bg-slate-700' : 'bg-emerald-400'}`}
    >
      {state === 'processing' ? (
        <View className="flex-row items-center gap-3">
          <Animated.View
            style={spinner}
            className="h-5 w-5 rounded-full border-2 border-slate-950 border-t-transparent"
          />
          <Text className="text-base font-black text-slate-950">{title}</Text>
        </View>
      ) : (
        <Text className="text-lg font-black text-slate-950">{title}</Text>
      )}
    </Pressable>
  );
}
