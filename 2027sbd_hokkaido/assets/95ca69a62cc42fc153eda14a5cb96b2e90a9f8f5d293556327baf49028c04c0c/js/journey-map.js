import { coastline } from './hokkaido-coastline.js';

// Local equirectangular projection, corrected for longitude scale at 43.5° N.
// Coastline and approximate city/resort reference pins share this projection.
const project = ([lon, lat]) => [24 + (lon - 139.35) * 49, 24 + (45.55 - lat) * 67.5];
const points = {
  cts: { name: '新千歲 CTS', coord: [141.68, 42.775], label: [72, 249] },
  furano: { name: '富良野', coord: [142.383, 43.342], label: [228, 191] },
  asahikawa: { name: '旭川', coord: [142.365, 43.77], label: [220, 105] },
  kitanomine: { name: '北之峰', coord: [142.359, 43.342] },
  higashikawa: { name: '東川・候選停靠', coord: [142.51, 43.70] },
  kamui: { name: '神居', coord: [142.235, 43.733] },
  pippu: { name: '比布', coord: [142.477, 43.925] },
  santa: { name: 'Santa', coord: [142.354, 43.72] },
  asahidake: { name: '旭岳・條件式', coord: [142.80, 43.65] },
};
const plans = [
  { active: ['cts', 'furano'], route: ['cts', 'furano'], title: '新千歲 → 富良野', note: '抵達日 · 富良野入住', base: 'furano' },
  { active: ['furano'], title: '富良野區', note: '上雪 01 · 富良野基地', base: 'furano' },
  { active: ['kitanomine'], title: '富良野・北之峰', note: '上雪 02 · 按程度分線', base: 'furano' },
  { active: ['furano', 'asahikawa'], options: ['higashikawa'], route: ['furano', 'asahikawa'], title: '富良野 → 旭川', note: '轉酒店 · 東川蒸留所及其他停靠待確認', base: 'asahikawa' },
  { active: ['kamui'], options: ['santa'], title: '神居 Kamui', note: '上雪 03 · Santa 夜滑可選', base: 'asahikawa' },
  { active: ['asahikawa'], options: ['kamui', 'pippu', 'santa'], title: '旭川周邊・自由分組', note: '神居／比布／Santa 擇一，或市區休息', base: 'asahikawa', region: true },
  { active: ['asahikawa'], options: ['kamui', 'pippu', 'asahidake'], title: '旭川周邊・最後雪日', note: '神居／比布可選；旭岳只限條件齊備高手', base: 'asahikawa', region: true },
  { active: ['asahikawa', 'cts'], route: ['asahikawa', 'cts'], title: '旭川 → 新千歲', note: '返程日 · 各自預約機場交通' },
];
const xy = key => project(points[key].coord);
const line = keys => keys.map((key, i) => `${i ? 'L' : 'M'}${xy(key).join(' ')}`).join(' ');
const land = coastline.map(ring => ring.map((coord, i) => `${i ? 'L' : 'M'}${project(coord).map(n => n.toFixed(2)).join(' ')}`).join(' ') + 'Z').join(' ');

export function renderJourneyMap() {
  return `<aside id="journey-map" class="journey-map" aria-labelledby="journey-map-heading">
    <p class="eyebrow">HOKKAIDO / DAILY ROUTE</p><h3 id="journey-map-heading">兩個基地，五日上雪</h3>
    <button type="button" class="journey-map-zoom" aria-pressed="false" aria-controls="journey-map-svg">＋ 放大地圖</button>
    <svg id="journey-map-svg" viewBox="0 0 380 320" role="img" aria-labelledby="journey-map-title journey-map-description">
      <title id="journey-map-title">北海道行程地圖</title><desc id="journey-map-description"></desc>
      <defs><linearGradient id="journey-land" x2="1" y2="1"><stop stop-color="#224c68"/><stop offset="1" stop-color="#102b40"/></linearGradient><pattern id="journey-grid" width="38" height="38" patternUnits="userSpaceOnUse"><path d="M38 0H0V38" fill="none" stroke="#71d7ff" stroke-opacity=".05"/></pattern></defs>
      <rect width="380" height="320" fill="url(#journey-grid)"/>
      <path d="${land}" fill="url(#journey-land)" stroke="#48728a" stroke-width="1.2" stroke-linejoin="round"/>
      <text x="25" y="42" class="map-water">N ↑</text><text x="245" y="277" class="map-water">HOKKAIDO</text>
      <path d="${line(['cts','furano','asahikawa'])}" class="journey-route-context"/>
      <g id="journey-map-selection"></g>
      ${['cts','furano','asahikawa'].map(key => { const [x,y]=xy(key); const [lx,ly]=points[key].label; return `<g class="journey-city" data-map-city="${key}"><path d="M${x} ${y}L${lx-5} ${ly-4}" class="journey-label-line"/><circle cx="${x}" cy="${y}" r="3"/><text x="${lx}" y="${ly}">${points[key].name}</text></g>`; }).join('')}
    </svg>
    <div class="journey-map-status" role="status" aria-live="polite" aria-atomic="true"></div>
    <div class="map-legend"><span><i></i>當日地點</span><span><i class="map-option-key"></i>可選地點</span></div>
    <p class="journey-map-source">地點為約略位置；虛線為移動示意，非道路。<br>海岸線：<a href="https://www.naturalearthdata.com/about/terms-of-use/" target="_blank" rel="noopener noreferrer">Natural Earth</a></p>
    <button type="button" class="text-link" data-goto="transport">交通及訂車 ↗</button>
  </aside>`;
}

export function updateJourneyMap(index) {
  const zoomButton = document.querySelector('.journey-map-zoom');
  zoomButton.onclick = () => {
    const zoomed = zoomButton.getAttribute('aria-pressed') !== 'true';
    zoomButton.setAttribute('aria-pressed', String(zoomed));
    zoomButton.textContent = zoomed ? '− 顯示全北海道' : '＋ 放大地圖';
    document.querySelector('#journey-map-svg').setAttribute('viewBox', zoomed ? '65 85 210 176.842' : '0 0 380 320');
  };
  const plan = plans[index];
  const selected = document.querySelector('#journey-map-selection');
  const [cx,cy] = xy('asahikawa');
  selected.innerHTML = `${plan.region ? `<circle cx="${cx}" cy="${cy}" r="29" class="journey-region"/>` : ''}
    ${plan.route ? `<path d="${line(plan.route)}" class="route-trace journey-route-active"/>` : ''}
    ${plan.active.map(key => { const [x,y]=xy(key); return `<g data-map-active="${key}"><title>${points[key].name}</title><circle cx="${x}" cy="${y}" r="12" class="journey-pin-halo"/><circle cx="${x}" cy="${y}" r="5" class="journey-pin-active"/></g>`; }).join('')}
    ${(plan.options || []).map(key => { const [x,y]=xy(key); return `<circle data-map-option="${key}" cx="${x}" cy="${y}" r="4" class="journey-pin-option"><title>${points[key].name}（可選）</title></circle>`; }).join('')}`;
  document.querySelectorAll('[data-map-city]').forEach(city => city.classList.toggle('is-active', plan.active.includes(city.dataset.mapCity) || city.dataset.mapCity === plan.base));
  document.querySelector('.journey-map-status').innerHTML = `<span class="eyebrow">03.${String(index+6).padStart(2,'0')} / DAY 0${index+1}</span><strong>${plan.title}</strong><p>${plan.note}</p>`;
  document.querySelector('#journey-map-description').textContent = `3 月 ${index+6} 日：${plan.title}。${plan.note}。實心光圈為當日地點，空心圈為可選地點；連線非實際道路。`;
}
