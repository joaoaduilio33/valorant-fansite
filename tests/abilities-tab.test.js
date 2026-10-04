import test from 'node:test';
import assert from 'node:assert/strict';
import { abilitiesMarkup, kitPanel, videoPanelMarkup } from '../src/agent/abilities-tab.js';
import { strings } from '../src/agent/strings.js';

const abilities = [
  { key: 'C', name: 'Erupção das Brumas', description: 'Fumaça.', icon: 'c.png' },
  { key: 'X', name: 'Tormenta de Aço', description: 'Facas.', icon: null },
];
const agent = { displayName: 'Jett' };

test('ability tiles form a tablist with only the first selected', () => {
  const html = abilitiesMarkup({ abilities, passive: null, t: strings.pt });
  assert.match(html, /role="tablist" aria-label="Escolha uma habilidade"/);
  assert.equal((html.match(/class="kit-tile"/g) || []).length, 2);
  assert.equal((html.match(/aria-selected="true"/g) || []).length, 1);
  assert.match(html, /<canvas class="kit-fx"/);
  assert.doesNotMatch(html, /broadcast/, 'no video, no broadcast frame');
});

test('the panel shows the giant key, the slot type and the full description', () => {
  const html = kitPanel(abilities[1], strings.en);
  assert.match(html, /class="kit-panel-key" aria-hidden="true">X</);
  assert.match(html, /X · Ultimate/);
  assert.match(html, /Facas\./);
  assert.doesNotMatch(html, /<img/, 'no icon, no broken image');
});

test('the video screen uses the broadcast frame, or says there is no video yet', () => {
  const html = videoPanelMarkup({ agent, videoId: 'abcdefghijk', t: strings.pt, lang: 'pt' });
  assert.match(html, /class="broadcast" data-name="Jett"/);
  assert.ok(html.includes('Arquivo // Vídeo'));
  assert.match(html, /class="video-poster"/);
  assert.match(videoPanelMarkup({ agent, videoId: undefined, t: strings.en, lang: 'en' }), /No video for this agent yet\./);
});

test('the passive is listed under the abilities', () => {
  const html = abilitiesMarkup({ abilities, passive: { displayName: 'Deriva', description: 'Plana.' }, t: strings.pt });
  assert.match(html, /Passiva: Deriva\./);
});
