export const members = [
  ['YL', 'O', 'O', 'O'],
  ['JO', 'O', 'O', 'O'],
  ['CAR', 'O', 'O', 'O'],
  ['BUN', 'O', 'O', 'O'],
  ['NULL', 'O', '?', 'O'],
  ['STEPH', 'O', 'O', 'O'],
  ['WANYI', 'O', '?', '?'],
  ['BEAR', 'O', 'O', 'O'],
  ['KAY', 'O', 'O', 'O'],
  ['MC', 'O', 'O', 'O'],
  ['NAT', 'O', 'O', 'O'],
  ['SMALL', 'O', 'O', 'O'],
  ['HOMER', '?', '?', '?'],
].map(([name, attendance, furano, omo]) => ({ name, attendance, furano, omo }));

const roommatePairs = [
  ['SMALL', 'STEPH'],
  ['BUN', 'CAR'],
  ['MC', 'NAT'],
  ['JO', 'YL'],
  ['BEAR', 'KAY'],
];

const columns = [
  { id: 'attendance', label: '出席', detail: '3/6–13' },
  { id: 'furano', label: '新富良野王子', detail: '3/6–9・3 晚' },
  { id: 'omo', label: 'OMO7 旭川', detail: '3/9–13・4 晚' },
];
const states = [['O', '已確認'], ['?', '待確認'], ['X', '不參加／不適用']];
const storageKey = 'sbd-hokkaido-2027-member-draft-v1';
const stages = [
  { title: '下一輪：交通', items: [
    ['航班已定', '確認去回程機場及時間、雪袋寄艙額；訂單及個人資料私下傳。'],
    ['交通安排', `3/6 各自訂機場巴士；只為 3/9 新富良野王子 → 自選景點及午餐 → OMO7 按 ${members.filter(member => member.attendance === 'O').length} 人確認／最多 ${members.length} 人詢觀光包車，連板袋一齊問。動物園是選項，停靠及改線條款預先敲定。3/13 各自訂巴士／JR，沒有團體直送。`],
    ['每日日間接駁', '雪場去回班次、預約、滿座後備與集合時間。'],
  ] },
  { title: '之後：上雪安排', items: [
    ['裝備及租借', '自備／租借單板、雪鞋、頭盔；尺寸及取還地點私下核對。'],
    ['教練及程度', '初學／進階分組、教學語言、堂數；先確認教練與集合雪場。'],
    ['雪票方案', '按實際滑行日及雪場揀日票／通行證，唔好先假設全團同方案。'],
  ] },
  { title: '出發前：最後確認', items: [
    ['旅遊及單板保險', '確認醫療、單板及救援保障；野雪另查。只記「已核對」，保單號碼唔公開。'],
    ['飲食及緊急聯絡', '只確認已私下交齊飲食需要、過敏及緊急聯絡；具體內容唔放網站。'],
    ['住宿及集合覆核', '房型、早餐、取消期、分房、集合點、eSIM／漫遊及付款分攤。'],
  ] },
];

