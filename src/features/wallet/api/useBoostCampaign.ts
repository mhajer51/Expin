import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/lib/api';
import type { Campaign } from '@/features/campaigns/types';

async function boostCampaign(id: string) { return (await api.post(`/campaigns/${id}/boost`)).data; }
export function useBoostCampaign() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: boostCampaign,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['campaigns'] });
      const previous = queryClient.getQueryData(['campaigns']);
      queryClient.setQueriesData<{ pages: { data: Campaign[] }[] }>({ queryKey: ['campaigns'] }, (old) => old ? { ...old, pages: old.pages.map((p) => ({ ...p, data: p.data.map((c) => c.id === id ? { ...c, budget: c.budget + 50 } : c) })) } : old);
      return { previous };
    },
    onError: (_error, _id, context) => queryClient.setQueryData(['campaigns'], context?.previous),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['campaigns'] }),
  });
}
