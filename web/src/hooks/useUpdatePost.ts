import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { api } from 'src/lib/axios';
import { UpdatePostPayload } from 'src/types';

async function updatePost(values: UpdatePostPayload) {
  const abortController = new AbortController();
  const signal = abortController.signal;

  await api.patch(`/posts/${values.id}`, values, { signal });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation(updatePost, {
    onSuccess: (data, variables) => {
      const { id } = variables;

      queryClient.invalidateQueries(['posts'], { exact: true });
      queryClient.invalidateQueries(['posts', id]);
      toast.success('Post atualizado com sucesso!');
    },
    onError: (err: AxiosError) => {
      toast.error(err.message);
    },
  });
}
