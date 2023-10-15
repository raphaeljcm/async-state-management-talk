import { QueryFunctionContext } from '@tanstack/react-query';
import { api } from 'src/lib/axios';
import { PostData } from 'src/types';

export async function fetchPost({ queryKey, signal }: QueryFunctionContext) {
  const id = queryKey[1];
  const { data } = await api.get<PostData>(`/posts/${id}`, { signal });
  return data;
}
