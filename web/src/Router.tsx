import { Loading } from '@/Loading';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { APP_ROUTES } from './constants';
import { PublicLayout } from './layouts/PublicLayout';
import { Home } from 'src/pages/Home';

const Post = lazy(() => import('src/pages/Post'));
const CreatePost = lazy(() => import('src/pages/CreatePost'));
const EditPost = lazy(() => import('src/pages/EditPost'));

export function Router() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={APP_ROUTES.APP} element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route
            path={APP_ROUTES.POST}
            element={
              <Suspense fallback={<Loading />}>
                <Post />
              </Suspense>
            }
          />
          <Route
            path={APP_ROUTES.CREATE_POST}
            element={
              <Suspense fallback={<Loading />}>
                <CreatePost />
              </Suspense>
            }
          />
          <Route
            path={APP_ROUTES.EDIT_POST}
            element={
              <Suspense fallback={<Loading />}>
                <EditPost />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}
