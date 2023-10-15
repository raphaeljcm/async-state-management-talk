import { Link } from 'react-router-dom';
import { Input } from './Input';
import { FormEvent, useState } from 'react';
import { usePost } from 'src/hooks/usePost';

export function SearchPost() {
  const [search, setSearch] = useState('');
  const { post, status, error, refetch } = usePost(search);

  const handleSearchPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    refetch();
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
