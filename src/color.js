// API agent colours are dark ("742e1eff"); the duo hero needs a bright version of the same hue.
export function hexToHsl(hex) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.replace('#', '').slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min;
  if (!d) return [0, 0, l];
  const s = d / (1 - Math.abs(2 * l - 1));
  const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [(h * 60 + 360) % 360, s, l];
}

export function vivid(hex) {
  const [h, s] = hexToHsl(hex);
  return `hsl(${Math.round(h)} ${Math.round(Math.max(s, 0.7) * 100)}% 58%)`;
}

export const agentColor = (agent) => `#${(agent.backgroundGradientColors?.[0] || 'ff4655ff').slice(0, 6)}`;
