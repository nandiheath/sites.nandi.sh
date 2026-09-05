import { renderTransport } from './transport.js';
import { renderMountains } from './mountains.js';
import { renderExplore } from './explore.js';
import { initEffects } from './effects.js';
import { members, renderMembers } from './members.js';

const hotelPromoURL = 'https://www.princehotels.co.jp/shinfurano/plan/limited-timesale-2026Sep/';
const link = (url, label, cls = 'text-link') => `<a class="${cls}" href="${url}" target="_blank" rel="noopener noreferrer">${label}<span aria-hidden="true">↗</span></a>`;
const map = query => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
const days = [
  {date:'03.06',weekday:'SAT',place:'富良野',type:'抵達',title:'新千歲 → 富良野',hotel:'新富良野王子酒店',location:'Shin Furano Prince Hotel',steps:[['抵達','按航班前往巴士集合點','取齊行李及板袋，按預約憑證報到；機場巴士提早 15 分鐘集合。'],['巴士','Resort Liner 到酒店','自行預約定期巴士，不安排團體包車。2026–27 成人單程 ¥6,000；交通頁列正式班表及替代路線。'],['晚上','Check-in／試裝備','取單板、試雪鞋，確認明天教練及集合點。有時間才去 Ningle Terrace。']],note:'今天不排上雪。先按入境、取行李及集合緩衝選車，不必全團同班。'},
  {date:'03.07',weekday:'SUN',place:'富良野區',type:'SNOWBOARD 01',title:'富良野區 · 分組熱身',hotel:'新富良野王子酒店',location:'Furano Ski Resort',steps:[['上午','新手上堂／熟手熱身','新手預約單板教練；熟手先滑壓雪道。各組不用全程一起滑。'],['下午','按程度練習','新手先練煞停、轉彎及上落纜車；約定午飯和收板時間。'],['晚上','溫泉／酒店附近食飯','紫彩之湯放鬆；裝備晾乾，想食套餐就先訂位。']],note:'教練、租板及雪票未預訂。先確認 snowboard 課程，別誤訂 ski 班。'},
  {date:'03.08',weekday:'MON',place:'北之峰',type:'SNOWBOARD 02',title:'北之峰 · 按程度分線',hotel:'新富良野王子酒店',location:'Kitanomine Gondola Furano',steps:[['上午','北之峰區','先查連接雪道、纜車及返程。新手可留適合自己的練習區。'],['下午','自由分組','只滑開放路線。轉區前看清單板可能要步行的連接段。'],['晚上','執行李／確認還板','明天轉旭川。問清租板可否跨城攜帶及歸還安排。']],note:'樹林不等於可以隨便入；封閉區及能力以外的地形不去。'},
  {date:'03.09',weekday:'TUE',place:'旭川',type:'REST / TRANSFER',title:'富良野 → 自選停靠 → OMO7',hotel:'OMO7 旭川',location:'OMO7 Asahikawa',steps:[['上午','退房／觀光包車出發','新富良野王子上車；人、箱和板袋同車，等候及停車先報價。'],['日間','景點＋午餐・三選一','美瑛風景／室內輕鬆／動物園都是提案，並非全部去；交通頁比較路線，先與車商敲定。'],['傍晚','OMO7 Check-in','目標約 15:00–16:00 到酒店，按雪況調整；確認明天雪場來回巴士和裝備。']],note:'動物園不是必去。停靠、午餐及改線條款預先確認；惡劣天氣可刪點或取消，整天休息不加夜滑。'},
  {date:'03.10',weekday:'WED',place:'神居',type:'SNOWBOARD 03',title:'Kamui · 旭川第一個雪日',hotel:'OMO7 旭川',location:'Kamui Ski Links',steps:[['上午','搭預約接駁去神居','前一晚收齊裝備、看上車點。新手跟教練選緩坡。'],['下午','壓雪道／分組練習','固定午飯、收板及集合時間；預留還板、換鞋時間。'],['晚上','旭川食飯／Santa 可選','有體力才加 Santa 夜滑；另查營業時間並訂好來回車。']],note:'先訂回程，再決定滑到幾點。夜滑不是全團行程。'},
  {date:'03.11',weekday:'THU',place:'旭川周邊',type:'SNOWBOARD 04',title:'Flex day · 神居／比布／Santa',hotel:'OMO7 旭川',location:'Pippu Ski Resort',steps:[['前一晚','按程度分組','神居巡航、比布練習或 Santa 短時滑；交通和課程先確認。'],['日間','滑雪或市區休息','比布 3 月新手設施需重查。休息組留旭川逛街、咖啡或博物館。'],['晚上','決定明天去哪','高手組評估旭岳天氣、嚮導、裝備及回程；其他人神居或比布。']],note:'三個雪場是選項，不是同一天全去。'},
  {date:'03.12',weekday:'FRI',place:'神居／旭岳',type:'SNOWBOARD 05',title:'最後雪日 · 按雪況決定',hotel:'OMO7 旭川',location:'Asahidake Ropeway',steps:[['早上','查雪況及風','一般組神居／比布。旭岳只限能力、嚮導及安全條件齊備的高手組。'],['日間','最後一天上雪','不合條件就改普通雪場。旭岳風停、白茫及雪崩風險不能靠買票解決。'],['晚上','最後一餐／還板','提前訂位、執行李，各自核對明天機場巴士／JR 訂位及航班。']],note:'旭岳不是一般單板雪場；不安排新手或普通中級團員滑行。'},
  {date:'03.13',weekday:'SAT',place:'旭川 → CTS',type:'RETURN',title:'各自退房 → 新千歲機場',hotel:'退房 · 不留宿',location:'New Chitose Airport',steps:[['出發前','按自己的航班倒推','今天不安排團體直送。各自預留冬季交通及雪袋寄艙時間；早機可能要改前一晚住宿。'],['公共交通','JR／Taisetsu Liner 自行訂位','JR 經札幌；公共機場巴士現行停 OMO7 前。各自確認 2027 班次、行李承運及正確航廈。'],['機場','先寄艙，再購物','有剩餘時間才食飯或買手信；不要用轉車緩衝去購物。']],note:'航班未齊，不寫死全團出門時間。交通頁有自助路線、票價參考及預約連結。'},
];
const sections = [['journey','行程'],['transport','交通'],['mountains','雪場・雪票'],['explore','食嘢・去邊'],['stays','酒店'],['members','團友清單'],['prepare','出發前']];
const boardMark = '<svg viewBox="0 0 42 42" aria-hidden="true" fill="none"><path d="M9 31 20 10l6 11 5-8 8 17" stroke="currentColor" stroke-width="2"/><path d="M4 34c9 5 22 3 34-7" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
document.querySelector('#app').innerHTML = `
<a class="skip-link" href="#main">跳至內容</a>
<header class="site-header"><a href="#journey" class="brand">${boardMark}<span>SBD<span class="brand-rule">/</span><small>HOKKAIDO 2027</small></span></a><div class="header-meta"><span class="status-dot"></span>SNOWBOARD TRIP<span>06—13 MAR</span></div><div class="header-actions"><button type="button" id="motion-toggle" class="motion-toggle" aria-pressed="false">動態 OFF</button></div></header>
<div class="nav-wrap"><nav class="main-nav" aria-label="行程分類">${sections.map(([id,label],i)=>`<button type="button" class="nav-item" data-section="${id}" aria-controls="${id}"><span>0${i+1}</span>${label}</button>`).join('')}</nav></div>
<main id="main" tabindex="-1">
<section id="journey" class="page-section">
<aside class="booking-alert" aria-labelledby="booking-alert-title">
  <div class="booking-alert-copy"><p class="eyebrow">ACTION REQUIRED / 訂房通知</p><h2 id="booking-alert-title">富良野酒店已定案，請大家訂房</h2><p><strong>新富良野王子酒店 · 2027/3/6 入住 → 3/9 退房 · 3 晚</strong></p><p>今次用官方會員限時優惠，包早餐及溫泉券。請先登入／登記 Seibu Prince Global Rewards 會員，再選以上入住日期。</p><p class="booking-deadline">優惠截止：<time datetime="2026-09-15T12:00:00+09:00">2026/9/15 香港 11:00am · 日本 12:00 noon</time></p><p class="meta">房價及空房以官網為準；付款前核對房型、人數、稅費及取消條款。已訂房的團友先比較原訂單，唔使重複訂。</p></div>
  <div class="booking-alert-action">${link(hotelPromoURL,'前往官方優惠訂房','button')}<span>會員限定 · 早餐 + 溫泉券</span></div>
</aside>
<div class="hero" id="snow-hero" data-playback="paused">
  <div class="hero-art" role="img" aria-label="冰藍色山脊與等高線的原創概念地形圖，非實際雪場地圖"></div>
  <div class="hero-grid" aria-hidden="true"></div><canvas id="snowfx" aria-hidden="true"></canvas>
  <div class="hero-topline"><span>SBD / SNOWBOARD TRIP</span><span>WINTER SESSION — 2027</span></div>
  <div class="hero-edition" aria-hidden="true">27</div>
  <div class="hero-content"><p class="eyebrow">JAPAN'S NORTH / 北海道</p>
    <h1 aria-label="Hokkaido 2027"><span class="hero-word" aria-hidden="true">${Array.from('HOKKAIDO',(letter,index)=>`<span style="--letter:${index}">${letter}</span>`).join('')}</span><span class="hero-year" aria-hidden="true">WINTER, 2027.</span></h1>
    <p class="hero-route">富良野 <span>／</span> 旭川</p>
    <div class="hero-dates"><strong>06—13</strong><span>MAR 2027<small>8 日 7 晚 · 5 日單板</small></span></div>
    <div class="hero-actions"><a href="#day-planner" class="button hero-button">探索行程<span aria-hidden="true">↗</span></a><span>兩個基地。全程非自駕。</span></div>
  </div>
  <div class="hero-coordinates" aria-hidden="true"><span>43° N / 142° E</span><strong>北 海 道</strong><span>JAPAN STANDARD TIME +09</span></div>
  <div class="hero-bottom"><span><i></i>FURANO <span>→</span> ASAHIKAWA</span><span>SNOWBOARD / ONSEN / CITY</span><small>CONCEPT TERRAIN — NOT A TRAIL MAP</small></div>
</div>
<div class="trip-stats"><div><span class="stat-label">DATES / 日期</span><strong>06—13 <small>MAR</small></strong><span>2027 · 8 日 7 晚</span></div><div><span class="stat-label">ON SNOW / 上雪</span><strong>05 <small>DAYS</small></strong><span>單板為主 · 3/9 休息</span></div><div><span class="stat-label">GROUP / 人數</span><strong>${members.length} <small>名團友</small></strong><span>${members.filter(member=>member.attendance==='O').length} 出席 · ${members.filter(member=>member.attendance==='?').length} 待確認</span></div><div><span class="stat-label">BASES / 住宿</span><strong>03 <small>+</small> 04 <small>NIGHTS</small></strong><span>富良野王子 → OMO7</span></div></div>
<section id="day-planner" class="section-block"><div class="section-intro"><div><p class="eyebrow">01 / DAILY PLAN</p><h2 class="section-title">8 日行程</h2><p class="muted">選日期看安排。3/11–12 按雪況、程度及交通分組。</p></div><button type="button" class="button secondary" id="calendar-download">下載行事曆 <span aria-hidden="true">↓</span></button></div><div class="day-strip" role="group" aria-label="選擇行程日期">${days.map((d,i)=>`<button type="button" class="day-button" data-day="${i}" aria-pressed="${i===0}" aria-controls="day-detail"><span>DAY 0${i+1}<small>${d.weekday}</small></span><strong>${d.date}</strong><em>${d.place}</em><i class="day-dot ${i===3?'rest':''}"></i></button>`).join('')}</div><div class="itinerary-layout"><article id="day-detail" class="day-detail" aria-live="polite"></article><aside class="journey-map"><p class="eyebrow">TRIP ROUTE / 非比例示意</p><h3>兩個基地，五日上雪</h3><svg viewBox="0 0 380 255" role="img" aria-label="新千歲至富良野，轉往旭川後返新千歲；動物園僅為候選停靠，非固定路線"><defs><linearGradient id="map-fill" x2="1" y2="1"><stop stop-color="#1c4260"/><stop offset="1" stop-color="#0e2339"/></linearGradient></defs><path d="m165 12 39 23 12 27 43 20 22 38 46 6-17 34-34 22-8 41-43-8-22 27-38-16-20-29-37 4-39-26 33-29-5-43 44-23Z" fill="url(#map-fill)" stroke="#29516f"/><path class="route-trace" d="M132 214Q226 195 216 150T197 79l48 17" stroke="#71d7ff" stroke-width="2" stroke-dasharray="5 6" fill="none"/><g fill="#81ddff"><circle cx="132" cy="214" r="5"/><circle cx="216" cy="150" r="5"/><circle cx="197" cy="79" r="5"/><circle cx="245" cy="96" r="4"/></g><text x="60" y="239">新千歲 CTS</text><text x="232" y="157">富良野</text><text x="131" y="68">旭川</text><text x="258" y="89">動物園・可選</text><text x="38" y="42" class="map-water">N ↑</text></svg><div class="map-legend"><span><i></i>王子 · 3 晚</span><span><i></i>OMO7 · 4 晚</span></div><button type="button" class="text-link" data-goto="transport">交通及訂車 ↗</button></aside></div><div class="editor-note"><span>PLAN STATUS</span><p>公開行程摘要；航班、包車及課程需另行確認。出席及兩間酒店狀態見團友清單。</p><button type="button" class="text-link" data-goto="members">團友清單 ↗</button></div></section>
</section>
<section id="transport" class="page-section module-section" hidden></section><section id="mountains" class="page-section module-section" hidden></section><section id="explore" class="page-section module-section" hidden></section><section id="stays" class="page-section module-section" hidden></section><section id="members" class="page-section module-section" hidden></section><section id="prepare" class="page-section module-section" hidden></section>
</main><footer class="site-footer"><a href="#journey" class="footer-brand">SBD / HOKKAIDO 2027</a><p>公開行程版 · 資料查核日期見各項來源 · 日本時間 UTC+9</p><p>舊季價格已標示；出發前再核對班次及營業。</p><details><summary>資料及分享</summary><p>團友名稱、出席及兩間酒店確認狀態已獲授權公開；私人文件、訂單號碼及聯絡資料不公開。這是人工整理的快照，不會自動更新。個人清單及團友表的本機草稿只存於此瀏覽器，不同步其他人。</p></details></footer><div id="toast" role="status" aria-live="polite"></div>`;

