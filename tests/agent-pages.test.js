import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { slugify } from '../src/slug.js';
import { agentLore } from '../src/data/agents.js';

const root = new URL('../agente/', import.meta.url);
const slugs = fs.readdirSync(root);

test('slugs match the folder names used for links', () => {
  assert.equal(slugify('KAY/O'), 'kayo');
  assert.equal(slugify('Jett'), 'jett');
});

test('every generated page is wired to its own agent', () => {
  assert.ok(slugs.length >= 29);
  for (const slug of slugs) {
    const page = fs.readFileSync(new URL(`${slug}/index.html`, root), 'utf8');
    assert.ok(page.includes(`data-agent="${slug}"`), slug);
    assert.match(page, /data-uuid="[0-9a-f-]{36}"/);
    assert.ok(page.includes(`og/agente/${slug}.jpg"`), `preview path for ${slug}`);
    assert.ok(fs.existsSync(new URL(`../public/og/agente/${slug}.jpg`, import.meta.url)), `preview image for ${slug}`);
    assert.ok(page.includes('src="../../src/agent-page.js"'));
    assert.doesNotMatch(page, /\{\{\w+\}\}/, `unfilled placeholder in ${slug}`);
  }
});

test('every map page has its data, preview and script', () => {
  const maps = fs.readdirSync(new URL('../mapa/', import.meta.url));
  assert.equal(maps.length, 13);
  for (const slug of maps) {
    const page = fs.readFileSync(new URL(`../mapa/${slug}/index.html`, import.meta.url), 'utf8');
    assert.ok(page.includes(`data-map="${slug}"`), slug);
    assert.ok(fs.existsSync(new URL(`../public/og/mapa/${slug}.jpg`, import.meta.url)), `preview image for ${slug}`);
    assert.ok(page.includes('src="../../src/map-page.js"'));
    assert.doesNotMatch(page, /\{\{\w+\}\}/, `unfilled placeholder in ${slug}`);
  }
});

test('every agent has a written biography in both languages', () => {
  assert.deepEqual(Object.keys(agentLore).sort(), [...slugs].sort());
  for (const [slug, lore] of Object.entries(agentLore)) {
    assert.ok(slugs.includes(slug), slug);
    assert.ok(lore.bio.pt.length > 0);
    assert.equal(lore.bio.pt.length, lore.bio.en.length, slug);
    if (lore.origin?.city) assert.ok(lore.origin.city.pt && lore.origin.city.en, slug);
    if (lore.scene) assert.ok(lore.scene.label.pt && lore.scene.label.en, slug);
  }
});
