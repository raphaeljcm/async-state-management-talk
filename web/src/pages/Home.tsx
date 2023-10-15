import { Card } from '@/Card';
import { useQueryClient } from '@tanstack/react-query';
import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from 'src/constants';
import { useInfinitePosts } from 'src/hooks/useInfinitePosts';
import { fetchPost } from 'src/services/fetchPost';

export function Home() {
  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  } = useInfinitePosts();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const handleCardClick = (id: string) => navigate(`/posts/${id}`);

  const handleMouseEnter = (id: string) => {
    queryClient.prefetchQuery(['posts', id], fetchPost);
  };

  return (
    <section className="flex flex-col gap-8 mt-16">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-base-subtitle">
          Publicações {isFetching && !isFetchingNextPage && '...'}
        </h2>
        <Link
          to={APP_ROUTES.CREATE_POST}
          className="text-lg font-bold text-base-title"
        >
          Criar post
        </Link>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(0,48%))] gap-8 h-[900px] overflow-auto py-4 px-2">
        {isLoading ? (
          <span className="text-base-subtitle">Loading...</span>
        ) : isError ? (
          <span className="text-base-subtitle">Error: {error.message}</span>
        ) : (
          <>
            {data.pages.map((page, index) => (
              <Fragment key={index}>
                {page.map(post => (
                  <Card
                    key={post.id}
                    title={post.title}
                    description={post.description}
                    onClick={() => handleCardClick(post.id)}
                    onMouseEnter={() => handleMouseEnter(post.id)}
                  />
                ))}
              </Fragment>
            ))}
          </>
        )}
      </div>
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage}
        className="py-2 px-4 bg-base-input text-base-span w-fit mx-auto rounded-lg outline-none focus-visible:ring-1 focus-visible:ring-blue hover:brightness-75 transition-colors"
      >
        {isFetchingNextPage
          ? 'Carregando mais posts...'
          : hasNextPage
          ? 'Carregar mais'
          : 'Não há mais posts'}
      </button>
    </section>
  );
}
