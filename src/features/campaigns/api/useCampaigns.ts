import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCampaigns } from './campaignsApi';

export function useCampaigns() {
  return useInfiniteQuery({
    queryKey: ['campaigns'],
    queryFn: ({ pageParam }) => fetchCampaigns({ cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchInterval: 30_000,
    select: (data) => data.pages.flatMap((page) => page.data),
  });
}
