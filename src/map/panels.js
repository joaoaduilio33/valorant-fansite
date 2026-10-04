import { calloutPosition, regionKey } from '../data/maps.js';
import { slugify } from '../slug.js';
import { flagBadge } from '../agent/flag.js';

const pct = (part, total) => (total ? Math.round((part / total) * 100) : 0);

// Overview: the splash art framed like the agent profile, name dead center.
export function overviewMarkup({ map, info, t, lang }) {
  return `<section class="map-hero" aria-labelledby="map-name" style="--len:${[...map.displayName].length};--splash:url('${map.splash}')">
    <div class="map-hero-art layer" style="--depth:8" aria-hidden="true"></div>
    <h1 class="map-hero-name" id="map-name">${map.displayName}</h1>
    <p class="map-corner map-place">${flagBadge(info)}<span><span class="sr-only">${t.location}: </span>${info.place[lang]}</span></p>
    ${map.coordinates ? `<p class="map-corner map-coords"><span class="sr-only">${t.coordinates}: </span>${map.coordinates}</p>` : ''}
    <p class="map-corner map-sites"><span class="sr-only">${t.sites}: </span>${map.tacticalDescription ?? ''}</p>
    <p class="map-corner map-pool ${info.pool ? 'is-in' : ''}">${info.pool ? t.pool : t.outPool}</p>
  </section>`;
}

// Minimap with every callout placed by the API's world→minimap formula, plus a filterable list.
export function minimapMarkup({ map, t }) {
  const callouts = (map.callouts ?? []).map((callout, i) => {
    const { x, y } = calloutPosition(map, callout.location);
    const region = regionKey(callout);
    const label = ['A', 'B', 'C'].includes(region) ? `${region} ${callout.regionName}` : callout.regionName;
    return { i, x, y, region, label };
  }).filter((callout) => callout.x >= 0 && callout.x <= 1 && callout.y >= 0 && callout.y <= 1);
  const regions = ['All', ...['A', 'B', 'C', 'Mid', 'AttackerSide', 'DefenderSide'].filter((key) => callouts.some((c) => c.region === key))];
  return `<div class="minimap">
    <header class="map-panel-head"><h2>${t.minimapTitle}</h2><p>${t.minimapIntro}</p></header>
    <div class="minimap-body">
      <figure class="minimap-figure">
        <img src="${map.displayIcon}" alt="${t.minimapTitle} ${map.displayName}">
        ${callouts.map((c) => `<span class="callout" data-callout="${c.i}" data-region="${c.region}" style="left:${(c.x * 100).toFixed(2)}%;top:${(c.y * 100).toFixed(2)}%">${c.label}</span>`).join('')}
      </figure>
      <div class="minimap-side">
        <div class="region-filters" role="group" aria-label="${t.regions.All}">${regions.map((key) => `<button type="button" data-region="${key}" aria-pressed="${key === 'All'}">${t.regions[key]}</button>`).join('')}</div>
        <ul class="callout-list">${callouts.map((c) => `<li><button type="button" data-callout="${c.i}" data-region="${c.region}">${c.label}</button></li>`).join('')}</ul>
      </div>
    </div>
  </div>`;
}

export function setupMinimap(root) {
  const figure = root.querySelector('.minimap-figure');
  if (!figure) return;
  const setRegion = (region) => {
    root.querySelectorAll('.region-filters button').forEach((button) => button.setAttribute('aria-pressed', button.dataset.region === region));
    root.querySelectorAll('[data-callout]').forEach((item) => { item.hidden = region !== 'All' && item.dataset.region !== region; });
  };
  root.querySelector('.region-filters').addEventListener('click', (event) => {
    const button = event.target.closest('[data-region]');
    if (button) setRegion(button.dataset.region);
  });
  const highlight = (id) => figure.querySelectorAll('.callout').forEach((label) => label.classList.toggle('is-active', label.dataset.callout === id));
  const list = root.querySelector('.callout-list');
  ['pointerover', 'focusin'].forEach((type) => list.addEventListener(type, (event) => highlight(event.target.closest('[data-callout]')?.dataset.callout)));
  list.addEventListener('pointerleave', () => highlight(null));
}

// Team comps from src/data/comps.json (vlr.gg), with agent portraits from the API.
export function compsMarkup({ map, data, agentsByName, t }) {
  const entry = data.maps[map.displayName];
  const head = `<header class="map-panel-head"><h2>${t.compsTitle}</h2><p>${t.compsIntro(data.events.map((event) => event.name).join(', '), new Date(`${data.updated}T12:00:00`).toLocaleDateString(t.locale, { day: 'numeric', month: 'long', year: 'numeric' }))}</p></header>`;
  if (!entry) return `<div class="comps">${head}<p class="comps-empty">${t.noComps}</p></div>`;
  const agentChip = (name) => {
    const agent = agentsByName.get(slugify(name));
    return `<a class="comp-agent" href="../../agente/${slugify(name)}/" title="${agent?.displayName ?? name}">${agent ? `<img src="${agent.displayIcon}" alt="">` : ''}<span>${agent?.displayName ?? name}</span></a>`;
  };
  return `<div class="comps">
    ${head}
    <section class="top-agents" aria-label="${t.topAgents}"><h3>${t.topAgents}</h3>
      <ol>${entry.agents.map(({ agent, picks }) => `<li>${agentChip(agent)}<span class="top-agent-bar" style="--p:${pct(picks, entry.played)}%"><b>${pct(picks, entry.played)}%</b></span></li>`).join('')}</ol>
    </section>
    <ol class="comp-list">${entry.comps.map((comp, i) => `<li class="comp" style="--i:${i}">
      <span class="comp-rank">${String(i + 1).padStart(2, '0')}</span>
      <div class="comp-agents">${comp.agents.map(agentChip).join('')}</div>
      <div class="comp-stats"><p><b>${t.picked(comp.games)}</b></p><p class="comp-win"><span style="--p:${pct(comp.wins, comp.games)}%"></span>${pct(comp.wins, comp.games)}% ${t.wins}</p></div>
      <p class="comp-teams"><span>${t.teams}:</span> ${comp.teams.join(', ')}</p>
    </li>`).join('')}</ol>
    <p class="comps-source"><a href="${data.events[0].url}" target="_blank" rel="noopener">${t.source} ↗</a></p>
  </div>`;
}
