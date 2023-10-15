import { useCallback, useState } from 'react';
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
    } catch (err) {
      setStatus('error');
    }
  }, []);

  return [updatePost, status];
}
