// Bakes the React tree into dist/index.html so crawlers (and the first paint)
// get full markup without running JavaScript. Runs after `vite build` (client →
// dist) and `vite build --ssr` (server → dist-server). Styles are already linked
// into dist/index.html by Vite as a normal hashed stylesheet.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatePath = resolve(__dirname, 'dist', 'index.html');

const { render } = await import('./dist-server/entry-server.js');
const { html } = render();

const template = readFileSync(templatePath, 'utf-8');

if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: <div id="root"></div> not found in dist/index.html');
}

const output = template.replace(
  '<div id="root"></div>',
  `<div id="root">${html}</div>`,
);

writeFileSync(templatePath, output);
console.log('prerender: injected SSR markup into dist/index.html');
