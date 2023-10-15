import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';
import { api } from 'src/lib/axios';
import { PostData } from 'src/types';

type CustomError = AxiosError<{ message: string }>;

async function fetchPost({ queryKey, signal }: QueryFunctionContext) {
  const id = queryKey[1];
  const { data } = await api.get<PostData>(`/posts/${id}`, { signal });
  return data;
}

export function usePost(id?: string): UseQueryResult<PostData, CustomError> {
  return useQuery(['posts', id], fetchPost, {
    enabled: !!id,
  });
}
