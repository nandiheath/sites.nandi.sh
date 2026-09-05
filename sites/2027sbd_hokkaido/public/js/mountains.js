const mountainSources = {
  furano: "https://www.princehotels.co.jp/ski/furano/winter/lift/",
  kamui: "https://www.kamui-skilinks.com/guide/",
  pippu: "https://town.pippu.hokkaido.jp/ski/lift.html",
  santa: "https://www.asahikawasantapresentpark.com/cont1/8.html",
  asahidake: "https://www.potato.ne.jp/wakasaresort/white/index.htm",
  belt: "https://www.hokkaido-powder-belt.jp/",
  beltTerms:
    "https://tw.wamazing.com/snow/resorts/hokkaido_powder_belt/partner_ec/items?utm_medium=referral&utm_source=hokkaido_powder_belt&utm_campaign=ec",
  forecast:
    "https://www.jma.go.jp/bosai/forecast/#area_type=offices&area_code=120000",
  warnings:
    "https://www.jma.go.jp/bosai/warning/#area_type=offices&area_code=120000",
  climate:
    "https://www.data.jma.go.jp/stats/etrn/view/nml_sfc_ym.php?prec_no=12&block_no=47407&year=&month=&day=&view=",
};

const mountainResorts = [
  {
    id: "furano",
    name: "富良野",
    english: "FURANO",
    tag: "兩個雪區・首兩日",
    skills: ["beginner", "progress", "expert"],
    days: "3/7、3/8",
    price: 8000,
    ticket: "成人一般一日券",
    intro:
      "3/7 在富良野區上單板課；3/8 按程度選北之峰或原區練習。",
    terrain:
      "新手先練煞停、轉彎及上落吊椅；進階組可滑兩區開放雪道。綠線也有較陡路段，交由教練選線。",
    caution:
      "跨區前查連絡道、吊椅及回程。新手不跟高手上山頂或入樹林；封閉路線勿進。",
    ticketNote:
      "2025–26 通常期（2025/12/6–2026/3/22）：一日 ¥8,000、3 小時 ¥6,400、5 小時 ¥7,200。合資格 Prince 會員一日 ¥6,600，入住酒店不自動享有。",
    rental:
      "官方 ATOMIC / Salomon：成人 snowboard 板＋雪鞋一日 ¥8,100、兩日 ¥13,600（2025–26）。衣物不包；提供身高、鞋碼，另問頭盔、跨區取還及能否帶離富良野。",
    lesson:
      "由官方學校入口查成人 snowboard 班，訂位時確認教練語言、程度、師生比例、集合雪區及所需雪票。各校教學板種不同，不能用雙板課代替；2026–27 名額待確認。",
    access:
      "新富良野王子酒店旁是富良野區；去北之峰先問酒店當季接駁，新手不靠雪上跨區交通。",
    map: "富良野スキー場",
    course: "https://www.princehotels.co.jp/ski/furano/winter/coursemap/",
    current:
      "https://www.princehotels.co.jp/ski/furano/informations/snowreport",
    rentalLink: "https://www.princehotels.co.jp/ski/furano/winter/info/",
    lessonLink: "https://www.princehotels.co.jp/ski/furano/winter/school/",
  },
  {
    id: "kamui",
    name: "神居滑雪場",
    english: "KAMUI SKI LINKS",
    tag: "旭川基地・適合分組",
    skills: ["beginner", "progress", "expert"],
    days: "3/10 主選；3/11、3/12 備選",
    price: 5300,
    ticket: "成人一日券",
    intro:
      "新手在山麓練習；進階組選長雪道，分組後約同一集合點。",
    terrain:
      "First Timer：900m、最大 15°，由教練評估。Next Step：4,000m，雖列初級仍有中坡，不適合第一次上板就挑戰。",
    caution:
      "深雪及未壓雪道只適合相應程度；封閉路線勿進。轉場前也要查新目的地營運。",
    ticketNote:
      "2025–26：一日 ¥5,300、連續 4 小時 ¥4,600；IC 卡押金 ¥500 可退。20 小時券 ¥20,000，逐小時計、不可共享；本團最多三日到訪，先算實際時數。",
    rental:
      "官方 FISCHER BASE：成人 snowboard 套裝一日 ¥7,500、4 小時 ¥6,000（2025–26）；衣物及配件另計。預留試雪鞋、領板、還板及退卡時間。",
    lesson:
      "官方學校頁有 JSBA 單板教學單位，部分須預約。直接確認成人新手班、語言、小組人數及 2027 價格；不要誤訂 SAJ 雙板課。",
    access:
      "向 OMO7 預約當季往返雪場巴士，同時確認回程座位。",
    map: "カムイスキーリンクス",
    course: "https://www.kamui-skilinks.com/today/",
    current: "https://www.kamui-skilinks.com/today/",
    rentalLink: mountainSources.kamui,
    lessonLink: "https://www.kamui-skilinks.com/school/",
  },
  {
    id: "pippu",
    name: "比布滑雪場",
    english: "PIPPU",
    tag: "短時練習・票價較低",
    skills: ["beginner", "progress", "expert"],
    days: "3/11、3/12 彈性選擇",
    price: 3800,
    ticket: "成人一日券・附入浴券",
    intro:
      "適合已能控制方向、想多練幾轉的人；完全新手先確認三月設施及教練。",
    terrain:
      "2024–25 地圖：Beginner 400m／最大 8°；Family 2,000m／最大 20°。另有深雪及 Veteran 道，並非全山緩坡。",
    caution:
      "2025–26 拖牽繩索及夜滑只到二月底，吊椅不可下山。三月拖牽未確認，不安排比布夜滑。",
    ticketNote:
      "2025–26：一日 ¥3,800（附遊湯ぴっぷ入浴券）、4 小時 ¥3,000、4 小時加餐券 ¥3,600。泡湯另配合營業及回程。",
    rental:
      "雪番屋：成人 snowboard 板＋雪鞋一日 ¥6,000、4 小時 ¥5,000（2025–26）；衣物、頭盔另計。尺碼及團體供應可致電 0166-85-3001。",
    lesson:
      "2027 三月成人 snowboard／外語課未核實。先經官方入口取得確認；未訂到教練的新手，改到已有課程的富良野或 Kamui。",
    access:
      "先確認旭川往返雪場巴士或包車；車站不在雪道旁，票價低不代表連交通最便宜。",
    map: "ぴっぷスキー場",
    course: "https://town.pippu.hokkaido.jp/ski/course.html",
    current: "https://town.pippu.hokkaido.jp/ski/top.html",
    rentalLink: "https://town.pippu.hokkaido.jp/ski/rental.html",
    lessonLink: "https://town.pippu.hokkaido.jp/ski/top.html",
  },
  {
    id: "santa",
    name: "Santa Present Park",
    english: "ASAHIKAWA SANTA",
    tag: "市郊短時練習・可選夜滑",
    skills: ["beginner", "progress"],
    days: "3/10 夜滑加選；3/11 白天替代",
    price: 4200,
    ticket: "成人日中券・不含夜滑",
    intro:
      "適合短時練習；3/10 滑完 Kamui 可自選加夜場，不必全團參加。",
    terrain:
      "設 Kids 練習區、輸送帶及不同級別雪道。新手由教練選區；輸送帶須另買專用票。",
    caution:
      "2027 三月夜滑日及回程未確認。先訂夜間接送；硬雪、低溫及疲勞會加大難度，不建議當新手第一課。",
    ticketNote:
      "2025–26：日中 ¥4,200、2 小時 ¥3,000、5 小時 ¥3,600；夜滑另購 ¥1,800。輸送帶 ¥1,500，舊季 10:00–15:00。",
    rental:
      "成人 snowboard 套裝一日 ¥4,500、2 小時 ¥3,500；加衣物一日 ¥6,500（2025–26）。不接受租借預約，帶護照等證件；先確認合身器材，再買不可退雪票。",
    lesson:
      "官方有獨立學校連結，但成人 snowboard、外語及夜間授課未確認。先問清板種和時段，日間有課不代表夜場有教練。",
    access:
      "夜滑須另訂往返的士並申報板袋，或確認當季夜間巴士；不能步行回 OMO7。",
    map: "旭川サンタプレゼントパーク",
    course: "https://www.asahikawasantapresentpark.com/cont1/main.html",
    current: "https://www.asahikawasantapresentpark.com/cont1/main.html",
    rentalLink: "https://www.asahikawasantapresentpark.com/cont1/10.html",
    lessonLink: "https://www.asahikawasantapresentpark.com/cont1/13.html",
  },
  {
    id: "asahidake",
    name: "旭岳",
    english: "ASAHIDAKE",
    tag: "只限冬山高手",
    skills: ["expert"],
    days: "3/12 高手組條件選項",
    price: 6800,
    ticket: "成人上行專用一日券",
    intro:
      "不是一般管理式雪場。官方勸告冬山上級者以外勿進；新手及一般進階組不去旭岳滑行。",
    terrain:
      "指定路線也沒有一般雪場式巡邏保障，路外不屬纜車公司管理。能滑黑線不等於懂雪崩判斷、導航及同伴救援。",
    caution:
      "須有冬山經驗、合資格在地嚮導、雪崩裝備及操作能力、保險和往返交通。嚮導按風、視野及雪層決定；不合適即取消，不能自行改線上山。",
    ticketNote:
      "2025–26 冬價：上行一日 ¥6,800、4 小時 ¥5,600；6 回 ¥7,900 是六次上行，不是六日。3/16 後春價不適用本團 3/12。票不含下行；天候停駛不改期、延長或退款。",
    rental:
      "纜車公司不出租板鞋、登山或防寒裝備。預先備妥 snowboard、雪鞋、收發器、探棒、雪鏟、導航、備援電源、保暖及緊急補給；有裝備不等於有經驗。",
    lesson:
      "不安排入門課。向熟悉旭岳的合資格冬山嚮導申報每人野雪經驗，確認合法路線、人數、救援、取消條款及報價；嚮導與專用裝備另計。",
    access:
      "確認末班下行、持票下行安排及山麓回旭川接送，另備停駛撤退方案；不可只靠最後一班纜車下山。",
    map: "旭岳ロープウェイ 山麓駅",
    course: mountainSources.asahidake,
    current: "https://asahidake.hokkaido.jp/ja/",
    rentalLink: mountainSources.asahidake,
    lessonLink: mountainSources.asahidake,
  },
];

