import { renderToString } from 'react-dom/server';
import App from './App';

// Rendered once at build time by prerender.js to bake the page content into the
// static index.html, so crawlers see full markup without executing JavaScript.
// Styles ship as a normal Vite-linked stylesheet; the client hydrates the tree.
export function render(): { html: string } {
  const html = renderToString(<App />);
  return { html };
}
