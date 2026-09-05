import { regions as furanoRegions, venues as furanoVenues } from './places-furano.js';
import { regions as asahikawaRegions, venues as asahikawaVenues } from './places-asahikawa.js';
import { createVenueMap } from './venue-map.js';
import { members } from './members.js';

const regions = [...furanoRegions, ...asahikawaRegions].sort((a, b) => ['furano', 'asahikawa', 'airport'].indexOf(a.id) - ['furano', 'asahikawa', 'airport'].indexOf(b.id));
const venues = [...furanoVenues, ...asahikawaVenues];
const kinds = { restaurant: '食店', cafe: 'Cafe・甜品', bar: '酒吧', sight: '景點' };
const filters = [
  { id: 'dining', label: '食店全覽', matches: place => place.kind !== 'sight' },
  { id: 'hotel', label: '酒店餐飲', matches: place => place.hotel && place.kind !== 'sight' },
  { id: 'cafe', label: 'Cafe・酒吧', matches: place => place.kind === 'cafe' || place.kind === 'bar' },
  { id: 'sight', label: '景點', matches: place => place.kind === 'sight' },
];
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const externalLink = (label, url, className = 'text-link') => `<a class="${className}" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} <span aria-hidden="true">↗</span></a>`;

function distanceKm(base, place) {
  const radians = Math.PI / 180;
  const latitude = (place.lat - base.lat) * radians;
  const longitude = (place.lon - base.lon) * radians;
  const a = Math.sin(latitude / 2) ** 2 + Math.cos(base.lat * radians) * Math.cos(place.lat * radians) * Math.sin(longitude / 2) ** 2;
  return 6371.0088 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1 - a)));
}

function distanceLabel(region, place) {
  if (region.id === 'airport') return '航廈內・樓層見卡片';
  if (place.hotel && place.lat === region.base.lat && place.lon === region.base.lon) return '酒店內';
  if (place.distance < 0.1) return '直線不足 100 m';
  return place.distance < 1 ? `直線約 ${Math.round(place.distance * 100) * 10} m` : `直線約 ${place.distance.toFixed(1)} km`;
}

function routeURL(base, place) {
  const params = new URLSearchParams({ api: '1', origin: `${base.lat},${base.lon}`, destination: `${place.lat},${place.lon}` });
  return `https://www.google.com/maps/dir/?${params}`;
}

function reviewCard(provider, review) {
  const verified = Number.isFinite(review.score);
  return `<div class="venue-review${verified ? '' : ' unrated'}" data-review-provider="${provider}">
    <a class="venue-rating" href="${escapeHtml(review.url)}" target="_blank" rel="noopener noreferrer">
      <span class="venue-review-brand">${provider === 'google' ? 'Google' : '食べログ'}<small>${provider === 'google' ? 'MAPS REVIEWS' : 'TABELOG'} ↗</small></span>
      <strong${verified ? '' : ' class="review-unverified"'}>${verified ? `${review.score.toFixed(provider === 'google' ? 1 : 2)}<small> / 5</small>` : '未核實'}</strong>
      <span class="venue-review-count">${Number.isInteger(review.reviews) ? `${review.reviews.toLocaleString('en-US')} 則評價` : '評價數未核實'}</span>
    </a>
    <p class="venue-review-date">${escapeHtml(review.checked)} 查核${verified ? '・快照' : ''}</p>
    <details class="review-evidence"><summary>店舖及評分備註</summary><p>${escapeHtml(review.name)}</p><p>${escapeHtml(review.note)}</p></details>
  </div>`;
}

