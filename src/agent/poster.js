import { sceneSvg } from '../art/places.js';
import { flagMarkup } from './flag.js';
import { pad } from './format.js';

const letters = (name) => [...name].map((char, i) => `<span style="--i:${i}">${char}</span>`).join('');

// Profile screen: the agent's name centered behind them, their flag waving beside them and a quiet,
// agent-specific background (a drawn city where one exists in src/art/places.js, their official name art otherwise).
export function posterMarkup({ agent, lore, origin, t, lang }) {
  const scene = lore?.scene ? sceneSvg(lore.scene.key, lore.scene.label[lang]) : '';
  const background = scene
    ? `<div class="poster-scene layer" style="--depth:6">${scene}</div>`
    : `<span class="poster-art layer" style="--depth:6;--art:url('${agent.background}')"></span>`;
  return `<section class="poster" aria-labelledby="agent-name" style="--len:${[...agent.displayName].length}">
    <div class="poster-bg" aria-hidden="true">${background}</div>
    ${flagMarkup(origin, lang)}
    <h1 class="poster-name layer" id="agent-name" style="--depth:14" aria-label="${agent.displayName}"><span aria-hidden="true">${letters(agent.displayName)}</span></h1>
    <canvas class="poster-fx" aria-hidden="true"></canvas>
    <img class="poster-portrait layer" style="--depth:22" src="${agent.fullPortraitV2 || agent.fullPortrait}" alt="${t.portrait(agent.displayName)}">
    <p class="poster-corner poster-who">${lore?.realName ?? agent.displayName}</p>
    ${origin ? `<p class="poster-corner poster-where"><span class="sr-only">${t.origin}: </span>${lore?.origin?.city ? `${lore.origin.city[lang]}, ` : ''}${origin.country[lang]}</p>` : ''}
    ${lore?.number ? `<p class="poster-number" title="${t.number} ${pad(lore.number)}"><span class="sr-only">${t.number} </span>${pad(lore.number)}</p>` : ''}
    <p class="poster-role"><span class="role-icon"><img src="${agent.role.displayIcon}" alt=""></span><span class="role-pill"><span class="sr-only">${t.role}: </span>${agent.role.displayName}</span></p>
  </section>`;
}
