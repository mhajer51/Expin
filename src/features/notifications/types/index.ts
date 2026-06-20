export type Notification = {
  id: string;
  type: 'campaign' | 'wallet' | 'system';
  title: string;
  body: string;
  read_at: string | null;
  created_at: string;
};
