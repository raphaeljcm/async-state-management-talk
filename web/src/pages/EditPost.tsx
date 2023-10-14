import arrowIcon from '../assets/arrow.svg';
import { Input } from '@/Input';
import { AxiosError } from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from 'src/lib/axios';
import { MutationStatus, PostData, Status } from 'src/types';

type EditPostPayload = {
  title: string;
  description: string;
};

export default function EditPost() {
  const [error, setError] = useState('');
  const [status, setStatus] = useState<Status>('loading');
  const [mutationStatus, setMutationStatus] = useState<MutationStatus>('idle');
  const [values, setValues] = useState<EditPostPayload>({
    title: '',
    description: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  const setValue = (field: 'title' | 'description', value: string) =>
    setValues(old => ({ ...old, [field]: value }));

  const handlEditPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setMutationStatus('loading');
      await api.patch(`/posts/${id}`, values);
      setMutationStatus('success');
    } catch (err) {
      setMutationStatus('error');
    }
  };

  useEffect(() => {
    async function fetchPost() {
      try {
        setStatus('loading');

        const { data } = await api.get<PostData>(`/posts/${id}`);

        setValues({ title: data.title, description: data.description });
        setError('');
        setStatus('success');
      } catch (err) {
        const error = err as AxiosError;
        setError(error.message);
        setStatus('error');
      }
    }

    fetchPost();
  }, [id]);

  return (
    <section className="mt-16 py-8 px-10 bg-base-profile rounded-[10px] shadow-customShadow">
      <form onSubmit={handlEditPost} className="flex flex-col gap-4">
        {status === 'loading' ? (
          <span className="text-base-subtitle">Loading...</span>
        ) : status === 'error' ? (
          <span className="text-base-subtitle">Error: {error}</span>
        ) : (
          <>
            <button
              type="button"
              className="text-xs text-blue font-bold uppercase flex gap-2 hover:brightness-75 transition-colors"
              onClick={handleGoBack}
            >
              <img
                src={arrowIcon}
                alt="click here to go back"
                width={12}
                height={12}
              />{' '}
              voltar
            </button>
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
                ? 'Post atualizado!'
                : 'Atualizar post'}
            </button>
          </>
        )}
      </form>
    </section>
  );
}