function venueCard(place, region) {
  const dining = place.kind !== 'sight';
  return `<article class="card venue-card" id="venue-${place.id}" data-venue-card="${place.id}" aria-labelledby="venue-title-${place.id}">
    <div class="venue-card-top"><span class="venue-number" aria-label="地圖編號 ${place.number}">${String(place.number).padStart(2, '0')}</span><span class="venue-area">${escapeHtml(place.area)}</span><span class="tag${place.hotel ? ' green' : ''}">${place.hotel ? '酒店範圍・' : ''}${kinds[place.kind]}</span></div>
    <h4 id="venue-title-${place.id}" tabindex="-1">${escapeHtml(place.name)}</h4>
    <p class="venue-summary">${escapeHtml(place.summary)}</p>
    <div class="venue-distance"><strong>${escapeHtml(distanceLabel(region, place))}</strong><span>${region.id === 'airport' ? '共用航廈定位，不作室內導航' : `由 ${escapeHtml(region.base.name)}`}</span></div>
    ${dining ? `<div class="venue-reviews">${reviewCard('google', place.google)}${place.tabelog.map(review => reviewCard('tabelog', review)).join('')}</div>` : ''}
    <p class="venue-access"><strong>點去：</strong>${escapeHtml(place.access)}</p>
    <div class="venue-actions"><button type="button" class="button secondary venue-pin-button" data-venue-select="${place.id}" aria-pressed="false">地圖定位</button>${externalLink(region.id === 'airport' ? 'Google Maps 店舖' : 'Google Maps 路線', region.id === 'airport' ? place.mapsUrl : routeURL(region.base, place), 'text-link venue-route')}</div>
    <details class="venue-details"><summary>訂位、營業及資料來源</summary>
      ${place.booking ? `<p><strong>安排：</strong>${escapeHtml(place.booking)}</p>` : ''}
      ${place.note ? `<p><strong>留意：</strong>${escapeHtml(place.note)}</p>` : ''}
      <p class="meta"><strong>定位：</strong>${escapeHtml(place.coordinateNote)}</p>
      <div class="source-links">${externalLink('店舖地圖', place.mapsUrl)} ${place.sources.map(source => externalLink(source.label, source.url)).join(' ')}</div>
    </details>
  </article>`;
}

