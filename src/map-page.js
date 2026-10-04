import { getAgents, getMaps } from './api/valorant.js';
import { slugify } from './slug.js';
import { mapInfo } from './data/maps.js';
import { mapStrings } from './map/strings.js';
import { overviewMarkup, minimapMarkup, setupMinimap, compsMarkup } from './map/panels.js';
import { tabFromHash, tabsMarkup, setupTabs } from './agent/tabs.js';
import { flagBadge } from './agent/flag.js';
import { setupParallax, setupKeyboard, leaveTo } from './agent-motion.js';
import comps from './data/comps.json' with { type: 'json' };

const TABS = ['visao', 'minimapa', 'comps'];
const app = document.querySelector('#agent-app');
const { map: slug } = document.body.dataset;
const info = mapInfo[slug];
const storage = { get: () => { try { return localStorage.getItem('lang'); } catch { return null; } }, set: (value) => { try { localStorage.setItem('lang', value); } catch { /* private mode */ } } };
let lang = storage.get() === 'en' ? 'en' : 'pt';
let maps = [];
let agentsByName = new Map();
let cleanups = [];

const link = (map) => `../${slugify(map.displayName)}/`;
const panel = (id, content) => `<section class="tab-panel" id="panel-${id}" role="tabpanel" aria-labelledby="tab-${id}" data-tab="${id}" tabindex="0" hidden>${content}</section>`;

function render() {
  cleanups.forEach((cleanup) => cleanup());
  cleanups = [];
  const t = mapStrings[lang];
  const index = maps.findIndex((item) => slugify(item.displayName) === slug);
  const map = maps[index];
  const prev = maps[(index - 1 + maps.length) % maps.length];
  const next = maps[(index + 1) % maps.length];

  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  document.querySelector('.skip-link').textContent = t.skip;

  app.innerHTML = `
  <div class="game">
    <aside class="game-menu">
      <a class="brand" href="../../" aria-label="Protocolo — ${t.home}"><span class="brand-mark" aria-hidden="true"></span><span class="brand-name">Protocolo</span></a>
      <div class="game-id">${flagBadge(info)}<p class="game-id-name">${map.displayName}</p><p class="game-id-role">${map.tacticalDescription ?? ''}</p></div>
      ${tabsMarkup(t, tabFromHash(location.hash, TABS), TABS)}
      <div class="game-foot">
        <div class="game-switch"><a href="${link(prev)}" data-nav aria-label="${t.prev}: ${prev.displayName}"><span aria-hidden="true">←</span> ${prev.displayName}</a><a href="${link(next)}" data-nav aria-label="${t.next}: ${next.displayName}">${next.displayName} <span aria-hidden="true">→</span></a></div>
        <div class="lang-switch" role="group" aria-label="Idioma / Language"><button type="button" data-lang="pt" aria-pressed="${lang === 'pt'}">PT</button><button type="button" data-lang="en" aria-pressed="${lang === 'en'}">EN</button></div>
        <p class="game-hint">${t.keys}</p>
        <p class="game-legal">${t.footer.join(' ')}</p>
      </div>
    </aside>
    <main class="game-screen" id="conteudo">
      ${panel('visao', overviewMarkup({ map, info, t, lang }))}
      ${panel('minimapa', minimapMarkup({ map, t }))}
      ${panel('comps', compsMarkup({ map, data: comps, agentsByName, t }))}
    </main>
  </div>`;

  const screen = app.querySelector('.game-screen');
  setupMinimap(app.querySelector('#panel-minimapa'));
  cleanups.push(setupTabs(app, () => { screen.scrollTop = 0; }, TABS));
  setupParallax(app.querySelector('.map-hero'));
  cleanups.push(setupKeyboard(link(prev), link(next)));
}

async function load() {
  const t = mapStrings[lang];
  app.innerHTML = `<p class="agent-status" role="status">${t.loading}</p>`;
  try {
    const [allMaps, agents] = await Promise.all([getMaps(t.api), getAgents(t.api)]);
    maps = allMaps.filter((map) => mapInfo[slugify(map.displayName)]);
    agentsByName = new Map(agents.map((agent) => [slugify(agent.displayName), agent]));
    if (!maps.some((map) => slugify(map.displayName) === slug)) throw new Error(t.error);
    render();
  } catch (error) {
    app.innerHTML = `<div class="agent-status" role="alert"><strong>${t.error}</strong><p>${error.message}</p><button type="button" id="retry">${t.retry}</button></div>`;
    document.querySelector('#retry').addEventListener('click', load);
  }
}

app.addEventListener('click', (event) => {
  const nav = event.target.closest('[data-nav]');
  if (nav && !event.ctrlKey && !event.metaKey && !event.shiftKey) { event.preventDefault(); leaveTo(nav.href); return; }
  const button = event.target.closest('[data-lang]');
  if (!button || button.dataset.lang === lang) return;
  lang = button.dataset.lang;
  storage.set(lang);
  load();
});

addEventListener('pageshow', () => document.body.classList.remove('is-leaving'));

load();
