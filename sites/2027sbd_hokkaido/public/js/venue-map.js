import "../vendor/leaflet/leaflet.js";

const L = globalThis.L;
const tileUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function button(className, text) {
  const node = element("button", className, text);
  node.type = "button";
  return node;
}

function coordinates(place) {
  return [place.lat, place.lon];
}

export function createVenueMap(container, { onSelect } = {}) {
  const root = element("section", "venue-map");
  root.setAttribute("aria-label", "地點互動地圖");
  const header = element("div", "venue-map-header");
  const heading = element("div");
  heading.append(element("p", "venue-map-eyebrow", "LOCATION MAP"));
  const title = element("h3", "venue-map-title", "位置地圖");
  heading.append(title);
  const count = element("span", "venue-map-count", "請先選擇地區");
  header.append(heading, count);

  const stage = element("div", "venue-map-stage");
  const placeholder = element("div", "venue-map-placeholder");
  placeholder.append(
    element("span", "venue-map-placeholder-label", "按需要開啟"),
    element("h4", "", "將心水地點放到地圖上"),
    element("p", "", "查看住宿或客運大樓附近的位置；選取號碼，就會顯示基準點到地點的直線連線。"),
  );
  const loadButton = button("venue-map-button venue-map-load", "載入互動地圖");
  loadButton.disabled = true;
  placeholder.append(loadButton);
  const privacy = element("p", "venue-map-privacy", "按下後才會向 OpenStreetMap 載入底圖，對方會收到 IP、本站來源及所瀏覽的地圖範圍。不會取得你的位置，亦沒有追蹤或 API 金鑰。");
  const privacyLink = element("a", "", "OSMF 私隱政策");
  privacyLink.href = "https://osmfoundation.org/wiki/Privacy_Policy";
  privacy.append(" ", privacyLink);
  placeholder.append(privacy);
  const viewport = element("div", "venue-map-canvas");
  viewport.hidden = true;
  viewport.tabIndex = 0;
  viewport.setAttribute("role", "region");
  viewport.setAttribute("aria-label", "互動地圖：方向鍵移動，加減鍵縮放；Tab 選取地點號碼，Enter 或空白鍵開啟");
  stage.append(placeholder, viewport);

  const toolbar = element("div", "venue-map-toolbar");
  toolbar.hidden = true;
  const fitButton = button("venue-map-button venue-map-fit", "顯示全部地點");
  toolbar.append(fitButton, element("p", "", "拖曳移動 · ＋／− 縮放 · 手機雙指縮放"));
  const network = element("div", "venue-map-network");
  network.hidden = true;
  const tileStatus = element("p", "venue-map-tile-status");
  tileStatus.setAttribute("role", "status");
  const retryButton = button("venue-map-button venue-map-retry", "重試載入底圖");
  retryButton.hidden = true;
  network.append(tileStatus, retryButton);
  const legend = element("div", "venue-map-legend");
  legend.append(
    element("span", "venue-map-legend-base", "基準：住宿／客運大樓"),
    element("span", "venue-map-legend-place", "號碼：地點卡"),
    element("span", "venue-map-legend-line", "虛線：直線距離，非交通路線"),
  );
  const selection = element("p", "venue-map-selection");
  selection.setAttribute("role", "status");
  const note = element("p", "venue-map-note", "座標只作位置參考，不代表入口。同座標地點會共用一組號碼；機場／酒店內請再查樓層。實際步行或駕車路線請用地點卡的 Google Maps 連結。");
  root.append(header, stage, toolbar, network, legend, selection, note);
  container.replaceChildren(root);

  let base = null;
  let places = [];
  let selectedId = null;
  let map = null;
  let tiles = null;
  let markerLayer = null;
  let selectionLine = null;
  let pendingFit = null;
  let markerPadding = [58, 70];
  let frame = 0;
  let destroyed = false;
  let pinEvents = new AbortController();
  const events = new AbortController();
  const pins = new Map();
  const failedTiles = new Set();
  const tileKey = ({ coords }) => `${coords.z}/${coords.x}/${coords.y}`;

  function scheduleLayout() {
    if (destroyed || !map || frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (destroyed || !viewport.clientWidth || !viewport.clientHeight) return;
      map.invalidateSize({ pan: false, animate: false });
      if (pendingFit) {
        map.fitBounds(L.latLngBounds(pendingFit), {
          paddingTopLeft: markerPadding,
          paddingBottomRight: [markerPadding[0], 45],
          maxZoom: 16,
          animate: false,
        });
        pendingFit = null;
      }
    });
  }

  function fitAll() {
    if (!base) return;
    pendingFit = [coordinates(base), ...places.map(coordinates)];
    scheduleLayout();
  }

  function updateTileStatus() {
    if (destroyed) return;
    const failed = failedTiles.size > 0;
    const loading = Boolean(tiles?.isLoading());
    const message = failed
      ? "部分或全部地圖底圖未能載入。現有底圖、座標號碼及直線連線仍可使用；空白位置不代表道路或地形。"
      : loading
        ? "正在載入 OpenStreetMap 地圖底圖…"
        : "底圖：OpenStreetMap。切換地區或移動地圖會按需要載入；供應狀況不設保證。";
    if (tileStatus.textContent !== message) tileStatus.textContent = message;
    retryButton.hidden = !failed;
    root.classList.toggle("venue-map-tile-error", failed);
    viewport.setAttribute("aria-busy", String(loading));
  }

  function popupContent(place, isBase, pinButton) {
    const content = element("div", "venue-map-popup");
    content.append(
      element("span", "venue-map-popup-label", isBase ? "距離基準點" : `地點 ${place.number}`),
      element("strong", "", place.name),
      element("p", "", isBase
        ? "酒店／客運大樓的參考座標，不代表你的即時位置。"
        : `${place.distanceLabel || "參考距離見地點卡"} · 直線距離，並非步行或駕車路線。`),
      element("p", "venue-map-popup-coordinates", `${place.lat.toFixed(5)}, ${place.lon.toFixed(5)}`),
    );
    const close = button("venue-map-popup-close", "關閉地點提示");
    close.addEventListener("click", () => {
      map.closePopup();
      pinButton.focus({ preventScroll: true });
    }, { once: true });
    content.append(close);
    return content;
  }

  function openPopup(place, isBase, marker, pinButton) {
    L.popup({
      closeButton: false,
      maxWidth: 250,
      minWidth: 150,
      autoPanPadding: [22, 22],
      offset: [0, -marker.options.icon.options.iconSize[1] - 8],
    })
      .setLatLng(coordinates(place))
      .setContent(popupContent(place, isBase, pinButton))
      .openOn(map);
    marker.setZIndexOffset(1000);
  }

  function updateSelection() {
    const selected = places.find((place) => place.id === selectedId);
    for (const [id, pin] of pins) {
      const active = id === selectedId;
      pin.button.setAttribute("aria-pressed", String(active));
      pin.button.classList.toggle("is-selected", active);
      pin.marker.setZIndexOffset(0);
    }
    if (selected) pins.get(selected.id)?.marker.setZIndexOffset(1000);
    if (selectionLine) {
      selectionLine.remove();
      selectionLine = null;
    }
    if (!base || !selected) {
      selection.textContent = "選取地點號碼，查看與基準點的直線距離；不是交通路線。";
      return;
    }
    const sameCoordinates = base.lat === selected.lat && base.lon === selected.lon;
    selection.textContent = `${base.name} → ${selected.name} · ${selected.distanceLabel || "距離見地點卡"}（直線距離，非交通路線）。${sameCoordinates ? " 使用同一參考座標；不代表室內步行距離為零。" : ""}`;
    if (map) {
      selectionLine = L.polyline([coordinates(base), coordinates(selected)], {
        color: "#087caa",
        weight: 4,
        dashArray: "7 8",
        opacity: 0.95,
        interactive: false,
      }).addTo(map);
    }
  }

  function renderPlaces() {
    pinEvents.abort();
    pinEvents = new AbortController();
    markerLayer.clearLayers();
    pins.clear();
    map.closePopup();
    markerPadding = [58, 70];
    if (!base) {
      updateSelection();
      return;
    }

    // Shared building coordinates keep one true anchor, with every numbered
    // button accessible. Do not move venues to invented geographic positions.
    const groups = new Map();
    for (const entry of [{ place: base, isBase: true }, ...places.map((place) => ({ place, isBase: false }))]) {
      const key = `${entry.place.lat},${entry.place.lon}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(entry);
    }
    for (const entries of groups.values()) {
      const columns = Math.min(entries.length, 4);
      const rows = Math.ceil(entries.length / columns);
      const width = columns * 38 + (columns - 1) * 4 + 8;
      const height = rows * 38 + (rows - 1) * 4 + 8;
      markerPadding[0] = Math.max(markerPadding[0], width / 2 + 12);
      markerPadding[1] = Math.max(markerPadding[1], height + 20);
      const group = element("div", "venue-map-pin-group");
      group.style.gridTemplateColumns = `repeat(${columns}, 38px)`;
      const marker = L.marker(coordinates(entries[0].place), {
        icon: L.divIcon({
          className: "venue-map-marker",
          html: group,
          iconSize: [width, height],
          iconAnchor: [width / 2, height + 8],
        }),
        keyboard: false,
        interactive: false,
      });
      for (const { place, isBase } of entries) {
        const pinButton = button(`venue-map-pin${isBase ? " venue-map-pin-base" : ""}`, isBase ? "基準" : String(place.number));
        const label = isBase ? `基準點：${place.name}` : `地點 ${place.number}：${place.name}`;
        pinButton.title = label;
        pinButton.setAttribute("aria-label", label);
        if (!isBase) {
          pinButton.setAttribute("aria-pressed", String(place.id === selectedId));
          pins.set(place.id, { button: pinButton, marker });
        }
        pinButton.addEventListener("click", () => {
          if (!isBase) {
            selectedId = place.id;
            updateSelection();
          }
          openPopup(place, isBase, marker, pinButton);
          if (!isBase && onSelect) onSelect(place.id);
        }, { signal: pinEvents.signal });
        pinButton.addEventListener("focus", () => {
          marker.setZIndexOffset(1000);
          map.panInside(coordinates(place), {
            paddingTopLeft: markerPadding,
            paddingBottomRight: [markerPadding[0], 45],
            animate: false,
          });
        }, { signal: pinEvents.signal });
        group.append(pinButton);
      }
      L.DomEvent.disableClickPropagation(group);
      markerLayer.addLayer(marker);
    }
    updateSelection();
  }

  function loadMap() {
    if (map || destroyed || !base) return;
    placeholder.hidden = true;
    viewport.hidden = false;
    toolbar.hidden = false;
    network.hidden = false;
    map = L.map(viewport, {
      zoomControl: false,
      scrollWheelZoom: false,
      zoomAnimation: false,
      fadeAnimation: false,
      markerZoomAnimation: false,
      minZoom: 2,
      maxZoom: 19,
    });
    L.control.zoom({ zoomInTitle: "放大地圖", zoomOutTitle: "縮細地圖" }).addTo(map);
    L.control.scale({ imperial: false, maxWidth: 100 }).addTo(map);
    markerLayer = L.layerGroup().addTo(map);
    tiles = L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      noWrap: true,
      updateWhenIdle: true,
      updateWhenZooming: false,
      keepBuffer: 1,
    });
    tiles.on("loading load", updateTileStatus);
    tiles.on("tileerror", (event) => {
      failedTiles.add(tileKey(event));
      event.tile.style.visibility = "hidden";
      updateTileStatus();
    });
    tiles.on("tileload tileunload", (event) => {
      failedTiles.delete(tileKey(event));
      updateTileStatus();
    });
    // This is the only tile-layer creation path, reached by explicit consent.
    tiles.addTo(map);
    renderPlaces();
    fitAll();
    viewport.focus({ preventScroll: true });
  }

  loadButton.addEventListener("click", loadMap, { signal: events.signal });
  fitButton.addEventListener("click", fitAll, { signal: events.signal });
  retryButton.addEventListener("click", () => {
    failedTiles.clear();
    tiles.redraw();
    updateTileStatus();
  }, { signal: events.signal });
  const resizeObserver = new ResizeObserver(scheduleLayout);
  resizeObserver.observe(viewport);

  return {
    setPlaces({ base: nextBase, places: nextPlaces, selectedId: nextSelectedId = null }) {
      if (destroyed) return;
      base = nextBase;
      places = nextPlaces;
      selectedId = nextSelectedId;
      title.textContent = base ? `${base.name} 周邊` : "位置地圖";
      count.textContent = `${places.length} 個地點`;
      loadButton.disabled = !base;
      if (map) renderPlaces();
      else updateSelection();
      fitAll();
    },
    select(id) {
      if (destroyed || selectedId === id) return;
      selectedId = id;
      updateSelection();
      const selected = places.find((place) => place.id === id);
      if (map) map.closePopup();
      if (base && selected) {
        pendingFit = [coordinates(base), coordinates(selected)];
        scheduleLayout();
      }
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      events.abort();
      pinEvents.abort();
      if (tiles) tiles.off();
      if (map) map.remove();
      pins.clear();
      failedTiles.clear();
      root.remove();
    },
  };
}
