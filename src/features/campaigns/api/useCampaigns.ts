import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCampaigns } from './campaignsApi';

export function useCampaigns() {
  return useInfiniteQuery({
    queryKey: ['campaigns'],
    queryFn: ({ pageParam }) => fetchCampaigns({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.links.next ? lastPage.meta.current_page + 1 : undefined,
    refetchInterval: 30_000,
    select: (data) => data.pages.flatMap((page) => page.data),
  });
}