const mountainTickets = {
  furanoDay: {
    resort: "furano",
    label: "富良野・一日",
    amount: 8000,
    belt: true,
  },
  furano3: {
    resort: "furano",
    label: "富良野・3 小時",
    amount: 6400,
    belt: true,
  },
  furano5: {
    resort: "furano",
    label: "富良野・5 小時",
    amount: 7200,
    belt: true,
  },
  kamuiDay: { resort: "kamui", label: "Kamui・一日", amount: 5300, belt: true },
  kamui4: { resort: "kamui", label: "Kamui・4 小時", amount: 4600, belt: true },
  pippuDay: { resort: "pippu", label: "比布・一日", amount: 3800, belt: false },
  pippu4: { resort: "pippu", label: "比布・4 小時", amount: 3000, belt: false },
  santaDay: {
    resort: "santa",
    label: "Santa・日中",
    amount: 4200,
    belt: false,
  },
  santa2: {
    resort: "santa",
    label: "Santa・2 小時",
    amount: 3000,
    belt: false,
  },
  asahiDay: {
    resort: "asahidake",
    label: "旭岳・上行一日（冬山高手限定）",
    amount: 6800,
    belt: false,
  },
  rest: { resort: null, label: "休息・不買雪票", amount: 0, belt: false },
};

