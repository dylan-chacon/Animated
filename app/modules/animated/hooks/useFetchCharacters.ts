import { useInfiniteQuery } from '@tanstack/react-query';
import { Character } from '@/types/data';
import { ApiResponse } from '@/types';
import { fetchCharacters } from '../services/fetchCharacters';
import { useCharacterStore } from '../store/useCharacterStore';

export const useFetchCharacters = () => {
  const setCharacters = useCharacterStore((state) => state.setCharacters);

  return useInfiniteQuery<ApiResponse<Character>, Error, ApiResponse<Character>, ['characters'], number>({
    queryKey: ['characters'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetchCharacters(pageParam);
      
      if (response.results) {
        setCharacters(response.results);
      }

      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: ApiResponse<Character>) => {
      if (lastPage.info.next) {
        const url = new URL(lastPage.info.next);
        const nextPage = url.searchParams.get('page');
        return nextPage ? parseInt(nextPage) : undefined;
      }
      return undefined;
    },
  });
};
