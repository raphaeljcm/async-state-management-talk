import { useContext, useEffect } from 'react';
import { PostsContext } from 'src/contexts/PostsContext';

export const usePosts = () => {
  const { posts, status, error, refetch } = useContext(PostsContext);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    posts,
    status,
    error,
    refetch,
  };
};
