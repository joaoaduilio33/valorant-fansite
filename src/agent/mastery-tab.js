import { getAgentRewards } from '../api/valorant.js';

const ACCENTS = [4, 7, 10]; // portrait accents unlock at these act levels (patch 13.06)

export function masteryMarkup({ agent, card, t }) {
  const m = t.mastery;
  const levels = Array.from({ length: 10 }, (_, i) => i + 1);
  return `<div class="mastery">
    <header class="mastery-head reveal"><p class="mastery-kicker">${m.kicker}</p><h2>${m.title}</h2><p>${m.intro}</p></header>
    <ol class="mastery-steps">${m.steps.map(([title, text], i) => `<li class="reveal" style="--i:${i}"><b>${String(i + 1).padStart(2, '0')}</b><h3>${title}</h3><p>${text}</p></li>`).join('')}</ol>
    <section class="mastery-block reveal" aria-labelledby="act-title">
      <h3 id="act-title">${m.actTitle}</h3><p>${m.actText}</p>
      <ol class="act-track">${levels.map((level) => `<li class="${ACCENTS.includes(level) ? 'is-accent' : ''}" style="--i:${level}"><span>${level}</span>${ACCENTS.includes(level) ? `<small>${m.accent}</small>` : ''}</li>`).join('')}<li class="act-over" style="--i:11"><span>+</span><small>${m.over}</small></li></ol>
    </section>
    <section class="mastery-block reveal" aria-labelledby="life-title"><h3 id="life-title">${m.lifeTitle}</h3><p>${m.lifeText}</p></section>
    <section class="mastery-block" aria-labelledby="rewards-title">
      <h3 id="rewards-title">${m.rewardsTitle}</h3>
      <div class="reward-grid" aria-busy="true">${'<div class="reward skeleton" aria-hidden="true"></div>'.repeat(10)}</div>
      <p class="reward-note">${m.rewardsNote}</p>
    </section>
    <section class="mastery-block mastery-card reveal" aria-labelledby="id-title">
      ${card ? `<figure><div class="card-compose"><img class="card-frame" src="https://media.valorant-api.com/playercards/${card}/largeart.png" alt=""><div class="card-window"><img class="card-portrait" src="${agent.fullPortraitV2 || agent.fullPortrait}" alt="${m.cardAlt(agent.displayName)}"></div></div><figcaption>${m.cardCaption}</figcaption></figure>` : ''}
      <div><h3 id="id-title">${m.idTitle}</h3><p>${m.idText}</p></div>
    </section>
  </div>`;
}

export function rewardsMarkup(rewards, m) {
  return rewards.map((reward, i) => `<article class="reward" style="--i:${i}">
    <div class="reward-art">${reward.image ? `<img src="${reward.image}" alt="" loading="lazy">` : `<span class="reward-title-text">${reward.text ?? reward.name}</span>`}</div>
    <p class="reward-type">${m.types[reward.type] ?? reward.type}</p>
    <h4>${reward.name}</h4>
    ${reward.price ? `<p class="reward-price">${reward.price.toLocaleString(m.locale)} <abbr title="Kingdom Credits">KC</abbr></p>` : ''}
  </article>`).join('');
}

export function rewardsErrorMarkup(m) {
  return `<div class="reward-error" role="alert"><p>${m.rewardsError}</p><button type="button" class="reward-retry">${m.retry}</button></div>`;
}

// Only the track depends on extra requests; if they fail, the rest of the tab stays.
export async function loadRewards(panel, agent, t) {
  const grid = panel.querySelector('.reward-grid');
  grid.setAttribute('aria-busy', 'true');
  try {
    grid.innerHTML = rewardsMarkup(await getAgentRewards(agent.displayName, t.api), t.mastery);
  } catch {
    grid.innerHTML = rewardsErrorMarkup(t.mastery);
    grid.querySelector('.reward-retry').addEventListener('click', () => loadRewards(panel, agent, t));
  } finally {
    grid.setAttribute('aria-busy', 'false');
  }
}
