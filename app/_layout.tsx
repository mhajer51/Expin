import '@/shared/styles/global.css';
import '@/shared/lib/i18n';
import { startLaravelMockApi } from '@/mocks/laravel';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryProvider } from '@/app/providers/QueryProvider';
import { LanguageProvider, useLanguage } from '@/shared/lib/language';
import { rtlStackAnimation } from '@/shared/lib/navigation';

startLaravelMockApi();

function RootStack() {
  const { direction } = useLanguage();
  return (
    <Stack screenOptions={{ headerShown: false, animation: rtlStackAnimation(direction) }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="campaigns/[id]" options={{ headerShown: true }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryProvider>
        <LanguageProvider>
          <RootStack />
        </LanguageProvider>
      </QueryProvider>
    </GestureHandlerRootView>
  );
}
