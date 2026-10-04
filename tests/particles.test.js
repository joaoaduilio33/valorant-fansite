import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { presets } from '../src/effects/presets.js';
import { shapes } from '../src/effects/shapes.js';
import { presetFor, spawnParticle, stepParticle, particleAlpha, createParticles } from '../src/effects/particles.js';
import { elements } from '../src/data/elements.js';

const seeded = (seed = 7) => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

function fakeCanvas() {
  const calls = {};
  const context = new Proxy({}, {
    get: (target, key) => {
      if (key in target) return target[key];
      if (key === 'createRadialGradient') return () => ({ addColorStop() {} });
      return () => { calls[key] = (calls[key] || 0) + 1; };
    },
    set: (target, key, value) => { target[key] = value; return true; },
  });
  return { calls, width: 0, height: 0, getContext: () => context, getBoundingClientRect: () => ({ left: 0, top: 0, width: 800, height: 600 }) };
}

test('every agent has an element with an existing preset and PT/EN labels', () => {
  const slugs = fs.readdirSync(new URL('../agente/', import.meta.url));
  for (const slug of slugs) {
    const element = elements[slug];
    assert.ok(element, `no element for ${slug}`);
    assert.ok(presets[element.preset], `missing preset ${element.preset}`);
    assert.ok(element.label.pt && element.label.en);
  }
});

test('presets only use shapes that can be drawn', () => {
  for (const [key, preset] of Object.entries(presets)) {
    for (const shape of preset.shapes) assert.equal(typeof shapes[shape], 'function', `${key} uses ${shape}`);
    assert.ok(preset.colors.length > 0, key);
  }
});

test('particles spawn where the preset says, and bursts spawn at the given point', () => {
  const wind = presetFor('wind');
  const particle = spawnParticle(wind, 800, 600, seeded());
  assert.equal(particle.x, -20);
  assert.ok(particle.y >= 0 && particle.y <= 600);
  assert.ok(particle.vx > 0, 'wind blows to the right');
  const burst = spawnParticle(wind, 800, 600, seeded(), [100, 50]);
  assert.deepEqual([burst.x, burst.y], [100, 50]);
  assert.equal(burst.burst, true);
});

test('a step ages, moves and keeps the alpha in range', () => {
  const embers = presetFor('embers');
  const particle = spawnParticle(embers, 800, 600, seeded());
  const before = { y: particle.y, life: particle.life };
  stepParticle(particle, embers, null);
  assert.equal(particle.life, before.life - 1);
  assert.equal(particle.age, 1);
  assert.ok(particle.y < before.y, 'embers rise');
  const alpha = particleAlpha(particle, embers);
  assert.ok(alpha >= 0 && alpha <= 1);
});

test('the cursor pushes nearby particles away', () => {
  const stars = presetFor('stars');
  const particle = { ...spawnParticle(stars, 800, 600, seeded()), x: 100, y: 100, vx: 0, vy: 0 };
  stepParticle(particle, stars, { x: 90, y: 100 });
  assert.ok(particle.x > 100);
});

test('an unknown element produces no effect instead of crashing', () => {
  assert.equal(presetFor(undefined), null);
  assert.equal(createParticles(fakeCanvas(), 'nope'), null);
});

test('reduced motion draws one still frame and never schedules animation', () => {
  let scheduled = 0;
  const still = fakeCanvas();
  createParticles(still, 'embers', { reducedMotion: true, raf: () => { scheduled += 1; return 1; } });
  assert.equal(scheduled, 0);
  assert.ok(still.calls.save > 0, 'a frame was drawn');
  createParticles(fakeCanvas(), 'embers', { raf: () => { scheduled += 1; return 1; } });
  assert.equal(scheduled, 1);
});
