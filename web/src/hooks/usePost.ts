import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PostData } from 'src/types';
import { fetchPost } from 'src/services/fetchPost';

type CustomError = AxiosError<{ message: string }>;

export function usePost(id?: string): UseQueryResult<PostData, CustomError> {
  return useQuery(['posts', id], fetchPost, {
    enabled: !!id,
  });
}
