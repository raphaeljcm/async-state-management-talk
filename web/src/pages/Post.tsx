import arrowIcon from '../assets/arrow.svg';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MutationStatus, PostData, Status } from 'src/types';
import { api } from 'src/lib/axios';
import { AxiosError } from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/Dialog';

export default function Post() {
  const [post, setPost] = useState({} as PostData);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<Status>('loading');
  const [mutationStatus, setMutationStatus] = useState<MutationStatus>('idle');

  const { id } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  const handleDeletePost = async () => {
    try {
      setMutationStatus('loading');
      await api.delete(`/posts/${id}`);
      setMutationStatus('success');
      handleGoBack();
    } catch (err) {
      setMutationStatus('error');
    }
  };

  useEffect(() => {
    async function fetchPost() {
      try {
        setStatus('loading');

        const { data } = await api.get<PostData>(`/posts/${id}`);

        setPost(data);
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
    <>
      <section className="mt-10 px-8 flex flex-col gap-10">
        {status === 'loading' ? (
          <span className="text-base-subtitle">Loading...</span>
        ) : status === 'error' ? (
          <span className="text-base-subtitle">Error: {error}</span>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-base-title">
                {post.title}
              </h2>
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
            </div>

            <p className="text-base-text">{post.description}</p>

            <div className="flex items-center justify-end gap-4">
              <Link
                to={`/edit-post/${post.id}`}
                className="py-2 px-4 bg-base-input text-base-span w-fit rounded-lg outline-none focus-visible:ring-1 focus-visible:ring-blue hover:brightness-75 transition-colors"
              >
                Editar post
              </Link>

              <Dialog>
                <DialogTrigger className="py-2 px-4 bg-base-post text-base-span w-fit rounded-lg outline-none focus-visible:ring-1 focus-visible:ring-blue hover:brightness-75 transition-colors">
                  Deletar Post
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Você tem certeza que deseja excluir o post?
                    </DialogTitle>
                    <DialogDescription>
                      Está ação não pode ser desfeita.
                    </DialogDescription>
                    <DialogFooter>
                      <button
                        type="button"
                        onClick={handleDeletePost}
                        className="py-2 px-4 bg-base-post text-base-span w-fit rounded-lg outline-none focus-visible:ring-1 focus-visible:ring-blue hover:brightness-75 transition-colors"
                      >
                        {mutationStatus === 'loading'
                          ? 'Deletando post...'
                          : mutationStatus === 'error'
                          ? 'Erro!'
                          : mutationStatus === 'success'
                          ? 'Post deletado!'
                          : 'Deletar post'}
                      </button>
                    </DialogFooter>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </>
        )}
      </section>
    </>
  );
}
