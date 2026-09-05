const sources = {
  buffet: [
    "官方｜新富良野王子晚餐自助餐",
    "https://www.princehotels.com/shinfurano/restaurants/dinner-buffet-restaurant/",
  ],
  ningle: [
    "官方觀光｜Ningle Terrace",
    "https://www.visit-hokkaido.jp/en/spot/detail_11270.html",
  ],
  forest: [
    "官方｜森之時計位置與座位",
    "https://www.princehotels.com/shinfurano/restaurants/mori-no-tokei-forest-clock-cafe/",
  ],
  forestMenu: [
    "官方觀光｜森之時計餐飲",
    "https://www.furanotourism.com/en/spot/spot_D.php?id=4&kid1=3&kid2=12&kid3=47",
  ],
  gaulois: [
    "官方｜Le Gaulois 訂位與休息日",
    "https://www.princehotels.com/shinfurano/restaurants/le-gaulois-furano-italian-restaurant/",
  ],
  delice: ["官方｜Furano Délice 店舖與月曆", "https://www.le-nord.com/store"],
  cheese: [
    "官方觀光｜富良野チーズ工房",
    "https://www.visit-hokkaido.jp/en/spot/detail_10290.html",
  ],
  kitaguni: [
    "官方｜炭燒處北國餐飲",
    "https://www.princehotels.com/shinfurano/restaurants/sumiyakidokoro-kitaguni/",
  ],
  zoo: [
    "官方｜動物園 2027 開園日曆",
    "https://www.city.asahikawa.hokkaido.jp/asahiyamazoo/event/event.html",
  ],
  zooFee: [
    "官方｜2026-07-01 門票改價公告",
    "https://www.city.asahikawa.hokkaido.jp/asahiyamazoo/news-blog/osirase/d084291.html",
  ],
  zooFood: [
    "官方｜園內飲食店名錄・2026-01-05",
    "https://www.city.asahikawa.hokkaido.jp/asahiyamazoo/generalinformation/p008636.html",
  ],
  baikohken: [
    "官方｜梅光軒分店與中場休息",
    "https://baikohken-shop.com/page/shops.html",
  ],
  hachiya: [
    "官方觀光｜蜂屋五条創業店",
    "https://www.atca.jp/menberinfo/%E8%9C%82%E5%B1%8B%EF%BC%95%E6%9D%A1%E5%89%B5%E6%A5%AD%E5%BA%97-%EF%BC%88%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE-%E8%9C%82%E5%B1%8B%EF%BC%89/",
  ],
  daikokuya: [
    "官方｜大黑屋旭川五丁目店訂位規則",
    "https://yoyaku.toreta.in/daikokuya-honten/",
  ],
  streets: [
    "官方觀光｜買物公園與 5・7 小路",
    "https://www.atca.jp/miru_asobu/asa_shop/",
  ],
  museum: [
    "官方｜旭川市博物館利用案內",
    "https://www.city.asahikawa.hokkaido.jp/hakubutukan/navi/d000000.html",
  ],
  museumFee: [
    "官方｜2026-10-01 起博物館新票價",
    "https://www.city.asahikawa.hokkaido.jp/hakubutukan/navi/d084223.html",
  ],
  tenkin: ["官方｜天金本店・三条通七丁目", "https://tenkin.info/"],
  izakaya: ["官方｜居酒屋天金・四条通七丁目", "https://tenkin.net/"],
  omo: [
    "官方｜OMO Café & Bar 餐飲",
    "https://hoshinoresorts.com/ja/hotels/omo7asahikawa/dining/",
  ],
  aeon: ["官方｜AEON MALL 旭川站前", "https://asahikawaekimae.aeonmall.jp/"],
  sora: [
    "官方｜CTS 拉麵 SORA 樓層與菜單",
    "https://www.hokkaido-airports.com/en/new-chitose/spend/shop/238/",
  ],
  royce: [
    "官方｜CTS ROYCE’ Chocolate World",
    "https://www.hokkaido-airports.com/en/new-chitose/spend/shop/170/",
  ],
  girlBlog: [
    "遊記｜Girl with Dragon Belly・2014／2016",
    "https://girlwithdragonbelly.wordpress.com/2014/12/28/ningle-terrace-in-furano/",
  ],
  followBlog: [
    "遊記｜Follow Us To Travel・2026-03",
    "https://followtotravel.com/ningle-terrace/",
  ],
};