export function renderExplore(container) {
  let region = regions[0];
  let filter = filters[0];
  let sort = 'distance';
  let selectedId = null;
  let visible = [];
  const regionalVenues = new Map(regions.map(item => [item.id, venues.filter(place => place.region === item.id).map(place => ({ ...place, distance: distanceKm(item.base, place) }))]));

  container.innerHTML = `<header class="section-intro">
      <p class="eyebrow">FOOD ATLAS / 按地區搵食</p>
      <h2 class="section-title">睇位置，再揀食乜。</h2>
      <p class="muted">富良野、旭川、新千歲。由酒店附近到地道食店，唔使跟指定日子；酒店餐廳冇獨立評分一樣保留。</p>
    </header>
    <div class="location-tabs" role="group" aria-label="選擇食店地區">${regions.map(item => `<button type="button" class="location-tab" data-explore-region="${item.id}" aria-pressed="false" aria-controls="location-results"><span>${escapeHtml(item.name)}</span><small>${regionalVenues.get(item.id).filter(place => place.kind !== 'sight').length} 間食店</small></button>`).join('')}</div>
    <header class="location-intro" id="location-intro"></header>
    <div class="location-toolbar"><div class="pill-row location-filters" role="group" aria-label="篩選地點類型">${filters.map(item => `<button type="button" class="pill" data-place-filter="${item.id}" aria-pressed="false" aria-controls="location-results">${item.label}</button>`).join('')}</div>
      <label class="venue-sort">排序<select id="venue-sort"><option value="distance">由酒店近至遠</option><option value="google">Google 評分</option><option value="tabelog">Tabelog 評分</option></select></label>
    </div>
    <p id="explore-selection-status" class="meta" role="status" aria-live="polite" aria-atomic="true"></p>
    <div class="location-layout"><aside class="location-map-panel" aria-label="地點地圖"><div id="venue-map"></div><p class="map-distance-note">連線及距離只係直線參考，唔係步行／行車路線。雪路、斜路同過河可能要兜路；用 Google Maps 查實際交通，唔好按直線距離估時間。</p></aside><section id="location-results" class="venue-list" aria-label="地區食店與景點"></section></div>
    <aside class="callout location-advice"><strong>一團人，先問位再出發。</strong><p>餐位及接送未確認。按實際人數（${members.filter(member => member.attendance === 'O').length} 人出席／最多 ${members.length} 人）、過敏、預算及分桌需要訂位；全程不自駕，的士／包車先約。2027 營業、價格及座位請再核實。</p></aside>
    <details class="card location-sources"><summary>地圖、評分及資料點睇</summary><p>Google 同 Tabelog 都係 5 分制，但用戶群及計分方法不同，唔直接混合平均。每個平台獨立顯示查核日期、評價數及原頁連結；分數係人工查核快照，唔係即時資料。</p><p>「未核實」唔代表冇人食過，亦唔係零分。酒店餐廳以官方店舖資料確認，冇獨立食店評分就保留空白；唔會套用酒店總分、另一間分店或歷史餐廳分數。食物推薦唔採用旅遊博客口味評語。</p><p>地圖由本機 Leaflet 顯示，按「載入地圖」後才向 OpenStreetMap 要求圖磚；不讀取你的位置。相同酒店／航廈內店舖可能共用定位，請以樓層資料找店。餐廳卡及外部路線連結不依賴圖磚載入。</p></details>`;

  const panel = container.querySelector('#location-results');
  const mapContainer = container.querySelector('#venue-map');
  const status = container.querySelector('#explore-selection-status');
  const map = createVenueMap(mapContainer, { onSelect: id => selectVenue(id, true) });

  function selectVenue(id, fromMap = false) {
    const place = visible.find(item => item.id === id);
    if (!place) return;
    selectedId = id;
    panel.querySelectorAll('[data-venue-card]').forEach(card => card.classList.toggle('selected', card.dataset.venueCard === id));
    panel.querySelectorAll('[data-venue-select]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.venueSelect === id)));
    map.select(id);
    status.textContent = `${region.name} · ${place.number} ${place.name} · ${distanceLabel(region, place)}`;
    if (fromMap) {
      const heading = panel.querySelector(`#venue-title-${id}`);
      heading.focus({ preventScroll: true });
      heading.closest('article').scrollIntoView({ block: 'nearest', behavior: 'instant' });
    } else {
      mapContainer.scrollIntoView({ block: 'center', behavior: 'instant' });
    }
  }

  function update() {
    const inRegion = regionalVenues.get(region.id);
    visible = inRegion.filter(filter.matches);
    const score = place => sort === 'google' ? (place.google.score ?? -1) : Math.max(-1, ...place.tabelog.map(review => review.score ?? -1));
    visible.sort((a, b) => (sort === 'distance' ? 0 : score(b) - score(a)) || a.distance - b.distance || a.name.localeCompare(b.name, 'zh-HK'));
    visible = visible.map((place, index) => ({ ...place, number: index + 1 }));
    if (!visible.some(place => place.id === selectedId)) selectedId = null;
    container.querySelectorAll('[data-explore-region]').forEach(button => {
      const active = button.dataset.exploreRegion === region.id;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    container.querySelectorAll('[data-place-filter]').forEach(button => {
      const item = filters.find(candidate => candidate.id === button.dataset.placeFilter);
      const count = inRegion.filter(item.matches).length;
      button.textContent = `${item.label} ${count}`;
      button.classList.toggle('active', item.id === filter.id);
      button.setAttribute('aria-pressed', String(item.id === filter.id));
      button.disabled = count === 0;
    });
    container.querySelector('#venue-sort option[value="distance"]').textContent = region.id === 'airport' ? '按航廈定位' : '由酒店近至遠';
    container.querySelector('#location-intro').innerHTML = `<div><p class="eyebrow">${escapeHtml(region.id.toUpperCase())} / LOCAL GUIDE</p><h3>${escapeHtml(region.name)}</h3><p>${escapeHtml(region.description)}</p></div><div class="location-base"><span>距離基準</span>${externalLink(region.base.name, region.base.url)}<p>${escapeHtml(region.note)}</p></div>`;
    panel.innerHTML = visible.length ? visible.map(place => venueCard(place, region)).join('') : '<p class="callout">這區暫時冇符合篩選的地點，請改選「食店全覽」。</p>';
    status.textContent = `${region.name} · ${filter.label} · ${visible.length} 個地點${sort === 'distance' ? '' : ' · 未核實評分排後'}。地圖編號與卡片相同。`;
    map.setPlaces({ base: region.base, places: visible.map(place => ({ id: place.id, name: place.name, lat: place.lat, lon: place.lon, number: place.number, distanceLabel: distanceLabel(region, place) })), selectedId });
    if (selectedId) {
      panel.querySelector(`[data-venue-card="${selectedId}"]`)?.classList.add('selected');
      panel.querySelector(`[data-venue-select="${selectedId}"]`)?.setAttribute('aria-pressed', 'true');
    }
  }

  container.querySelectorAll('[data-explore-region]').forEach(button => button.addEventListener('click', () => {
    region = regions.find(item => item.id === button.dataset.exploreRegion);
    if (!regionalVenues.get(region.id).some(filter.matches)) filter = filters[0];
    selectedId = null;
    update();
  }));
  container.querySelectorAll('[data-place-filter]').forEach(button => button.addEventListener('click', () => { filter = filters.find(item => item.id === button.dataset.placeFilter); update(); }));
  container.querySelector('#venue-sort').addEventListener('change', event => { sort = event.target.value; update(); });
  panel.addEventListener('click', event => { const button = event.target.closest('[data-venue-select]'); if (button) selectVenue(button.dataset.venueSelect); });
  update();
}
