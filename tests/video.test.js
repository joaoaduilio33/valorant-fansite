import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const videos = JSON.parse(fs.readFileSync(new URL('../src/videos.json', import.meta.url)));
const videoCredits = JSON.parse(fs.readFileSync(new URL('../src/video-credits.json', import.meta.url)));
const source = fs.readFileSync(new URL('../src/video.js', import.meta.url), 'utf8').replace(/^import .*;$/gm, '').replace('export function', 'function');
function setup() {
  let click;
  const context = vm.createContext({ videoCredits, document: { addEventListener(type, callback) { click = callback; } } });
  vm.runInContext(source, context);
  return { render: context.videoMarkup, click };
}

test('every video belongs to a generated agent page and has a credit', () => {
  for (const [slug, id] of Object.entries(videos)) {
    assert.match(id, /^[\w-]{11}$/);
    assert.ok(fs.existsSync(new URL(`../agente/${slug}/index.html`, import.meta.url)), `missing page for ${slug}`);
    assert.ok(videoCredits[id], `missing credit for ${slug}`);
  }
});

test('video copy follows the page language', () => {
  const { render } = setup();
  assert.ok(render(videos.jett, 'Jett', 'en').includes('Watch on YouTube'));
  assert.ok(render(videos.jett, 'Jett').includes('Assistir no YouTube'));
});

test('Jett uses an embed player plus an independent YouTube fallback', () => {
  const { render } = setup();
  const html = render(videos.jett, 'Jett');
  assert.ok(html.includes(`/embed/${videos.jett}?playsinline=1`));
  assert.ok(html.includes(`href="https://www.youtube.com/watch?v=${videos.jett}"`));
  assert.ok(html.includes('referrerpolicy="strict-origin-when-cross-origin"'));
  assert.ok(html.includes('Recarregar vídeo'));
  assert.equal(render('invalid'), '');
  assert.ok(render(videos.jett, '"<Jett>').includes('&quot;&lt;Jett&gt;'));
});

test('retry recreates only the clicked player', () => {
  const { click } = setup();
  const clone = {};
  let replacement;
  const frame = { cloneNode: () => clone, replaceWith: (value) => { replacement = value; } };
  const button = { closest: () => ({ querySelector: () => frame }) };
  click({ target: { closest: () => button } });
  assert.equal(replacement, clone);
  assert.doesNotThrow(() => click({ target: { closest: () => null } }));
});

test('the player only loads after a click on the thumbnail', () => {
  const { render, click } = setup();
  const html = render(videos.jett, 'Jett', 'en');
  assert.match(html, /class="video-poster"/);
  assert.match(html, new RegExp(`i\.ytimg\.com/vi/${videos.jett}/hqdefault\.jpg`));
  assert.match(html, /<template><iframe/);
  assert.match(html, /aria-label="Play the video of Jett"/);

  const content = {};
  let replaced;
  const poster = { replaceWith: (value) => { replaced = value; } };
  const video = { querySelector: (selector) => ({ '.video-poster': poster, template: { content: { cloneNode: () => content } }, iframe: null })[selector] };
  click({ target: { closest: (selector) => (selector === '.video-poster' ? { closest: () => video } : null) } });
  assert.equal(replaced, content);
});

test('"reload" before the video was ever played loads it instead of crashing', () => {
  const { click } = setup();
  const content = {};
  let replaced;
  const poster = { replaceWith: (value) => { replaced = value; } };
  const video = { querySelector: (selector) => ({ '.video-poster': poster, template: { content: { cloneNode: () => content } }, iframe: null })[selector] };
  const retry = { closest: () => video };
  assert.doesNotThrow(() => click({ target: { closest: (selector) => (selector === '.video-retry' ? retry : null) } }));
  assert.equal(replaced, content);
});
