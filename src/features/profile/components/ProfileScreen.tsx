import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppText } from '@/shared/components/AppText';
import { Button } from '@/shared/components/Button';
import { useLanguage } from '@/shared/lib/language';

export function ProfileScreen() { const { t } = useTranslation(); const { language, setLanguage } = useLanguage(); return <View className="flex-1 gap-4 bg-background p-4"><AppText variant="title">{t('profile.title')}</AppText><Button title={language === 'ar' ? 'English' : 'العربية'} onPress={() => void setLanguage(language === 'ar' ? 'en' : 'ar')} /></View>; }
