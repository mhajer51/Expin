import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { I18nManager } from 'react-native';
import i18n, { type SupportedLanguage } from './i18n';

const LANGUAGE_KEY = 'expin.language';
type Direction = 'ltr' | 'rtl';
type LanguageContextValue = { language: SupportedLanguage; direction: Direction; setLanguage: (language: SupportedLanguage) => Promise<{ needsReload: boolean }> };
const LanguageContext = createContext<LanguageContextValue | null>(null);
const directionOf = (language: SupportedLanguage): Direction => (language === 'ar' ? 'rtl' : 'ltr');

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<SupportedLanguage>((i18n.language as SupportedLanguage) ?? 'en');

  useEffect(() => { AsyncStorage.getItem(LANGUAGE_KEY).then((saved) => { if (saved === 'ar' || saved === 'en') void applyLanguage(saved); }); }, []);

  const applyLanguage = useCallback(async (next: SupportedLanguage) => {
    const nextDirection = directionOf(next);
    await AsyncStorage.setItem(LANGUAGE_KEY, next);
    await i18n.changeLanguage(next);
    setLanguageState(next);
    const needsReload = I18nManager.isRTL !== (nextDirection === 'rtl');
    // React Native layout direction is resolved natively. If the app was launched LTR,
    // true RTL flexbox/gestures require forceRTL plus a controlled app restart.
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(nextDirection === 'rtl');
    return { needsReload };
  }, []);

  const value = useMemo(() => ({ language, direction: directionOf(language), setLanguage: applyLanguage }), [applyLanguage, language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used inside LanguageProvider');
  return value;
}
