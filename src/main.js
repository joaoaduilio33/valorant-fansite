import './styles.css';
import './extended.css';
import { getAgents, getMaps } from './api/valorant.js';
import { videoMarkup } from './video.js';
import videos from './videos.json';

const roleLabels = { Duelist: 'Duelista', Controller: 'Controlador', Initiator: 'Iniciador', Sentinel: 'Sentinela' };
const app = document.querySelector('#app');

app.innerHTML = `
  <header class="site-header">
    <a class="brand" href="#inicio" aria-label="Protocolo Valorant — início"><span class="brand-mark" aria-hidden="true"></span><span>PROTOCOLO <b>//</b> VALORANT</span></a>
    <nav aria-label="Navegação principal"><a class="active" href="#agentes">Agentes</a><a href="#mapas">Mapas</a></nav>
  </header>
  <main id="conteudo">
    <section class="hero" id="inicio" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span>BR // 001</span> Base de inteligência</p>
        <h1 id="hero-title">Conheça seu agente.<br><em>Domine o protocolo.</em></h1>
        <p class="hero-intro">Agentes, habilidades e funções reunidos para quem quer entender o jogo.</p>
        <a class="primary-action" href="#agentes">Explorar agentes <span aria-hidden="true">↓</span></a>
      </div>
      <div class="hero-panel" aria-label="Status da base" data-state="loading"><div class="scan-line"></div><p>CONEXÃO</p><strong>BASE DE AGENTES</strong><span id="connection-status" role="status">Carregando dados…</span><small>Agentes e mapas da base pública VALORANT API.</small></div>
    </section>
    <section class="catalog" id="agentes" aria-labelledby="catalog-title">
      <div class="section-heading"><div><p class="eyebrow"><span>DB // AGENTES</span> Arquivo operacional</p><h2 id="catalog-title">Escolha sua função</h2></div><p class="result-count" aria-live="polite"><strong id="agent-count">—</strong> agentes encontrados</p></div>
      <div class="controls" aria-label="Filtros dos agentes">
        <label class="search-field"><span class="sr-only">Buscar agente</span><span aria-hidden="true">⌕</span><input id="agent-search" type="search" placeholder="BUSCAR AGENTE" autocomplete="off"></label>
        <div class="role-filters" role="group" aria-label="Filtrar por função">
          <button class="filter active" type="button" data-role="all">Todos</button><button class="filter" type="button" data-role="Duelist">Duelistas</button><button class="filter" type="button" data-role="Controller">Controladores</button><button class="filter" type="button" data-role="Initiator">Iniciadores</button><button class="filter" type="button" data-role="Sentinel">Sentinelas</button>
        </div>
      </div>
      <div class="agents-grid" id="agents-grid" aria-live="polite" aria-busy="true">${Array.from({length: 8}, () => '<div class="agent-card skeleton" aria-hidden="true"></div>').join('')}</div>
      <div class="empty-state" id="empty-state" hidden><strong>Nenhum registro encontrado.</strong><span>Tente outro nome ou função.</span></div>
    </section>
    <section class="maps-section" id="mapas" aria-labelledby="maps-title">
      <div class="section-heading"><div><p class="eyebrow"><span>DB // MAPAS</span> Campos de operação</p><h2 id="maps-title">Conheça o terreno</h2></div><p class="result-count"><strong id="map-count">—</strong> mapas catalogados</p></div>
      <div class="maps-grid" id="maps-grid" aria-busy="true"><div class="map-card skeleton"></div><div class="map-card skeleton"></div><div class="map-card skeleton"></div></div>
    </section>
  </main>
  <footer id="arquivo"><span>Projeto de fã não oficial</span><span>VALORANT e Riot Games são marcas de seus respectivos proprietários.</span></footer>`;

document.body.insertAdjacentHTML('beforeend', `<dialog class="agent-dialog" id="agent-dialog" aria-labelledby="agent-title"><button class="dialog-close" type="button" aria-label="Fechar detalhes">×</button><div id="dialog-content"></div></dialog>`);

const grid = document.querySelector('#agents-grid');
const count = document.querySelector('#agent-count');
const search = document.querySelector('#agent-search');
const emptyState = document.querySelector('#empty-state');
const filters = [...document.querySelectorAll('.filter')];
let agents = [];
let maps = [];
let currentRole = 'all';

const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const roleKey = (agent) => Object.keys(roleLabels).find((key) => [normalize(key), normalize(roleLabels[key])].includes(normalize(agent.role?.displayName || '')));
const loadState = { agents: 'loading', maps: 'loading' };
function setLoadState(resource, state) {
  loadState[resource] = state;
  const states = Object.values(loadState);
  const status = states.includes('loading') ? 'loading' : states.includes('error') ? 'error' : 'ready';
  document.querySelector('.hero-panel').dataset.state = status;
  document.querySelector('#connection-status').textContent = status === 'loading' ? 'Carregando dados…' : status === 'error' ? 'Parte dos dados está indisponível' : 'Agentes e mapas carregados';
}

