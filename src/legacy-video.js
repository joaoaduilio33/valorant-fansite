import { videoMarkup } from './video.js';

document.querySelectorAll('.trailer-wrap iframe').forEach((frame) => {
  const url = new URL(frame.src);
  const id = url.pathname.startsWith('/embed/') ? url.pathname.split('/')[2] : url.searchParams.get('v');
  const markup = videoMarkup(id, frame.title);
  if (markup) frame.closest('.trailer-wrap').outerHTML = markup;
});
