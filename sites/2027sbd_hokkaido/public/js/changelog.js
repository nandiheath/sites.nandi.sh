const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const prURL = number => `https://github.com/nandiheath/sites.nandi.sh/pull/${number}`;

export const changelog = [
  {
    date: '2026-09-13',
    kind: 'FEATURE',
    title: '新增更新紀錄頁',
    summary: '第一頁顯示最近五項網站更新，並提供完整紀錄頁。',
    detail: '建立單一更新資料來源；往後每次 fix 或 feature 都要加入一筆有日期的紀錄。',
  },
  {
    date: '2026-09-13',
    kind: 'FEATURE',
    title: '新增租裝備・衣物指南',
    summary: '新增富良野、OMO7、雪場租借、穿搭與 Cardo 資訊。',
    detail: '加入官方來源、租具限制、雪鞋及頭盔試身、三月氣候和 2027 未確認項目。',
    url: prURL(26),
    linkLabel: '查看這次更新',
  },
  {
    date: '2026-09-13',
    kind: 'CONTENT',
    title: '更新團友與共用房間狀態',
    summary: '加入 SO SO 及兩組公開共用房間安排；酒店摘要改為動態確認數。',
    detail: '私人房型和房號仍不公開，未確認酒店狀態繼續明確顯示。',
    url: prURL(24),
    linkLabel: '查看這次更新',
  },
  {
    date: '2026-09-12',
    kind: 'CONTENT',
    title: '加入 GW 團友',
    summary: '公開行程加入 GW，酒店狀態保留為待確認。',
    detail: '出席人數、容量及交通詢價數字改為由名單動態計算。',
    url: prURL(22),
    linkLabel: '查看這次更新',
  },
  {
    date: '2026-09-12',
    kind: 'CONTENT',
    title: '移除 HOMER',
    summary: '從公開團友名單移除未能確認的 HOMER 項目。',
    detail: '沒有改動其他團友狀態或 PEGGY 同 KIT 的共用房間安排。',
    url: prURL(20),
    linkLabel: '查看這次更新',
  },
  {
    date: '2026-09-12',
    kind: 'CONTENT',
    title: '更新 PEGGY、KIT 與 3/9 轉酒店安排',
    summary: '加入 PEGGY 同 KIT，記錄酒店已訂及共用房間，補充 3/9 巴士與酒廠候選。',
    detail: 'Monchan Travel 約 ¥110,000 仍是報價；Perfume Trees Gin 導賞及中文／廣東話安排仍待確認。',
    url: prURL(18),
    linkLabel: '查看這次更新',
  },
  {
    date: '2026-09-04',
    kind: 'FEATURE',
    title: '新增 3/9 彈性包車路線',
    summary: '把富良野到旭川的包車規劃拆成三個互相替代的 A/B/C 路線。',
    detail: '加入美瑛、室內文化及旭山動物園方案，以及停靠、午餐和冬季緩衝限制。',
    url: prURL(16),
    linkLabel: '查看這次更新',
  },
  {
    date: '2026-09-04',
    kind: 'FEATURE',
    title: '重整機場交通與 3/9 團體接送',
    summary: '補充 Resort Liner、JR、Taisetsu Liner 及包車選項。',
    detail: '路線、行李、接送座位和機場緩衝改為分開核對，避免把公共交通當成團體保證。',
    url: prURL(14),
    linkLabel: '查看這次更新',
  },
  {
    date: '2026-09-04',
    kind: 'CONTENT',
    title: '確認 STEPH 酒店狀態並標記 ROOM SHARE',
    summary: '更新 STEPH 的兩間酒店狀態，並在酒店及團友頁統一顯示共用房間。',
    detail: '保留每位團友的本機草稿功能，公開頁不顯示房型或房號。',
    url: prURL(12),
    linkLabel: '查看這次更新',
  },
  {
    date: '2026-09-04',
    kind: 'CONTENT',
    title: '加入室友配對與 NULL 名稱',
    summary: '加入授權的室友配對，並把原先暫名 STP 改為 NULL。',
    detail: '團友表、酒店摘要及交通容量同步使用新的公開名單。',
    url: prURL(10),
    linkLabel: '查看這次更新',
  },
  {
    date: '2026-09-04',
    kind: 'FIX',
    title: '修正版本化資產快取',
    summary: '為行程的 JavaScript、CSS 及其他資產加入內容版本路徑。',
    detail: '避免 GitHub Pages 長快取讓已更新的公開行程繼續顯示舊資料。',
    url: prURL(8),
    linkLabel: '查看這次更新',
  },
  {
    date: '2026-09-04',
    kind: 'FEATURE',
    title: '新增區域食店地圖與團友清單',
    summary: '加入富良野、旭川及機場食店地圖、篩選和團友確認表。',
    detail: '地圖在使用者要求後才載入，團友表的個人修改只保留在目前瀏覽器。',
    url: prURL(6),
    linkLabel: '查看這次更新',
  },
  {
    date: '2026-09-04',
    kind: 'RELEASE',
    title: '首次發布北海道 2027 公開行程',
    summary: '建立富良野／旭川的單板旅行公開行程網站。',
    detail: '包括八日行程、交通、雪場、住宿、食店、團友清單及出發前準備。',
    url: prURL(4),
    linkLabel: '查看這次更新',
  },
];

function renderEntry(entry) {
  const source = entry.url ? `<a class="text-link" href="${escapeHtml(entry.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(entry.linkLabel || '查看相關變更')} <span aria-hidden="true">↗</span></a>` : '';
  return `<article class="card changelog-entry">
    <div class="changelog-entry-top"><time datetime="${escapeHtml(entry.date)}">${escapeHtml(entry.date)}</time><span class="tag">${escapeHtml(entry.kind)}</span></div>
    <h3>${escapeHtml(entry.title)}</h3>
    <p>${escapeHtml(entry.summary)}</p>
    <p class="changelog-detail">${escapeHtml(entry.detail)}</p>
    ${source}
  </article>`;
}

export function renderChangelogPreview(limit = 5) {
  return `<section class="changelog-preview" aria-labelledby="changelog-preview-title">
    <div class="changelog-heading"><div><p class="eyebrow">RECENT CHANGES / 更新紀錄</p><h2 id="changelog-preview-title" class="section-title">最近五項更新</h2><p class="muted">這個公開行程是人工整理的快照；每次 fix 或 feature 更新都會在這裡留下紀錄。</p></div><a class="button secondary" href="./changelog.html">查看完整紀錄 <span aria-hidden="true">↗</span></a></div>
    <div class="changelog-grid">${changelog.slice(0, limit).map(renderEntry).join('')}</div>
  </section>`;
}

export function renderChangelogPage() {
  return `<div class="changelog-list">${changelog.map(renderEntry).join('')}</div>`;
}
