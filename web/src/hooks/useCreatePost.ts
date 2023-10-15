import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { api } from 'src/lib/axios';
import { CreatePostPayload } from 'src/types';

async function createPost(values: CreatePostPayload) {
  const abortController = new AbortController();
  const signal = abortController.signal;

  const { data } = await api.post('/posts', values, { signal });
  return data;
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      toast.success('Post criado com sucesso!');
    },
    onError: (err: AxiosError) => {
      toast.error(err.message);
    },
  });
}
