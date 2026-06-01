import { renderToString } from 'react-dom/server';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import App from './App';
import { createEmotionCache } from './emotionCache';

// Rendered once at build time by prerender.js to bake the page content and its
// critical CSS into the static index.html, so crawlers see full markup without
// executing JavaScript. The client then hydrates the same tree.
export function render(): { html: string; styleTags: string } {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  const html = renderToString(
    <CacheProvider value={cache}>
      <App />
    </CacheProvider>,
  );

  const chunks = extractCriticalToChunks(html);
  const styleTags = constructStyleTagsFromChunks(chunks);

  return { html, styleTags };
}
