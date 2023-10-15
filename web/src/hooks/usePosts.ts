import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { api } from 'src/lib/axios';
import { PostData, Status } from 'src/types';

export function usePosts() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  const refetch = async () => {
    try {
      setStatus('loading');
      const { data } = await api.get<PostData[]>('/posts');
      setPosts(data);
      setError(null);
      setStatus('success');
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message);
      setStatus('error');
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return {
    posts,
    status,
    error,
    refetch,
  };
}
