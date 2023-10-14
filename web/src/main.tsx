import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.StrictMode>,
);