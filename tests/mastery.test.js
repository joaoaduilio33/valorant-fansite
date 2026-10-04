import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { getAgentRewards } from '../src/api/valorant.js';
import { masteryMarkup, rewardsMarkup, rewardsErrorMarkup } from '../src/agent/mastery-tab.js';
import { strings } from '../src/agent/strings.js';

const realFetch = globalThis.fetch;
const gear = { displayName: 'Jett Gear', content: { chapters: [{ levels: [
  { reward: { type: 'Title', uuid: 't1' }, doughCost: 2000 },
  { reward: { type: 'Spray', uuid: 's1' }, doughCost: 0 },
  { reward: { type: 'PlayerCard', uuid: 'c1' }, doughCost: 4000 },
  { reward: { type: 'EquippableCharmLevel', uuid: 'b1' }, doughCost: 4500 },
  { reward: { type: 'EquippableSkinLevel', uuid: 'k1' }, doughCost: 8000 },
] }] } };
const routes = {
  '/contracts': [gear],
  '/playertitles/t1': { displayName: 'Título Veloz', titleText: 'Veloz' },
  '/sprays/s1': { displayName: 'Spray Se Liga', fullTransparentIcon: 'spray.png', displayIcon: 'spray-small.png' },
  '/playercards/c1': { displayName: 'Card Jett de VALORANT', smallArt: 'card.png' },
  '/buddies/levels/b1': { displayName: 'Chaveiro Minifaca', displayIcon: 'buddy.png' },
  '/weapons/skinlevels/k1': { displayName: 'Sheriff Fim de Jogo', displayIcon: 'skin.png' },
};

function mockApi(table) {
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(url);
    const data = table[url.replace('https://valorant-api.com/v1', '').split('?')[0]];
    return { ok: data !== undefined, status: data === undefined ? 404 : 200, json: async () => ({ status: 200, data }) };
  };
  return calls;
}

afterEach(() => { globalThis.fetch = realFetch; });

test('resolves every reward type, keeps title text, and hides zero prices', async () => {
  const calls = mockApi(routes);
  const rewards = await getAgentRewards('Jett', 'en-US');
  assert.deepEqual(rewards.map((reward) => [reward.type, reward.name, reward.image, reward.price]), [
    ['Title', 'Título Veloz', null, 2000],
    ['Spray', 'Spray Se Liga', 'spray.png', null],
    ['PlayerCard', 'Card Jett de VALORANT', 'card.png', 4000],
    ['EquippableCharmLevel', 'Chaveiro Minifaca', 'buddy.png', 4500],
    ['EquippableSkinLevel', 'Sheriff Fim de Jogo', 'skin.png', 8000],
  ]);
  assert.equal(rewards[0].text, 'Veloz');
  assert.ok(calls.some((url) => url.includes('/sprays/s1?language=en-US')));
});

test('an agent without a reward contract rejects instead of showing a wrong track', async () => {
  mockApi({ ...routes, '/contracts': [] });
  await assert.rejects(getAgentRewards('Jett'), /Jett/);
});

test('an API failure rejects so the tab can offer a retry', async () => {
  mockApi({});
  await assert.rejects(getAgentRewards('Jett'), /404/);
});

test('reward cards show prices in the page locale and title text when there is no image', () => {
  const html = rewardsMarkup([
    { type: 'Title', name: 'Título Veloz', text: 'Veloz', image: null, price: 2000 },
    { type: 'Spray', name: 'Spray Se Liga', text: null, image: 'spray.png', price: null },
  ], strings.pt.mastery);
  assert.match(html, /2\.000 <abbr title="Kingdom Credits">KC<\/abbr>/);
  assert.equal((html.match(/reward-price/g) || []).length, 1);
  assert.match(html, /class="reward-title-text">Veloz</);
  assert.match(html, />Título</);
  assert.match(rewardsErrorMarkup(strings.pt.mastery), /class="reward-retry">Tentar novamente</);
});

test('the act track highlights levels 4, 7 and 10 and the card composite needs a card', () => {
  const agent = { displayName: 'Jett', fullPortraitV2: 'jett.png' };
  const html = masteryMarkup({ agent, card: 'abc', t: strings.pt });
  assert.equal((html.match(/is-accent/g) || []).length, 3);
  assert.match(html, /playercards\/abc\/largeart\.png/);
  assert.match(html, /aria-busy="true"/);
  assert.doesNotMatch(masteryMarkup({ agent, card: '', t: strings.pt }), /card-compose/);
});
