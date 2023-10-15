import {
  QueryFunctionContext,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from 'src/lib/axios';
import { PostData } from 'src/types';

async function fetchPosts({ signal }: QueryFunctionContext) {
  const { data } = await api.get<PostData[]>('/posts', { signal });
  return data;
}

export const usePosts = (): UseQueryResult<PostData[], AxiosError> => {
  return useQuery(['posts'], fetchPosts);
};