function renderDay(index) {
  const d=days[index];
  document.querySelectorAll('[data-day]').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
  const panel=document.querySelector('#day-detail');
  panel.innerHTML=`<div class="day-heading"><span class="tag ${index===3?'warm':'green'}">${d.type}</span><span class="meta">MARCH ${index+6}, 2027 · ${d.weekday}</span></div><h3>${d.title}</h3><ol class="day-timeline">${d.steps.map(([time,title,text])=>`<li><span class="time-label">${time}</span><div><h4>${title}</h4><p>${text}</p></div></li>`).join('')}</ol><div class="day-stay"><span>住宿</span><strong>${d.hotel}</strong>${link(map(d.location),'地圖')}</div><p class="day-note">${d.note}</p>`;
  if(document.documentElement.dataset.motion==='on') panel.animate([{opacity:.4,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:230,easing:'ease-out'});
}
renderDay(0);
document.querySelectorAll('[data-day]').forEach(button=>button.addEventListener('click',()=>renderDay(Number(button.dataset.day))));
function showSection(id,scroll=false){
  if(!sections.some(([key])=>key===id))id='journey';
  document.querySelectorAll('.page-section').forEach(section=>{section.hidden=section.id!==id;});
  document.querySelectorAll('[data-section]').forEach(button=>{const selected=button.dataset.section===id;button.classList.toggle('active',selected);if(selected)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');});
  if(scroll){document.querySelector('#main').scrollIntoView({behavior:'instant',block:'start'});document.querySelector('#main').focus({preventScroll:true});}
}
document.querySelectorAll('[data-section],[data-goto]').forEach(button=>button.addEventListener('click',()=>{const id=button.dataset.section||button.dataset.goto;if(location.hash===`#${id}`)showSection(id,true);else location.hash=id;}));
window.addEventListener('hashchange',()=>{if(location.hash!=='#day-planner')showSection(location.hash.slice(1),true);});

function renderStays(){
  document.querySelector('#stays').innerHTML=`
    <div class="section-intro"><div><p class="eyebrow">05 / BASES</p><h2 class="section-title">酒店</h2><p class="muted">富良野住新富良野王子酒店 3 晚，旭川住 OMO7 4 晚。每位團友的確認狀態見「團友清單」；私人訂單資料不公開。</p></div><span class="tag">7 NIGHTS</span></div>
    <div class="card-grid two hotel-grid">
      <article class="card hotel-card">
        <div class="hotel-art furano-art"><span>BASE 01 / FURANO</span><strong>SHIN FURANO<br>PRINCE</strong><small>已定案 · 富良野區 · Ski-in / Ski-out</small></div>
        <div class="hotel-body"><span class="tag green">03.06 入住 → 03.09 退房 · 3 晚</span><h3>新富良野王子酒店</h3>
          <ul class="detail-list"><li>富良野區上雪方便；北之峰要另查連接及接駁。</li><li>今次訂官方會員限時優惠：早餐及溫泉券。</li><li>2026/9/15 香港 11am（日本中午 12 點）截止；房價及空房以官網為準。</li><li>付款前確認房型、人數、稅費及取消條款。</li></ul>
          <div class="source-links">${link(hotelPromoURL,'官方訂房優惠')}${link('https://www.princehotels.com/shinfurano/','酒店官方')}${link(map('Shin Furano Prince Hotel'),'地圖')}</div>
          <details><summary>改訂前注意</summary><p>先比較原訂單的早餐、稅費及取消成本，再決定是否改訂，避免重複訂房。私人訂房資料請直接與主辦人確認。</p></details>
        </div>
      </article>
      <article class="card hotel-card">
        <div class="hotel-art city-art"><span>BASE 02 / ASAHIKAWA</span><strong>OMO7<br>ASAHIKAWA</strong><small>星野集團 · 市區基地</small></div>
        <div class="hotel-body"><span class="tag green">03.09 入住 → 03.13 退房 · 4 晚</span><h3>OMO7 旭川</h3>
          <ul class="detail-list"><li>JR 旭川站步行約 13 分鐘；雪地拖箱建議的士。</li><li>一般 Check-in 15:00／Check-out 11:00，以訂單為準。</li><li>雪季巴士、租板及乾燥設施要確認 2026–27 安排。</li></ul>
          <div class="source-links">${link('https://hoshinoresorts.com/en/hotels/omo7asahikawa/','酒店官方')}${link(map('OMO7 Asahikawa'),'地圖')}</div>
          <details><summary>機場交通／未確認事項</summary><p>3/13 不安排團體直送，各自訂 JR 經札幌或 Taisetsu Liner 公共機場巴士。後者現行停酒店前，不是酒店 shuttle；2027 班次及箱＋板袋承運要重查。</p><p>房型、早餐及取消條款請直接向酒店確認。</p>${link('https://www.asahikawa-denkikidou.jp/taisetsu_liner/','機場巴士官方')}</details>
        </div>
      </article>
    </div>`;
}
renderStays();
const packing=[['passport','護照・機票','核對入境要求、雪袋寄艙額及重量。'],['insurance','單板保險','醫療、雪場救援；旭岳／野雪要另查保障。'],['rooms','酒店訂單','早餐、取消期、分房和私人聯絡方式。'],['transport','交通訂位','3/6 自訂機場巴士；3/9 團體包車；3/13 自訂巴士／JR；每日雪場返程。'],['lesson','教練・單板租借','Snowboard 班、教學語言、程度、鞋碼及站姿。'],['layers','上雪裝備','頭盔、雪鏡、手套、排汗層、雪褸褲及雪襪。'],['street','防滑鞋・防曬','防水鞋、合適防滑配件、暖包及防曬。'],['mobile','上網・充電','eSIM／漫遊、充電器、外置充電器、離線地圖。'],['health','藥物・過敏','私人告知主辦人，不放公開網站。'],['cash','日圓現金','小店、巴士、儲物櫃可能只收現金。']];
let checklist={};let storageAvailable=true;
try{const saved=JSON.parse(localStorage.getItem('sbd-hokkaido-2027-checklist')||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved))checklist=saved;}catch{storageAvailable=false;}
function renderPrepare(){
  document.querySelector('#prepare').innerHTML=`<div class="section-intro"><div><p class="eyebrow">07 / PRE-DEPARTURE</p><h2 class="section-title">出發前</h2><p class="muted">個人清單，只存於這個瀏覽器。</p></div><button type="button" class="button secondary" id="print-plan">列印本頁 ↗</button></div><div class="split-panel preparation-layout"><article class="card"><div class="card-top"><h3>個人清單</h3><span id="packing-count" class="tag" aria-live="polite"></span></div><progress id="packing-progress" max="${packing.length}" value="0" aria-label="準備進度"></progress><div class="packing-list">${packing.map(([id,label,note])=>`<label class="packing-item"><input type="checkbox" data-pack="${id}" ${checklist[id]===true?'checked':''}><span><strong>${label}</strong><small>${note}</small></span></label>`).join('')}</div><p class="meta" id="storage-note">${storageAvailable?'本機儲存，不同步團友或公開快照。':'瀏覽器不能儲存；關閉後不保留勾選。'}</p></article><aside class="stack"><article class="card warm-card"><p class="eyebrow">TO CONFIRM</p><h3>全團待辦</h3><ol class="numbered-list"><li>覆核 ${members.length} 人名單、未確認出席、兩間酒店及分房。</li><li>各自按航班訂 3/6 巴士及 3/13 巴士／JR，不安排機場團體直送。</li><li>只詢 3/9 包車：人數、板袋、行李、自選景點／午餐等候及 OMO7 落客；動物園非必去。</li><li>確認新季雪場巴士、單板課程、票價及食店訂位。</li><li>出發前一週、48 小時及當日核對天氣／營運。</li></ol><a href="#members" class="text-link">團友狀態及後續跟進計劃 ↗</a></article><article class="card emergency-card"><p class="eyebrow">EMERGENCY / JAPAN</p><div class="emergency-numbers"><a href="tel:119"><strong>119</strong><span>救護・消防</span></a><a href="tel:110"><strong>110</strong><span>警察</span></a></div><p>雪場內先找巡邏隊，講清雪道名、最近標示及位置。</p>${link('https://www.japan.travel/en/plan/hotline/','JNTO 旅客支援')}</article></aside></div><article class="card budget-card"><div><p class="eyebrow">MARCH 9 / SHARED TRANSFER COST</p><h3>3/9 包車分攤試算</h3><p class="muted">輸入新富良野王子 → 自選停靠 → OMO7（連景點及午餐等候）的全車正式報價。不含各自機場交通、門票、餐費或每日雪場接駁；預設 ${members.filter(member=>member.attendance==='O').length} 人出席，可按最終付款人數改。未有正式報價，不預填收款額。</p></div><div class="budget-controls"><label for="charter-total">3/9 全團包車費（JPY）<input id="charter-total" type="number" min="0" max="10000000" step="1" placeholder="輸入正式報價"></label><label for="charter-people">分攤人數<input id="charter-people" type="number" min="1" max="50" step="1" value="${members.filter(member=>member.attendance==='O').length}"></label><output id="budget-result" aria-live="polite"></output></div></article>`;
  const update=()=>{const count=packing.filter(([id])=>checklist[id]===true).length;document.querySelector('#packing-count').textContent=`${count} / ${packing.length}`;document.querySelector('#packing-progress').value=count;};update();
  document.querySelectorAll('[data-pack]').forEach(input=>input.addEventListener('change',()=>{checklist[input.dataset.pack]=input.checked;try{localStorage.setItem('sbd-hokkaido-2027-checklist',JSON.stringify(checklist));}catch{document.querySelector('#storage-note').textContent='無法儲存；本次勾選關閉後不保留。';}update();}));
  const calculate=()=>{const total=document.querySelector('#charter-total');const people=document.querySelector('#charter-people');const n=people.valueAsNumber;document.querySelector('#budget-result').textContent=total.value===''&&!total.validity.badInput?'輸入 3/9 報價後顯示分攤。':total.validity.valid&&people.validity.valid&&Number.isFinite(total.valueAsNumber)&&Number.isInteger(n)&&n>=1?`約 ¥${Math.ceil(total.valueAsNumber/n).toLocaleString('en-US')}／人`:'請輸入有效金額及 1–50 的整數人數';};
  document.querySelectorAll('.budget-controls input').forEach(input=>input.addEventListener('input',calculate));calculate();document.querySelector('#print-plan').addEventListener('click',()=>window.print());
}
renderPrepare();
function downloadCalendar(){
  const escape=text=>text.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
  const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//SBD//2027 Hokkaido Snowboard//ZH-HK','CALSCALE:GREGORIAN','METHOD:PUBLISH',...days.flatMap((d,i)=>['BEGIN:VEVENT',`UID:sbd-hokkaido-2027-day-${i+1}@trip.local`,'DTSTAMP:20260904T000000Z',`DTSTART;VALUE=DATE:202703${String(i+6).padStart(2,'0')}`,`DTEND;VALUE=DATE:202703${String(i+7).padStart(2,'0')}`,`SUMMARY:${escape(`[暫定] ${d.title}`)}`,`LOCATION:${escape(d.location)}`,`DESCRIPTION:${escape(`住宿：${d.hotel}\n${d.steps.map(([time,title])=>`${time}：${title}`).join('\n')}\n${d.note}`)}`,'STATUS:TENTATIVE','END:VEVENT']),'END:VCALENDAR'];
  const encoder=new TextEncoder();const folded=lines.map(line=>{let result='';let bytes=0;for(const char of line){const size=encoder.encode(char).length;if(bytes+size>75){result+='\r\n ';bytes=1;}result+=char;bytes+=size;}return result;}).join('\r\n')+'\r\n';
  const url=URL.createObjectURL(new Blob([folded],{type:'text/calendar;charset=utf-8'}));const anchor=document.createElement('a');anchor.href=url;anchor.download='2027sbd_hokkaido.ics';anchor.click();setTimeout(()=>URL.revokeObjectURL(url),1000);document.querySelector('#toast').textContent='已下載 8 日行事曆（暫定安排）';setTimeout(()=>{document.querySelector('#toast').textContent='';},4000);
}
document.querySelector('#calendar-download').addEventListener('click',downloadCalendar);
renderTransport(document.querySelector('#transport'));renderMountains(document.querySelector('#mountains'));renderExplore(document.querySelector('#explore'));
renderMembers(document.querySelector('#members'));
showSection(location.hash==='#day-planner'?'journey':location.hash.slice(1));
initEffects(document.querySelector('#snow-hero'),document.querySelector('#snowfx'),document.querySelector('#motion-toggle'));
