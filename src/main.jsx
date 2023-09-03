import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from 'providers/ThemeProvider';
import './main.css';

// Remove console logs on hot reload
if (import.meta.hot) {
  import.meta.hot.on(
    'vite:beforeUpdate',
    /* eslint-disable-next-line no-console */
    () => console.clear()
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
