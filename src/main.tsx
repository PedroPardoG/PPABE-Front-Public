// /src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // <-- Reboot CSS global (única fuente de reset)
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/AppContextProvider';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

const baseName = import.meta.env.BASE_URL.replace(/\/$/, ''); // "/ppabe"
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={baseName}>
      <ThemeProvider theme={theme}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
