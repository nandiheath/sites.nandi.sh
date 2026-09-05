import { members } from './members.js';

const transportSources = {
  charter: ["SkyExpress｜官方包車詢價", "https://book.skyexpress.jp/en/order"],
  access: [
    "北海道 Access Network｜官方季節路線入口",
    "https://www.access-n.jp/winter2025/en/",
  ],
  airport: [
    "Resort Liner｜官方 2025–26 機場線與條款",
    "https://www.access-n.jp/winter2025/en/skibus/detail/chitose_furano.html",
  ],
  meeting: [
    "Resort Liner｜官方 2025–26 集合地圖",
    "https://www.access-n.jp/winter2025/en/information/",
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
  blog: [
    "喵爸喵媽｜交通經驗部落格（2026/4 更新）",
    "https://kimiyo.tw/prince-hotel-shinfurano-transportation/",
  ],
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
    tag: "首選：預約包車",
    duration: "道路段約 3–4.5 小時，另計入境及等候",
    intro:
      `名單 ${members.length} 人，首選包車直達 Shin Furano Prince Hotel。先收齊出席、航班、航廈及行李資料，再向車商詢價。`,
    steps: [
      [
        "訂車",
        `報價列明延誤等候及途中休息。季節直達巴士則須確認 2026–27 營業日、最多 ${members.length} 個座位及新富良野王子站。`,
      ],
      [
        "機場集合",
        "集合點以接送憑證為準；全員取回行李後由一名聯絡人報到。建議提早 20–30 分鐘集合；落地後國際線預留約 2 小時以上、國內線約 1 小時以上。",
      ],
      [
        "酒店落車",
        "使用全名 Shin Furano Prince Hotel／新富良野プリンスホテル，避免去錯王子酒店。點齊箱及板袋，再確認翌日單板課與租借。",
      ],
    ],
    guidance:
      "包車先報箱及板袋件數、尺寸。Resort Liner 2025–26 每人限一套裝袋雪具＋一件行李，上車須脫雪鞋；2027 容量及規則另確認。",
    fallback:
      "JR：新千歲空港 → 札幌 → 滝川 → 富良野，再預約的士到酒店，整段約 4.5–6.5 小時或更久。晚機或大範圍停運時，聯絡酒店／車商安排機場或札幌過夜，不硬趕山路。",
    warning:
      "Resort Liner 成人單程 ¥6,000 為 2025/12–2026/3 舊季價；2027 班次、截止及集合點待確認。",
    extra: `<details class="card"><summary>機場巴士：舊季條款及查詢入口</summary><p>Resort Liner 舊季要求提早 15 分鐘報到。王子交通頁另有北海道巴士入口；兩者都須重查 2027/3/6 是否可訂。原部落格的四班車及「2.5 小時」不作本團班表。</p>${transportLinks(["airport", "meeting", "prince", "blog"])}</details>`,
    sources: ["charter", "access", "jr", "jrBook", "prince"],
    maps: [
      ["New Chitose Airport International Terminal", "新千歲機場"],
      ["新富良野プリンスホテル", "新富良野王子"],
    ],
  },
  {
    id: "zoo",
    label: "03.09 動物園轉場",
    title: "新富良野王子 → 旭山動物園 → OMO7",
    tag: "休息日・轉酒店",
    duration: "約 5–7 小時，含約 3 小時遊園",
    intro:
      "首選包車，兩段接送連遊園等候一起詢價；行李留車須取得書面同意。",
    steps: [
      [
        "退房 → 動物園",
        "道路段約 1.5–2 小時，出發時間由車商確認。先還應還租具及取回押金；帶走的租板須獲准跨城使用。",
      ],
      [
        "遊園約 3 小時",
        "官方 2027/1/2–4/7 開園 10:30–15:30，最後入園 15:00，涵蓋 3/9。企鵝散步及餵食看當日公告。",
      ],
      [
        "動物園 → OMO7",
        "道路段約 30–50 分鐘。與司機寫明入口、集合點、電話及等候截止；到酒店後確認翌日雪場往返。",
      ],
    ],
    guidance:
      "確認車輛全程等候、行李保管責任及箱／板袋容量，貴重物品隨身。園區寄物櫃未必放得下；巴士停車場預先申請交車商處理。",
    fallback:
      "查當季 Powder Belt Liner 富良野 → 動物園／旭川，遊園後交通另訂。行李無處放則先乘 Lavender 到旭川、OMO7 寄物，再坐市區巴士；時間不足就取消動物園。",
    warning:
      `動物園可能臨時休園。Powder Belt Liner ¥4,500 為 2025–26 舊季單程價；Lavender 免預約，不保證 ${members.length} 人及板袋同班。`,
    extra: `<details class="card"><summary>公共交通備案：先寄行李</summary><p>Lavender 2026/4 路線：新富良野王子 → 旭川站約 2 小時，等車另計、不設訂位。OMO7 可入住前寄物，先報大件數量。</p><p>園方 2026/8 指引：旭川站前 6 號站、41／47 線到動物園約 40 分鐘。重查 2027 班表及末班，分車時保持聯絡；Powder Belt Liner 停靠不代表等候遊園。</p>${transportLinks(["lavender", "zooAccess", "omo", "zooTickets"])}</details>`,
    sources: ["charter", "zooBus", "zoo", "zooAccess", "meeting"],
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
    tag: "包車・JR 備案",
    duration: "酒店至航廈約 3–4.5 小時，另加天候及報到緩衝",
    intro:
      "先有航班時間、航廈及航空公司板袋託運規則，再訂包車或 JR。Taisetsu Liner 是公共巴士，不是酒店接駁。",
    steps: [
      [
        "首選包車",
        "請車商按航班倒推接送，列明航廈、板袋容量、通行費及雪天繞路。道路段約 3–4 小時，另留冬季延誤。",
      ],
      [
        "JR：旭川 → 札幌",
        "OMO7 至旭川站步行約 15 分鐘；帶板及大箱建議預訂的士。特急 Lilac／Kamui 約 1.5 小時，經官方訂位入口買指定席。",
      ],
      [
        "札幌 → 新千歲空港",
        "轉乘留 30–45 分鐘；搭往機場方向 Airport，約 40–50 分鐘，可另訂指定席。抵站後前往正確航廈。",
      ],
    ],
    guidance:
      "包車申報箱＋板袋；JR 每人最多兩件、每件 ≤30kg、三邊和 ≤250cm、長 ≤2m（特殊物品另有條件），板袋先向 JR 確認。指定席不保證專用行李位，勿阻通道。",
    fallback:
      "建議國際線起飛前 3 小時、國內線前 2 小時到航廈，另留 1–2 小時冬季備援；早機考慮前晚改住機場附近。前晚查道路及 JR，兩者停運即聯絡航空公司／酒店改簽和住宿。",
    warning:
      "2027/3/13（六）可能遇 JR 三月改點，須重查列車、轉乘及全程票價；Airport 的 IC 規則不代表已包特急票。",
    extra: `<details class="card"><summary>Taisetsu Liner：直達巴士及行李限制</summary><p>2026/4/1 班表：6條9丁目（OMO7 前）→ 新千歲國內線；國際線另走連絡通道。由官方頁訂位，現行提前兩個月開售。成人單程 ¥4,500（2025/12/1 改價），2027 班次及價格待確認。</p><p>行李艙原則每人一件、長 ≤2m、重 ≤30kg、容積 ≤0.25m³。箱＋板袋可能被拒，買票前須取得承運同意。</p>${transportLinks(["taisetsu"])}</details><details class="card"><summary>JR 分組及大件行李</summary><p>每 3–4 人一組，留一人壓後；各人保存列車名、車廂及訂位憑證。預留電梯及行李架排隊時間。寄送大件須提前確認送達日及機場取件截止。</p>${transportLinks(["jrAirport", "jrBook", "omoAccess"])}</details>`,
    sources: ["charter", "jr", "jrBook", "taisetsu"],
    maps: [
      ["旭川駅", "旭川站"],
      ["札幌駅", "札幌站"],
      ["新千歳空港 国際線ターミナル", "機場國際線"],
    ],
  },
];

