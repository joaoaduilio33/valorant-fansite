import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { parseAgentsPage, topComps } from '../scripts/fetch-comps.mjs';
import { mapInfo, calloutPosition, regionKey } from '../src/data/maps.js';

const comps = JSON.parse(fs.readFileSync(new URL('../src/data/comps.json', import.meta.url)));

// A trimmed copy of vlr.gg's "Agents" tab: one map, one team, two games.
const header = ['Omen', 'Fade', 'Neon', 'Chamber', 'Sage', 'Viper'].map((name) => `<th><img src="x.png" title="${name}"></th>`).join('');
const cells = (picked) => ['Omen', 'Fade', 'Neon', 'Chamber', 'Sage', 'Viper'].map((name) => `<td class="${picked.includes(name) ? 'mod-picked-lite' : ''}"> </td>`).join('');
const fixture = `<div class="pr-matrix-map"><table class="wf-table">
  <tr><th><span class="map-pseudo-icon">S</span> Summit</th><th></th>${header}</tr>
  <tr class="pr-matrix-row"><td><a href="/team/1"><span class="text-of"> LOUD </span></a></td><td></td>${cells(['Omen', 'Fade', 'Neon', 'Chamber', 'Sage', 'Viper'])}</tr>
  <tr class="pr-matrix-row mod-dropdown 1x1"><td class="mod-win"><a>vs. NRG</a></td><td> </td>${cells(['Omen', 'Fade', 'Neon', 'Chamber', 'Sage'])}</tr>
  <tr class="pr-matrix-row mod-dropdown 1x1"><td class="mod-loss"><a>vs. G2</a></td><td> </td>${cells(['Omen', 'Fade', 'Neon', 'Chamber', 'Viper'])}</tr>
</table></div>`;

test('the vlr.gg parser reads one comp per team per game, with the result', () => {
  const games = parseAgentsPage(fixture);
  assert.deepEqual(games, [
    { map: 'Summit', team: 'LOUD', agents: ['Omen', 'Fade', 'Neon', 'Chamber', 'Sage'], win: true },
    { map: 'Summit', team: 'LOUD', agents: ['Omen', 'Fade', 'Neon', 'Chamber', 'Viper'], win: false },
  ]);
});

test('identical comps are grouped regardless of order, most played first', () => {
  const game = (agents, win, team = 'A') => ({ map: 'Haven', team, agents, win });
  const result = topComps([
    game(['Omen', 'Sova', 'Neon', 'Cypher', 'Phoenix'], true),
    game(['Sova', 'Omen', 'Phoenix', 'Neon', 'Cypher'], false, 'B'),
    game(['Omen', 'Sova', 'Neon', 'Killjoy', 'Yoru'], true),
  ]);
  assert.equal(result.Haven.played, 3);
  assert.deepEqual(result.Haven.comps[0], { agents: ['Cypher', 'Neon', 'Omen', 'Phoenix', 'Sova'], games: 2, wins: 1, teams: ['A', 'B'] });
  assert.deepEqual(result.Haven.agents.slice(0, 3).map((entry) => entry.picks), [3, 3, 3]);
});

test('callouts land inside the minimap', () => {
  const ascent = { xMultiplier: 0.00007, yMultiplier: -0.00007, xScalarToAdd: 0.813895, yScalarToAdd: 0.573242 };
  const { x, y } = calloutPosition(ascent, { x: 3980.9062, y: -5938.758 });
  assert.ok(Math.abs(x - 0.398) < 0.001 && Math.abs(y - 0.294) < 0.001);
  assert.equal(regionKey({ superRegion: 'ECalloutSuperRegion::AttackerSide' }), 'AttackerSide');
});

test('every map has a location in both languages and an existing flag', () => {
  for (const [slug, info] of Object.entries(mapInfo)) {
    assert.ok(info.place.pt && info.place.en, slug);
    if (info.flag) assert.ok(fs.existsSync(new URL(`../src/flags/${info.flag}.svg`, import.meta.url)), info.flag);
  }
});

test('the comps data only covers known maps and lists five agents per comp', () => {
  const names = Object.keys(mapInfo);
  for (const [map, entry] of Object.entries(comps.maps)) {
    assert.ok(names.includes(map.toLowerCase()), map);
    for (const comp of entry.comps) {
      assert.equal(comp.agents.length, 5);
      assert.ok(comp.wins <= comp.games);
    }
  }
});
