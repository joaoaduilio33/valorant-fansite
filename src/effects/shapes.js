// Canvas drawers. The context is already translated to the particle and rotated by p.rot;
// fillStyle, strokeStyle and globalAlpha are already set.
const TAU = Math.PI * 2;

export const shapes = {
  dot: (ctx, p) => { ctx.beginPath(); ctx.arc(0, 0, p.size, 0, TAU); ctx.fill(); },
  bubble: (ctx, p) => {
    ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(0, 0, p.size, 0, TAU); ctx.stroke();
    ctx.beginPath(); ctx.arc(-p.size * 0.35, -p.size * 0.35, p.size * 0.25, 0, TAU); ctx.fill();
  },
  puff: (ctx, p) => {
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
    gradient.addColorStop(0, p.color); gradient.addColorStop(1, `${p.color}00`);
    ctx.fillStyle = gradient; ctx.beginPath(); ctx.arc(0, 0, p.size, 0, TAU); ctx.fill();
  },
  ring: (ctx, p) => { ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, p.size, 0, TAU); ctx.stroke(); },
  streak: (ctx, p) => { ctx.lineWidth = p.size; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-p.length, 0); ctx.lineTo(0, 0); ctx.stroke(); },
  arrow: (ctx, p) => {
    shapes.streak(ctx, p);
    ctx.beginPath(); ctx.moveTo(6 + p.size * 2, 0); ctx.lineTo(-4, -4 - p.size); ctx.lineTo(-4, 4 + p.size); ctx.closePath(); ctx.fill();
  },
  bolt: (ctx, p) => {
    const l = p.length;
    ctx.lineWidth = p.size; ctx.lineJoin = 'round'; ctx.beginPath();
    ctx.moveTo(-l / 2, 0); ctx.lineTo(-l / 6, -l / 4); ctx.lineTo(l / 6, l / 4); ctx.lineTo(l / 2, 0); ctx.stroke();
  },
  shard: (ctx, p) => { ctx.beginPath(); ctx.moveTo(0, -p.size); ctx.lineTo(p.size * 0.6, p.size); ctx.lineTo(-p.size * 0.6, p.size * 0.7); ctx.closePath(); ctx.fill(); },
  drop: (ctx, p) => {
    ctx.beginPath(); ctx.moveTo(0, -p.size * 1.6);
    ctx.quadraticCurveTo(p.size, 0, 0, p.size); ctx.quadraticCurveTo(-p.size, 0, 0, -p.size * 1.6); ctx.fill();
  },
  leaf: (ctx, p) => {
    ctx.beginPath(); ctx.ellipse(0, 0, p.size, p.size * 0.45, 0, 0, TAU); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-p.size, 0); ctx.lineTo(p.size, 0); ctx.stroke();
  },
  square: (ctx, p) => { ctx.fillRect(-p.size, -p.size / 3, p.size * 2, p.size * 0.66); },
  star: (ctx, p) => {
    const s = p.size;
    ctx.beginPath(); ctx.moveTo(0, -s * 2);
    ctx.quadraticCurveTo(0, 0, s * 2, 0); ctx.quadraticCurveTo(0, 0, 0, s * 2);
    ctx.quadraticCurveTo(0, 0, -s * 2, 0); ctx.quadraticCurveTo(0, 0, 0, -s * 2); ctx.fill();
  },
  hex: (ctx, p) => {
    ctx.lineWidth = 2; ctx.beginPath();
    for (let i = 0; i < 6; i += 1) { const a = (i / 6) * TAU; ctx.lineTo(Math.cos(a) * p.size, Math.sin(a) * p.size); }
    ctx.closePath(); ctx.stroke();
  },
  butterfly: (ctx, p) => {
    const flap = Math.abs(Math.sin(p.age * 0.25 + p.seed)) * 0.8 + 0.2;
    ctx.beginPath(); ctx.ellipse(-p.size * 0.55 * flap, -p.size * 0.2, p.size * 0.6 * flap, p.size * 0.8, -0.5, 0, TAU); ctx.fill();
    ctx.beginPath(); ctx.ellipse(p.size * 0.55 * flap, -p.size * 0.2, p.size * 0.6 * flap, p.size * 0.8, 0.5, 0, TAU); ctx.fill();
  },
  thorn: (ctx, p) => {
    ctx.beginPath(); ctx.moveTo(0, -p.size * 1.8); ctx.lineTo(p.size * 0.35, 0); ctx.lineTo(0, p.size * 0.6); ctx.lineTo(-p.size * 0.35, 0); ctx.closePath(); ctx.fill();
  },
  gear: (ctx, p) => {
    ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(0, 0, p.size * 0.6, 0, TAU); ctx.stroke();
    for (let i = 0; i < 8; i += 1) {
      const a = (i / 8) * TAU;
      ctx.beginPath(); ctx.moveTo(Math.cos(a) * p.size * 0.6, Math.sin(a) * p.size * 0.6); ctx.lineTo(Math.cos(a) * p.size, Math.sin(a) * p.size); ctx.stroke();
    }
  },
};
