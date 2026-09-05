import { members } from './members.js';

const transportSources = {
  charter: ["SkyExpress｜官方包車詢價", "https://book.skyexpress.jp/en/order"],
  airport: [
    "Resort Liner｜官方 2026–27 機場線／預約",
    "https://www.access-n.jp/winter2026/en/skibus/detail/chitose_furano.html",
  ],
  meeting: [
    "Resort Liner｜官方 2026–27 集合地圖",
    "https://www.access-n.jp/winter2026/en/information/",
  ],
  zooBus: [
    "Powder Belt Liner｜官方 2025–26 富良野／動物園線",
    "https://www.access-n.jp/winter2025/en/skibus/detail/asahikawa_city_zoo_furano.html",
  ],
  zoo: [
    "旭山動物園｜官方 2027 開園日曆",
    "https://www.city.asahikawa.hokkaido.jp/asahiyamazoo/event/event.html",
  ],
  zooAccess: [
    "旭山動物園｜官方交通與停車指引（2026）",
    "https://www.city.asahikawa.hokkaido.jp/asahiyamazoo/generalinformation/d053767.html",
  ],
  zooTickets: [
    "旭山動物園｜官方門票與巴士團體申請",
    "https://www.city.asahikawa.hokkaido.jp/asahiyamazoo/generalinformation/d052849.html",
  ],
  lavender: [
    "富良野巴士｜官方 Lavender 路線（2026/4 改點）",
    "https://www.furanobus.jp/rosen/",
  ],
  prince: [
    "新富良野王子｜官方交通指引",
    "https://www.princehotels.co.jp/shinfurano/access/",
  ],
  omo: [
    "OMO7｜官方 2025–26 滑雪接駁／預約入口",
    "https://hoshinoresorts.com/zh_tw/hotels/omo7asahikawa/sp/ski/",
  ],
  omoAccess: [
    "OMO7｜官方車站交通",
    "https://hoshinoresorts.com/en/hotels/omo7asahikawa/access/",
  ],
  jr: [
    "JR 北海道｜官方班次／運行資訊",
    "https://www.jrhokkaido.co.jp/global/index.html",
  ],
  jrAirport: [
    "JR 北海道｜官方 Airport 列車與行李規則",
    "https://www.jrhokkaido.co.jp/global/english/travel/airport.html",
  ],
  jrBook: [
    "JR-EAST Train Reservation｜官方訂位",
    "https://www.eki-net.com/jreast-train-reservation/Top/Index",
  ],
  taisetsu: [
    "Taisetsu Liner｜官方 2026 班表／預約入口",
    "https://www.asahikawa-denkikidou.jp/taisetsu_liner/",
  ],
  airportTimetable: ["Resort Liner｜官方 2026–27 班表圖片", "https://www.access-n.jp/winter2026/skibus/upload/e-801-cts-furano_2026-27w.jpg"],
  skyFleet: ["SkyExpress｜官方車型及行李限額", "https://www.skyexpress.jp/fleet"],
  skyPrice: ["SkyExpress｜官方冬季包車價目（未標年份）", "https://www.skyexpress.jp/hokkaido-niseko-sapporo-bus-hire"],
  furanoCharter: ["富良野巴士｜官方貸切車型", "https://www.furanobus.jp/kashikiri/"],
  furanoEnquiry: ["富良野巴士｜官方詢價入口", "https://www.furanobus.jp/contact/"],
  social: ["Social Bus｜官方車隊／查詢入口", "https://social-bus.jp/fleet"],
  jrFare: ["JR 北海道｜官方現行票價例子", "https://www.jrhokkaido.co.jp/global/english/ticket/regular/"],
  jrReservation: ["JR 北海道｜官方指定席開售規則", "https://www.jrhokkaido.co.jp/global/english/ticket/reservation/"],
  chuoAirport: ["中央巴士｜新千歲至札幌機場巴士", "https://www.chuo-bus.co.jp/airport.en/"],
  chuoFurano: ["中央巴士｜高速富良野號班表", "https://www.chuo-bus.co.jp/highway.en/pocket/pdf/furano.pdf"],
};

