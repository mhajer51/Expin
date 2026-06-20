export type Campaign = { id: string; title: string; budget: number; status: 'draft' | 'active' | 'paused'; updatedAt: string };
export type CampaignPage = { data: Campaign[]; nextCursor?: string };
