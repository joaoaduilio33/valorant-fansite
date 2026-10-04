// One preset per element (spec §4). Angles are radians (0 = right, -π/2 = up); ranges are [min, max].
// Colours are dark enough to read on the light poster background.
const UP = -Math.PI / 2;
const DOWN = Math.PI / 2;
const around = (center, spread) => [center - spread, center + spread];

export const DEFAULTS = {
  shapes: ['dot'], colors: ['#16181d'], count: 40, size: [2, 4], length: [0, 0], speed: [0.3, 1], angle: [0, Math.PI * 2],
  spawn: 'area', life: [80, 160], gravity: 0, drag: 1, wobble: 0, spin: [0, 0], grow: 0, alpha: 0.7, twinkle: false,
};

export const presets = {
  wind: { shapes: ['streak'], colors: ['#4f8fb0', '#7fb8d4', '#2f6f8f'], count: 40, size: [1, 2], length: [40, 110], speed: [4, 8], angle: around(0, 0.12), spawn: 'left', life: [70, 140], wobble: 0.03, alpha: 0.55 },
  embers: { shapes: ['dot'], colors: ['#ff7a1a', '#ffb02e', '#e8431b'], count: 70, size: [1.5, 3.5], speed: [0.6, 1.8], angle: around(UP, 0.5), spawn: 'bottom', gravity: -0.01, wobble: 0.06, life: [90, 180], twinkle: true, alpha: 0.85 },
  sparks: { shapes: ['bolt', 'dot'], colors: ['#1f9fe8', '#f5c400', '#5fc8ff'], count: 36, size: [1.5, 3], length: [12, 26], speed: [2, 5], life: [18, 45], alpha: 0.9 },
  toxic: { shapes: ['bubble'], colors: ['#2faa3c', '#7ad13f', '#16802f'], count: 40, size: [3, 9], speed: [0.3, 0.9], angle: around(UP, 0.3), spawn: 'bottom', wobble: 0.05, life: [120, 240], alpha: 0.6 },
  shadows: { shapes: ['puff'], colors: ['#2b1f4a', '#4b3a7a', '#120e22'], count: 26, size: [24, 60], speed: [0.15, 0.5], life: [160, 300], grow: 0.08, alpha: 0.18 },
  smoke: { shapes: ['puff', 'ring'], colors: ['#a8998a', '#7a6a5a', '#e8662a'], count: 24, size: [18, 46], speed: [0.2, 0.6], angle: around(UP, 0.4), spawn: 'bottom', grow: 0.12, life: [150, 260], alpha: 0.22 },
  jade: { shapes: ['shard'], colors: ['#1fb89a', '#62dcc0', '#0f8a72'], count: 34, size: [4, 9], speed: [0.3, 0.9], angle: around(UP, 0.4), spawn: 'bottom', spin: [-0.03, 0.03], life: [120, 220], alpha: 0.75 },
  souls: { shapes: ['dot'], colors: ['#a43cf0', '#d27cff', '#6a17c0'], count: 40, size: [2.5, 5], speed: [0.2, 0.7], wobble: 0.05, twinkle: true, life: [120, 240], alpha: 0.8 },
  paint: { shapes: ['drop', 'shard'], colors: ['#ff6a1f', '#f5b800', '#26a650', '#2f6bff', '#ff3f96'], count: 46, size: [3, 7], speed: [1, 3.5], gravity: 0.04, spin: [-0.08, 0.08], life: [60, 130], alpha: 0.85 },
  tremor: { shapes: ['ring'], colors: ['#d8722a', '#a8541a'], count: 8, size: [10, 20], speed: [0, 0], spawn: 'floor', grow: 1.4, life: [70, 110], alpha: 0.5 },
  leaves: { shapes: ['leaf'], colors: ['#4faa30', '#8fd04e', '#2a7f32'], count: 30, size: [5, 10], speed: [0.4, 1.1], angle: around(DOWN, 0.5), spawn: 'top', wobble: 0.08, spin: [-0.04, 0.04], life: [160, 300], alpha: 0.8 },
  rifts: { shapes: ['square', 'streak'], colors: ['#2a4fe0', '#6f8fff', '#0f1d63'], count: 34, size: [3, 8], length: [20, 60], speed: [1, 3], life: [30, 80], alpha: 0.6 },
  stars: { shapes: ['star'], colors: ['#9a6bff', '#f0b93a', '#5a3bc1'], count: 44, size: [2, 6], speed: [0.05, 0.3], twinkle: true, spin: [-0.01, 0.01], life: [160, 320], alpha: 0.85 },
  glitch: { shapes: ['square'], colors: ['#3f63ff', '#ff3f6b', '#1a1e4b'], count: 30, size: [3, 14], speed: [0, 0.4], life: [8, 30], alpha: 0.75 },
  gold: { shapes: ['star', 'dot'], colors: ['#c99a26', '#e9c25a', '#9a7016'], count: 44, size: [1.5, 4.5], speed: [0.2, 0.6], angle: around(DOWN, 0.4), spawn: 'top', twinkle: true, life: [140, 260], alpha: 0.85 },
  nightmare: { shapes: ['puff', 'drop'], colors: ['#1d1a2e', '#3a2f5a', '#5b4b85'], count: 32, size: [6, 22], speed: [0.1, 0.5], angle: around(DOWN, 0.3), spawn: 'top', gravity: 0.01, grow: 0.05, life: [140, 260], alpha: 0.35 },
  water: { shapes: ['drop', 'ring'], colors: ['#1f8fbf', '#4fb8e0', '#0f5f8f'], count: 40, size: [2.5, 6], speed: [0.6, 1.6], angle: around(DOWN, 0.2), spawn: 'top', gravity: 0.03, grow: 0.03, life: [90, 180], alpha: 0.7 },
  critters: { shapes: ['bubble'], colors: ['#a8dc1e', '#ff6fbf', '#3fc8f0', '#f5c400'], count: 30, size: [4, 10], speed: [0.5, 1.4], wobble: 0.04, life: [100, 200], alpha: 0.75 },
  nanowire: { shapes: ['streak', 'dot'], colors: ['#5d7fa8', '#8aa6c8', '#2f4f78'], count: 34, size: [1, 2.5], length: [40, 120], speed: [0.2, 0.8], life: [100, 200], alpha: 0.5 },
  hexshield: { shapes: ['hex'], colors: ['#6a4cf0', '#a48cff', '#3d23c0'], count: 26, size: [6, 14], speed: [0.1, 0.4], twinkle: true, spin: [-0.01, 0.01], life: [120, 220], alpha: 0.6 },
  butterflies: { shapes: ['butterfly'], colors: ['#ff5fa8', '#ff8fca', '#a845f0'], count: 20, size: [6, 11], speed: [0.4, 1], angle: around(UP, 0.6), spawn: 'bottom', wobble: 0.07, life: [160, 300], alpha: 0.85 },
  thorns: { shapes: ['thorn'], colors: ['#7a6fa8', '#a59ad0', '#423a68'], count: 30, size: [5, 12], speed: [0.2, 0.8], spin: [-0.04, 0.04], life: [100, 200], alpha: 0.75 },
  missiles: { shapes: ['streak'], colors: ['#d8902a', '#f0541a', '#555a63'], count: 18, size: [1.5, 3], length: [60, 140], speed: [5, 9], angle: around(Math.PI / 4, 0.15), spawn: 'top', life: [60, 110], alpha: 0.6 },
  prism: { shapes: ['shard', 'streak'], colors: ['#ff4fc8', '#3fcaff', '#f5d400', '#8f6bff'], count: 40, size: [3, 7], length: [30, 80], speed: [2, 5], spin: [-0.06, 0.06], life: [40, 90], alpha: 0.75 },
  mutation: { shapes: ['drop', 'bubble'], colors: ['#7a4cf0', '#2fbf7f', '#2a1f4a'], count: 36, size: [3, 8], speed: [0.2, 0.7], wobble: 0.06, life: [120, 220], alpha: 0.7 },
  gears: { shapes: ['gear'], colors: ['#d8b01a', '#7a55c8', '#2b2b2b'], count: 18, size: [7, 14], speed: [0.15, 0.5], spin: [-0.03, 0.03], life: [160, 300], alpha: 0.7 },
  surveillance: { shapes: ['ring', 'streak'], colors: ['#2f5078', '#4f7fb8', '#1a2f48'], count: 18, size: [6, 12], length: [60, 160], speed: [0.5, 1.2], angle: around(0, 0.02), spawn: 'left', grow: 0.25, life: [100, 180], alpha: 0.45 },
  arrows: { shapes: ['arrow'], colors: ['#2f6fff', '#6f98ff', '#1a3f9f'], count: 14, size: [2, 3], length: [40, 70], speed: [6, 10], angle: around(0, 0.06), spawn: 'left', life: [60, 100], alpha: 0.7 },
  sound: { shapes: ['ring'], colors: ['#f04f8f', '#6a4cf0', '#f5b800'], count: 10, size: [8, 14], speed: [0, 0], spawn: 'center', grow: 1.2, life: [80, 130], alpha: 0.5 },
};
