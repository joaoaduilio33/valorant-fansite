import { getAgents, getMaps } from './api/valorant.js';
import { slugify } from './slug.js';
import { agentColor, vivid } from './color.js';
import { heroMarkup, initHero } from './home-hero.js';
import { duoMarkup, initDuo } from './duo-hero.js';
import { homeStrings } from './home-strings.js';
import { mapInfo } from './data/maps.js';

const ROLE_KEYS = ['Duelist', 'Controller', 'Initiator', 'Sentinel'];
const ROLE_PT = { Duelist: 'Duelista', Controller: 'Controlador', Initiator: 'Iniciador', Sentinel: 'Sentinela' };
// The Warden's art from valorant-api.com (weapon uuid 8db0a1bf…), shown in the patch section.
const WARDEN_ICON = 'https://media.valorant-api.com/weapons/8db0a1bf-4a50-832a-4566-faaaa6d250ca/displayicon.png';
const pad = (value) => String(value).padStart(2, '0');
const normalize = (value) => value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
// Role names arrive in the page language; match them against both English and Portuguese.
const roleKey = (roleName = '') => ROLE_KEYS.find((key) => [normalize(key), normalize(ROLE_PT[key])].includes(normalize(roleName)));
const storage = { get: () => { try { return localStorage.getItem('lang'); } catch { return null; } }, set: (value) => { try { localStorage.setItem('lang', value); } catch { /* private mode */ } } };

const app = document.querySelector('#app');
let lang = storage.get() === 'en' ? 'en' : 'pt';
let observers = [];

function langSwitch() {
  return `<div class="lang-switch" role="group" aria-label="Idioma / Language"><button type="button" data-lang="pt" aria-pressed="${lang === 'pt'}">PT</button><button type="button" data-lang="en" aria-pressed="${lang === 'en'}">EN</button></div>`;
}

function patchMarkup(t) {
  const p = t.patch;
  return `<section class="patch" id="patch" aria-labelledby="patch-title">
    <div class="section-heading">
      <div><p class="kicker">${p.kicker}</p><h2 id="patch-title">${p.title}</h2></div>
      <p class="patch-date">${p.date} · <a href="https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-13-06/" target="_blank" rel="noopener">${p.notes} ↗</a></p>
    </div>
    <div class="patch-grid">
      <article class="patch-card patch-mastery"><p class="patch-tag">${p.mastery.tag}</p><h3>${p.mastery.title}</h3><p>${p.mastery.text}</p>
        <ol class="patch-levels" aria-hidden="true">${Array.from({ length: 10 }, (_, i) => `<li class="${[4, 7, 10].includes(i + 1) ? 'is-accent' : ''}">${i + 1}</li>`).join('')}</ol>
        <a class="patch-link" href="agente/jett/#maestria">${p.mastery.link} →</a></article>
      <article class="patch-card patch-warden"><p class="patch-tag">${p.warden.tag}</p><h3>${p.warden.title}</h3><img src="${WARDEN_ICON}" alt="Warden" loading="lazy"><p>${p.warden.text}</p>
        <dl>${p.warden.stats.map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join('')}</dl></article>
      <article class="patch-card patch-gauntlet"><p class="patch-tag">${p.gauntlet.tag}</p><h3>${p.gauntlet.title}</h3><p>${p.gauntlet.text}</p><span class="patch-vs" aria-hidden="true">2v2</span></article>
      <article class="patch-card patch-more"><p class="patch-tag">${p.more.tag}</p><h3>${p.more.title}</h3><ul>${p.more.items.map((item) => `<li>${item}</li>`).join('')}</ul></article>
    </div>
  </section>`;
}

