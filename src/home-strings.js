// UI copy for the home page, in Portuguese and English. Patch facts come from the official
// 13.06 notes (22/09/2026) and the Warden's numbers from valorant-api.com.
export const homeStrings = {
  pt: {
    api: 'pt-BR', locale: 'pt-BR', skip: 'Pular para o conteúdo',
    nav: { agents: 'Agentes', duos: 'Duplas', patch: 'Patch', maps: 'Mapas', main: 'Navegação principal', quick: 'Navegação rápida' },
    cta: 'Explorar agentes', home: 'início',
    hero: { kicker: 'Conheça o', shuffle: 'Trocar agentes', sr: 'Protocolo: agentes, habilidades e mapas de VALORANT num arquivo feito por fãs.' },
    duo: { kicker: 'Duplas', title: 'Ninguém joga sozinho', prev: 'Dupla anterior', next: 'Próxima dupla', loading: 'Carregando duplas…', error: 'Duplas indisponíveis no momento.', carousel: 'carrossel' },
    patch: {
      kicker: 'Patch 13.06', title: 'O que mudou', date: '22 de setembro de 2026', notes: 'Notas oficiais',
      mastery: { tag: 'Sistema novo', title: 'Maestria de Agente', text: 'Cada agente tem 10 níveis por ato, marcas novas no retrato nos níveis 4, 7 e 10 e uma trilha de recompensas própria, liberada pelo nível vitalício.', link: 'Ver a maestria de um agente' },
      warden: { tag: 'Arma nova', title: 'Warden', text: 'Fuzil automático com mira de 2x e penetração média.', stats: [['Preço', '2.900'], ['Pente', '18'], ['Cadência', '6,5/s'], ['Corpo/cabeça', '50/200']] },
      gauntlet: { tag: 'Modo novo', title: 'Gauntlet: Glitched', text: 'Duplas 2v2, com 8 duplas na mesma partida. Cada rodada perdida tira vida da dupla, e entre as rodadas você escolhe e melhora habilidades de agentes diferentes. São quatro arenas novas.' },
      more: { tag: 'E mais', title: 'Outras mudanças', items: ['A Pontuação de Desempenho (0 a 500) substitui o ACS como métrica principal no competitivo.', 'Home e lobby viraram uma tela só.', 'Dá para treinar no Range enquanto espera a fila.', 'ID de Agente: um cartão personalizável com peças da trilha de recompensas.'] },
    },
    catalog: {
      kicker: 'Agentes', title: 'Escolha sua função', count: 'agentes', search: 'Buscar agente', filters: 'Filtrar por função', controls: 'Filtros dos agentes',
      roles: { all: 'Todos', Duelist: 'Duelistas', Controller: 'Controladores', Initiator: 'Iniciadores', Sentinel: 'Sentinelas' },
      empty: 'Nenhum agente encontrado.', emptyHint: 'Tente outro nome ou função.', cta: 'Ver arquivo', error: 'Conexão interrompida', retry: 'Tentar novamente',
    },
    maps: { kicker: 'Mapas', title: 'Conheça o terreno', count: 'mapas', pool: 'Competitivo', cta: 'Ver mapa', error: 'Mapas indisponíveis', retry: 'Tentar novamente' },
    footer: 'Projeto de fã não oficial. VALORANT e Riot Games são marcas de seus respectivos proprietários.',
  },
  en: {
    api: 'en-US', locale: 'en-US', skip: 'Skip to content',
    nav: { agents: 'Agents', duos: 'Duos', patch: 'Patch', maps: 'Maps', main: 'Main navigation', quick: 'Quick navigation' },
    cta: 'Explore agents', home: 'home',
    hero: { kicker: 'Meet', shuffle: 'Shuffle agents', sr: 'Protocolo: VALORANT agents, abilities and maps in a fan-made archive.' },
    duo: { kicker: 'Duos', title: 'Nobody plays alone', prev: 'Previous duo', next: 'Next duo', loading: 'Loading duos…', error: 'Duos are unavailable right now.', carousel: 'carousel' },
    patch: {
      kicker: 'Patch 13.06', title: "What's new", date: 'September 22, 2026', notes: 'Official notes',
      mastery: { tag: 'New system', title: 'Agent Mastery', text: 'Every agent has 10 levels per act, new portrait accents at levels 4, 7 and 10, and their own reward track, unlocked by the lifetime level.', link: "See an agent's mastery" },
      warden: { tag: 'New weapon', title: 'Warden', text: 'Automatic rifle with a 2x scope and medium wall penetration.', stats: [['Cost', '2,900'], ['Magazine', '18'], ['Fire rate', '6.5/s'], ['Body/head', '50/200']] },
      gauntlet: { tag: 'New mode', title: 'Gauntlet: Glitched', text: '2v2 duos, with 8 duos in the same match. Every lost round drains the duo\'s health, and between rounds you draft and upgrade abilities from different agents. Four new arenas.' },
      more: { tag: 'And more', title: 'Other changes', items: ['Performance Score (0 to 500) replaces ACS as the main competitive metric.', 'Home and lobby are now a single screen.', 'You can practice in the Range while in queue.', 'Agent ID: a customizable card built from reward-track pieces.'] },
    },
    catalog: {
      kicker: 'Agents', title: 'Pick your role', count: 'agents', search: 'Search agent', filters: 'Filter by role', controls: 'Agent filters',
      roles: { all: 'All', Duelist: 'Duelists', Controller: 'Controllers', Initiator: 'Initiators', Sentinel: 'Sentinels' },
      empty: 'No agents found.', emptyHint: 'Try another name or role.', cta: 'View file', error: 'Connection lost', retry: 'Try again',
    },
    maps: { kicker: 'Maps', title: 'Know the terrain', count: 'maps', pool: 'Competitive', cta: 'View map', error: 'Maps unavailable', retry: 'Try again' },
    footer: 'Unofficial fan project. VALORANT and Riot Games are trademarks of their respective owners.',
  },
};
