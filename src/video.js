import './video.css';

export function videoMarkup(id, name = 'agente') {
  if (!/^[\w-]{11}$/.test(id)) return '';
  const safeName = name.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  return `<section class="agent-video" data-video="${id}">
    <div class="video-frame"><iframe src="https://www.youtube.com/embed/${id}?playsinline=1" title="Vídeo de ${safeName}" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
    <p class="video-help">Se o vídeo não carregar ou a reprodução estiver bloqueada, abra no YouTube.</p>
    <div class="video-actions"><a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">Assistir no YouTube ↗</a><button type="button" class="video-retry">Recarregar vídeo</button></div>
  </section>`;
}

// Recreating the iframe also lets the user recover from a transient network failure.
document.addEventListener('click', (event) => {
  const retry = event.target.closest('.video-retry');
  if (!retry) return;
  const frame = retry.closest('.agent-video').querySelector('iframe');
  frame.replaceWith(frame.cloneNode(true));
});
