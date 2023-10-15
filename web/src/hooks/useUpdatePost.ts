import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from 'src/lib/axios';
import { MutationStatus, UpdatePostPayload } from 'src/types';

export function useUpdatePost(): [
  (values: UpdatePostPayload) => Promise<void>,
  MutationStatus,
] {
  const [status, setStatus] = useState<MutationStatus>('idle');

  const updatePost = useCallback(async (values: UpdatePostPayload) => {
    const data = {
      title: values.title,
      description: values.description,
    };
    try {
      setStatus('loading');
      await api.patch(`/posts/${values.id}`, data);
      setStatus('success');
      toast.success('Post atualizado com sucesso!');
    } catch (err) {
      setStatus('error');
      const error = err as AxiosError;
      setStatus('error');
      toast.error(error.message);
    }
  }, []);

  return [updatePost, status];
}
