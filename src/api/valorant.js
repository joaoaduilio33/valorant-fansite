const API_BASE = 'https://valorant-api.com/v1';

async function request(path, { list = true } = {}) {
  const response = await fetch(`${API_BASE}${path}`, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`A API respondeu com o status ${response.status}.`);
  const payload = await response.json();
  const valid = list ? Array.isArray(payload.data) : payload.data && typeof payload.data === 'object';
  if (payload.status !== 200 || !valid) throw new Error('A API retornou dados inesperados.');
  return payload.data;
}

export async function getAgents(language = 'pt-BR') {
  const agents = await request(`/agents?language=${language}&isPlayableCharacter=true`);
  return agents.sort((a, b) => a.displayName.localeCompare(b.displayName, 'pt-BR'));
}

export async function getMaps(language = 'pt-BR') {
  const maps = await request(`/maps?language=${language}`);
  return maps.filter((map) => map.splash && map.displayIcon && !map.displayName.toLowerCase().includes('range')).sort((a, b) => a.displayName.localeCompare(b.displayName, 'pt-BR'));
}

// Each agent's reward track is the "<Agent> Gear" contract (patch 13.06 moved it under the
// lifetime mastery level). XP values in the contract belong to the old system and are ignored.
const REWARD_ENDPOINTS = { Title: 'playertitles', Spray: 'sprays', PlayerCard: 'playercards', EquippableCharmLevel: 'buddies/levels', EquippableSkinLevel: 'weapons/skinlevels' };
const REWARD_IMAGE = {
  Title: () => null,
  Spray: (item) => item.fullTransparentIcon || item.displayIcon,
  PlayerCard: (item) => item.smallArt || item.displayIcon,
  EquippableCharmLevel: (item) => item.displayIcon,
  EquippableSkinLevel: (item) => item.displayIcon,
};

export async function getAgentRewards(agentName, language = 'pt-BR') {
  const contracts = await request('/contracts');
  const contract = contracts.find((item) => item.displayName === `${agentName} Gear`);
  if (!contract) throw new Error(`Trilha de recompensas de ${agentName} não encontrada.`);
  const levels = contract.content.chapters.flatMap((chapter) => chapter.levels);
  return Promise.all(levels.map(async ({ reward, doughCost }) => {
    const endpoint = REWARD_ENDPOINTS[reward.type];
    const item = endpoint ? await request(`/${endpoint}/${reward.uuid}?language=${language}`, { list: false }) : null;
    return {
      type: reward.type,
      name: item?.displayName ?? reward.type,
      text: item?.titleText ?? null,
      image: item ? REWARD_IMAGE[reward.type](item) : null,
      price: doughCost > 0 ? doughCost : null,
    };
  }));
}
