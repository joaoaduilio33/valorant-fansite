export const TABS = ['perfil', 'biografia', 'habilidades', 'video', 'maestria'];

// "#maestria" → "maestria"; anything unknown falls back to the first tab. Map pages pass their own list.
export function tabFromHash(hash, tabs = TABS) {
  const id = String(hash ?? '').replace(/^#/, '');
  return tabs.includes(id) ? id : tabs[0];
}

// Vertical, game-style menu (reference: "Wonder Woman" layout): numbered entries, the active one underlined.
export function tabsMarkup(t, current, tabs = TABS) {
  return `<nav class="game-nav" role="tablist" aria-orientation="vertical" aria-label="${t.tabs.label}">
    ${tabs.map((id, i) => `<a role="tab" id="tab-${id}" href="#${id}" aria-controls="panel-${id}" aria-selected="${id === current}" tabindex="${id === current ? 0 : -1}"><b>${String(i + 1).padStart(2, '0')}</b><span>${t.tabs[id]}</span></a>`).join('')}
  </nav>`;
}

// Tabs follow the URL hash, so links like agente/jett/#maestria and the back button work.
export function setupTabs(root, onChange, tabs = TABS) {
  const links = [...root.querySelectorAll('.game-nav [role="tab"]')];
  const show = (id) => {
    links.forEach((tab) => {
      const selected = tab.id === `tab-${id}`;
      tab.setAttribute('aria-selected', selected);
      tab.tabIndex = selected ? 0 : -1;
    });
    root.querySelectorAll('[role="tabpanel"][data-tab]').forEach((panel) => { panel.hidden = panel.dataset.tab !== id; });
    onChange(id);
  };
  const onHash = () => show(tabFromHash(location.hash, tabs));
  addEventListener('hashchange', onHash);
  root.querySelector('.game-nav').addEventListener('keydown', (event) => {
    const delta = { ArrowDown: 1, ArrowUp: -1 }[event.key];
    if (delta === undefined) return;
    event.preventDefault();
    event.stopPropagation();
    const current = tabs.indexOf(tabFromHash(location.hash, tabs));
    const next = tabs[(current + delta + tabs.length) % tabs.length];
    history.replaceState(null, '', `#${next}`);
    show(next);
    root.querySelector(`#tab-${next}`).focus();
  });
  show(tabFromHash(location.hash, tabs));
  return () => removeEventListener('hashchange', onHash);
}