function mount() {
  observers.forEach((observer) => observer.disconnect());
  observers = [];
  const t = homeStrings[lang];
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  document.querySelector('.skip-link').textContent = t.skip;

  const navLinks = `<a href="#agentes">${t.nav.agents}</a><a href="#duplas">${t.nav.duos}</a><a href="#patch">${t.nav.patch}</a><a href="#mapas">${t.nav.maps}</a>`;
  const brand = `<a class="brand" href="#inicio" aria-label="Protocolo Valorant — ${t.home}"><span class="brand-mark" aria-hidden="true"></span><span class="brand-name">Protocolo</span></a>`;
  // The main navigation sits on the hero; a compact copy slides in once it scrolls away.
  const cardNav = `<header class="card-nav">${brand}<nav aria-label="${t.nav.main}">${navLinks}</nav>${langSwitch()}<a class="outline-action" href="#agentes">${t.cta}</a></header>`;
  const c = t.catalog;

  app.innerHTML = `
  <div class="site-bar" inert>${brand}<nav aria-label="${t.nav.quick}">${navLinks}</nav></div>
  <main id="conteudo">
    ${heroMarkup(cardNav, t)}
    ${duoMarkup(t)}
    ${patchMarkup(t)}
    <section class="catalog" id="agentes" aria-labelledby="catalog-title">
      <div class="section-heading">
        <div><p class="kicker">${c.kicker}</p><h2 id="catalog-title">${c.title}</h2></div>
        <p class="result-count" aria-live="polite"><strong id="agent-count">—</strong> ${c.count}</p>
      </div>
      <div class="controls" aria-label="${c.controls}">
        <label class="search-field"><span class="sr-only">${c.search}</span><span aria-hidden="true">⌕</span><input id="agent-search" type="search" placeholder="${c.search}" autocomplete="off"></label>
        <div class="role-filters" role="group" aria-label="${c.filters}">${['all', ...ROLE_KEYS].map((role) => `<button class="filter" type="button" data-role="${role}" aria-pressed="${role === 'all'}">${c.roles[role]}</button>`).join('')}</div>
      </div>
      <div class="agents-grid" id="agents-grid" aria-live="polite" aria-busy="true">${'<div class="agent-card skeleton" aria-hidden="true"></div>'.repeat(8)}</div>
      <div class="empty-state" id="empty-state" hidden><strong>${c.empty}</strong><span>${c.emptyHint}</span></div>
    </section>
    <section class="maps-section" id="mapas" aria-labelledby="maps-title">
      <div class="section-heading">
        <div><p class="kicker">${t.maps.kicker}</p><h2 id="maps-title">${t.maps.title}</h2></div>
        <p class="result-count"><strong id="map-count">—</strong> ${t.maps.count}</p>
      </div>
      <div class="maps-grid" id="maps-grid" aria-busy="true">${'<div class="map-card skeleton" aria-hidden="true"></div>'.repeat(3)}</div>
    </section>
  </main>
  <footer class="site-footer">${brand}<span>${t.footer}</span></footer>`;

  setupCatalog(t);
  setupNavigation();
}

