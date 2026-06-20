import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from '@/locales/ar/common.json';
import en from '@/locales/en/common.json';

export const supportedLanguages = ['en', 'ar'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

const deviceLanguage = Localization.getLocales()[0]?.languageCode === 'ar' ? 'ar' : 'en';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  lng: deviceLanguage,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  resources: { en: { common: en }, ar: { common: ar } },
  defaultNS: 'common',
});

export default i18n;