export function renderMembers(container) {
  let draft = {};
  let storageAvailable = true;
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
      for (const member of members) {
        for (const column of columns) {
          const value = saved[member.name]?.[column.id];
          if (states.some(([state]) => state === value) && value !== member[column.id]) {
            (draft[member.name] ||= {})[column.id] = value;
          }
        }
      }
    }
  } catch { storageAvailable = false; }
  const valueFor = (member, column) => draft[member.name]?.[column] ?? member[column];

  container.innerHTML = `<header class="section-intro"><div><p class="eyebrow">MEMBERS / 團友確認表</p><h2 class="section-title">邊個去？酒店訂咗未？</h2><p class="muted">公開名單共 ${members.length} 人。O = 已確認，? = 待確認；兩間酒店分開記錄，唔代表已付款或包含同一房型。</p></div></header>
    <div class="member-summary" id="member-summary" aria-live="polite"></div>
    <div class="callout member-privacy"><strong>公開快照・本機草稿分開</strong><p>名稱、出席、訂房狀態及同房安排已獲授權公開。下面確認表可改作本機跟進，但只儲存在這個瀏覽器，<strong>不會同步其他團友或更新網站公開資料</strong>。同房安排只供查閱；要改公開快照，請交主辦人更新網站。</p><p id="member-storage-note" class="meta"></p></div>
    <div class="member-table-wrap" role="region" aria-label="團友出席與兩間酒店確認狀態" tabindex="0"><table class="member-table"><caption>公開快照以主辦人提供的 O / ? 記錄為準；目前顯示可包含本機草稿。</caption><thead><tr><th scope="col">團友</th>${columns.map(column => `<th scope="col">${column.label}<small>${column.detail}</small></th>`).join('')}</tr></thead><tbody>${members.map(member => `<tr><th scope="row">${member.name}</th>${columns.map(column => `<td><select data-member="${member.name}" data-member-column="${column.id}" aria-label="${member.name} ${column.label}">${states.map(([state, label]) => `<option value="${state}"${valueFor(member, column.id) === state ? ' selected' : ''}>${state} ${label}</option>`).join('')}</select></td>`).join('')}</tr>`).join('')}</tbody></table></div>
    <div class="member-tools"><p id="member-draft-status" class="meta" role="status" aria-live="polite"></p><button type="button" class="button secondary" id="member-reset">還原公開快照</button></div>
    <section class="member-roommates" aria-labelledby="member-roommates-title"><header class="section-intro"><div><p class="eyebrow">同房安排</p><h3 id="member-roommates-title">ROOM SHARE</h3><p class="muted">主辦人提供的 ${roommatePairs.length} 組同房安排；只記錄同行安排，唔代表兩間酒店已確認房型、房號或訂房。其他團友同房安排未提供。</p></div></header><div class="member-stage-grid">${roommatePairs.map((pair, index) => `<article class="card member-stage"><p class="eyebrow">ROOM SHARE 0${index + 1}</p><h4>${pair.join(' + ')}</h4></article>`).join('')}</div></section>
    <section class="member-next" aria-labelledby="member-next-title"><header class="section-intro"><div><p class="eyebrow">NEXT CHECKS / 後續跟進計劃</p><h3 id="member-next-title">酒店搞掂，之後逐輪確認。</h3><p class="muted">以下係之後要逐位團友收齊的項目，<strong>未開始收集，不當作已完成</strong>。有實際資料後再更新公開狀態；私人內容另行收集。</p></div></header><div class="member-stage-grid">${stages.map((stage, index) => `<article class="card member-stage"><div class="card-top"><span class="eyebrow">0${index + 1} / FOLLOW-UP</span><span class="tag">待開始</span></div><h4>${stage.title}</h4><ul class="detail-list">${stage.items.map(([title, note]) => `<li><strong>${title}</strong><p>${note}</p></li>`).join('')}</ul></article>`).join('')}</div></section>`;

  function update() {
    const counts = columns.map(column => ({ ...column, yes: members.filter(member => valueFor(member, column.id) === 'O').length, pending: members.filter(member => valueFor(member, column.id) === '?').length }));
    container.querySelector('#member-summary').innerHTML = counts.map(column => `<div><span>${column.label}</span><strong>${column.yes}<small> / ${members.length}</small></strong><p>${column.pending} 待確認${members.length - column.yes - column.pending ? `・${members.length - column.yes - column.pending} 不參加／不適用` : ''}</p></div>`).join('');
    const edits = Object.values(draft).reduce((total, member) => total + Object.keys(member).length, 0);
    container.querySelector('#member-draft-status').textContent = edits ? `本機草稿：${edits} 項與公開快照不同，尚未同步／提交。` : '正在顯示主辦人提供的公開快照。';
    container.querySelector('#member-reset').disabled = edits === 0;
    container.querySelector('#member-storage-note').textContent = storageAvailable ? '本機修改關閉頁面後保留；清除瀏覽器資料會移除草稿。' : '無法讀取或儲存本機資料；本次修改只保留至關閉頁面。';
    container.querySelectorAll('[data-member]').forEach(select => { select.dataset.state = select.value; });
  }

  container.querySelector('.member-table').addEventListener('change', event => {
    const select = event.target.closest('[data-member]');
    if (!select) return;
    const member = members.find(item => item.name === select.dataset.member);
    const column = select.dataset.memberColumn;
    if (select.value === member[column]) {
      if (draft[member.name]) { delete draft[member.name][column]; if (!Object.keys(draft[member.name]).length) delete draft[member.name]; }
    } else (draft[member.name] ||= {})[column] = select.value;
    try { localStorage.setItem(storageKey, JSON.stringify(draft)); storageAvailable = true; } catch { storageAvailable = false; }
    update();
  });
  container.querySelector('#member-reset').addEventListener('click', () => {
    draft = {};
    try { localStorage.removeItem(storageKey); storageAvailable = true; } catch { storageAvailable = false; }
    container.querySelectorAll('[data-member]').forEach(select => { select.value = members.find(member => member.name === select.dataset.member)[select.dataset.memberColumn]; });
    update();
  });
  update();
}
