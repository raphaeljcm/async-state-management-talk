import { Loading } from '@/Loading';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { APP_ROUTES } from './constants';
import { PublicLayout } from './layouts/PublicLayout';
import { Home } from 'src/pages/Home';

const Post = lazy(() => import('src/pages/Post'));

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
        </Route>
      </Routes>
    </Suspense>
  );
}
