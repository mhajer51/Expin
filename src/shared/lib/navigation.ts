export type AppRouteParams = {
  '/campaigns/[id]': { id: string };
  '/(tabs)/wallet': undefined;
};

export function rtlStackAnimation(direction: 'ltr' | 'rtl') {
  return direction === 'rtl' ? 'slide_from_left' : 'slide_from_right';
}
