import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { pairs } from '../src/data/pairs.js';
import { resolvePairs } from '../src/duo-hero.js';
import { hexToHsl, vivid, agentColor } from '../src/color.js';
import { orderedAbilities } from '../src/abilities.js';

const pages = fs.readdirSync(new URL('../agente/', import.meta.url));

test('every duo links two real agent pages and has notes in both languages', () => {
  for (const pair of pairs) {
    assert.equal(pair.agents.length, 2);
    assert.ok(pair.relation.pt && pair.relation.en);
    for (const slug of pair.agents) {
      assert.ok(pages.includes(slug), `no page for ${slug}`);
      assert.ok(pair.notes[slug]?.pt && pair.notes[slug]?.en, `missing note for ${slug}`);
    }
    if (pair.image) {
      assert.ok(pair.credit?.text, 'custom art needs a credit');
      assert.ok(fs.existsSync(new URL(`../src/art/duos/${pair.image}`, import.meta.url)), `missing ${pair.image}`);
    }
  }
});

test('duos skip agents missing from the API response', () => {
  const agents = [{ displayName: 'Raze' }, { displayName: 'Killjoy' }];
  const list = resolvePairs(agents, pairs);
  assert.equal(list.length, 1);
  assert.deepEqual(list[0].members.map((agent) => agent.displayName), ['Raze', 'Killjoy']);
});

test('vivid keeps the hue but brightens dark API colours', () => {
  const [hue] = hexToHsl('#742e1e');
  assert.match(vivid('#742e1e'), new RegExp(`^hsl\\(${Math.round(hue)} \\d+% 58%\\)$`));
  assert.equal(agentColor({ backgroundGradientColors: ['25607aff'] }), '#25607a');
  assert.equal(agentColor({}), '#ff4655');
});

test('abilities come out in C, Q, E, X order without passives', () => {
  const ability = (slot) => ({ slot, displayName: slot, description: '', displayIcon: null });
  const agent = { abilities: ['Ultimate', 'Passive', 'Ability2', 'Grenade', 'Ability1'].map(ability) };
  assert.deepEqual(orderedAbilities(agent).map((item) => item.key), ['C', 'Q', 'E', 'X']);
});

test('the hero draws two different agents and a valid layout', async () => {
  const { pickAgents, pickLayout, LAYOUTS } = await import('../src/home-hero.js');
  const agents = ['Jett', 'Raze', 'Sage', 'Omen', 'Viper'].map((displayName) => ({ displayName }));
  for (let run = 0; run < 50; run += 1) {
    const pair = pickAgents(agents);
    assert.equal(new Set(pair).size, 2);
    const layout = pickLayout();
    assert.ok(LAYOUTS.includes(layout.slots));
    assert.equal(layout.flips.length, 2);
  }
  assert.equal(agents.length, 5, 'the original list is not shuffled in place');
});
