import { defineConfig } from 'vite';
import { readdirSync } from 'node:fs';

// One entry per generated agent and map page (see scripts/generate-pages.mjs).
const pages = ['index.html', ...['agente', 'mapa'].flatMap((folder) => readdirSync(folder).map((slug) => `${folder}/${slug}/index.html`))];
// Flags are used inside CSS url('…'); an inlined data URI full of quotes would break it, so keep them as files.
const isFlag = (file) => file.split('\\').join('/').includes('/src/flags/');

export default defineConfig({
  build: {
    rollupOptions: { input: pages },
    assetsInlineLimit: (file) => (isFlag(file) ? false : undefined),
  },
});
