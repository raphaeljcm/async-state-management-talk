import { Loading } from '@/Loading';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { APP_ROUTES } from './constants';
import { PublicLayout } from './layouts/PublicLayout';
import { App } from './App';

export function Router() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={APP_ROUTES.APP} element={<PublicLayout />}>
          <Route index element={<App />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
