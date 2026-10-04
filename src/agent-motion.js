// Interactions for the agent poster: depth parallax, scroll reveals, keyboard navigation
// and a short exit transition. Everything is skipped when the visitor prefers reduced motion.
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function setupParallax(poster) {
  if (reducedMotion() || !matchMedia('(pointer: fine)').matches) return;
  let frame = 0;
  poster.addEventListener('pointermove', (event) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const box = poster.getBoundingClientRect();
      poster.style.setProperty('--px', (((event.clientX - box.left) / box.width) * 2 - 1).toFixed(3));
      poster.style.setProperty('--py', (((event.clientY - box.top) / box.height) * 2 - 1).toFixed(3));
    });
  });
  poster.addEventListener('pointerleave', () => { poster.style.setProperty('--px', 0); poster.style.setProperty('--py', 0); });
}

export function setupReveal(root) {
  const items = root.querySelectorAll('.reveal');
  if (reducedMotion() || !('IntersectionObserver' in window)) { items.forEach((item) => item.classList.add('is-visible')); return; }
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  }), { threshold: 0.15 });
  items.forEach((item) => observer.observe(item));
}

// Fade the page out before following prev/next links, so switching agents feels continuous.
export function leaveTo(href) {
  if (reducedMotion()) { location.href = href; return; }
  document.body.classList.add('is-leaving');
  setTimeout(() => { location.href = href; }, 260);
}

export function setupKeyboard(prevHref, nextHref) {
  const onKey = (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest?.('input, textarea, select, [contenteditable]')) return;
    if (event.key === 'ArrowLeft') leaveTo(prevHref);
    if (event.key === 'ArrowRight') leaveTo(nextHref);
  };
  document.addEventListener('keydown', onKey);
  return () => document.removeEventListener('keydown', onKey);
}