function transportLink(key) {
  const [label, url] = transportSources[key];
  return `<a class="text-link" href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
}

function transportMap(place, label) {
  return `<a class="text-link" href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(place)}" target="_blank" rel="noopener noreferrer">地圖：${label}</a>`;
}

function transportLinks(keys) {
  return `<div class="source-links">${keys.map(transportLink).join("")}</div>`;
}

const transportRoutes = [
  {
    id: "arrival",
    label: "03.06 抵達富良野",
    title: "新千歲機場 → 新富良野王子",
    tag: "自行訂位・定期機場巴士",
    duration: "正式班表約 2 小時 15 分至 2 小時 25 分；另計入境、集合及雪天延誤",
    intro:
      "3/6 不安排團體包車。首選 Hokkaido Resort Liner 直達 Shin Furano Prince Hotel；按各自航班選車，不必等全團同一班。2026–27 已開售，3/6 在公布營運期內，但未替任何人訂位。",
    steps: [
      [
        "先選航班，再選巴士",
        "下方列正式班表。官方飛機落地至巴士最低接駁時間：國內線 45 分鐘／國際線 90 分鐘；本團建議分別留至少約 1／2 小時，入境繁忙或板袋多再加時間，並確保趕及提早 15 分鐘報到。不是保證接得上。",
      ],
      [
        "官方預約及集合",
        "成人（12 歲起）¥6,000；3–11 歲 ¥5,000，單程每人。官方要求至少 9 天前預約；航班確定就訂，不等最後期限。按自己的航廈及預約憑證查看集合地圖，不把國內線、國際線站互換。",
      ],
      [
        "酒店落車",
        "訂 Shin Furano Prince Hotel／新富良野プリンスホテル；它是班表首個酒店站，不是 Furano Resort Hotel Edel Warme。取齊箱及板袋，再辦入住及確認翌日租借。",
      ],
    ],
    guidance:
      `官方每人可帶一套裝袋 ski／snowboard 裝備＋一件行李；車內要脫雪鞋。訂位時申報尺寸和件數，多人同班須先確認最多 ${members.length} 箱＋${members.length} 板袋的承運，不以座位有空推定貨艙有空。`,
    fallback:
      "錯過巴士：即聯絡營運方，查下一班空位；官方不保證替代運輸，額外費用自付。最後一班也趕不上，先查 JR 全程末班及酒店末段接送；不可行就聯絡酒店、改住機場／札幌一晚，不硬趕雪路。",
    warning:
      "本頁查核：2026/9/4。官方營運期 2026/12/1–2027/3/30、每日行駛；以下為已公布 2026–27 班表，並非即時餘位／準點保證。所有時間為日本時間。",
    extra: `<article class="card"><span class="tag green">已公布 · 2026–27</span><h4>3/6 直達巴士班表</h4><table class="transport-timetable"><caption>Resort Liner → 新富良野王子（日本時間）</caption><thead><tr><th scope="col">CTS 國內線出發</th><th scope="col">CTS 國際線出發</th><th scope="col">酒店到達</th></tr></thead><tbody><tr><td>10:00</td><td>不經停</td><td>12:15</td></tr><tr><td>12:20</td><td>不經停</td><td>14:35</td></tr><tr><td>14:50</td><td>15:00</td><td>17:15</td></tr><tr><td>17:50</td><td>18:00</td><td>20:15</td></tr></tbody></table><p class="meta">中途休息；國際線旅客不要為搭早班而假定可以轉去國內線，須先問清集合及接駁條件。</p>${transportLinks(["airportTimetable", "airport", "meeting"])}</article>
      <div class="card-grid two"><article class="card"><p class="eyebrow">ALTERNATIVE A / JR</p><h4>新千歲 → 札幌 → 滝川 → 富良野</h4><p>Airport 列車到札幌，轉特急至滝川，再轉根室本線到富良野站，最後預約的士到酒店。按 JR 當季搜尋結果買全程所需車票；暫留約 4.5–6.5 小時，可能更久，不是固定班表。</p><p>轉車多、末段班次少；帶板袋先查電梯、指定席及每段末班。總價依班次／席種查官方，不把單一 Airport 票當全程票。</p>${transportLinks(["jr", "jrBook", "prince"])}</article><article class="card"><p class="eyebrow">ALTERNATIVE B / VIA SAPPORO</p><h4>機場巴士 → 札幌 → 高速富良野號</h4><p>機場巴士到札幌，再另搭高速富良野號到富良野站，最後預約的士到新富良野王子。兩段不是聯程保障；札幌下車點與下一班上車點未必相同，要查步行／轉乘。</p><p>只在班次、各段行李承運及末班接得上才考慮；留半天或更久並重查 2027 冬季班表。不比直達巴士省心。</p>${transportLinks(["chuoAirport", "chuoFurano", "prince"])}</article></div>`,
    sources: ["airport", "meeting", "prince"],
    maps: [
      ["New Chitose Airport International Terminal", "新千歲機場"],
      ["新富良野プリンスホテル", "新富良野王子"],
    ],
  },
  {
    id: "zoo",
    label: "03.09 動物園轉場",
    title: "新富良野王子 → 旭山動物園 → OMO7",
    tag: "唯一團體轉場・包車＋遊園",
    duration: "建議包 08:00–15:00 左右約 7 小時；車商按雪況確認，不是已訂行程",
    intro:
      "只安排這一天的 group shuttle：退房後全團連行李去動物園，車輛等候遊園，再送 OMO7。先同時問富良野巴士及 SkyExpress；另可找 Social Bus 比較方案。尚未聯絡、詢得報價或保留車位。",
    steps: [
      [
        "08:00–08:30｜酒店上車",
        "前晚還好應還租具；08:00 起點人、裝箱及板袋。往動物園暫留 1 小時 45 分至 2 小時 15 分，目標約 10:15–10:30 抵達；晚出發或雪慢便縮短遊園，不要求司機追時間。",
      ],
      [
        "10:30–13:30｜動物園＋午餐",
        "官方 2027/1/2–4/7 冬季開園 10:30–15:30、最後入園 15:00，涵蓋 3/9。留約 2.5–3 小時，午餐自理；企鵝散步按當日公告，不保證能看到。",
      ],
      [
        "13:30–14:00｜集合 → OMO7",
        "提早去約定入口、點齊人後出發。往 OMO7 暫留 40–55 分鐘，約 14:30–15:00 到酒店；未到入住時間先詢問寄物。全天休息，不加夜滑。",
      ],
    ],
    guidance:
      `按 ${members.filter(member => member.attendance === 'O').length} 人確認／最多 ${members.length} 人，先報最多 ${members.length} 大箱＋${members.length} snowboard bags＋隨身袋的規劃上限，再補實際尺寸。座位數不等於貨艙容量；優先較大車，兩車只有全團同意才採用，通道／出口不能放行李。`,
    fallback:
      "若包車未訂成，可重查當季 Powder Belt Liner，或 Lavender 去旭川先在 OMO7 寄物，再往動物園。它們是公共班車，不會為本團等候遊園，也不保證全團與板袋同班；接駁或寄物不成就保留直接轉酒店、取消動物園。",
    warning:
      "上述時間是主辦規劃建議，不是營運方行車承諾。雪天／臨時休園可改行程；冬季班表和租具跨城歸還須出發前重查。",
    extra: `<div class="card-grid">
      <article class="card"><p class="eyebrow">LOCAL OPERATOR</p><h4>富良野巴士</h4><p>先問 <strong>16 正座＋6 輔助座 microbus</strong>；官方有箱／高爾夫袋儲物空間，但沒有承諾 ${members.length} 個板袋。要求正式乘客座位及全部行李同時裝得下，不把輔助座當貨艙。</p><p>HiAce 頁面寫 12 正座、圖註 13 席，不能直接當本團一車方案。必要時問更大車；<strong>沒有公開固定價格，須按這條路線報價。</strong></p>${transportLinks(["furanoCharter", "furanoEnquiry"])}</article>
      <article class="card"><p class="eyebrow">ENGLISH ENQUIRY</p><h4>SkyExpress</h4><p>Coaster 公布最多 <strong>15 乘客（不含司機）</strong>，行李上限 15 大箱＋<strong>10 ski bags</strong>＋10 小袋。若 ${members.length} 人各帶一板袋，已超公布板袋數；須書面確認 snowboard bags 實際裝載／較大車方案，不能直接付款當已足夠。</p><p>有英文辦公室支援，不代表英語司機已含。車款可替換；按下方冬季價目比較，並要求指定日期報價。</p>${transportLinks(["skyFleet", "skyPrice", "charter"])}</article>
      <article class="card"><p class="eyebrow">COMPARISON LEAD</p><h4>Social Bus</h4><p>可作第三個詢價入口。官方車隊頁未列可採信的乘客／板袋容量或固定價；須索取實際承運商、車型、貨艙照片與書面報價，不能當已確認可載全團。</p>${transportLinks(["social"])}</article>
    </div>
    <article class="card"><p class="eyebrow">PRICE BENCHMARK / NOT A QUOTE</p><h4>大概要預幾多？</h4><p>SkyExpress 公布冬季（12–4 月，頁面未標年份）<strong>11 小時／9–15 人 ¥220,000 含稅</strong>，含司機、燃油、保險；冬季 9 小時欄沒有報價。這是日租比較基準，<strong>不是 3/9 七小時路線價，不能按比例折算</strong>。</p><p>另計過路費（網站建議每天預 ¥5,000–7,000，不代表此路線實收）、停車、可能的札幌／二世古區外接送費、司機住宿及超時。超時公布 ¥12,000／小時或不足一小時；新增等候、繞路按書面條款確認。</p><p><strong>主辦暫留 ¥230,000–300,000 全車預備金</strong>，只供比價／討論，不是市場保證價或上限。以 12 人約 ¥19,200–25,000／人；13 人約 ¥17,700–23,100／人。這個估算以日租基準加預備金，不含動物園門票／餐費；若須第二車或額外運板，可能超出。富良野本地車商須另詢，未必採同一收費。</p><p>不要再用舊三段包車總額收款。取得包含遊園等候及全部行李的正式總價後，用「出發前」的 <a class="text-link" href="#prepare">3/9 分攤試算</a>。</p>${transportLinks(["skyPrice", "furanoEnquiry"])}</article>
    <article class="card"><p class="eyebrow">BOOKING TIMELINE / 主辦建議</p><h4>何時開始聯絡？</h4><ol class="numbered-list"><li><strong>現在・2026/9：</strong>把同一份路線、12 人確認／最多 ${members.length} 人、行李上限、遊園等候要求寄給兩至三家；先問 3/9 能否接單。</li><li><strong>2026/10–11：</strong>比較書面總價、車型／貨艙、取消及改人數條款；有合適方案就按報價有效期決定，不等到冬季。</li><li><strong>最遲目標 2026/12–2027/1：</strong>完成訂金／確認車位、上落點、遊園行李保管及司機聯絡流程；若仍未訂成便啟用備案。</li><li><strong>出發前 1–2 週及前晚：</strong>補最終名單與尺寸、確認動物園／天氣、司機及集合點。</li></ol><p class="meta">這是建議工作時間線，不是營運方的訂位截止或供應保證；報價保留期／取消費以正式回覆為準。</p></article>
    <details class="card"><summary>遊園期間，行李及停車怎樣處理？</summary><p>要求車輛全程等候、行李留在鎖好車內的書面許可，問清保管／遺失責任及是否中途換車。貴重物品隨身，不靠園內儲物櫃放全團板袋。</p><p>由車商核實巴士停車申請、正確入口及費用。門票另付；如需團體申請，先向園方確認。時間不足時先刪額外停靠，不壓縮安全車程。</p>${transportLinks(["zooAccess", "zooTickets", "zoo"])}</details>`,
    sources: ["furanoEnquiry", "charter", "zoo", "zooBus", "lavender"],
    maps: [
      ["旭山動物園", "旭山動物園"],
      ["OMO7 旭川", "OMO7 旭川"],
    ],
  },
  {
    id: "resorts",
    label: "03.10–12 旭川雪場",
    title: "OMO7 → 各雪場往返",
    tag: "酒店基地・按程度分組",
    duration: "單程約 20–100 分鐘，按雪場及停站而定",
    intro:
      "3/10 Kamui、3/11 分組、3/12 按天氣及能力選場。向 OMO7 查當季巴士並同時訂去回程；2025–26 免費住客接駁不代表 2027 已有位。",
    steps: [
      [
        "先定人數及雪場",
        "每組一名聯絡人，確認營業、單板課及租具，再訂往返座位。",
      ],
      [
        "酒店集合",
        "核對真正站牌、方向及乘車憑證。前晚整理裝備、板袋貼名，乘車穿普通防滑鞋。",
      ],
      [
        "回程前 30 分鐘收裝備",
        "預留還板、換鞋及點算時間。錯過車聯絡酒店／車商，不沿結冰道路步行下山。",
      ],
    ],
    guidance:
      `向酒店確認每人板袋容量、申請截止、費用及上車位置。2025–26 住客接駁須前晚 22:00 前申請；${members.length} 人應更早登記。備用的士也要預先申報板袋。`,
    fallback:
      "滿席可保留有車的雪場，或預約分組的士／包車；雪場或交通停運就留市區。旭岳須按嚮導判斷取消，不能自行另找路上山。",
    warning:
      "2027/3/10–12 班次及座位未確認。Santa 日間巴士不包夜滑回程，夜滑須另訂往返。",
    extra: `<div class="card-grid two">
      <article class="card"><span class="tag green">3/10 主選</span><h4>Kamui｜神居</h4><p class="meta">單程約 45–70 分鐘</p><p>向 OMO7 訂往返接駁；舊季經 Santa。先確認交通，再付不可退課程。</p>${transportMap("カムイスキーリンクス", "神居")}</article>
      <article class="card"><span class="tag green">3/11–12 備選</span><h4>Pippu｜比布</h4><p class="meta">單程約 45–70 分鐘</p><p>向 OMO7 查當季住客接駁、站牌及末班；不是人人可搭的市區免費線。</p>${transportMap("ぴっぷスキー場", "比布")}</article>
      <article class="card"><span class="tag warm">夜滑自選</span><h4>Santa</h4><p class="meta">單程約 20–40 分鐘</p><p>日間查神居經停線；夜場先確認營業，再請酒店訂往返的士及板袋位。</p>${transportMap("サンタプレゼントパーク", "Santa")}</article>
      <article class="card"><span class="tag warm">3/12 冬山高手限定</span><h4>Asahidake｜旭岳</h4><p class="meta">單程約 75–100 分鐘</p><p>向酒店確認當季接送，配合嚮導集合及撤退時間。先訂回程，纜車停運即取消。</p>${transportMap("旭岳ロープウェイ 山麓駅", "旭岳纜車站")}</article>
    </div>`,
    sources: ["omo", "charter"],
    maps: [["OMO7 旭川", "酒店基地"]],
  },
  {
    id: "departure",
    label: "03.13 返回機場",
    title: "OMO7 旭川 → 新千歲機場",
    tag: "沒有團體直送・各自訂位",
    duration: "巴士現行約 2 小時 39 分；JR 連車站／轉乘暫留 3–4 小時，另加機場及冬季緩衝",
    intro:
      "3/13 不安排包車或酒店直送。每人按自己的航班選 Taisetsu Liner 公共機場巴士，或 JR 經札幌；可自行約小組同行，但不是全團同一個出門時間。兩者均未替大家訂票。",
    steps: [
      [
        "方案 A｜OMO7 前公共巴士",
        "現行 6条9丁目（OMO7 前）06:56 → CTS 國內線 09:35，或 08:56 → 11:35。成人單程 ¥4,500；兩個月前開售，3/13 的訂位可在 2027/1/13 起按官網確認。班表標示 2026/4/1 起，須再確認 2027/3/13 是否維持。",
      ],
      [
        "方案 B｜JR 旭川 → 札幌",
        "OMO7 至旭川站步行約 13–15 分鐘；雪地大箱＋板袋建議預約短程的士。特急 Lilac／Kamui 約 1.5 小時，現行全車指定席，先經官方訂位。",
      ],
      [
        "札幌 → 新千歲空港",
        "轉車建議留 30–45 分鐘；往機場的 Airport 約 40–50 分鐘，可選普通自由席或另訂指定席。現行分段票價例子 ¥5,440＋¥1,230＝約 ¥6,670／人；不是 2027 聯程報價，按購票全程結果及席種作準。",
      ],
    ],
    guidance:
      "Taisetsu 行李艙原則每人一件、≤0.25m³、長≤2m、重≤30kg；箱＋板袋屬多件，可能被拒，即使有座也須買票前取得承運同意。JR 一般每人最多兩件、每件≤30kg、三邊和≤250cm、長≤2m（特殊物品另有條件），板袋向 JR 確認；指定席不保證行李位，勿阻通道。",
    fallback:
      "按航空公司要求倒推：本頁建議國際線起飛前至少 3 小時、國內線前至少 2 小時到正確航廈，再額外留 1–2 小時冬季交通備援。做不到便改前晚住札幌／機場附近。前晚查 JR 及道路；兩者停運時聯絡航空公司和酒店，不硬趕。",
    warning:
      "Taisetsu 現行機場落客只有國內線，去國際線還要走連絡通道，不能把 09:35／11:35 當到達國際線櫃位。3 月可能改點；這些不是 2027 準點／接上航班保證。",
    extra: `<div class="card-grid two"><article class="card"><p class="eyebrow">PUBLIC BUS / SELF-BOOKED</p><h4>Taisetsu Liner 訂位及行李</h4><p>官網有 BusNAVI／Japan Bus Lines 訂位入口，先核對 6条9丁目 站牌及方向。現行 ¥4,500 普通單程價（2025/12/1 改價）；網上早割 ¥4,200 須乘車前 2 個月至 14 日完成預約付款，訂後不可改。2027 售價／規則仍需重查。</p><p>最適合班次配合且行李已獲同意的人；有兩件大行李卻未獲承運答覆，就不要把它當已可用，先比較 JR／提前寄送方案。現場候補不保證有位。</p>${transportLinks(["taisetsu"])}</article><article class="card"><p class="eyebrow">TRAIN / SELF-BOOKED</p><h4>JR 訂位與小組同行</h4><p>指定席通常乘車日前一個月 10:00 日本時間開售；3/13 可在 2027/2/13 起查正式可售班次。旭川特急與 Airport 所需票券一起查，不只買 Airport 那段。</p><p>可約每組 3–4 人，各人保存列車名、車廂及憑證；留電梯、行李架及走錯月台的緩衝。寄送大件要先查寄件／送達日及機場取件截止，不假定即日送到。</p>${transportLinks(["jrBook", "jrReservation", "jrFare", "jrAirport", "omoAccess"])}</article></div>`,
    sources: ["taisetsu", "jr", "jrBook", "jrFare"],
    maps: [
      ["旭川駅", "旭川站"],
      ["札幌駅", "札幌站"],
      ["新千歳空港 国際線ターミナル", "機場國際線"],
    ],
  },
];

