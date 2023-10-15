import { AxiosError } from 'axios';
import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { api } from 'src/lib/axios';
import { PostData } from 'src/types';

interface PostsContextData {
  posts: PostData[];
  status: string;
  error: string | null;
  refetch: () => true | Promise<void>;
}

interface PostsContextProviderProps {
  children: ReactNode;
}

export const PostsContext = createContext({} as PostsContextData);

export function PostsContextProvider({ children }: PostsContextProviderProps) {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('loading');

  const activePromiseRef = useRef<boolean | Promise<void>>(false);

  const refetch = useCallback(() => {
    if (!activePromiseRef.current) {
      activePromiseRef.current = (async () => {
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
        } finally {
          activePromiseRef.current = false;
        }
      })();
    }

    return activePromiseRef.current;
  }, []);

  const contextValue = useMemo(
    () => ({
      posts,
      status,
      error,
      refetch,
    }),
    [posts, status, error, refetch],
  );

  return (
    <PostsContext.Provider value={contextValue}>
      {children}
    </PostsContext.Provider>
  );
}
