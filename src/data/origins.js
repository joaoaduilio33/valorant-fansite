// Country of origin per agent, from the official wiki (wiki.playvalorant.com/en-us/Agents).
// `flag` is a flag-icons code (src/flags/<code>.svg); null means unknown and shows the "?" panel.
export const origins = {
  astra: { flag: 'gh', country: { pt: 'Gana', en: 'Ghana' } },
  breach: { flag: 'se', country: { pt: 'Suécia', en: 'Sweden' } },
  brimstone: { flag: 'us', country: { pt: 'Estados Unidos', en: 'United States' } },
  chamber: { flag: 'fr', country: { pt: 'França', en: 'France' } },
  clove: { flag: 'gb-sct', country: { pt: 'Escócia', en: 'Scotland' } },
  cypher: { flag: 'ma', country: { pt: 'Marrocos', en: 'Morocco' } },
  deadlock: { flag: 'no', country: { pt: 'Noruega', en: 'Norway' } },
  fade: { flag: 'tr', country: { pt: 'Turquia', en: 'Türkiye' } },
  gekko: { flag: 'us', country: { pt: 'Estados Unidos', en: 'United States' } },
  harbor: { flag: 'in', country: { pt: 'Índia', en: 'India' } },
  iso: { flag: 'cn', country: { pt: 'China', en: 'China' } },
  jett: { flag: 'kr', country: { pt: 'Coreia do Sul', en: 'South Korea' } },
  kayo: { flag: null, country: { pt: 'Outra linha do tempo da Terra', en: 'An alternate-timeline Earth' } },
  killjoy: { flag: 'de', country: { pt: 'Alemanha', en: 'Germany' } },
  miks: { flag: 'hr', country: { pt: 'Croácia', en: 'Croatia' } },
  neon: { flag: 'ph', country: { pt: 'Filipinas', en: 'Philippines' } },
  omen: { flag: null, country: { pt: 'Desconhecida', en: 'Unknown' } },
  phoenix: { flag: 'gb-eng', country: { pt: 'Inglaterra', en: 'England' } },
  raze: { flag: 'br', country: { pt: 'Brasil', en: 'Brazil' } },
  reyna: { flag: 'mx', country: { pt: 'México', en: 'Mexico' } },
  sage: { flag: 'cn', country: { pt: 'China', en: 'China' } },
  skye: { flag: 'au', country: { pt: 'Austrália', en: 'Australia' } },
  sova: { flag: 'ru', country: { pt: 'Rússia', en: 'Russia' } },
  tejo: { flag: 'co', country: { pt: 'Colômbia', en: 'Colombia' } },
  veto: { flag: 'sn', country: { pt: 'Senegal', en: 'Senegal' } },
  viper: { flag: 'us', country: { pt: 'Estados Unidos', en: 'United States' } },
  vyse: { flag: null, country: { pt: 'Desconhecida', en: 'Unknown' } },
  waylay: { flag: 'th', country: { pt: 'Tailândia', en: 'Thailand' } },
  yoru: { flag: 'jp', country: { pt: 'Japão', en: 'Japan' } },
};

// Resolved from this module so it works in Live Server and in the Vite build.
// Quotes are escaped because the URL ends up inside CSS url('…').
export const flagUrl = (code) => new URL(`../flags/${code}.svg`, import.meta.url).href.replace(/'/g, '%27').replace(/"/g, '%22');
