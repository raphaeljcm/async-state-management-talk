import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router.tsx';
import { PostsContextProvider } from './contexts/PostsContext.tsx';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PostsContextProvider>
        <Router />
        <Toaster position="top-right" />
      </PostsContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