const mountainDays = [
  {
    date: "3/7（日）",
    note: "富良野區・第一課",
    options: ["furano3", "furano5", "furanoDay", "rest"],
  },
  {
    date: "3/8（一）",
    note: "北之峰／合適練習區",
    options: ["furano3", "furano5", "furanoDay", "rest"],
  },
  {
    date: "3/10（三）",
    note: "Kamui・旭川首日",
    options: ["kamui4", "kamuiDay", "rest"],
  },
  {
    date: "3/11（四）",
    note: "按能力與交通調整",
    options: [
      "kamui4",
      "kamuiDay",
      "pippu4",
      "pippuDay",
      "santa2",
      "santaDay",
      "rest",
    ],
  },
  {
    date: "3/12（五）",
    note: "雪況決策日・高手可分組",
    options: ["kamui4", "kamuiDay", "pippu4", "pippuDay", "asahiDay", "rest"],
  },
];

const mountainPresets = {
  beginner: ["furano3", "furano3", "kamui4", "pippu4", "pippu4"],
  resort: ["furanoDay", "furanoDay", "kamuiDay", "kamuiDay", "kamuiDay"],
  expert: ["furanoDay", "furanoDay", "kamuiDay", "kamuiDay", "asahiDay"],
};

function mountainYen(amount) {
  return `¥${amount.toLocaleString("ja-JP")}`;
}

