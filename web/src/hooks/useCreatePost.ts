import { useCallback, useState } from 'react';
import { api } from 'src/lib/axios';
import { CreatePostPayload, MutationStatus } from 'src/types';

export function useCreatePost(): [
  (values: CreatePostPayload) => Promise<void>,
  MutationStatus,
] {
  const [status, setStatus] = useState<MutationStatus>('idle');

  const createPost = useCallback(async (values: CreatePostPayload) => {
    try {
      setStatus('loading');
      await api.post(`/posts`, values);
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  }, []);

  return [createPost, status];
}
