import { Text, type TextProps } from 'react-native';
import { useLanguage } from '@/shared/lib/language';

type AppTextProps = TextProps & { variant?: 'body' | 'title' | 'muted' };

export function AppText({ variant = 'body', style, ...props }: AppTextProps) {
  const { direction } = useLanguage();
  const className = variant === 'title' ? 'text-title text-slate-950' : variant === 'muted' ? 'text-muted' : 'text-slate-900';
  return <Text className={className} style={[{ textAlign: direction === 'rtl' ? 'right' : 'left' }, style]} {...props} />;
}
