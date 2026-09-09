const API_BASE = 'https://valorant-api.com/v1';

async function request(path) {
  const response = await fetch(`${API_BASE}${path}`, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`A API respondeu com o status ${response.status}.`);
  const payload = await response.json();
  if (payload.status !== 200 || !Array.isArray(payload.data)) throw new Error('A API retornou dados inesperados.');
  return payload.data;
}

export async function getAgents() {
  const agents = await request('/agents?language=pt-BR&isPlayableCharacter=true');
  return agents.sort((a, b) => a.displayName.localeCompare(b.displayName, 'pt-BR'));
}

export async function getMaps() {
  const maps = await request('/maps?language=pt-BR');
  return maps.filter((map) => map.splash && map.displayIcon && !map.displayName.toLowerCase().includes('range')).sort((a, b) => a.displayName.localeCompare(b.displayName, 'pt-BR'));
}
