import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const videos = JSON.parse(fs.readFileSync(new URL('../src/videos.json', import.meta.url)));
const source = fs.readFileSync(new URL('../src/video.js', import.meta.url), 'utf8').replace("import './video.css';", '').replace('export function', 'function');
function setup() {
  let click;
  const context = vm.createContext({ document: { addEventListener(type, callback) { click = callback; } } });
  vm.runInContext(source, context);
  return { render: context.videoMarkup, click };
}

test('every original agent has a matching embed URL in its page and catalog', () => {
  const pages = fs.readdirSync(new URL('../agentes/', import.meta.url)).filter((file) => file.endsWith('.html'));
  assert.equal(Object.keys(videos).length, pages.length);
  for (const file of pages) {
    const id = videos[file.replace('.html', '')];
    assert.match(id, /^[\w-]{11}$/);
    const page = fs.readFileSync(new URL(`../agentes/${file}`, import.meta.url), 'utf8');
    assert.ok(page.includes(`https://www.youtube.com/embed/${id}?playsinline=1`));
    assert.ok(page.includes('referrerpolicy="strict-origin-when-cross-origin"'));
    assert.ok(page.includes('../src/legacy-video.js'));
    assert.doesNotMatch(page, /<iframe[^>]+src="https:\/\/www.youtube.com\/watch/s);
  }
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
