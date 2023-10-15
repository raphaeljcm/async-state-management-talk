import {
  QueryFunctionContext,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from 'src/lib/axios';
import { PostData } from 'src/types';

async function fetchPost({ queryKey, signal }: QueryFunctionContext) {
  const id = queryKey[1];
  const { data } = await api.get<PostData>(`/posts/${id}`, { signal });
  return data;
}

export function usePost(id?: string): UseQueryResult<PostData, AxiosError> {
  return useQuery(['post', id], fetchPost, {
    enabled: !!id,
  });
}
