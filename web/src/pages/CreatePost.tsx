import { Input } from '@/Input';
import { FormEvent, useState } from 'react';
import { api } from 'src/lib/axios';

type CreatePostPayload = {
  title: string;
  description: string;
};

export default function CreatePost() {
  const [mutationStatus, setMutationStatus] = useState('idle');
  const [values, setValues] = useState<CreatePostPayload>({
    title: '',
    description: '',
  });

  const setValue = (field: 'title' | 'description', value: string) =>
    setValues(old => ({ ...old, [field]: value }));

  const handleCreatePost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setMutationStatus('loading');
      await api.post(`/posts`, values);
      setMutationStatus('success');
    } catch (err) {
      setMutationStatus('error');
    }
  };

  return (
    <section className="mt-16 py-8 px-10 bg-base-profile rounded-[10px] shadow-customShadow">
      <form onSubmit={handleCreatePost} className="flex flex-col gap-4">
        <label htmlFor="title" className="text-base-subtitle font-bold">
          Título
        </label>
        <Input
          type="text"
          id="title"
          name="title"
          value={values.title}
          onChange={e => setValue('title', e.target.value)}
          required
        />
        <label htmlFor="desc" className="text-base-subtitle font-bold">
          Descrição
        </label>
        <textarea
          id="desc"
          name="desc"
          value={values.description}
          onChange={e => setValue('description', e.target.value)}
          required
          className="py-3 px-4 bg-base-input text-base-span border border-base-border rounded-md transition-colors outline-none focus-visible:ring-1 focus-visible:border-blue"
        />
        <button
          type="submit"
          className="py-2 px-4 bg-base-input text-base-span w-fit self-center rounded-lg outline-none focus-visible:ring-1 focus-visible:ring-blue hover:brightness-75 transition-colors"
        >
          {mutationStatus === 'loading'
            ? 'Salvando...'
            : mutationStatus === 'error'
            ? 'Erro!'
            : mutationStatus === 'success'
            ? 'Post criado!'
            : 'Criar post'}
        </button>
      </form>
    </section>
  );
}
