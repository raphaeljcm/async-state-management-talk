import { useCallback, useState } from 'react';
import { api } from 'src/lib/axios';
import { MutationStatus } from 'src/types';

export function useDeletePost(): [
  (id: string) => Promise<void>,
  MutationStatus,
] {
  const [status, setStatus] = useState<MutationStatus>('idle');

  const deletePost = useCallback(async (id: string) => {
    try {
      setStatus('loading');
      await api.delete(`/posts/${id}`);
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  }, []);

  return [deletePost, status];
}
