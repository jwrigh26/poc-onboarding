import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthLayout from 'layouts/AuthLayout';
import MainLayout from 'layouts/MainLayout.jsx';
import ThemeProvider from 'providers/ThemeProvider';
import './main.css';

const isLoggedIn = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      {isLoggedIn && <MainLayout />}
      {!isLoggedIn && <AuthLayout />}
    </ThemeProvider>
  </React.StrictMode>
);
