// Flat, outlined place illustrations drawn behind the agent poster (reference: Jett poster).
// Each is a 1200×600 scene anchored to the bottom. Keys match `scene` in src/data/agents.js.
const ink = 'stroke="#1b2230" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';

const lantern = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <line x1="0" y1="-26" x2="0" y2="-12" stroke="#1b2230" stroke-width="2.5"/>
  <rect x="-13" y="-14" width="26" height="6" rx="2" fill="#c8453f" ${ink}/>
  <path d="M-17 -8 Q-21 14 -17 36 L17 36 Q21 14 17 -8 Z" fill="#f6e7a6" ${ink}/>
  <path d="M-9 -6 Q-12 14 -9 34 M9 -6 Q12 14 9 34" fill="none" stroke="#1b2230" stroke-width="1.5"/>
  <rect x="-13" y="34" width="26" height="6" rx="2" fill="#c8453f" ${ink}/>
  <path d="M0 40 v14 M-4 44 v12 M4 44 v12" stroke="#c8453f" stroke-width="2.5"/></g>`;

const seoul = `
<g ${ink}>
  <path d="M220 214 Q300 214 330 198 Q470 186 600 128 Q730 186 870 198 Q900 214 980 214 Q940 236 880 240 L320 240 Q260 236 220 214 Z" fill="#7fa9b9"/>
  <path d="M204 206 q-10 -16 6 -24 M996 206 q10 -16 -6 -24" fill="none"/>
  <rect x="320" y="240" width="560" height="20" fill="#4f7f90"/>
  <rect x="380" y="260" width="440" height="78" fill="#f2ede2"/>
  <path d="M380 260 v78 M460 260 v78 M560 260 v78 M640 260 v78 M740 260 v78 M820 260 v78" stroke-width="10" stroke="#d9484f"/>
  <rect x="380" y="276" width="440" height="10" fill="#d9484f"/>
  <path d="M80 346 Q200 346 250 324 Q420 310 600 270 Q780 310 950 324 Q1000 346 1120 346 Q1070 372 990 378 L210 378 Q130 372 80 346 Z" fill="#7fa9b9"/>
  <path d="M62 336 q-12 -18 8 -28 M1138 336 q12 -18 -8 -28" fill="none"/>
  <path d="M150 352 Q600 330 1050 352" fill="none" stroke-width="2"/>
  <rect x="210" y="378" width="780" height="22" fill="#4f7f90"/>
  <rect x="250" y="400" width="700" height="200" fill="#f2ede2"/>
  <rect x="250" y="418" width="700" height="14" fill="#d9484f"/>
  <path d="M262 400 v200 M392 400 v200 M522 400 v200 M678 400 v200 M808 400 v200 M938 400 v200" stroke-width="18" stroke="#d9484f"/>
  <rect x="540" y="452" width="120" height="148" fill="#2a3140"/>
  <path d="M540 452 h120 M600 452 v148" stroke="#f2ede2" stroke-width="2"/>
  <rect x="300" y="470" width="70" height="60" fill="#e9dfc9"/><rect x="830" y="470" width="70" height="60" fill="#e9dfc9"/>
  <path d="M300 500 h70 M335 470 v60 M830 500 h70 M865 470 v60" stroke-width="2"/>
