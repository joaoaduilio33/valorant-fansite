import { getAgents } from './api/valorant.js';
import { orderedAbilities } from './abilities.js';
import { slugify } from './slug.js';
import { agentColor, vivid } from './color.js';
import { agentLore } from './data/agents.js';
import { origins } from './data/origins.js';
import { elements } from './data/elements.js';
import { strings } from './agent/strings.js';
import { posterMarkup } from './agent/poster.js';
import { tabFromHash, tabsMarkup, setupTabs } from './agent/tabs.js';
import { flagBadge, startNoise } from './agent/flag.js';
import { profileMarkup } from './agent/profile-tab.js';
import { abilitiesMarkup, videoPanelMarkup, setupAbilities } from './agent/abilities-tab.js';
import { masteryMarkup, loadRewards } from './agent/mastery-tab.js';
import { createParticles } from './effects/particles.js';
import { setupParallax, setupReveal, setupKeyboard, leaveTo } from './agent-motion.js';
import videos from './videos.json' with { type: 'json' };

const app = document.querySelector('#agent-app');
const { agent: slug, card } = document.body.dataset;
const lore = agentLore[slug];
const origin = origins[slug];
const element = elements[slug];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const storage = { get: () => { try { return localStorage.getItem('lang'); } catch { return null; } }, set: (value) => { try { localStorage.setItem('lang', value); } catch { /* private mode */ } } };
let lang = storage.get() === 'en' ? 'en' : 'pt';
let agents = [];
let cleanups = [];

const link = (agent) => `../${slugify(agent.displayName)}/`;
const panel = (id, content) => `<section class="tab-panel" id="panel-${id}" role="tabpanel" aria-labelledby="tab-${id}" data-tab="${id}" tabindex="0" hidden>${content}</section>`;

// Particle burst centered on an element, in the canvas' own coordinates.
function burstFrom(fx, canvas, target) {
  if (!fx || !target) return;
  const area = canvas.getBoundingClientRect();
  const box = target.getBoundingClientRect();
  fx.burst(box.left + box.width / 2 - area.left, box.top + box.height / 2 - area.top);
}

function render() {
  cleanups.forEach((cleanup) => cleanup());
  cleanups = [];
  const t = strings[lang];
  const index = agents.findIndex((item) => slugify(item.displayName) === slug);
  const agent = agents[index];
  const prev = agents[(index - 1 + agents.length) % agents.length];
  const next = agents[(index + 1) % agents.length];
  const abilities = orderedAbilities(agent);
  const passive = agent.abilities.find((ability) => ability.slot === 'Passive' && ability.displayName);

  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  document.querySelector('.skip-link').textContent = t.skip;
  document.body.style.setProperty('--agent-v', vivid(agentColor(agent)));

  // Game-style screen: a numbered menu on the left, one section at a time on the right.
  app.innerHTML = `
  <div class="game">
    <aside class="game-menu">
      <a class="brand" href="../../" aria-label="Protocolo — ${t.home}"><span class="brand-mark" aria-hidden="true"></span><span class="brand-name">Protocolo</span></a>
      <div class="game-id">${flagBadge(origin)}<p class="game-id-name">${agent.displayName}</p><p class="game-id-role"><img src="${agent.role.displayIcon}" alt="">${agent.role.displayName}</p></div>
      ${tabsMarkup(t, tabFromHash(location.hash))}
      <div class="game-foot">
        <div class="game-switch"><a href="${link(prev)}" data-nav aria-label="${t.prev}: ${prev.displayName}"><span aria-hidden="true">←</span> ${prev.displayName}</a><a href="${link(next)}" data-nav aria-label="${t.next}: ${next.displayName}">${next.displayName} <span aria-hidden="true">→</span></a></div>
        <div class="lang-switch" role="group" aria-label="Idioma / Language"><button type="button" data-lang="pt" aria-pressed="${lang === 'pt'}">PT</button><button type="button" data-lang="en" aria-pressed="${lang === 'en'}">EN</button></div>
        <p class="game-hint">${t.keys}</p>
        <p class="game-legal">${t.footer.join(' ')}</p>
      </div>
    </aside>
    <main class="game-screen" id="conteudo">
      ${panel('perfil', posterMarkup({ agent, lore, origin, t, lang }))}
      ${panel('biografia', profileMarkup({ agent, lore, origin, element, t, lang }))}
      ${panel('habilidades', abilitiesMarkup({ abilities, passive, t }))}
      ${panel('video', videoPanelMarkup({ agent, videoId: videos[slug], t, lang }))}
      ${panel('maestria', masteryMarkup({ agent, card, t }))}
    </main>
  </div>`;

  const poster = app.querySelector('.poster');
  const screen = app.querySelector('.game-screen');
  const fxCanvas = poster.querySelector('.poster-fx');
  const fx = element ? createParticles(fxCanvas, element.preset, { reducedMotion }) : null;
  if (fx) {
    cleanups.push(() => fx.destroy());
    poster.addEventListener('pointermove', (event) => {
      const box = fxCanvas.getBoundingClientRect();
      fx.setPointer({ x: event.clientX - box.left, y: event.clientY - box.top });
    });
    poster.addEventListener('pointerleave', () => fx.setPointer(null));
  }

  const kitCanvas = app.querySelector('.kit-fx');
  const kitFx = element && kitCanvas ? createParticles(kitCanvas, element.preset, { reducedMotion, ambient: false }) : null;
  if (kitFx) cleanups.push(() => kitFx.destroy());
  setupAbilities(app.querySelector('#panel-habilidades'), abilities, t, (i, icon) => burstFrom(kitFx, kitCanvas, icon));

  const noise = poster.querySelector('.flag-noise');
  if (noise) cleanups.push(startNoise(noise, reducedMotion));

  let rewardsRequested = false;
  cleanups.push(setupTabs(app, (id) => {
    screen.scrollTop = 0;
    if (id !== 'maestria' || rewardsRequested) return;
    rewardsRequested = true;
    loadRewards(app.querySelector('#panel-maestria'), agent, t);
  }));

  setupParallax(poster);
  setupReveal(app);
  cleanups.push(setupKeyboard(link(prev), link(next)));
}

async function load() {
  app.innerHTML = `<p class="agent-status" role="status">${strings[lang].loading}</p>`;
  try {
    agents = await getAgents(strings[lang].api);
    if (!agents.some((item) => slugify(item.displayName) === slug)) throw new Error(strings[lang].error);
    render();
  } catch (error) {
    app.innerHTML = `<div class="agent-status" role="alert"><strong>${strings[lang].error}</strong><p>${error.message}</p><button type="button" id="retry">${strings[lang].retry}</button></div>`;
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

// Coming back through the browser's back button restores a faded page from cache.
addEventListener('pageshow', () => document.body.classList.remove('is-leaving'));

load();
