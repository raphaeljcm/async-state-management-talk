import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router.tsx';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
        <Toaster position="top-right" />
        <ReactQueryDevtools />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