const days = [
  {
    date: "03.06",
    weekday: "六",
    base: "新富良野王子",
    theme: "抵達、酒店晚餐、Ningle Terrace",
    route: "CTS → 預約接送（待確認）→ 新富良野王子入住 → 酒店晚餐。",
    note: "以入境、裝備搬運及最晚入席時間為先。抵達夠早才逛 Ningle Terrace，否則留待明天；不繞入富良野市中心。",
    options: [
      {
        kind: "就腳晚餐備案",
        title: "新富良野王子 Dinner Buffet",
        why: "入住後不用再搭車，作抵達晚的就腳備案；未核實現行自助餐的獨立食評，不當作必食。",
        access: "酒店內 Lavender 餐廳；先查房價是否包晚餐，訂房不等於訂餐。",
        group: "官方建議預約；確認最晚入席、延誤通知及備餐安排。",
        budgetYear: "2026 參考價",
        budget: "成人 ¥7,500／人（官網 2026-09-04）。2027 價格、飲品及住宿方案折抵待確認。",
        map: "新富良野プリンスホテル 北海道富良野市中御料",
        sources: ["buffet"],
        tabelog: [{ name: "現行 Lavender 自助餐", score: null, reviews: null, url: "https://tabelog.com/en/hokkaido/A0104/A010403/1028271/", note: "未找到可確認屬於現行餐廳的獨立評分。連結是「北海道味の散歩道」舊登錄，不套用其分數或酒店總分。" }],
      },
      {
        kind: "抵達夠早才去",
        title: "Ningle Terrace",
        why: "酒店旁的手作木屋商店，適合晚餐前後短逛。",
        access: "由酒店步行，只走開放木棧道；雪板留在酒店，小組進店。",
        winter: "木階會結冰，穿防滑靴。天氣差、太晚或店舖休息就取消；舊遊記點燈時間不適用於 2027。",
        map: "ニングルテラス 富良野",
        sources: ["ningle", "girlBlog", "followBlog"],
      },
    ],
  },
  {
    date: "03.07",
    weekday: "日",
    base: "新富良野王子",
    theme: "富良野單板課、森之時計、酒店晚餐",
    route: "富良野區 snowboard／初學課 → 放好裝備 → 森之時計、Ningle Terrace → 酒店晚餐。",
    note: "上課優先，不為下午茶提早離隊。不滑單板的朋友可先去；收板太晚就直接吃晚餐。",
    options: [
      {
        kind: "下午茶＋短逛",
        title: "森之時計 × Ningle Terrace",
        why: "咖啡、蛋糕、咖喱或燉菜，吃完可逛附近木屋；不當作全團晚餐。",
        access: "官方列距酒店步行約 5 分鐘，雪路需多留時間；不接美瑛行程。",
        group: "室內 31 席，建議分批；吧枱及手磨咖啡體驗按現場安排。",
        winter: "兩個官方頁面的結束時間不同，先問酒店最後點餐時間。步道結冰或候位太久就取消。",
        map: "珈琲 森の時計 富良野",
        sources: ["forest", "forestMenu", "ningle"],
        tabelog: [{ name: "珈琲 森の時計", score: "3.54", reviews: 383, url: "https://tabelog.com/en/hokkaido/A0104/A010403/1005200/", note: "咖啡及下午茶選項；不用為打卡趕收板，候位太久就取消。" }],
      },
      {
        kind: "預約晚餐",
        title: "Le Gaulois Furano",
        why: "北海道食材法／意式套餐，可代替一晚自助餐，不用往返市中心。",
        access: "官方列距酒店步行約 3 分鐘；戶外雪路，先換下單板靴及濕裝備。",
        group: "午、晚餐均須預約；35 席，團體接待、套餐及取消條款須直接確認。",
        winter: "現行逢星期一、二休息，故安排星期日 3/7，不放 3/8。2027 餐期待覆；訂不到就選酒店自助餐。",
        budgetYear: "2026 參考價",
        budget: "晚餐 ¥16,000／人（官網 2026-09-04）；2027 套餐及酒水另確認。",
        map: "ル ゴロワ フラノ 富良野",
        sources: ["gaulois"],
        tabelog: [{ name: "ル・ゴロワ フラノ", score: "3.60", reviews: 67, url: "https://tabelog.com/en/hokkaido/A0104/A010403/1058559/", note: "值得考慮的預約晚餐，但價位較高；先確認全團套餐預算。" }],
      },
    ],
  },
  {
    date: "03.08",
    weekday: "一",
    base: "新富良野王子",
    theme: "北之峰單板、Délice；休息組可選芝士工房",
    route: "北之峰 snowboard → 已約好往返車才去 Délice → 酒店晚餐。芝士工房另作白天替代行程。",
    note: "甜品店不一定趕得及收板後到訪。先安排車及裝備寄放，不穿單板靴、帶雪板走結冰斜路串店。",
    options: [
      {
        kind: "提早收板才去",
        title: "Furano Délice：牛奶布甸、雙層芝士蛋糕",
        why: "富良野乳製甜品，可外賣回酒店分享。",
        access: "下御料 2156-1 山坡上；由北之峰乘預約的士／接送，回酒店的車也要先約。",
        group: "外賣較方便，可問能否預留數量；布甸及蛋糕需按要求冷藏。",
        winter: "2026 官網列逢星期二、三休息；3/8 雖是星期一，仍須查 2027 月曆。不要假設滑到尾班纜車後仍趕得及。",
        map: "菓子工房フラノデリス 富良野市下御料2156-1",
        sources: ["delice"],
        tabelog: [{ name: "菓子工房フラノデリス", score: "3.66", reviews: 808, url: "https://tabelog.com/en/hokkaido/A0104/A010403/1000940/", note: "甜品優先考慮；評價樣本較多，仍以當月店休日及回程車為先。" }],
      },
      {
        kind: "休息組白天替代",
        title: "富良野チーズ工房：芝士、薄餅",
        why: "隔玻璃看製作／熟成區，再吃熱薄餅；實際生產按當日作業。",
        access: "富良野中五區，從酒店預約的士往返；取代半天活動，不硬接 Délice 或美瑛。",
        group: "體驗班另查日期、名額及預約；一般參觀不代表已包體驗。",
        winter: "冬季較早關門，可能因設備維護休館；工房與薄餅區分別確認。沒有回程車就不出發，不沿雪路步行回酒店。",
        map: "富良野チーズ工房 北海道富良野市中五区",
        sources: ["cheese"],
        tabelog: [
          { name: "ピッツァ工房 · 薄餅餐廳", score: "3.48", reviews: 409, url: "https://tabelog.com/en/hokkaido/A0104/A010403/1007771/", note: "想食薄餅要看這間餐廳的評價，不是工房商店的分數。" },
          { name: "富良野チーズ工房 · 商店／設施", score: "3.18", reviews: 197, url: "https://tabelog.com/en/hokkaido/A0104/A010403/1002183/", note: "主要作參觀及買芝士，不因這個分數特意安排一餐。" },
        ],
      },
      {
        kind: "酒店晚餐",
        title: "炭燒處北國",
        why: "炭烤海鮮晚餐，吃完回房執行李，翌日轉酒店。",
        access: "新富良野王子地庫 1 樓；回房放好裝備再用餐。",
        group: "62 席；預約時查固定菜單、海鮮過敏替代，以及住宿晚餐能否折抵。",
        budgetYear: "2026 參考價",
        budget: "晚餐 ¥8,000 起／人（官網 2026-09-04）；不是含飲品的 2027 定額套餐。",
        map: "炭焼処 きたぐに 新富良野プリンスホテル",
        sources: ["kitaguni"],
        tabelog: [{ name: "炭焼処きたぐに", score: "3.28", reviews: 35, url: "https://tabelog.com/en/hokkaido/A0104/A010403/1026742/", note: "評價較少，保留作酒店內就腳晚餐；不當作專程去食的首選。" }],
      },
    ],
  },
  {
    date: "03.09",
    weekday: "二",
    base: "OMO7 旭川",
    theme: "轉酒店、旭山動物園、旭川拉麵",
    route: "新富良野王子退房 → 預約接送至旭山動物園 → 園內午餐 → OMO7 入住 → 市中心拉麵。",
    note: "全日休息／轉場，不插上午 snowboard。先確認上下車門、行李及雪板保管、司機等候與停車費。",
    options: [
      {
        kind: "當日主行程",
        title: "旭山動物園",
        why: "看企鵝、海豹、北極熊等展區；建議連午餐預留至少約 3 小時。",
        access: "退房後直接到園，參觀後接送至 OMO7。改搭公共交通須重排轉乘及大件行李安排。",
        group: "團體票需 25 位付費入園者，本團不適用；分組參觀，約定出口及集合時間。",
        winter: "已公布 2027/1/2–4/7 開園 10:30–15:30，最後入園 15:00（日本時間）。企鵝散步視積雪、動物狀態及當日公告，3 月不保證；留意雪坡防滑。",
        budgetYear: "2027/3 適用",
        budget: "一般成人 ¥1,000／人。2026-07-01 公告的新價 ¥1,400 於 2027/4/29 才生效，不適用本次 3/9。",
        map: "旭山動物園 旭川",
        sources: ["zoo", "zooFee"],
      },
      {
        kind: "園內午餐",
        title: "中央食堂／Museum Cafe ASAHIYAMA",
        why: "在園內吃午餐及取暖，不用出園再折返。",
        access: "中央食堂在海豹館 2 樓；Museum Cafe 在正門附近。按園區圖及當日開店情況二選一。",
        group: "避開高峰、分桌；若未開，向服務中心查當日餐飲選擇。",
        winter: "店名及位置據官方 2026-01-05 名錄，2027 營業及菜單待查；不用舊遊記的 Garden Terrace Lion 店名。",
        map: "旭山動物園 中央食堂",
        sources: ["zooFood"],
        tabelog: [
          { name: "旭山動物園中央食堂", score: "3.22", reviews: 215, url: "https://tabelog.com/en/hokkaido/A0104/A010401/1004859/", note: "園內就腳午餐，不以美食作到訪理由。" },
          { name: "Museum Cafe ASAHIYAMA", score: "3.26", reviews: 34, url: "https://tabelog.com/en/hokkaido/A0104/A010401/1078969/", note: "少量評價；按園內路線、開店及座位二選一。" },
        ],
        extraMap: ["Museum Cafe 地圖", "Museum Cafe ASAHIYAMA 旭山動物園"],
      },
      {
        kind: "入住後晚餐",
        title: "梅光軒旭川本店",
        why: "旭川醬油雙湯拉麵；選市中心本店，不繞往郊外拉麵村。",
        access: "OMO7 放好行李後，往二条通八丁目 Piazza 大樓地庫；雪大可請酒店叫的士。",
        group: "小店以 3–4 人分組候位，不預設可訂團體桌。",
        winter: "午、晚餐兩段營業，中間休息，另有不定休。確認當晚營業；地庫樓梯有融雪水，不穿單板靴下樓。",
        map: "梅光軒 旭川本店 旭川市2条通8丁目",
        sources: ["baikohken"],
        tabelog: [{ name: "梅光軒 旭川本店", score: "3.41", reviews: 888, url: "https://tabelog.com/en/hokkaido/A0104/A010401/1000783/", note: "市中心晚餐選項；不要因名氣預設必食。想比較拉麵可看蜂屋，但先查營業時段。" }],
      },
    ],
  },
  {
    date: "03.10",
    weekday: "三",
    base: "OMO7 旭川",
    theme: "Kamui 單板、大黑屋；蜂屋留給休息組",
    route: "Kamui snowboard → OMO7 換裝 → 大黑屋晚餐。蜂屋安排給休息組午餐，早歸組先查營業。",
    note: "Santa 夜滑自選，參加者另排晚餐及來回交通，先確認末班車／接送；不為趕聚餐而趕落山。",
    options: [
      {
        kind: "休息組／早歸組",
        title: "蜂屋五条創業店",
        why: "市中心另一款旭川拉麵，可與梅光軒比較。",
        access: "五条通七丁目右六號，近 OMO7，可連 5・7 小路；不是三条通十五丁目的蜂屋。",
        winter: "官方觀光頁可核對分店及社群，未確認 2027 晚市。小組候位；收板後太晚就改吃晚餐。",
        map: "蜂屋 五条創業店 旭川市5条通7丁目",
        sources: ["hachiya", "streets"],
        tabelog: [{ name: "蜂屋 五条創業店", score: "3.62", reviews: 1397, url: "https://tabelog.com/en/hokkaido/A0104/A010401/1000269/", note: "拉麵優先考慮，較適合休息組午餐；不要為吃店而錯過雪場回程。" }],
      },
      {
        kind: "預約晚餐",
        title: "大黑屋旭川五丁目店：成吉思汗烤羊肉",
        why: "北海道烤羊肉；店內有油煙，先換下單板外套。不吃羊肉可另選梅光軒，先查當日營業。",
        access: "四条通五丁目 1425、3・4 仲通；「五丁目店」不是五条通。由 OMO7 步行或搭短程的士。",
        group: "現行網上多只收開店時段，通常月底開放下月；6 人以上可電話問其他時段。團體直接聯絡，不拆多筆訂位，同桌不保證。",
        winter: "官方要求全員到齊，遲到可能取消。訂位須留回程緩衝，2027 開放預約日期待查。",
        map: "成吉思汗 大黒屋 旭川五丁目店 旭川市4条通5丁目1425",
        sources: ["daikokuya"],
        tabelog: [{ name: "成吉思汗 大黒屋 五丁目店", score: "3.63", reviews: 1628, url: "https://tabelog.com/en/hokkaido/A0104/A010401/1027848/", note: "烤羊肉優先考慮；核對五丁目店，不借用其他分店的分數或訂位規則。" }],
      },
      {
        kind: "飯前後短逛",
        title: "5・7 小路「ふらりーと」",
        why: "旭川舊食街，可只逛街，不必再吃一餐。",
        access: "五条通七丁目，從 OMO7 步行；與蜂屋同區。",
        group: "燒鳥小店先問有沒有位，2–4 人分組；不要阻塞窄巷及店門。",
        winter: "戶外小巷，結冰、強風或太累就取消；各店休息日另查。",
        map: "5 7小路 ふらりーと 旭川",
        sources: ["streets"],
      },
    ],
  },
  {
    date: "03.11",
    weekday: "四",
    base: "OMO7 旭川",
    theme: "彈性單板日；休息組逛博物館",
    route: "單板組選 Kamui／Pippu／Santa；休息組 OMO7 → 旭川市博物館 → 市中心。晚餐自由分組；可把 3/12 居酒屋天金提前，避免連吃兩晚。",
    note: "博物館是白天替代，不接在全日 snowboard 後。兩組分別排接送，晚餐前回酒店會合。",
    options: [
      {
        kind: "休息組／壞天氣備案",
        title: "旭川市博物館",
        why: "室內展覽，了解旭川歷史及愛努文化。",
        access: "神樂三条七丁目、大雪 Crystal Hall 內；從 OMO7 搭的士往返。經旭川站步行須先查跨河橋面及積雪。",
        group: "導賞另問；團體折扣需同票種 20 人，本團不適用。",
        winter: "冬季現行每月第二、四個星期一休館，另有設備檢查。3/11 是星期四，仍須查 2027 特別休館及白天入場時間。",
        budgetYear: "2026/10 起",
        budget: "2026/10/1 起成人常設展 ¥440／人，不是舊價 ¥350；特展另查。",
        map: "旭川市博物館 神楽3条7丁目",
        sources: ["museum", "museumFee"],
      },
      {
        kind: "暫不安排 · 休業公告",
        title: "天金本店：暫停營業",
        why: "官方公告因店舖老化，由 2025/3/1 起暫停營業；未核實重開日期，移出本次聚餐安排。",
        access: "三条通七丁目本店目前不安排前往；不要與四条通的居酒屋天金或同名拉麵店混淆。",
        group: "想食和食可選 3/12 的居酒屋天金；如提前至今晚，另一天不要再重複。",
        winter: "只有官方確認復業及接受 2027 訂位後才重新考慮；舊評分不代表仍有營業。",
        map: "天金本店 旭川市3条通7丁目",
        sources: ["tenkin"],
        tabelog: [{ name: "天金 本店 · 掲載保留", score: "3.46", reviews: 139, url: "https://tabelog.com/en/hokkaido/A0104/A010401/1004482/", note: "歷史評分；Tabelog 頁面亦標示營業狀態未確認。不是可預訂的餐廳推薦。" }],
      },
      {
        kind: "飯後甜品",
        title: "OMO Café & Bar",
        why: "酒店內吃「締めパフェ」飯後雪糕芭菲，不用再出門；不是正餐。",
        access: "回 OMO7 後按當日供應及座位安排，自由參加。",
        winter: "2027 款式、供應時間及座位政策待酒店確認；不代表房價已包。",
        map: "OMO7旭川 OMOカフェ バル",
        sources: ["omo"],
        tabelog: [{ name: "OMOカフェ＆バル OMO7旭川", score: "3.48", reviews: 135, url: "https://tabelog.com/en/hokkaido/A0104/A010401/1058508/", note: "酒店內甜品／酒吧備案；分數屬整間店，不是芭菲單品評分。" }],
      },
    ],
  },
  {
    date: "03.12",
    weekday: "五",
    base: "OMO7 旭川",
    theme: "最後單板日、購物、聚餐",
    route: "進階組有安全條件才去旭岳；其他人選 Kamui／Pippu 或市區 → OMO7 → 晚餐、執裝備。",
    note: "旭岳限有相應能力的進階組，須確認天氣、導覽及撤退方案；不是新手搭纜車跟團觀景。晚餐按安全回程時間安排。",
    options: [
      {
        kind: "休息組／提早回城",
        title: "買物公園 → AEON MALL 旭川站前",
        why: "補貨、買手信；天氣差可直接到商場吃飯購物。",
        access: "OMO7 往旭川站方向；指定「旭川站前」店，不是旭川西店。買得多可搭的士回酒店。",
        group: "自由分組，約定入口及集合時間；美食廣場各自點餐。",
        winter: "買物公園有露天路段，大風雪改搭車。店舖樓層及最後點餐時間按當日資料。",
        map: "イオンモール旭川駅前",
        sources: ["streets", "aeon"],
      },
      {
        kind: "最後一晚聚餐",
        title: "居酒屋天金",
        why: "壽司、天婦羅、串燒及魚貝烤物；可與天金本店二選一，另一晚吃羊肉或拉麵。",
        access: "四条通七丁目、紅燈籠的「居酒屋天金」，不是三条通本店；OMO7 放好雪板、換裝後前往。",
        group: "套餐須預約，確認分桌及最後更改人數期限。",
        winter: "預留雪場回程緩衝；晚歸先聯絡餐廳，不催山上趕路。2027 休息日及海鮮供應待查。",
        map: "居酒屋天金 旭川市4条通7丁目",
        sources: ["izakaya"],
        tabelog: [
          { name: "居酒屋 天金 · 既存登錄", score: "3.53", reviews: 505, url: "https://tabelog.com/en/hokkaido/A0104/A010401/1002688/", note: "四条通店，可考慮聚餐；不是休業中的三条通天金本店。" },
          { name: "同電話／官網的另一登錄", score: "3.05", reviews: 4, url: "https://tabelog.com/en/hokkaido/A0104/A010401/1080612/", note: "Tabelog 另有少量評價的同店登錄；兩頁不合併計分，訂位以 tenkin.net 確認。" },
        ],
      },
    ],
  },
  {
    date: "03.13",
    weekday: "六",
    base: "旭川 → 新千歲 CTS",
    theme: "前往 CTS；有時間才吃逛",
    route: "OMO7 退房 → 確認非自駕交通 → CTS 報到、雪板寄艙 → 有餘裕才吃逛 → 安檢／出境／登機。",
    note: "航班時間未提供，不排旭川上午景點。先扣除冬季交通緩衝、報到及雪板寄艙截止、安檢出境與步行時間；不足就取消以下兩站。",
    options: [
      {
        kind: "有時間才吃",
        title: "北海道拉麵道場：SORA 味噌拉麵",
        why: "在機場吃札幌味噌拉麵，不繞入札幌。",
        access: "CTS 國內線客運大樓 3F、安檢前；搭國際線須另留步行到國際線報到／出境區的時間。",
        group: "分組選店，定好離店時間；排隊超出緩衝就改外賣。",
        winter: "先查交通及航班延誤；樓層據 2026 官方資料，2027 店舖及營業時間待查。",
        budgetYear: "2026 參考價",
        budget: "味噌拉麵 ¥910／碗（官網 2026-09-04），不含加料／飲品，不保證 2027 同價。",
        map: "ラーメン SORA 新千歳空港",
        sources: ["sora"],
        tabelog: [{ name: "らーめん空 新千歳空港店", score: "3.59", reviews: 2122, url: "https://tabelog.com/en/hokkaido/A0107/A010701/1047747/", note: "機場拉麵可考慮；使用機場分店評分，不套用札幌本店。排隊影響登機就放棄。" }],
      },
      {
        kind: "機場短逛",
        title: "ROYCE’ Chocolate World",
        why: "朱古力展示、製作窗及手信店，時間許可才去。",
        access: "客運大樓連接通道 3F、安檢前公共區；先確認前往自己登機大樓的方向。",
        group: "約定集合地標，行李自行看管，不集中放低後離開。",
        winter: "工廠作業與店舖時間不同，未必看到製作；冷藏朱古力先問保冷及攜帶限制。時間不足直接去安檢。",
        map: "ロイズ チョコレートワールド 新千歳空港",
        sources: ["royce"],
        tabelog: [{ name: "ロイズ チョコレートワールド", score: "3.32", reviews: 372, url: "https://tabelog.com/en/hokkaido/A0107/A010701/1034988/", note: "朱古力商店／展示，不是正餐推薦；不因評分額外繞路。" }],
      },
    ],
  },
];

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );
}

