// Builds one static page per agent (agente/<slug>/index.html) from scripts/agent-template.html,
// and one per standard map (mapa/<slug>/index.html) from scripts/map-template.html.
// Static files keep clean, shareable links with per-agent previews, and work in Live Server
// without a bundler. Run `npm run pages` after editing the template or when Riot adds an agent.
import fs from 'node:fs';
import { slugify } from '../src/slug.js';

const API = 'https://valorant-api.com/v1';
const get = async (path) => (await (await fetch(`${API}${path}`)).json()).data;
// Share previews need absolute URLs for some apps: set SITE_URL (e.g. https://meusite.vercel.app) when generating.
const SITE = (process.env.SITE_URL ?? '').replace(/\/$/, '');
const escape = (value) => String(value).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const [agents, cards] = await Promise.all([get('/agents?language=pt-BR&isPlayableCharacter=true'), get('/playercards')]);
const template = fs.readFileSync(new URL('./agent-template.html', import.meta.url), 'utf8');
const root = new URL('../agente/', import.meta.url);
fs.rmSync(root, { recursive: true, force: true });

for (const agent of agents) {
  const slug = slugify(agent.displayName);
  // Mastery cards arrived in patch 13.06 and are named "<Agent> Mastery Card" in English.
  const card = cards.find((item) => item.displayName.toLowerCase() === `${agent.displayName.toLowerCase()} mastery card`);
  const values = {
    slug, uuid: agent.uuid, name: agent.displayName, card: card?.uuid ?? '',
    description: agent.description.replace(/\s+/g, ' ').trim(),
    image: `${SITE}/og/agente/${slug}.jpg`, // made by scripts/og-images.ps1
    color: `#${agent.backgroundGradientColors[0].slice(0, 6)}`,
  };
  const html = template.replace(/\{\{(\w+)\}\}/g, (_, key) => escape(values[key]));
  fs.mkdirSync(new URL(`${slug}/`, root), { recursive: true });
  fs.writeFileSync(new URL(`${slug}/index.html`, root), html);
}
console.log(`${agents.length} páginas de agente geradas em agente/`);

// Map pages (mapa/<slug>/index.html): only the standard maps listed in src/data/maps.js.
const { mapInfo } = await import('../src/data/maps.js');
const maps = (await get('/maps?language=pt-BR')).filter((map) => mapInfo[slugify(map.displayName)]);
const mapTemplate = fs.readFileSync(new URL('./map-template.html', import.meta.url), 'utf8');
const mapRoot = new URL('../mapa/', import.meta.url);
fs.rmSync(mapRoot, { recursive: true, force: true });
for (const map of maps) {
  const slug = slugify(map.displayName);
  const values = {
    slug, uuid: map.uuid, name: map.displayName, image: `${SITE}/og/mapa/${slug}.jpg`,
    description: `${map.displayName}: ${mapInfo[slug].place.pt}. Minimapa, pontos e as composições mais usadas nos campeonatos.`,
  };
  fs.mkdirSync(new URL(`${slug}/`, mapRoot), { recursive: true });
  fs.writeFileSync(new URL(`${slug}/index.html`, mapRoot), mapTemplate.replace(/\{\{(\w+)\}\}/g, (_, key) => escape(values[key])));
}
console.log(`${maps.length} páginas de mapa geradas em mapa/`);
