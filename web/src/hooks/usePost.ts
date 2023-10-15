import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { api } from 'src/lib/axios';
import { PostData, Status } from 'src/types';

export function usePost(id?: string) {
  const [post, setPost] = useState({} as PostData);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  const refetch = useCallback(async () => {
    if (!id) return;

    try {
      setStatus('loading');

      const { data } = await api.get<PostData>(`/posts/${id}`);

      setPost(data);
      setError('');
      setStatus('success');
    } catch (err) {
      const error = err as AxiosError;
      const customError = error.response?.data as { message: string };
      setError(customError.message || error.message);
      setStatus('error');
    }
  }, [id]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    post,
    status,
    error,
    refetch,
  };
}
