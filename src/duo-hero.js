import { pairs } from './data/pairs.js';
import { slugify } from './slug.js';
import { agentColor } from './color.js';

const pad = (value) => String(value).padStart(2, '0');

export function duoMarkup(t) {
  return `<section class="duo" id="duplas" aria-roledescription="${t.duo.carousel}" aria-labelledby="duo-heading" data-state="loading">
    <div class="section-heading">
      <div><p class="kicker">${t.duo.kicker}</p><h2 id="duo-heading">${t.duo.title}</h2></div>
      <div class="duo-controls">
        <button type="button" class="duo-prev" aria-label="${t.duo.prev}">←</button>
        <p class="duo-count" aria-live="polite"><b>—</b> / —</p>
        <button type="button" class="duo-next" aria-label="${t.duo.next}">→</button>
      </div>
    </div>
    <div class="duo-slide" id="duo-slide"><p class="duo-status">${t.duo.loading}</p></div>
  </section>`;
}

// Pairs whose agents exist in the API response, with the API objects attached.
export function resolvePairs(agents, list = pairs) {
  const bySlug = new Map(agents.map((agent) => [slugify(agent.displayName), agent]));
  return list.filter((pair) => pair.agents.every((slug) => bySlug.has(slug))).map((pair) => ({ ...pair, members: pair.agents.map((slug) => bySlug.get(slug)) }));
}

function slideMarkup(pair, lang) {
  const [a, b] = pair.members;
  const [slugA, slugB] = pair.agents;
  const art = pair.image
    ? `<img class="duo-img" src="${new URL(`./art/duos/${pair.image}`, import.meta.url).href}" alt="${a.displayName} e ${b.displayName}">`
    : `<img class="duo-portrait duo-portrait-a" src="${a.fullPortraitV2 || a.fullPortrait}" alt="${a.displayName}"><img class="duo-portrait duo-portrait-b" src="${b.fullPortraitV2 || b.fullPortrait}" alt="${b.displayName}">`;
  return `
    <div class="duo-stage">
      <div class="duo-block"><span class="duo-block-art" style="background-image:url('${a.background}')"></span></div>
      <p class="duo-names" aria-hidden="true">${a.displayName}<br>${b.displayName}</p>
      <span class="duo-bar duo-bar-a" aria-hidden="true">01</span>
      <span class="duo-bar duo-bar-b" aria-hidden="true">02</span>
      <div class="duo-art">${art}</div>
    </div>
    <div class="duo-copy">
      <p class="duo-relation">${pair.relation[lang]}</p>
      <h3 class="duo-title"><a href="agente/${slugA}/">${a.displayName}</a> <span aria-hidden="true">&amp;</span> <a href="agente/${slugB}/">${b.displayName}</a></h3>
      <dl class="duo-notes">
        <div><dt><span>01</span> ${a.displayName}</dt><dd>${pair.notes[slugA][lang]}</dd></div>
        <div><dt><span>02</span> ${b.displayName}</dt><dd>${pair.notes[slugB][lang]}</dd></div>
      </dl>
      ${pair.credit ? `<p class="duo-credit">${pair.credit.url ? `<a href="${pair.credit.url}" target="_blank" rel="noopener">${pair.credit.text}</a>` : pair.credit.text}</p>` : ''}
    </div>`;
}

export function initDuo({ lang = 'pt', t } = {}) {
  const section = document.querySelector('.duo');
  const slide = section.querySelector('#duo-slide');
  const count = section.querySelector('.duo-count');
  let list = [];
  let index = 0;

  function show(next) {
    index = (next + list.length) % list.length;
    const pair = list[index];
    const [a, b] = pair.members;
    section.style.setProperty('--a', agentColor(a));
    section.style.setProperty('--b', agentColor(b));
    slide.innerHTML = slideMarkup(pair, lang);
    count.innerHTML = `<b>${pad(index + 1)}</b> / ${pad(list.length)}`;
    section.classList.remove('is-entering');
    void section.offsetWidth; // restart the entrance animation
    section.classList.add('is-entering');
  }

  section.querySelector('.duo-prev').addEventListener('click', () => show(index - 1));
  section.querySelector('.duo-next').addEventListener('click', () => show(index + 1));
  section.addEventListener('keydown', (event) => {
    if (event.target.closest('input')) return;
    if (event.key === 'ArrowLeft') show(index - 1);
    if (event.key === 'ArrowRight') show(index + 1);
  });

  // Horizontal swipe on touch screens.
  let startX = null;
  section.addEventListener('pointerdown', (event) => { if (event.pointerType === 'touch') startX = event.clientX; });
  section.addEventListener('pointerup', (event) => {
    if (startX === null) return;
    const delta = event.clientX - startX;
    startX = null;
    if (Math.abs(delta) > 50) show(index + (delta < 0 ? 1 : -1));
  });

  return {
    setAgents(agents) {
      list = resolvePairs(agents);
      if (!list.length) { this.setError(); return; }
      section.dataset.state = 'ready';
      show(0);
    },
    setError() { section.dataset.state = 'error'; slide.innerHTML = `<p class="duo-status">${t.duo.error}</p>`; },
  };
}