</g>
${lantern(300, 410, 1.1)}${lantern(900, 410, 1.1)}${lantern(420, 272, .85)}${lantern(780, 272, .85)}`;

const house = (x, w, h, fill, roof, windows) => {
  const top = 600 - h;
  const cols = Array.from({ length: windows }, (_, i) => x + (w / (windows + 1)) * (i + 1));
  const row = (y) => cols.map((cx) => `<path d="M${cx - 13} ${y + 34} v-22 a13 13 0 0 1 26 0 v22 z" fill="#f7f2e6"/><path d="M${cx - 18} ${y + 34} h36" stroke-width="2"/>`).join('');
  return `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${fill}"/>
    <path d="M${x - 6} ${top} h${w + 12} v-12 q-${w / 4} -4 -${w / 2 + 6} -28 q-${w / 4} 24 -${w / 2 + 6} 28 z" fill="${roof}"/>
    ${row(top + 30)}${row(top + 110)}${h > 260 ? row(top + 190) : ''}
    <rect x="${x + w / 2 - 20}" y="${552}" width="40" height="48" fill="#6b3f2a"/>`;
};

const salvador = `
<g ${ink}>
  <rect x="1010" y="120" width="110" height="480" fill="#e2ddd0"/>
  <path d="M1010 120 h110 l-12 -30 h-86 z" fill="#cfc8b6"/>
  <path d="M1037 130 v470 M1065 130 v470 M1093 130 v470" stroke-width="2"/>
  <rect x="1022" y="150" width="86" height="40" fill="#9fc3d8"/>
  <rect x="930" y="250" width="80" height="22" fill="#cfc8b6"/>
  ${house(60, 190, 300, '#8fb9de', '#f2d16b', 3)}
  ${house(250, 170, 360, '#f2d16b', '#f0a0b4', 2)}
  ${house(420, 200, 290, '#f0a0b4', '#9fd3b0', 3)}
  ${house(620, 170, 340, '#9fd3b0', '#8fb9de', 2)}
  ${house(790, 200, 300, '#f6b26b', '#f2d16b', 3)}
  <path d="M60 300 Q360 360 640 300 T1000 300" fill="none" stroke-width="2"/>
  ${['#d7263d', '#f4c430', '#1f8a4c', '#2b59c3', '#e86aa6', '#ffffff', '#d7263d', '#f4c430', '#1f8a4c', '#2b59c3'].map((c, i) => {
    const x = 110 + i * 88; const y = 300 + Math.sin((i / 9) * Math.PI) * 42;
    return `<path d="M${x} ${y} q6 30 -4 62 l10 -2 q8 -30 2 -60 z" fill="${c}" stroke-width="2"/>`;
  }).join('')}
</g>`;

const rabat = `
<g ${ink}>
  ${[150, 230, 310, 390].map((x, i) => `<rect x="${x}" y="${470 + (i % 2) * 30}" width="44" height="${130 - (i % 2) * 30}" fill="#eadbc0"/><ellipse cx="${x + 22}" cy="${470 + (i % 2) * 30}" rx="22" ry="7" fill="#f3e8d3"/>`).join('')}
  <rect x="470" y="110" width="190" height="490" fill="#d9a46b"/>
  <rect x="470" y="110" width="190" height="16" fill="#c48a52"/>
  <path d="M470 110 v-14 h20 v14 m30 0 v-14 h20 v14 m30 0 v-14 h20 v14 m30 0 v-14 h20 v14 m30 0 v-14 h20 v14" fill="#d9a46b"/>
  <rect x="525" y="40" width="80" height="56" fill="#d9a46b"/>
  <path d="M565 40 v-26 M556 22 h18" />
  <circle cx="565" cy="12" r="6" fill="#f2c94c"/>
  ${[170, 300, 430].map((y) => `<path d="M505 ${y + 80} v-46 a30 30 0 0 1 60 0 v46 z M575 ${y + 80} v-46 a30 30 0 0 1 60 0 v46 z" fill="#b97a44"/>
    <path d="M500 ${y + 92} h130" stroke-width="2"/>
    <path d="M520 ${y + 104} l10 10 10 -10 10 10 10 -10 10 10 10 -10 10 10 10 -10 10 10 10 -10 10 10" fill="none" stroke-width="2"/>`).join('')}
  <rect x="720" y="330" width="440" height="270" fill="#d98a5b"/>
  <path d="M720 330 ${Array.from({ length: 11 }, (_, i) => `v-22 h20 v22 h20`).join(' ')}" fill="#d98a5b"/>
  <path d="M880 600 v-150 a60 60 0 0 1 4 -8 a60 70 0 0 1 112 8 a60 60 0 0 1 4 8 v142 z" fill="#2a3140"/>
  <path d="M858 600 v-160 a82 92 0 0 1 164 0 v160" fill="none" stroke="#f2e2c4" stroke-width="10"/>
  <path d="M852 600 v-160 a88 98 0 0 1 176 0 v160" fill="none"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path transform="translate(${760 + (i % 4) * 26} ${380 + Math.floor(i / 4) * 26}) rotate(45)" d="M-7 -7 h14 v14 h-14 z" fill="${i % 2 ? '#2f5078' : '#3f8f7a'}" stroke-width="1.5"/>`).join('')}
  ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path transform="translate(${1050 + (i % 4) * 26} ${380 + Math.floor(i / 4) * 26}) rotate(45)" d="M-7 -7 h14 v14 h-14 z" fill="${i % 2 ? '#3f8f7a' : '#2f5078'}" stroke-width="1.5"/>`).join('')}
</g>`;

const scenes = { seoul, salvador, rabat };

export function sceneSvg(key, label) {
  if (!scenes[key]) return '';
  return `<svg class="scene-svg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMax meet" role="img" aria-label="${label}">${scenes[key]}</svg>`;
}