function createAgentCard(agent, index) {
  const role = roleLabels[agent.role?.displayName] ?? agent.role?.displayName ?? 'Sem função';
  return `<article class="agent-card" style="--delay:${Math.min(index * 35, 350)}ms">
    <div class="agent-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</div>
    <div class="agent-art"><img src="${agent.fullPortraitV2 || agent.fullPortrait || agent.displayIcon}" alt="Retrato de ${agent.displayName}" loading="lazy" decoding="async"></div>
    <div class="agent-info"><p class="agent-role">${role}</p><h3>${agent.displayName}</h3><p>${agent.description || 'Dados confidenciais do Protocolo.'}</p><button class="text-action" type="button" data-agent="${agent.uuid}" aria-label="Ver detalhes de ${agent.displayName}">Ver arquivo <span aria-hidden="true">↗</span></button></div>
  </article>`;
}

function renderAgents() {
  const query = normalize(search.value.trim());
  const visible = agents.filter((agent) => (currentRole === 'all' || roleKey(agent) === currentRole) && normalize(agent.displayName).includes(query));
  grid.innerHTML = visible.map(createAgentCard).join('');
  count.textContent = visible.length;
  emptyState.hidden = visible.length !== 0;
}

filters.forEach((button) => button.addEventListener('click', () => {
  currentRole = button.dataset.role;
  filters.forEach((item) => { const selected = item === button; item.classList.toggle('active', selected); item.setAttribute('aria-pressed', selected); });
  renderAgents();
}));
search.addEventListener('input', renderAgents);

async function loadAgents() {
  grid.setAttribute('aria-busy', 'true');
  setLoadState('agents', 'loading');
  emptyState.hidden = true;
  try { agents = await getAgents(); renderAgents(); setLoadState('agents', 'ready'); }
  catch (error) {
    setLoadState('agents', 'error');
    grid.innerHTML = `<div class="error-state"><strong>Conexão interrompida</strong><p>${error.message}</p><button class="primary-action" id="retry" type="button">Tentar novamente</button></div>`;
    count.textContent = '0'; document.querySelector('#retry').addEventListener('click', loadAgents);
  } finally { grid.setAttribute('aria-busy', 'false'); }
}

function openAgent(uuid) {
  const agent = agents.find((item) => item.uuid === uuid);
  if (!agent) return;
  const role = roleLabels[agent.role?.displayName] ?? agent.role?.displayName ?? 'Sem função';
  const abilities = agent.abilities.filter((ability) => ability.displayName).map((ability) => `<li><img src="${ability.displayIcon || agent.role?.displayIcon}" alt=""><div><span>${ability.slot}</span><strong>${ability.displayName}</strong><p>${ability.description}</p></div></li>`).join('');
  const videoId = videos[normalize(agent.displayName).replace(/[^a-z0-9]/g, '')];
  document.querySelector('#dialog-content').innerHTML = `<div class="dialog-visual"><img src="${agent.fullPortraitV2 || agent.fullPortrait}" alt="Retrato de ${agent.displayName}"></div><div class="dialog-copy"><p class="agent-role">${role}</p><h2 id="agent-title">${agent.displayName}</h2><p class="dialog-description">${agent.description}</p><h3>Habilidades</h3><ul class="abilities">${abilities}</ul>${videoId ? `<h3>Vídeo do agente</h3>${videoMarkup(videoId, agent.displayName)}` : ''}</div>`;
  document.querySelector('#agent-dialog').showModal();
  document.querySelector('#agent-dialog').scrollTop = 0;
}

grid.addEventListener('click', (event) => { const button = event.target.closest('[data-agent]'); if (button) openAgent(button.dataset.agent); });
const dialog = document.querySelector('#agent-dialog');
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { document.querySelector('#dialog-content').replaceChildren(); });

async function loadMaps() {
  setLoadState('maps', 'loading');
  document.querySelector('#maps-grid').setAttribute('aria-busy', 'true');
  try {
    maps = await getMaps();
    document.querySelector('#maps-grid').innerHTML = maps.map((map, index) => `<article class="map-card" style="--delay:${Math.min(index * 40, 300)}ms"><img src="${map.splash}" alt="Vista do mapa ${map.displayName}" loading="lazy"><div class="map-overlay"><span>${map.coordinates || 'Localização confidencial'}</span><h3>${map.displayName}</h3><p>${map.tacticalDescription || 'Mapa tático do Protocolo VALORANT'}</p></div></article>`).join('');
    document.querySelector('#map-count').textContent = maps.length;
    setLoadState('maps', 'ready');
  } catch (error) {
    setLoadState('maps', 'error');
    document.querySelector('#maps-grid').innerHTML = `<div class="error-state"><strong>Mapas indisponíveis</strong><p>${error.message}</p><button class="primary-action" id="retry-maps" type="button">Tentar novamente</button></div>`;
    document.querySelector('#retry-maps').addEventListener('click', loadMaps);
    document.querySelector('#map-count').textContent = '0';
  } finally { document.querySelector('#maps-grid').setAttribute('aria-busy', 'false'); }
}

filters.forEach((button, index) => button.setAttribute('aria-pressed', index === 0));
const navLinks = [...document.querySelectorAll('.site-header nav a')];
const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries.find((entry) => entry.isIntersecting);
  if (!visible) return;
  navLinks.forEach((link) => {
    const active = link.hash === `#${visible.target.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
}, { rootMargin: '-15% 0px -60% 0px' });
document.querySelectorAll('#agentes, #mapas').forEach((section) => sectionObserver.observe(section));
loadAgents();
loadMaps();
