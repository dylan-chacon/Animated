import { ApiResponse } from '@/types';
import { Character } from '@/types/data';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCharacters } from '../services/fetchCharacters';
import { useCharacterStore } from '../store/useCharacterStore';

export const useFetchCharacters = () => {
  const setCharacters = useCharacterStore((state) => state.setCharacters);
  const addCharacters = useCharacterStore((state) => state.addCharacters);

  return useInfiniteQuery<ApiResponse<Character>, Error, ApiResponse<Character>, ['characters'], number>({
    queryKey: ['characters'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetchCharacters(pageParam);
      
      if (response.results) {
        if (pageParam === 1) {
          setCharacters(response.results);
        } else {
          addCharacters(response.results);
        }
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
