import { flagUrl } from '../data/origins.js';

const COLUMNS = 14;

// Known countries: the flag is sliced into columns that slide in and then wave (spec §3).
// Unknown origins: TV static, scanlines and a glitching "?".
export function flagMarkup(origin, lang) {
  const label = origin?.country[lang] ?? '?';
  if (!origin?.flag) {
    return `<div class="flag flag-unknown layer" style="--depth:10" role="img" aria-label="${label}">
      <div class="flag-cloth"><canvas class="flag-noise" width="64" height="48"></canvas><span class="flag-q" data-q="?">?</span></div>
      <p class="flag-label" aria-hidden="true">${label}</p>
    </div>`;
  }
  const columns = Array.from({ length: COLUMNS }, (_, i) => `<span style="--c:${i}"></span>`).join('');
  return `<div class="flag layer" style="--depth:10;--cols:${COLUMNS};--flag:url('${flagUrl(origin.flag)}')" role="img" aria-label="${label}">
    <div class="flag-cloth">${columns}</div>
    <p class="flag-label" aria-hidden="true">${label}</p>
  </div>`;
}

export function flagBadge(origin) {
  return origin?.flag ? `<img class="flag-badge" src="${flagUrl(origin.flag)}" alt="">` : '<span class="flag-badge flag-badge-q">?</span>';
}

// TV static for unknown origins; a single still frame when motion is reduced.
export function startNoise(canvas, reducedMotion) {
  const context = canvas.getContext('2d');
  const image = context.createImageData(canvas.width, canvas.height);
  const draw = () => {
    for (let i = 0; i < image.data.length; i += 4) {
      const value = Math.random() * 255;
      image.data[i] = value; image.data[i + 1] = value; image.data[i + 2] = value; image.data[i + 3] = 255;
    }
    context.putImageData(image, 0, 0);
  };
  draw();
  if (reducedMotion) return () => {};
  const timer = setInterval(() => { if (!document.hidden) draw(); }, 90);
  return () => clearInterval(timer);
}

