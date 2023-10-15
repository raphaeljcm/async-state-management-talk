import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { api } from 'src/lib/axios';

async function deletePost(id: string) {
  const abortController = new AbortController();
  const signal = abortController.signal;

  await api.delete(`/posts/${id}`, { signal });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      toast.success('Post deletado com sucesso!');
      navigate('/');
    },
    onError: (err: AxiosError) => {
      toast.error(err.message);
    },
  });
}