function mountainLink(url, label) {
  return `<a class="text-link" href="${url.replaceAll("&", "&amp;")}" target="_blank" rel="noopener noreferrer">${label}</a>`;
}

function mountainCard(resort) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resort.map)}`;
  return `<article class="card stack" data-mountain-card="${resort.id}" aria-labelledby="mountain-title-${resort.id}">
    <div class="card-top"><span class="eyebrow">${resort.english}</span><span class="tag ${resort.id === "asahidake" ? "warm" : "green"}">${resort.tag}</span></div>
    <div><h3 id="mountain-title-${resort.id}">${resort.name}</h3><p class="meta">${resort.days}</p></div>
    <p>${resort.intro}</p>
    <p class="price">${mountainYen(resort.price)} <small>／${resort.ticket}</small></p>
    <p class="meta"><span class="tag">2025–26 舊季</span></p>
    <p>${resort.terrain}</p>
    <div class="callout ${resort.id === "asahidake" ? "warning" : ""}"><strong>${resort.id === "asahidake" ? "冬山安全門檻" : "選這裡之前"}</strong><p>${resort.caution}</p></div>
    <details>
      <summary>票種、租借、課程與抵達方式</summary>
      <div class="stack">
        <p><strong>票種比較</strong><br>${resort.ticketNote}</p>
        <p><strong>Snowboard 板鞋及裝備</strong><br>${resort.rental}</p>
        <p><strong>${resort.id === "asahidake" ? "冬山嚮導" : "單板教練"}</strong><br>${resort.lesson}</p>
        <p><strong>交通</strong><br>${resort.access}</p>
        <div class="source-links">${mountainLink(resort.rentalLink, resort.id === "asahidake" ? "官方・無租借與冬山警告" : "官方・租借說明")}${resort.id === "asahidake" ? "" : mountainLink(resort.lessonLink, "官方・課程查詢入口")}</div>
      </div>
    </details>
    <div class="source-links">
      ${mountainLink(mountainSources[resort.id], "官方・2025–26 票價")}
      ${mountainLink(resort.course, resort.id === "asahidake" ? "官方・冬季路線與安全" : "官方・雪道地圖")}
      ${mountainLink(resort.current, "官方・雪況／營運公告")}
      ${mountainLink(mapUrl, "Google Maps・位置")}
    </div>
  </article>`;
}

export function renderMountains(container) {
  container.innerHTML = `
    <header class="section-intro">
      <p class="eyebrow">SNOWBOARD / 雪場與雪票</p>
      <h2 class="section-title">五個雪場，按程度分組。</h2>
      <p>富良野兩日，旭川三日。比較雪道、單板租借及教練，再用下方計算機揀雪票。</p>
      <div class="callout warning"><strong>價格及安全基準 · 2026/9/4</strong><p>單場票／租借為 2025–26 舊季，2026–27 待公布；只有 Powder Belt 通票已有新季資料。只走開放路線，按教練及嚮導評估分組。本頁沒有即時雪況。</p></div>
    </header>
    <div class="pill-row" role="group" aria-label="依單板程度篩選雪場">
      <button class="pill active" type="button" data-mountain-filter="all" aria-pressed="true" aria-controls="mountain-cards">全部雪場</button>
      <button class="pill" type="button" data-mountain-filter="beginner" aria-pressed="false" aria-controls="mountain-cards">初學・緩坡練習</button>
      <button class="pill" type="button" data-mountain-filter="progress" aria-pressed="false" aria-controls="mountain-cards">進階・雪道練習</button>
      <button class="pill" type="button" data-mountain-filter="expert" aria-pressed="false" aria-controls="mountain-cards">高手・深雪選項</button>
    </div>
    <p id="mountain-filter-status" class="meta" role="status" aria-live="polite">顯示 5 個雪場；篩選不代表全山雪道都適合該程度。</p>
    <div id="mountain-cards" class="card-grid two">${mountainResorts.map(mountainCard).join("")}</div>

    <section class="stack" aria-labelledby="mountain-ticket-heading">
      <div class="section-intro">
        <p class="eyebrow">TICKETS / 每人預算</p>
        <h3 id="mountain-ticket-heading">五日雪票計算機</h3>
        <p>3/7、8、10、11、12 上雪；3/9 動物園及轉酒店。短時票不包課程，先問教練所需票種。</p>
      </div>
      <div class="pill-row" role="group" aria-label="套用五日雪票方案">
        <button class="pill active" type="button" data-mountain-preset="beginner" aria-pressed="true">初學・短時練習</button>
        <button class="pill" type="button" data-mountain-preset="resort" aria-pressed="false">整天・一般雪場</button>
        <button class="pill" type="button" data-mountain-preset="expert" aria-pressed="false">高手・旭岳條件日</button>
      </div>
      <p class="meta" id="mountain-plan-status">已套用初學・短時練習。比布需先確認三月設施、課程與接送，否則改 Kamui。</p>
      <div class="card stack">
        ${mountainDays
          .map(
            (day, index) => `<div class="mountain-day">
          <label for="mountain-day-${index}"><strong>${day.date}</strong><span class="meta">${day.note}</span></label>
          <select id="mountain-day-${index}" data-mountain-day="${index}" aria-describedby="mountain-price-basis">
            ${day.options.map((key) => `<option value="${key}"${mountainPresets.beginner[index] === key ? " selected" : ""}>${mountainTickets[key].label} · ${mountainYen(mountainTickets[key].amount)}</option>`).join("")}
          </select>
        </div>`,
          )
          .join("")}
        <label class="mountain-night"><input type="checkbox" id="mountain-night"> 加 3/10 Santa 夜滑 · ¥1,800（2025–26；2027 營業及夜間回程待確認）</label>
        <p id="mountain-price-basis" class="meta">每位成人、日圓、2025–26 定價。不包租借、教練／嚮導、交通、保險、IC 押金、餐食及專用練習設施；未計優惠。</p>
      </div>
      <div class="card-grid two" aria-live="polite" aria-atomic="true">
        <article class="card stack">
          <p class="eyebrow">單買・保留彈性</p>
          <p class="price" id="mountain-total"></p>
          <p class="meta">每位成人 · 2025–26 票價合計，非 2027 報價</p>
          <p id="mountain-ticket-summary"></p>
          <p>按體力選時數，出發前用新季票價再算。</p>
        </article>
        <article class="card stack">
          <p class="eyebrow">官方 POWDER BELT・2026–27</p>
          <p class="price">¥40,000 <small>／成人 5 日券</small></p>
          <p>富良野、Tomamu、Kamui 共通；首次過閘起 10 天內任選 5 天。休息日不扣日數，短時使用也扣一天；本團不去 Tomamu。</p>
          <p id="mountain-pass-coverage"></p>
          <p class="meta">銷售 2026/7/1–2027/3/21；使用 2026/12/19–2027/3/31。¥40,000 為官方日圓價；外幣結帳另看匯率及條款。</p>
          <div class="source-links">${mountainLink(mountainSources.belt, "官方協議會・2026–27 價格")}${mountainLink(mountainSources.beltTerms, "官方指定代售・10 日效期與條款")}</div>
        </article>
      </div>
      <div id="mountain-expert-warning" class="callout warning" hidden><strong>已選旭岳 · 只限冬山高手</strong><p>嚮導評估、路線／雪崩風險、裝備、保險及接送缺一不可，費用另計。條件未齊，3/12 改安全開放的 Kamui／比布或休息。</p></div>
      <details class="card">
        <summary>通票涵蓋、五日安排及取消條款</summary>
        <div class="stack">
          <p><strong>沒有已核實的六日券：</strong>2026–27 官方可核實為 5 日券及季票；旭岳「6 回券」是六次上行。本團只有五個上雪日，Santa 夜場不另算一天。</p>
          <p><strong>不包比布、Santa、旭岳：</strong>這些雪票另買，旭岳嚮導、裝備及交通也另計。</p>
          <p><strong>不能跨季算折扣：</strong>富良野 ¥8,000 × 2 ＋ Kamui ¥5,300 × 3 ＝ ¥31,900，屬 2025–26 單買基準；待新季單場票及會員價公布再比較。</p>
          <p><strong>付款前看條款：</strong>代售列有 QR 發行、兌換及取消限制；QR 發行後不可取消，已兌換票不退。不要只看「免費取消」。</p>
        </div>
      </details>
    </section>

    <section class="stack" aria-labelledby="mountain-weather-heading">
      <div class="section-intro">
        <p class="eyebrow">WEATHER / 三月氣候</p>
        <h3 id="mountain-weather-heading">旭川平年值，不是山上預報。</h3>
        <p>1991–2020 市區統計，不代表 2027/3/6–13 雪況。粉雪要看近期降雪、氣溫、風及日照。</p>
      </div>
      <div class="card-grid two">
        <article class="card stack">
          <p class="eyebrow">JMA・1991–2020 平年值</p>
          <h4>旭川市區，整個三月</h4>
          <p class="price">−1.4°C <small>／月平均氣溫</small></p>
          <ul class="detail-list">
            <li>日最高氣溫月平均 <strong>3.0°C</strong>；日最低月平均 <strong>−6.1°C</strong>，不是每天高低溫。</li>
            <li>三月降雪深度合計 <strong>80cm</strong>，不是地面積雪或本團一週新雪量。</li>
            <li>旭川地面測站數據不能直接套用富良野雪道或高海拔旭岳。</li>
          </ul>
          <p>按日夜溫差準備早上硬雪、日間濕雪及晚上再結冰；不保證粉雪。</p>
          <div class="source-links">${mountainLink(mountainSources.climate, "JMA 官方・旭川平年值與統計期間")}</div>
        </article>
        <article class="card stack">
          <p class="eyebrow">每天出門前・三道確認</p>
          <ol class="numbered-list">
            <li><strong>JMA：</strong>查上川／留萌預報及警報，留意風、低溫、能見度與交通。</li>
            <li><strong>雪場：</strong>查各卡官方入口的開放雪道、纜車、三月日曆及最後回程。</li>
            <li><strong>分組：</strong>按能力、疲勞及課程調整。旭岳須嚮導現場評估；沒有 JMA 警報不代表沒有雪崩風險。</li>
          </ol>
          <div class="source-links">${mountainLink(mountainSources.forecast, "JMA 官方・區域預報")}${mountainLink(mountainSources.warnings, "JMA 官方・警報與注意報")}${mountainLink(mountainSources.asahidake, "旭岳官方・冬山風險")}</div>
        </article>
      </div>
    </section>`;

  const cards = [...container.querySelectorAll("[data-mountain-card]")];
  const filterButtons = [
    ...container.querySelectorAll("[data-mountain-filter]"),
  ];
  const filterLabels = {
    all: "全部雪場",
    beginner: "初學・緩坡練習",
    progress: "進階・雪道練習",
    expert: "高手・深雪選項",
  };
  for (const button of filterButtons) {
    button.addEventListener("click", () => {
      const skill = button.dataset.mountainFilter;
      let visible = 0;
      for (let index = 0; index < cards.length; index += 1) {
        const matches =
          skill === "all" || mountainResorts[index].skills.includes(skill);
        cards[index].hidden = !matches;
        if (matches) visible += 1;
      }
      for (const choice of filterButtons) {
        const selected = choice === button;
        choice.classList.toggle("active", selected);
        choice.setAttribute("aria-pressed", String(selected));
      }
      container.querySelector("#mountain-filter-status").textContent =
        `${filterLabels[skill]}：顯示 ${visible} 個雪場。${skill === "beginner" || skill === "progress" ? "不包括旭岳；按教練評估選開放路線。" : "旭岳只限冬山高手，須另備嚮導及裝備。"}`;
    });
  }

  const dayControls = [...container.querySelectorAll("[data-mountain-day]")];
  const presetButtons = [
    ...container.querySelectorAll("[data-mountain-preset]"),
  ];
  const nightControl = container.querySelector("#mountain-night");
  const updateBudget = () => {
    const tickets = dayControls.map(
      (control) => mountainTickets[control.value],
    );
    const activeDays = tickets.filter((ticket) => ticket.resort).length;
    const coveredDays = tickets.filter((ticket) => ticket.belt).length;
    const nightPrice = nightControl.checked ? 1800 : 0;
    const total = tickets.reduce(
      (sum, ticket) => sum + ticket.amount,
      nightPrice,
    );
    const outside = tickets.reduce(
      (sum, ticket) => sum + (ticket.belt ? 0 : ticket.amount),
      nightPrice,
    );
    const usesKamui = tickets.some((ticket) => ticket.resort === "kamui");
    container.querySelector("#mountain-total").textContent = mountainYen(total);
    container.querySelector("#mountain-ticket-summary").textContent =
      `已選 ${activeDays} 日${nightControl.checked ? "，另加 Santa 夜滑（營業／回程待確認）" : "，不加夜滑"}。${usesKamui ? "Kamui 另備可退 IC 押金 ¥500。" : ""}`;
    container.querySelector("#mountain-pass-coverage").textContent =
      `通票涵蓋 ${coveredDays} 日；${outside > 0 ? `不包的場地／夜滑另付 ${mountainYen(outside)}（2025–26）。` : "未選額外付費場地。"}${coveredDays < 5 ? `只用到五日中的 ${coveredDays} 日。` : "五日均可用，仍須比較新季單場票。"}跨季只比涵蓋，不算折扣。`;
    container.querySelector("#mountain-expert-warning").hidden = !tickets.some(
      (ticket) => ticket.resort === "asahidake",
    );
  };

  for (const control of dayControls) {
    control.addEventListener("change", () => {
      for (const button of presetButtons) {
        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");
      }
      container.querySelector("#mountain-plan-status").textContent =
        "自訂方案：另確認課程、營業及往返交通。";
      updateBudget();
    });
  }
  for (const button of presetButtons) {
    button.addEventListener("click", () => {
      const preset = button.dataset.mountainPreset;
      dayControls.forEach((control, index) => {
        control.value = mountainPresets[preset][index];
      });
      for (const choice of presetButtons) {
        const selected = choice === button;
        choice.classList.toggle("active", selected);
        choice.setAttribute("aria-pressed", String(selected));
      }
      container.querySelector("#mountain-plan-status").textContent =
        `已套用${button.textContent}。${preset === "beginner" ? "比布須確認三月設施、課程及接送，否則改 Kamui。" : preset === "expert" ? "旭岳只限符合冬山條件的高手組。" : "可按體力改短時票或休息。"}`;
      updateBudget();
    });
  }
  nightControl.addEventListener("change", updateBudget);
  updateBudget();
}
