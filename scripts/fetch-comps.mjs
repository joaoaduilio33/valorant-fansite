// Builds src/data/comps.json: the most played team compositions per map at the current top VCT events,
// read from vlr.gg's "Agents" tab of each event (one row per team per game, with win/loss).
// Run `npm run comps` to refresh while an event is ongoing.
import fs from 'node:fs';

const EVENTS = [
  { id: 2766, slug: 'valorant-champions-2026', name: 'VALORANT Champions 2026' },
  { id: 2977, slug: 'vct-2026-americas-stage-2', name: 'VCT 2026: Americas Stage 2' },
  { id: 2776, slug: 'vct-2026-pacific-stage-2', name: 'VCT 2026: Pacific Stage 2' },
  { id: 2976, slug: 'vct-2026-emea-stage-2', name: 'VCT 2026: EMEA Stage 2' },
];
const TOP = 4; // comps kept per map

const clean = (text) => text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

// One entry per team per game: { map, team, agents[], win }.
export function parseAgentsPage(html) {
  const games = [];
  for (const block of html.split('<div class="pr-matrix-map">').slice(1)) {
    const table = block.slice(0, block.indexOf('</table>'));
    const header = table.slice(0, table.indexOf('</tr>'));
    const map = clean(header.match(/<th[^>]*>([\s\S]*?)<\/th>/)[1]).replace(/^\S\s/, '');
    const agents = [...header.matchAll(/title="([^"]+)"/g)].map((match) => match[1]);
    let team = '';
    for (const row of table.split('<tr').slice(2)) {
      const cells = [...row.matchAll(/<td([^>]*)>([\s\S]*?)<\/td>/g)];
      if (!row.includes('mod-dropdown')) { team = clean(cells[0]?.[2] ?? ''); continue; }
      const result = cells[0][1];
      if (!/mod-(win|loss)/.test(result)) continue;
      const picks = cells.slice(2).map((cell, i) => (/mod-picked/.test(cell[1]) ? agents[i] : null)).filter(Boolean);
      if (picks.length === 5) games.push({ map, team, agents: picks, win: result.includes('mod-win') });
    }
  }
  return games;
}

// Group identical five-agent comps per map (most played first, then best win rate) and count how often
// each agent was picked on that map.
export function topComps(games, top = TOP) {
  const maps = {};
  const pickCounts = {};
  for (const game of games) {
    const key = [...game.agents].sort().join('|');
    const comps = (maps[game.map] ??= {});
    const comp = (comps[key] ??= { agents: [...game.agents].sort(), games: 0, wins: 0, teams: new Set() });
    comp.games += 1;
    comp.wins += game.win ? 1 : 0;
    comp.teams.add(game.team);
    const picks = (pickCounts[game.map] ??= {});
    for (const agent of game.agents) picks[agent] = (picks[agent] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(maps).map(([map, comps]) => {
    const played = Object.values(comps).reduce((sum, comp) => sum + comp.games, 0);
    const list = Object.values(comps)
      .sort((a, b) => b.games - a.games || b.wins / b.games - a.wins / a.games)
      .slice(0, top)
      .map((comp) => ({ agents: comp.agents, games: comp.games, wins: comp.wins, teams: [...comp.teams].sort() }));
    const agents = Object.entries(pickCounts[map]).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([agent, picks]) => ({ agent, picks }));
    return [map, { played, agents, comps: list }];
  }));
}

// Only fetch when run as a script, so tests can import the parsers.
if (process.argv[1]?.endsWith('fetch-comps.mjs')) {
  const games = [];
  for (const event of EVENTS) {
    const response = await fetch(`https://www.vlr.gg/event/agents/${event.id}/${event.slug}`, { headers: { 'User-Agent': 'Mozilla/5.0 (Protocolo VALORANT fansite)' } });
    if (!response.ok) throw new Error(`vlr.gg respondeu ${response.status} para ${event.name}`);
    const parsed = parseAgentsPage(await response.text());
    console.log(`${event.name}: ${parsed.length} composições de times`);
    games.push(...parsed);
  }
  const output = {
    updated: new Date().toLocaleDateString('sv'), // local YYYY-MM-DD
    source: 'vlr.gg',
    events: EVENTS.map((event) => ({ name: event.name, url: `https://www.vlr.gg/event/${event.id}/${event.slug}` })),
    maps: topComps(games),
  };
  fs.writeFileSync(new URL('../src/data/comps.json', import.meta.url), `${JSON.stringify(output, null, 2)}\n`);
  console.log(`Mapas: ${Object.keys(output.maps).join(', ')}`);
}
