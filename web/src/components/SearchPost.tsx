import { Link } from 'react-router-dom';
import { Input } from './Input';
import { FormEvent, useState } from 'react';
import { api } from 'src/lib/axios';
import { Post, Status } from 'src/types';
import { AxiosError } from 'axios';

export function SearchPost() {
  const [search, setSearch] = useState('');
  const [post, setPost] = useState({} as Post);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  const handleSearchPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setPost({} as Post);
      setStatus('loading');
      const { data } = await api.get(`/posts/${search}`);
      setPost(data);
      setError(null);
      setStatus('success');
    } catch (err) {
      const error = err as AxiosError;
      const customError = error.response?.data as { message: string };
      setError(customError.message || error.message);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={e => handleSearchPost(e)} className="flex flex-col gap-2">
      <Input
        type="search"
        placeholder="Buscar post por id"
        value={search}
        onChange={e => setSearch(e.currentTarget.value)}
      />

      {search && (
        <div>
          {status === 'loading' ? (
            <span className="text-base-subtitle">Loading...</span>
          ) : status === 'error' ? (
            <span className="text-base-subtitle">Error: {error}</span>
          ) : (
            <p className="text-base-subtitle">
              Post encontrado:{' '}
              <Link
                to={`/posts/${post.id}`}
                className="underline hover:brightness-75 transition-colors"
              >
                {post.title}
              </Link>
            </p>
          )}
        </div>
      )}
    </form>
  );
}
