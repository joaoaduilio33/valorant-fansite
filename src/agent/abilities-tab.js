import { videoMarkup } from '../video.js';

export function kitPanel(ability, t) {
  return `<span class="kit-panel-key" aria-hidden="true">${ability.key}</span>
    <div class="kit-panel-icon">${ability.icon ? `<img src="${ability.icon}" alt="">` : ''}</div>
    <div class="kit-panel-copy"><p class="kit-panel-type">${ability.key} · ${t.slotType[ability.key]}</p><h3>${ability.name}</h3><p>${ability.description}</p></div>`;
}

export function abilitiesMarkup({ abilities, passive, t }) {
  return `<div class="kit">
    <h2 class="kit-title">${t.kitTitle}</h2>
    <div class="kit-body">
      <div class="kit-keys" role="tablist" aria-label="${t.kitNav}">
        ${abilities.map((ability, i) => `<button type="button" role="tab" class="kit-tile" id="kit-tab-${i}" aria-controls="kit-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-kit="${i}"><span class="kit-tile-key">${ability.key}</span>${ability.icon ? `<img src="${ability.icon}" alt="">` : '<span></span>'}<span class="kit-tile-name">${ability.name}</span></button>`).join('')}
      </div>
      <div class="kit-panel" id="kit-panel" role="tabpanel" aria-labelledby="kit-tab-0" aria-live="polite"><canvas class="kit-fx" aria-hidden="true"></canvas><div class="kit-panel-inner">${abilities[0] ? kitPanel(abilities[0], t) : ''}</div></div>
    </div>
    ${passive ? `<p class="kit-passive"><strong>${t.passive}: ${passive.displayName}.</strong> ${passive.description}</p>` : ''}
  </div>`;
}

// "Em ação" screen: the credited video inside a broadcast-style frame.
export function videoPanelMarkup({ agent, videoId, t, lang }) {
  const video = videoId ? videoMarkup(videoId, agent.displayName, lang) : '';
  return `<div class="broadcast" data-name="${agent.displayName}"><p class="broadcast-label"><span aria-hidden="true">●</span> ${t.video}</p>${video || `<p class="broadcast-empty">${t.noVideo}</p>`}</div>`;
}

export function setupAbilities(root, abilities, t, onPick) {
  const tiles = [...root.querySelectorAll('[data-kit]')];
  const panel = root.querySelector('#kit-panel');
  const inner = root.querySelector('.kit-panel-inner');
  if (!panel) return;
  const select = (i, focus = false) => {
    tiles.forEach((tile, n) => {
      tile.setAttribute('aria-selected', n === i);
      tile.tabIndex = n === i ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', `kit-tab-${i}`);
    inner.innerHTML = kitPanel(abilities[i], t);
    panel.classList.remove('is-switching');
    void panel.offsetWidth; // restart the cut transition
    panel.classList.add('is-switching');
    if (focus) tiles[i].focus();
    onPick(i, inner.querySelector('.kit-panel-icon'));
  };
  tiles.forEach((tile, i) => tile.addEventListener('click', () => select(i)));
  root.querySelector('.kit-keys').addEventListener('keydown', (event) => {
    const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (delta === undefined) return;
    event.preventDefault();
    event.stopPropagation(); // arrows here move between abilities, not between agents
    const current = tiles.findIndex((tile) => tile.getAttribute('aria-selected') === 'true');
    select((current + delta + tiles.length) % tiles.length, true);
  });
}
