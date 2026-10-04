import videoCredits from './video-credits.json' with { type: 'json' };

const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));

const copy = {
  pt: { title: 'Vídeo de', play: 'Assistir ao vídeo de', credits: 'Créditos do vídeo', rights: 'Vídeo exibido pelo player oficial do YouTube. Os direitos sobre o vídeo pertencem aos respectivos titulares. Este fansite não reivindica autoria nem possui afiliação ou patrocínio dos canais citados. VALORANT e seus elementos pertencem à Riot Games.', help: 'Se o vídeo não carregar ou a reprodução estiver bloqueada, abra no YouTube.', watch: 'Assistir no YouTube', retry: 'Recarregar vídeo' },
  en: { title: 'Video of', play: 'Play the video of', credits: 'Video credits', rights: 'Video shown through the official YouTube player. Rights to the video belong to their respective owners. This fansite claims no authorship and has no affiliation with or sponsorship from the channels credited. VALORANT and its elements belong to Riot Games.', help: 'If the video does not load or playback is blocked, open it on YouTube.', watch: 'Watch on YouTube', retry: 'Reload video' },
};

// Shows the YouTube thumbnail first; the player (kept in a <template>) loads only on click.
export function videoMarkup(id, name = 'agente', lang = 'pt') {
  if (!/^[\w-]{11}$/.test(id)) return '';
  const t = copy[lang] ?? copy.pt;
  const safeName = escapeHtml(name);
  const credit = videoCredits[id];
  return `<section class="agent-video" data-video="${id}">
    <div class="video-frame">
      <button type="button" class="video-poster" aria-label="${t.play} ${safeName}"><img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy"><span class="video-play" aria-hidden="true"></span></button>
      <template><iframe src="https://www.youtube.com/embed/${id}?playsinline=1&autoplay=1" title="${t.title} ${safeName}" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></template>
    </div>
    <div class="video-credits">
      ${credit ? `<p class="credit-tags"><span>${t.credits}</span><a href="${escapeHtml(credit.channelUrl)}" target="_blank" rel="noopener">${escapeHtml(credit.author)}</a><a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">${escapeHtml(credit.title)} ↗</a></p>` : ''}
      <p>${t.rights}</p>
    </div>
    <p class="video-help">${t.help}</p>
    <div class="video-actions"><a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">${t.watch} ↗</a><button type="button" class="video-retry">${t.retry}</button></div>
  </section>`;
}

function play(video) {
  const poster = video.querySelector('.video-poster');
  const template = video.querySelector('template');
  if (poster && template) poster.replaceWith(template.content.cloneNode(true));
}

// Loads the player on demand, and recreates it to recover from a transient network failure.
if (typeof document !== 'undefined') {
  document.addEventListener('click', (event) => {
    const retry = event.target.closest('.video-retry');
    if (retry) {
      const video = retry.closest('.agent-video');
      const frame = video.querySelector('iframe');
      if (frame) frame.replaceWith(frame.cloneNode(true));
      else play(video);
      return;
    }
    const poster = event.target.closest('.video-poster');
    if (poster) play(poster.closest('.agent-video'));
  });
}
