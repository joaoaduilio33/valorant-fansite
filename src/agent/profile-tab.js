import { pad } from './format.js';
import { flagBadge } from './flag.js';

export function profileMarkup({ agent, lore, origin, element, t, lang }) {
  const bio = lore ? lore.bio[lang] : [agent.description];
  const facts = [
    lore?.realName && [t.realName, lore.realName],
    origin && [t.origin, `${flagBadge(origin)} ${lore?.origin?.city ? `${lore.origin.city[lang]}, ` : ''}${origin.country[lang]}`],
    lore?.number && [t.number, pad(lore.number)],
    element && [t.element, element.label[lang]],
    lore?.scene && [t.scene, lore.scene.label[lang]],
  ].filter(Boolean);
  return `<div class="dossier">
    ${facts.length ? `<dl class="dossier-facts reveal">${facts.map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join('')}</dl>` : ''}
    <div class="dossier-bio reveal" style="--i:1"><h2>${t.bio}</h2>${bio.map((paragraph) => `<p>${paragraph}</p>`).join('')}${lore ? '' : `<p class="bio-soon">${t.soon}</p>`}</div>
  </div>`;
}