const charterEnquiry = `Subject: Private transfers for up to ${members.length} passengers — Hokkaido, 6–13 March 2027

Hello, please quote the following private transfers with a professional driver. Our public planning snapshot lists ${members.filter(member => member.attendance === 'O').length} attending and ${members.filter(member => member.attendance === '?').length} undecided, up to ${members.length} passengers; please quote both confirmed and maximum group sizes. We will not drive ourselves.

1. 6 March 2027: New Chitose Airport (CTS) to Shin Furano Prince Hotel, Nakagoryo, Furano. Flight numbers, arrival times and domestic/international terminal will be provided once confirmed.
2. 9 March 2027: Shin Furano Prince Hotel to Asahiyama Zoo, with approximately 3 hours for the visit, then OMO7 Asahikawa, 6-jo-dori 9-chome. Please advise a winter-safe pickup time. The published 2027 winter zoo hours are 10:30–15:30, last entry 15:00, subject to change.
3. 13 March 2027: OMO7 Asahikawa to CTS, correct departure terminal. Our flight details will be supplied before booking; please recommend pickup time allowing winter delays and airline check-in.

Please quote these three main transfers separately and as a package. If available, quote optional return resort transfers on 10–12 March separately (Kamui / Pippu / Santa; Asahidake only if conditions and our guide permit).

Please provide vehicle type and usable passenger AND cargo capacity together. A 14-seat description alone is not sufficient; confirm whether the driver is included in that count. Please check capacity for up to ${members.length} passengers, ${members.length} large suitcases, ${members.length} snowboard bags and day bags; final counts, dimensions and weights will follow. Propose a larger vehicle or two professionally driven vehicles if needed, without blocking aisles or exits.

For 9 March, please include zoo waiting time, bus parking arrangements/required advance application, agreed entrance and pickup point, and whether luggage can remain securely in the vehicle while we visit. Please explain custody/liability and whether the same vehicle waits throughout.

Please itemise tax, tolls, parking, driver waiting, overtime, extra stops, flight delay handling, winter road closures, cancellation terms, payment schedule and any luggage surcharge. Please provide the meeting-point instructions and an emergency contact. This is a quotation request, not a booking confirmation.
Thank you.`;