const charterEnquiry = `Subject: 9 March 2027 group shuttle with zoo waiting — Shin Furano Prince to OMO7 Asahikawa

Hello, please quote ONE private group transfer on 9 March 2027: Shin Furano Prince Hotel (Nakagoryo, Furano) -> Asahiyama Zoo (wait during our visit) -> OMO7 Asahikawa (6-jo-dori 9-chome).

Our public planning snapshot lists ${members.filter(member => member.attendance === 'O').length} attending and ${members.filter(member => member.attendance === '?').length} undecided, up to ${members.length} passengers. Please quote both confirmed and maximum group sizes. We will not drive ourselves. No airport transfers or daily resort transfers are requested in this enquiry.

Suggested timing, subject to your winter-safe advice: load/depart around 08:00-08:30, reach the zoo around 10:15-10:30, visit and lunch until around 13:30, depart by 14:00, reach OMO7 around 14:30-15:00. Published 2027 winter zoo hours are 10:30-15:30, last entry 15:00, subject to change. Please recommend a realistic schedule and a weather/closure alternative.

Planning maximum: ${members.length} large suitcases + ${members.length} snowboard bags + day bags. Final counts, dimensions and weights will follow. Please provide usable passenger capacity EXCLUDING driver and simultaneous cargo capacity, vehicle class and cargo photos. We prefer everyone in one vehicle with luggage, without using aisles or exits. A seat count alone is insufficient; please propose a larger vehicle if needed. Quote any two-vehicle alternative separately for our approval.

Please include zoo waiting, bus parking/advance application, agreed entrance and pickup point. Can luggage remain in the locked vehicle throughout the visit? Please confirm custody/liability, whether the same vehicle waits, and how vehicle substitution is handled.

Please itemise tax, tolls, parking, waiting, overtime, deadhead/out-of-area charges, any driver accommodation and luggage charges. Confirm quote validity, deposit/payment schedule, cancellation and passenger-count changes, weather/road-closure terms, meeting instructions and the emergency-contact process.

This is a quotation request, not a booking confirmation. Thank you.`;

