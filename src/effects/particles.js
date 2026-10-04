import { shapes } from './shapes.js';
import { presets, DEFAULTS } from './presets.js';

const MAX = 120; // ambient particles; bursts may add up to 30 more
const ORIENT = { streak: 0, arrow: 0, drop: -Math.PI / 2 }; // shapes that point along their velocity
const between = ([min, max], rand) => min + (max - min) * rand();
const pick = (list, rand) => list[Math.floor(rand() * list.length)];

export const presetFor = (key) => (presets[key] ? { ...DEFAULTS, ...presets[key] } : null);

export function spawnParticle(preset, width, height, rand = Math.random, at = null) {
  const angle = at ? rand() * Math.PI * 2 : between(preset.angle, rand);
  const speed = between(preset.speed, rand) * (at ? 2.5 : 1);
  const origins = {
    area: () => [rand() * width, rand() * height],
    left: () => [-20, rand() * height],
    top: () => [rand() * width, -20],
    bottom: () => [rand() * width, height + 20],
    center: () => [width / 2, height * 0.45],
    floor: () => [width / 2 + (rand() - 0.5) * width * 0.4, height * 0.92],
  };
  const [x, y] = at ?? (origins[preset.spawn] ?? origins.area)();
  const life = Math.round(between(preset.life, rand));
  return {
    x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
    size: between(preset.size, rand), length: between(preset.length, rand),
    color: pick(preset.colors, rand), shape: pick(preset.shapes, rand),
    rot: rand() * Math.PI * 2, vr: between(preset.spin, rand),
    life, maxLife: life, age: 0, seed: rand() * 100, burst: Boolean(at),
  };
}

export function stepParticle(p, preset, pointer) {
  p.age += 1;
  p.life -= 1;
  p.vx *= preset.drag;
  p.vy = p.vy * preset.drag + preset.gravity;
  if (preset.wobble) p.vx += Math.sin(p.age * 0.08 + p.seed) * preset.wobble;
  p.x += p.vx;
  p.y += p.vy;
  if (pointer) {
    // Push the position (not the velocity) so particles don't keep accelerating.
    const dx = p.x - pointer.x;
    const dy = p.y - pointer.y;
    const distance = Math.hypot(dx, dy);
    if (distance > 0 && distance < 110) {
      const push = (1 - distance / 110) * 3;
      p.x += (dx / distance) * push;
      p.y += (dy / distance) * push;
    }
  }
  p.size = Math.max(0.1, p.size + preset.grow);
  p.rot = p.shape in ORIENT ? Math.atan2(p.vy, p.vx) + ORIENT[p.shape] : p.rot + p.vr;
}

export function particleAlpha(p, preset) {
  const fadeIn = Math.min(1, p.age / 12);
  const fadeOut = Math.min(1, Math.max(0, p.life) / 24);
  const twinkle = preset.twinkle ? 0.55 + 0.45 * Math.sin(p.age * 0.15 + p.seed) : 1;
  return Math.min(1, Math.max(0, preset.alpha * fadeIn * fadeOut * twinkle));
}

export function createParticles(canvas, presetKey, options = {}) {
  const preset = presetFor(presetKey);
  if (!preset) return null;
  const { reducedMotion = false, ambient = true } = options;
  const raf = options.raf ?? ((callback) => requestAnimationFrame(callback));
  const caf = options.caf ?? ((id) => cancelAnimationFrame(id));
  const hidden = () => typeof document !== 'undefined' && document.hidden;
  const context = canvas.getContext('2d');
  const particles = [];
  let width = 0;
  let height = 0;
  let frame = 0;
  let running = false;
  let visible = true;
  let pointer = null;

  const resize = () => {
    const box = canvas.getBoundingClientRect();
    const ratio = Math.min(2, globalThis.devicePixelRatio || 1);
    width = box.width;
    height = box.height;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };
  const draw = () => {
    context.clearRect(0, 0, width, height);
    for (const p of particles) {
      context.save();
      context.translate(p.x, p.y);
      context.rotate(p.rot);
      context.globalAlpha = particleAlpha(p, preset);
      context.fillStyle = p.color;
      context.strokeStyle = p.color;
      shapes[p.shape](context, p);
      context.restore();
    }
  };
  const outside = (p) => p.x < -160 || p.x > width + 160 || p.y < -160 || p.y > height + 160;
  const tick = () => {
    for (let i = particles.length - 1; i >= 0; i -= 1) {
      const p = particles[i];
      stepParticle(p, preset, pointer);
      if (p.life <= 0 || outside(p)) {
        if (p.burst || !ambient) particles.splice(i, 1);
        else particles[i] = spawnParticle(preset, width, height);
      }
    }
    draw();
    if (!ambient && particles.length === 0) running = false; // burst-only canvas goes idle
    frame = running ? raf(tick) : 0;
  };
  const start = () => {
    if (running || reducedMotion || !visible || hidden()) return;
    running = true;
    frame = raf(tick);
  };
  const stop = () => { running = false; if (frame) caf(frame); frame = 0; };

  resize();
  if (ambient) {
    for (let i = 0; i < Math.min(preset.count, MAX); i += 1) {
      const p = spawnParticle(preset, width, height);
      // Pre-age the first wave so the canvas doesn't start empty.
      const warm = Math.floor(Math.random() * p.maxLife * 0.8);
      for (let step = 0; step < warm; step += 1) stepParticle(p, preset, null);
      particles.push(outside(p) ? spawnParticle(preset, width, height) : p);
    }
  }
  draw();

  const disposers = [];
  if (typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(() => { resize(); draw(); });
    observer.observe(canvas);
    disposers.push(() => observer.disconnect());
  }
  if (typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible && ambient) start(); else if (!visible) stop(); });
    observer.observe(canvas);
    disposers.push(() => observer.disconnect());
  }
  if (typeof document !== 'undefined') {
    const onVisibility = () => (document.hidden ? stop() : ambient && start());
    document.addEventListener('visibilitychange', onVisibility);
    disposers.push(() => document.removeEventListener('visibilitychange', onVisibility));
  }
  if (ambient) start();

  return {
    burst(x, y, amount = 18) {
      if (reducedMotion) return;
      for (let i = 0; i < amount && particles.length < MAX + 30; i += 1) particles.push(spawnParticle(preset, width, height, Math.random, [x, y]));
      start();
    },
    setPointer(point) { pointer = point; },
    destroy() { stop(); disposers.forEach((dispose) => dispose()); },
  };
}
