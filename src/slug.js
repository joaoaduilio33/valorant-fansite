// "KAY/O" → "kayo", "Jett" → "jett". Shared by the page generator and the browser code.
export const slugify = (name) => name.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
