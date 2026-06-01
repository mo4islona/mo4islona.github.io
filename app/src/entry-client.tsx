import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { CacheProvider } from '@emotion/react';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';
import App from './App';
import { createEmotionCache } from './emotionCache';

const container = document.getElementById('root');
if (!container) throw new Error('Root container #root not found');

const cache = createEmotionCache();

hydrateRoot(
  container,
  <StrictMode>
    <CacheProvider value={cache}>
      <App />
    </CacheProvider>
  </StrictMode>,
);
