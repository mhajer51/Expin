import type { CurrencyCode } from '../types/wallet.types';

export function formatCurrency(value: number, locale: 'en' | 'ar', currency: CurrencyCode = 'AED') {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-AE' : 'en-AE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}
