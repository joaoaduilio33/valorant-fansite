import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { origins } from '../src/data/origins.js';
import { flagMarkup, flagBadge } from '../src/agent/flag.js';

const slugs = fs.readdirSync(new URL('../agente/', import.meta.url));

test('every agent page has an origin, and every flag code has its SVG', () => {
  for (const slug of slugs) {
    const origin = origins[slug];
    assert.ok(origin, `no origin for ${slug}`);
    assert.ok(origin.country.pt && origin.country.en, slug);
    if (origin.flag) assert.ok(fs.existsSync(new URL(`../src/flags/${origin.flag}.svg`, import.meta.url)), origin.flag);
  }
  assert.ok(fs.existsSync(new URL('../src/flags/LICENSE', import.meta.url)));
});

test('only Omen, Vyse and KAY/O have no flag', () => {
  assert.deepEqual(Object.keys(origins).filter((slug) => !origins[slug].flag).sort(), ['kayo', 'omen', 'vyse']);
});

test('known flags are sliced into 14 waving columns', () => {
  const html = flagMarkup(origins.jett, 'pt');
  assert.equal((html.match(/--c:/g) || []).length, 14);
  assert.match(html, /flags\/kr\.svg/);
  assert.match(html, /aria-label="Coreia do Sul"/);
});

test('unknown origins show the "?" panel and never request an SVG', () => {
  const html = flagMarkup(origins.omen, 'en');
  assert.match(html, /flag-unknown/);
  assert.match(html, /data-q="\?"/);
  assert.match(html, /aria-label="Unknown"/);
  assert.doesNotMatch(html, /\.svg/);
  assert.match(flagBadge(origins.kayo), /flag-badge-q/);
  assert.match(flagBadge(origins.jett), /<img class="flag-badge"/);
});
