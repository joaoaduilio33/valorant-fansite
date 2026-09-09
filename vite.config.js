import { defineConfig } from 'vite';
import { sites } from '@openai/sites-vite-plugin';
import { readdirSync } from 'node:fs';

function staticWorker() {
  return {
    name: 'static-site-worker',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'server/index.js',
        source: `export default { async fetch(request, env) { return env.ASSETS.fetch(request); } };`,
      });
    },
  };
}

// Keep the original agent and map URLs available in the production build.
const pages = ['index.html', 'agentes.html', 'mapas.html', ...['agentes', 'mapas'].flatMap((directory) => readdirSync(directory).filter((name) => name.endsWith('.html')).map((name) => `${directory}/${name}`))];
export default defineConfig({ plugins: [staticWorker(), sites()], build: { rollupOptions: { input: pages } } });
