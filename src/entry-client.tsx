import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';
import './index.css';
import App from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Root container #root not found');

hydrateRoot(
  container,
  <StrictMode>
    <App />
  </StrictMode>,
);
