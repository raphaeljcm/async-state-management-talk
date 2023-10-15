import { Link } from 'react-router-dom';
import { Input } from './Input';
import { FormEvent, useState } from 'react';
import { usePost } from 'src/hooks/usePost';

export function SearchPost() {
  const [search, setSearch] = useState('');
  const { data, isLoading, isError, error } = usePost(search);

  const handleSearchPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    new FormData(event.currentTarget).forEach(value =>
      setSearch(value.toString()),
    );
  };

  return (
    <form onSubmit={e => handleSearchPost(e)} className="flex flex-col gap-2">
      <Input type="search" name="search" placeholder="Buscar post por id" />

      {search && (
        <div>
          {isLoading ? (
            <span className="text-base-subtitle">Loading...</span>
          ) : isError ? (
            <span className="text-base-subtitle">Error: {error.message}</span>
          ) : (
            <p className="text-base-subtitle">
              Post encontrado:{' '}
              <Link
                to={`/posts/${data.id}`}
                className="underline hover:brightness-75 transition-colors"
              >
                {data.title}
              </Link>
            </p>
          )}
        </div>
      )}
    </form>
  );
}
