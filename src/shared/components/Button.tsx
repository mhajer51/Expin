import { Pressable, type PressableProps } from 'react-native';
import { AppText } from './AppText';

export function Button({ title, ...props }: PressableProps & { title: string }) {
  return <Pressable className="min-h-touch items-center justify-center rounded-lg bg-primary px-4" {...props}><AppText style={{ color: 'white', fontWeight: '700' }}>{title}</AppText></Pressable>;
}
