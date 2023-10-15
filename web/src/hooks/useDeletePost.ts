import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { api } from 'src/lib/axios';
import { MutationStatus } from 'src/types';

export function useDeletePost(): [
  (id: string) => Promise<void>,
  MutationStatus,
] {
  const [status, setStatus] = useState<MutationStatus>('idle');

  const navigate = useNavigate();

  const deletePost = useCallback(
    async (id: string) => {
      try {
        setStatus('loading');
        await api.delete(`/posts/${id}`);
        setStatus('success');
        toast.success('Post deletado com sucesso!');
        navigate(-1);
      } catch (err) {
        const error = err as AxiosError;
        setStatus('error');
        toast.error(error.message);
      }
    },
    [navigate],
  );

  return [deletePost, status];
}
