import './video.css';
import videoCredits from './video-credits.json';

const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));

export function videoMarkup(id, name = 'agente') {
  if (!/^[\w-]{11}$/.test(id)) return '';
  const safeName = escapeHtml(name);
  const credit = videoCredits[id];
  return `<section class="agent-video" data-video="${id}">
    <div class="video-frame"><iframe src="https://www.youtube.com/embed/${id}?playsinline=1" title="Vídeo de ${safeName}" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
    <div class="video-credits">
      ${credit ? `<p><strong>Créditos do vídeo:</strong> <a href="${escapeHtml(credit.channelUrl)}" target="_blank" rel="noopener">${escapeHtml(credit.author)}</a></p><p><a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">${escapeHtml(credit.title)} ↗</a></p>` : ''}
      <p>Vídeo exibido pelo player oficial do YouTube. Os direitos sobre o vídeo pertencem aos respectivos titulares. Este fansite não reivindica autoria nem possui afiliação ou patrocínio dos canais citados. VALORANT e seus elementos pertencem à Riot Games.</p>
    </div>
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
