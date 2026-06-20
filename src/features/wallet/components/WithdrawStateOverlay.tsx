import { Pressable, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { useLanguage } from '@/shared/lib/language';
import type { WithdrawalState } from '../types/wallet.types';

export function WithdrawStateOverlay({
  state,
  message,
  onRetry,
}: {
  state: WithdrawalState;
  message?: string;
  onRetry: () => void;
}) {
  const { language } = useLanguage();
  if (state === 'idle') return null;
  const isError = state === 'error';
  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutDown}
      className="absolute bottom-6 left-4 right-4 overflow-hidden rounded-[28px]"
    >
      <BlurView intensity={42} tint="dark" className="border border-white/10 bg-slate-950/70 p-5">
        <View className="flex-row items-center gap-4">
          <View
            className={`h-12 w-12 items-center justify-center rounded-full ${isError ? 'bg-orange-500/20' : 'bg-emerald-400/20'}`}
          >
            <Text className="text-2xl">{isError ? '!' : state === 'success' ? '✓' : '…'}</Text>
          </View>
          <View className="flex-1">
            <Text className="font-black text-white">
              {isError
                ? language === 'ar'
                  ? 'فشل السحب'
                  : 'Withdrawal failed'
                : state === 'success'
                  ? language === 'ar'
                    ? 'تم إرسال الطلب'
                    : 'Request queued'
                  : language === 'ar'
                    ? 'جارٍ المعالجة'
                    : 'Processing withdrawal'}
            </Text>
            <Text className="mt-1 text-sm text-slate-300">
              {message ??
                (language === 'ar'
                  ? 'نزامن العملية مع الخادم.'
                  : 'Syncing with the server ledger.')}
            </Text>
          </View>
          {isError ? (
            <Pressable onPress={onRetry} className="rounded-2xl bg-white px-4 py-3">
              <Text className="font-bold text-slate-950">
                {language === 'ar' ? 'إعادة' : 'Retry'}
              </Text>
            </Pressable>
          ) : null}
        </View>
      </BlurView>
    </Animated.View>
  );
}
