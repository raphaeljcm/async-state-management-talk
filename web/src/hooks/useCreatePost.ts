import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
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
      toast.success('Post criado com sucesso!');
    } catch (err) {
      const error = err as AxiosError;
      setStatus('error');
      toast.error(error.message);
    }
  }, []);

  return [createPost, status];
}
