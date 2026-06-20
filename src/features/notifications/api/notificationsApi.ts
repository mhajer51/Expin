import { api } from '@/shared/lib/api';
import type { Notification } from '../types';

export async function fetchNotifications() {
  const { data } = await api.get<{ data: Notification[] }>('/notifications');
  return data;
}