export function renderTransport(container) {
  container.innerHTML = `
    <header class="section-intro"><p class="eyebrow">TRANSPORT / 非自駕交通</p><h2 class="section-title">四段交通，先訂往返及板袋位。</h2><p class="muted">三段大移動優先包車；旭川雪場按程度分組。以下未出票、未訂車。</p></header>
    <div class="callout warning"><strong>規劃基準 · 公開名單快照</strong><p>${members.filter(member => member.attendance === 'O').length} 人出席、${members.filter(member => member.attendance === '?').length} 人待確認，最多 ${members.length} 人。「14 座」先問是否包括司機，亦不保證裝得下全團＋大箱＋板袋；車程為冬季估算，2027 班次及座位須另查。</p></div>
    <div class="pill-row" role="group" aria-label="選擇交通路段">${transportRoutes.map((route, index) => `<button type="button" class="pill${index === 0 ? " active" : ""}" id="transport-button-${route.id}" data-transport-route="${route.id}" aria-pressed="${index === 0}" aria-controls="transport-route-panel">${route.label}</button>`).join("")}</div>
    <p class="meta" id="transport-route-status" role="status" aria-live="polite"></p>
    <div id="transport-route-panel" class="stack" role="region" aria-labelledby="transport-route-title"></div>
    <div class="card-grid two">
      <details class="card"><summary>包車付款前：人數、行李及條款</summary><ol class="numbered-list"><li><strong>容量：</strong>實際人數、箱／板袋尺寸，索取車型及行李艙照片。</li><li><strong>報價：</strong>三段分項，列動物園等候、停車、過路費及司機加班。</li><li><strong>條款：</strong>誤機、取消、封路、改期及額外住宿責任。</li><li><strong>覆核：</strong>出發前一週及前晚確認集合點、司機電話、天氣及營運。</li></ol><p class="meta">原構想 ¥195,000–220,000 並非車商報價，範圍及車型未定，不可直接按名單人數收款。</p>${transportLinks(["charter", "access"])}</details>
      <article class="card"><p class="eyebrow">CHARTER ENQUIRY</p><h3>包車詢價信</h3><p>複製英文草稿，補航班及行李後自行寄出；不會自動訂車。</p><label for="transport-enquiry">英文詢價內容</label><textarea id="transport-enquiry" class="transport-enquiry" rows="12" readonly lang="en" spellcheck="false"></textarea><div class="pill-row"><button type="button" class="button" id="transport-copy">複製詢價信</button><button type="button" class="button secondary" id="transport-select">選取全文</button></div><p id="transport-copy-status" role="status" aria-live="polite" class="meta">自動複製失敗時，可選取全文手動複製。</p></article>
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
          "詢價信已複製。請先補齊航班與行李資料，再自行寄給車商。";
      } catch {
        selectEnquiry();
        copyStatus.textContent =
          "瀏覽器未允許自動複製；已選取詢價內容，請按 Cmd+C／Ctrl+C，或長按手動複製。信件不會自動寄出。";
      }
    });
}