function externalLink(label, url) {
  return `<a class="text-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
}

function mapLink(label, query) {
  return externalLink(
    label,
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
  );
}

function tabelogCard(review) {
  const score = review.score === null ? "未能核實" : `${escapeHtml(review.score)}<small> / 5</small>`;
  const count = review.reviews === null ? "不套用其他店舖評分" : `${review.reviews.toLocaleString("en-US")} 則評價`;
  return `<div class="tabelog-review">
    <a class="tabelog-rating" href="${escapeHtml(review.url)}" target="_blank" rel="noopener noreferrer">
      <span class="tabelog-brand">食べログ<span>TABELOG ↗</span></span>
      <strong>${score}</strong><span class="tabelog-count">${count}</span>
    </a>
    <p class="tabelog-name">${escapeHtml(review.name)}</p>
    <p class="tabelog-note">${escapeHtml(review.note)}</p>
  </div>`;
}

function optionCard(option) {
  return `<article class="card">
    <div class="card-top"><span class="tag green">${escapeHtml(option.kind)}</span></div>
    <h4>${escapeHtml(option.title)}</h4>
    <p>${escapeHtml(option.why)}</p>
    ${option.tabelog ? `<div class="tabelog-reviews">${option.tabelog.map(tabelogCard).join("")}</div>` : ""}
    <ul class="detail-list">
      <li><strong>交通：</strong>${escapeHtml(option.access)}</li>
      ${option.group ? `<li><strong>安排：</strong>${escapeHtml(option.group)}</li>` : ""}
      ${option.winter ? `<li><strong>留意：</strong>${escapeHtml(option.winter)}</li>` : ""}
    </ul>
    ${option.budget ? `<p class="meta"><span class="tag">${escapeHtml(option.budgetYear)}</span> ${escapeHtml(option.budget)}</p>` : ""}
    <div class="source-links">${mapLink("開啟地圖", option.map)}${option.extraMap ? ` ${mapLink(...option.extraMap)}` : ""}</div>
    <details><summary>資料來源</summary><div class="source-links">${option.sources.map((key) => externalLink(...sources[key])).join(" ")}</div></details>
  </article>`;
}

export function renderExplore(container) {
  container.innerHTML = `
    <header class="section-intro">
      <p class="eyebrow">FOOD & PLACES · 食飯與景點</p>
      <h2 class="section-title">每日食飯、休息日去處</h2>
      <p class="muted">食店按 Tabelog 評分、評價數及行程配合度交叉核對，不以旅遊博客的口味評語作推薦依據。</p>
      <p class="meta">評分查核：2026/9/4 · Tabelog 原頁快照，非即時分數。點評分開啟食評；未核實及重複登錄另有註明。</p>
    </header>
    <div class="pill-row" role="group" aria-label="選擇每日餐廳與景點">
      ${days.map((day, index) => `<button type="button" class="pill${index === 0 ? " active" : ""}" data-explore-day="${index}" aria-pressed="${index === 0}" aria-controls="explore-day-content" aria-label="2027 年 3 月 ${index + 6} 日，星期${day.weekday}，${escapeHtml(day.base)}">${day.date}（${day.weekday}）</button>`).join("")}
    </div>
    <p id="explore-selection-status" class="meta" role="status" aria-live="polite" aria-atomic="true"></p>
    <section id="explore-day-content" class="stack" aria-labelledby="explore-day-heading"></section>
    <aside class="callout">
      <strong>訂位與交通</strong>
      <p>餐位及接送未確認。按實際人數（目標 12 人）、過敏、預算及分桌需要訂位；不自駕，的士／包車先約，不假設酒店免費接送。</p>
      <p class="meta">資料查核：2026-09-04。除已公布適用日期外，2027 營業、價格及座位須再確認；沒有可靠價格便不估。地圖只供定位，雪路不一定適合步行。</p>
    </aside>
    <details class="card">
      <summary>資料來源及評分點睇</summary>
      <p class="meta">Tabelog 為 5 分制；請連同評價數、新近評論及同類餐廳比較。酒店／園內餐飲可因就腳而保留，但不等於必食。</p>
      <p class="meta">評分及評價數取自 Tabelog 英文版原頁（2026/9/4 查核），不是 2027 保證；地址、菜單、營業及訂位規則以官方資料為準。現行酒店自助餐未能對應獨立登錄，不套用舊店或酒店總分；重複登錄亦不合併評價。</p>
      <ul class="detail-list">
        <li>${externalLink(...sources.girlBlog)}：只參考 Ningle Terrace 木屋及手作店，不作食物推薦。</li>
        <li>${externalLink(...sources.followBlog)}：只參考景點步道及店舖，不沿用舊營業時間或口味評語。</li>
      </ul>
    </details>`;

  const buttons = [...container.querySelectorAll("[data-explore-day]")];
  const panel = container.querySelector("#explore-day-content");
  const status = container.querySelector("#explore-selection-status");

  function selectDay(index) {
    const day = days[index];
    buttons.forEach((button, buttonIndex) => {
      const selected = buttonIndex === index;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    status.textContent = `DAY ${String(index + 1).padStart(2, "0")} · 2027.${day.date} · ${day.base}`;
    panel.innerHTML = `
      <header>
        <h3 id="explore-day-heading">${escapeHtml(day.theme)}</h3>
        <p><strong>路線：</strong>${escapeHtml(day.route)}</p>
        <p class="muted">${escapeHtml(day.note)}</p>
      </header>
      <div class="card-grid${day.options.length === 2 ? " two" : ""}">${day.options.map(optionCard).join("")}</div>`;
  }

  buttons.forEach((button, index) =>
    button.addEventListener("click", () => selectDay(index)),
  );
  selectDay(0);
}
