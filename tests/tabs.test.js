import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { TABS, tabFromHash, tabsMarkup } from '../src/agent/tabs.js';
import { strings } from '../src/agent/strings.js';

test('a hash picks its tab; anything unknown falls back to the profile', () => {
  assert.equal(tabFromHash('#maestria'), 'maestria');
  assert.equal(tabFromHash('habilidades'), 'habilidades');
  assert.equal(tabFromHash('#xyz'), 'perfil');
  assert.equal(tabFromHash(''), 'perfil');
  assert.equal(tabFromHash(undefined), 'perfil');
});

test('the tab bar links every tab to its panel and marks only the current one', () => {
  const html = tabsMarkup(strings.en, 'habilidades');
  for (const id of TABS) {
    assert.match(html, new RegExp(`href="#${id}" aria-controls="panel-${id}"`));
  }
  assert.equal((html.match(/aria-selected="true"/g) || []).length, 1);
  assert.match(html, /id="tab-habilidades"[^>]*aria-selected="true"/);
  assert.ok(html.includes('<b>03</b><span>Abilities</span>'));
  assert.match(html, /aria-orientation="vertical"/);
});

test('every language has the same keys', () => {
  const keys = (object) => Object.keys(object).sort();
  assert.deepEqual(keys(strings.pt), keys(strings.en));
  assert.deepEqual(keys(strings.pt.mastery), keys(strings.en.mastery));
});

test('the giant name is sized to its content so it can be centered', () => {
  const css = fs.readFileSync(new URL('../src/agent/poster.css', import.meta.url), 'utf8');
  assert.match(css, /\.poster-name\{[^}]*width:max-content/);
});
