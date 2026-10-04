import { defineConfig } from 'vite';
import { readdirSync } from 'node:fs';

// One entry per generated agent and map page (see scripts/generate-pages.mjs).
const pages = ['index.html', ...['agente', 'mapa'].flatMap((folder) => readdirSync(folder).map((slug) => `${folder}/${slug}/index.html`))];
export default defineConfig({ build: { rollupOptions: { input: pages } } });
