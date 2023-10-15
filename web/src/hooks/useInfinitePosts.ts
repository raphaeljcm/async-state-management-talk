import {
  QueryFunctionContext,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from 'src/lib/axios';
import { PostData } from 'src/types';

async function fetchInfinitePosts({ pageParam = 0 }: QueryFunctionContext) {
  const { data } = await api.get<PostData[]>('/posts', {
    params: {
      pageSize: 4,
      pageOffset: pageParam,
    },
  });

  return data;
}

export function useInfinitePosts(): UseInfiniteQueryResult<
  PostData[],
  AxiosError
> {
  return useInfiniteQuery(['infinite-posts'], fetchInfinitePosts, {
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return;

      return allPages.length;
    },
  });
}
