import { defineConfig } from 'vite';
import { sites } from '@openai/sites-vite-plugin';

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

export default defineConfig({ plugins: [staticWorker(), sites()] });