function setupCatalog(t) {
  const grid = document.querySelector('#agents-grid');
  const count = document.querySelector('#agent-count');
  const search = document.querySelector('#agent-search');
  const emptyState = document.querySelector('#empty-state');
  const filters = [...document.querySelectorAll('.filter')];
  const hero = initHero();
  const duo = initDuo({ lang, t });
  let agents = [];
  let currentRole = 'all';

  // Cards show the agent's own colours and name art right away; the portrait fades in when it loads.
  const createAgentCard = (agent, index) => {
    const color = agentColor(agent);
    return `<a class="agent-card" href="agente/${slugify(agent.displayName)}/" style="--c:${color};--v:${vivid(color)};--len:${[...agent.displayName].length};--delay:${Math.min(index * 40, 400)}ms">
      <span class="agent-card-bg" style="background-image:url('${agent.background}')" aria-hidden="true"></span>
      <img class="agent-card-art" src="${agent.fullPortraitV2 || agent.fullPortrait || agent.displayIcon}" alt="" loading="lazy" decoding="async">
      <span class="agent-card-number" aria-hidden="true">${pad(index + 1)}</span>
      <span class="agent-card-info">
        <span class="agent-card-role">${agent.role?.displayIcon ? `<img src="${agent.role.displayIcon}" alt="">` : ''}${agent.role?.displayName ?? ''}</span>
        <strong class="agent-card-name">${agent.displayName}</strong>
        <span class="agent-card-cta">${t.catalog.cta} <span aria-hidden="true">→</span></span>
      </span>
    </a>`;
  };
  // `load` doesn't bubble, so listen in the capture phase; wait for decoding so the fade-in doesn't stutter.
  const reveal = (image) => (image.decode ? image.decode() : Promise.resolve()).catch(() => {}).then(() => image.classList.add('is-loaded'));
  const renderAgents = () => {
    const query = normalize(search.value.trim());
    const visible = agents.filter((agent) => (currentRole === 'all' || roleKey(agent.role?.displayName) === currentRole) && normalize(agent.displayName).includes(query));
    grid.innerHTML = visible.map(createAgentCard).join('');
    grid.querySelectorAll('.agent-card-art').forEach((image) => { if (image.complete && image.naturalWidth) reveal(image); });
    count.textContent = visible.length;
    emptyState.hidden = visible.length !== 0;
  };
  grid.addEventListener('load', (event) => { if (event.target.matches?.('.agent-card-art')) reveal(event.target); }, true);
  filters.forEach((button) => button.addEventListener('click', () => {
    currentRole = button.dataset.role;
    filters.forEach((item) => item.setAttribute('aria-pressed', item === button));
    renderAgents();
  }));
  search.addEventListener('input', renderAgents);

  const loadAgents = async () => {
    grid.setAttribute('aria-busy', 'true');
    emptyState.hidden = true;
    try {
      agents = await getAgents(t.api);
      renderAgents();
      hero.setAgents(agents);
      duo.setAgents(agents);
    } catch (error) {
      hero.setError();
      duo.setError();
      grid.innerHTML = `<div class="error-state"><strong>${t.catalog.error}</strong><p>${error.message}</p><button class="outline-action" id="retry" type="button">${t.catalog.retry}</button></div>`;
      count.textContent = '0';
      document.querySelector('#retry').addEventListener('click', loadAgents);
    } finally { grid.setAttribute('aria-busy', 'false'); }
  };

  // Only the standard maps get their own page; the competitive pool is flagged on the card.
  const loadMaps = async () => {
    const mapsGrid = document.querySelector('#maps-grid');
    mapsGrid.setAttribute('aria-busy', 'true');
    try {
      const maps = (await getMaps(t.api)).filter((map) => mapInfo[slugify(map.displayName)]);
      mapsGrid.innerHTML = maps.map((map, index) => {
        const info = mapInfo[slugify(map.displayName)];
        return `<a class="map-card" href="mapa/${slugify(map.displayName)}/" style="--delay:${Math.min(index * 50, 400)}ms"><img src="${map.splash}" alt="" loading="lazy">${info.pool ? `<span class="map-pool">${t.maps.pool}</span>` : ''}<div class="map-overlay"><span>${info.place[lang]}</span><h3>${map.displayName}</h3><p>${map.tacticalDescription ?? ''} · ${t.maps.cta} →</p></div></a>`;
      }).join('');
      document.querySelector('#map-count').textContent = maps.length;
    } catch (error) {
      mapsGrid.innerHTML = `<div class="error-state"><strong>${t.maps.error}</strong><p>${error.message}</p><button class="outline-action" id="retry-maps" type="button">${t.maps.retry}</button></div>`;
      document.querySelector('#retry-maps').addEventListener('click', loadMaps);
      document.querySelector('#map-count').textContent = '0';
    } finally { mapsGrid.setAttribute('aria-busy', 'false'); }
  };

  loadAgents();
  loadMaps();
}

function setupNavigation() {
  // Compact bar: visible (and focusable) only once the hero's own navigation is off-screen.
  const siteBar = document.querySelector('.site-bar');
  const barObserver = new IntersectionObserver(([entry]) => {
    siteBar.classList.toggle('is-visible', !entry.isIntersecting);
    siteBar.inert = entry.isIntersecting;
  });
  barObserver.observe(document.querySelector('.card-nav'));

  // Highlight the section in view in both navigations.
  const allNavLinks = [...document.querySelectorAll('.card-nav nav a, .site-bar nav a')];
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.find((entry) => entry.isIntersecting);
    if (!visible) return;
    allNavLinks.forEach((link) => {
      const active = link.hash === `#${visible.target.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  document.querySelectorAll('#duplas, #patch, #agentes, #mapas').forEach((section) => sectionObserver.observe(section));
  observers.push(barObserver, sectionObserver);
}

app.addEventListener('click', (event) => {
  const button = event.target.closest('[data-lang]');
  if (!button || button.dataset.lang === lang) return;
  lang = button.dataset.lang;
  storage.set(lang);
  mount();
});

mount();
