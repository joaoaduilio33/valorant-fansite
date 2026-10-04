// Real-world location of each standard map and whether it is in the current competitive rotation,
// from the official wiki (wiki.playvalorant.com/en-us/Maps). `flag` is a flag-icons code (src/flags/).
export const mapInfo = {
  abyss: { flag: 'no', place: { pt: 'Sør-Jan, Jan Mayen, Noruega', en: 'Sør-Jan, Jan Mayen, Norway' }, pool: true },
  ascent: { flag: 'it', place: { pt: 'Veneza, Itália', en: 'Venice, Italy' }, pool: true },
  bind: { flag: 'ma', place: { pt: 'Rabat, Marrocos', en: 'Rabat, Morocco' }, pool: false },
  breeze: { flag: null, place: { pt: 'Triângulo das Bermudas, Oceano Atlântico', en: 'Bermuda Triangle, Atlantic Ocean' }, pool: false },
  corrode: { flag: 'fr', place: { pt: 'Mont-Saint-Michel, França', en: 'Mont-Saint-Michel, France' }, pool: false },
  fracture: { flag: 'us', place: { pt: 'Condado de Santa Fe, Novo México, EUA', en: 'Santa Fe County, New Mexico, USA' }, pool: false },
  haven: { flag: 'bt', place: { pt: 'Thimphu, Butão', en: 'Thimphu, Bhutan' }, pool: true },
  icebox: { flag: 'ru', place: { pt: 'Ilha Bennett, Rússia', en: 'Bennett Island, Russia' }, pool: false },
  lotus: { flag: 'in', place: { pt: 'Gates Ocidentais, Índia', en: 'Western Ghats, India' }, pool: true },
  pearl: { flag: 'pt', place: { pt: 'Lisboa, Portugal', en: 'Lisbon, Portugal' }, pool: false },
  split: { flag: 'jp', place: { pt: 'Tóquio, Japão', en: 'Tokyo, Japan' }, pool: true },
  summit: { flag: 'cn', place: { pt: 'Zhangjiajie, Hunan, China', en: 'Zhangjiajie, Hunan, China' }, pool: true },
  sunset: { flag: 'us', place: { pt: 'Los Angeles, Califórnia, EUA', en: 'Los Angeles, California, USA' }, pool: true },
};

// World coordinates → position on the API minimap image (0–1 on each axis). Note the swapped axes,
// as documented by valorant-api.com.
export function calloutPosition(map, location) {
  return {
    x: location.y * map.xMultiplier + map.xScalarToAdd,
    y: location.x * map.yMultiplier + map.yScalarToAdd,
  };
}

// "ECalloutSuperRegion::AttackerSide" → "AttackerSide"
export const regionKey = (callout) => String(callout.superRegion ?? '').split('::').pop();
