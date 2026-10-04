// Home hero (reference: "PLAY VALORANT" poster, same idea as SKY.OS): the official VALORANT wordmark
// crosses the whole screen and two agents stand in front of it, covering its middle. The pair and their
// positions are drawn at random on every visit and on "Trocar agentes".
// Wordmark: Wikimedia Commons "Valorant logo.svg" (public-domain text logo; VALORANT is a Riot Games trademark).

// Pairs of positions for the two agents: horizontal center (%) and height (%) of the hero.
export const LAYOUTS = [
  [{ x: 43, h: 68 }, { x: 58, h: 64 }],
  [{ x: 41, h: 64 }, { x: 57, h: 70 }],
  [{ x: 45, h: 70 }, { x: 60, h: 63 }],
  [{ x: 42, h: 66 }, { x: 59, h: 68 }],
];

// `count` different agents, in random order (Fisher–Yates on a copy).
export function pickAgents(agents, count = 2, rand = Math.random) {
  const pool = [...agents];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

export function pickLayout(rand = Math.random) {
  return { slots: LAYOUTS[Math.floor(rand() * LAYOUTS.length)], flips: [rand() < 0.5, rand() < 0.5] };
}

const WORDMARK = new URL('./art/valorant-wordmark.svg', import.meta.url).href;

export function heroMarkup(nav, t) {
  return `<section class="hero" id="inicio" aria-labelledby="hero-title" data-state="loading">
    ${nav}
    <div class="hero-title layer"><h1 id="hero-title"><span class="hero-kicker">${t.hero.kicker}</span> <img class="wordmark" src="${WORDMARK}" alt="VALORANT"></h1><p class="sr-only">${t.hero.sr}</p></div>
    <div class="hero-agents layer" aria-hidden="true"><img class="hero-agent" alt=""><img class="hero-agent" alt=""></div>
    <button type="button" class="hero-shuffle">${t.hero.shuffle} <span aria-hidden="true">↻</span></button>
  </section>`;
}

const preload = (urls) => Promise.race([
  Promise.all(urls.map((url) => new Promise((resolve) => { const image = new Image(); image.onload = image.onerror = resolve; image.src = url; }))),
  new Promise((resolve) => setTimeout(resolve, 2500)),
]);
const portrait = (agent) => agent.fullPortraitV2 || agent.fullPortrait;

export function initHero() {
  const section = document.querySelector('.hero');
  const images = [...section.querySelectorAll('.hero-agent')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let agents = [];
  let busy = false;

  function apply(pair, layout) {
    pair.forEach((agent, i) => {
      images[i].src = portrait(agent);
      images[i].style.setProperty('--x', `${layout.slots[i].x}%`);
      images[i].style.setProperty('--h', `${layout.slots[i].h}%`);
      images[i].classList.toggle('is-flipped', layout.flips[i]);
    });
  }

  async function shuffle() {
    if (busy || agents.length < 2) return;
    busy = true;
    const pair = pickAgents(agents);
    const ready = preload(pair.map(portrait));
    if (!reducedMotion) {
      section.classList.add('is-swapping');
      await new Promise((resolve) => setTimeout(resolve, 350));
    }
    await ready;
    apply(pair, pickLayout());
    section.classList.remove('is-swapping');
    busy = false;
  }

  section.querySelector('.hero-shuffle').addEventListener('click', shuffle);

  // Gentle depth on mouse move: the agents and the title drift in opposite directions.
  if (!reducedMotion && matchMedia('(pointer: fine)').matches) {
    section.addEventListener('pointermove', (event) => {
      const box = section.getBoundingClientRect();
      section.style.setProperty('--px', (((event.clientX - box.left) / box.width) * 2 - 1).toFixed(3));
      section.style.setProperty('--py', (((event.clientY - box.top) / box.height) * 2 - 1).toFixed(3));
    });
    section.addEventListener('pointerleave', () => { section.style.setProperty('--px', 0); section.style.setProperty('--py', 0); });
  }

  return {
    async setAgents(list) {
      agents = list;
      const pair = pickAgents(list);
      await preload(pair.map(portrait));
      apply(pair, pickLayout());
      section.dataset.state = 'ready';
      // The entrance animation is done after ~1.6s; from then on swaps use transitions.
      setTimeout(() => section.classList.add('is-ready'), reducedMotion ? 0 : 1700);
    },
    setError() { section.dataset.state = 'error'; },
  };
}
