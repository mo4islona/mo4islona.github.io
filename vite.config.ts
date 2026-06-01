import { existsSync, createReadStream } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const publicDir = fileURLToPath(new URL('./public', import.meta.url));

// In `vite dev`, a directory request like `/blockly/` falls through to the SPA
// fallback and serves the root index.html. The static demos in public/ each have
// their own index.html, so serve that instead — matching `vite preview` and the
// Cloudflare Pages production behaviour.
function serveDemoIndex(): Plugin {
  return {
    name: 'serve-demo-index',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split('?')[0];
        if (path && path.length > 1 && path.endsWith('/')) {
          const file = join(publicDir, path, 'index.html');
          if (existsSync(file)) {
            res.setHeader('Content-Type', 'text/html');
            createReadStream(file).pipe(res);
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), serveDemoIndex()],
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