export function renderTransport(container) {
  container.innerHTML = `
    <header class="section-intro"><p class="eyebrow">TRANSPORT / 非自駕交通</p><h2 class="section-title">機場各自訂，3/9 一起轉場。</h2><p class="muted">3/6 定期機場巴士；3/9 團體包車連動物園；3/13 各自巴士／JR。每日雪場往返另外安排，以下未代訂任何車票或車輛。</p></header>
    <div class="callout warning"><strong>規劃基準 · 公開名單快照</strong><p>${members.filter(member => member.attendance === 'O').length} 人出席、${members.filter(member => member.attendance === '?').length} 人待確認，最多 ${members.length} 人。3/9 按乘客＋大箱＋板袋一起詢價，不能只看「14 座」。機場巴士按各自航班選班；資料查核 2026/9/4，已公布新季、現行參考和主辦估算分開標示。</p></div>
    <div class="pill-row" role="group" aria-label="選擇交通路段">${transportRoutes.map((route, index) => `<button type="button" class="pill${index === 0 ? " active" : ""}" id="transport-button-${route.id}" data-transport-route="${route.id}" aria-pressed="${index === 0}" aria-controls="transport-route-panel">${route.label}</button>`).join("")}</div>
    <p class="meta" id="transport-route-status" role="status" aria-live="polite"></p>
    <div id="transport-route-panel" class="stack" role="region" aria-labelledby="transport-route-title"></div>
    <div class="card-grid two">
      <details class="card"><summary>3/9 包車付款前：人數、行李及條款</summary><ol class="numbered-list"><li><strong>容量：</strong>實際人數、箱／板袋尺寸，索取車型及行李艙照片。</li><li><strong>報價：</strong>只問 3/9 富良野 → 動物園 → OMO7，含遊園等候，列停車、過路、區外接送及加班。</li><li><strong>條款：</strong>取消、改人數、封路、改期、行李留車責任及可能額外住宿。</li><li><strong>覆核：</strong>出發前 1–2 週及前晚確認集合點、司機聯絡流程、天氣及營運。</li></ol><p class="meta">先取得完整書面報價及行李承運確認，再決定付款；不包含去回機場接送。</p>${transportLinks(["furanoEnquiry", "charter"])}</details>
      <article class="card"><p class="eyebrow">MARCH 9 / CHARTER ENQUIRY</p><h3>只詢 3/9：英文包車詢價信</h3><p>複製草稿，補最終人數及行李尺寸後自行寄出；不會自動寄信或訂車。</p><label for="transport-enquiry">英文詢價內容</label><textarea id="transport-enquiry" class="transport-enquiry" rows="12" readonly lang="en" spellcheck="false"></textarea><div class="pill-row"><button type="button" class="button" id="transport-copy">複製詢價信</button><button type="button" class="button secondary" id="transport-select">選取全文</button></div><p id="transport-copy-status" role="status" aria-live="polite" class="meta">自動複製失敗時，可選取全文手動複製。</p></article>
    </div>`;

  const panel = container.querySelector("#transport-route-panel");
  const routeStatus = container.querySelector("#transport-route-status");
  const buttons = container.querySelectorAll("[data-transport-route]");
  function showRoute(route, announce) {
    buttons.forEach((button) => {
      const active = button.dataset.transportRoute === route.id;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    panel.innerHTML = `<article class="card stack">
      <div class="card-top"><span class="tag green">${route.tag}</span><span class="meta">${route.label}</span></div>
      <h3 id="transport-route-title">${route.title}</h3>
      <p>${route.intro}</p>
      <p class="callout"><strong>預留時間</strong><br>${route.duration}</p>
      <p><strong>行李限制</strong><br>${route.guidance}</p>
      <ol class="numbered-list">${route.steps.map(([title, body]) => `<li><strong>${title}</strong><p>${body}</p></li>`).join("")}</ol>
      <p class="meta">${route.warning}</p>
      <div class="source-links">${route.maps.map(([place, label]) => transportMap(place, label)).join("")}</div>
      ${transportLinks(route.sources)}
    </article>
    <details class="card"><summary>備案及時間緩衝</summary><p>${route.fallback}</p></details>
    ${route.extra}`;
    routeStatus.textContent = announce
      ? `目前顯示：${route.label}`
      : "選擇一段路，查看集合、行李與備案。";
  }
  buttons.forEach((button) =>
    button.addEventListener("click", () => {
      const route = transportRoutes.find(
        (item) => item.id === button.dataset.transportRoute,
      );
      if (route) showRoute(route, true);
    }),
  );
  showRoute(transportRoutes[0], false);

  const enquiry = container.querySelector("#transport-enquiry");
  const copyStatus = container.querySelector("#transport-copy-status");
  enquiry.value = charterEnquiry;
  function selectEnquiry() {
    enquiry.focus();
    enquiry.select();
    enquiry.setSelectionRange(0, enquiry.value.length);
  }
  container.querySelector("#transport-select").addEventListener("click", () => {
    selectEnquiry();
    copyStatus.textContent =
      "已選取全文。請按 Cmd+C／Ctrl+C，或在手機長按選取文字後複製。";
  });
  container
    .querySelector("#transport-copy")
    .addEventListener("click", async () => {
      try {
        if (!navigator.clipboard?.writeText)
          throw new Error("Clipboard unavailable");
        await navigator.clipboard.writeText(enquiry.value);
        copyStatus.textContent =
          "詢價信已複製。請先補齊最終人數及行李尺寸，再自行寄給車商；只詢 3/9 轉場。";
      } catch {
        selectEnquiry();
        copyStatus.textContent =
          "瀏覽器未允許自動複製；已選取詢價內容，請按 Cmd+C／Ctrl+C，或長按手動複製。信件不會自動寄出。";
      }
    });
}
