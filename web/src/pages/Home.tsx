import { Card } from '@/Card';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from 'src/lib/axios';
import { AxiosError } from 'axios';
import { PostData, Status } from 'src/types';
import { APP_ROUTES } from 'src/constants';

export function Home() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  const navigate = useNavigate();
  const handleCardClick = (id: string) => navigate(`/posts/${id}`);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setStatus('loading');
        const { data } = await api.get<PostData[]>('/posts');
        setPosts(data);
        setError(null);
        setStatus('success');
      } catch (err) {
        const error = err as AxiosError;
        setError(error.message);
        setStatus('error');
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="flex flex-col gap-8 mt-16">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-base-subtitle">Publicações</h2>
        <Link
          to={APP_ROUTES.CREATE_POST}
          className="text-lg font-bold text-base-title"
        >
          Criar post
        </Link>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(0,48%))] gap-8 h-[900px] overflow-auto py-4 px-2">
        {status === 'loading' ? (
          <span className="text-base-subtitle">Loading...</span>
        ) : status === 'error' ? (
          <span className="text-base-subtitle">Error: {error}</span>
        ) : (
          <>
            {posts.map(post => (
              <Card
                key={post.id}
                title={post.title}
                description={post.description}
                onClick={() => handleCardClick(post.id)}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
