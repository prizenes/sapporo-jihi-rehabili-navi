import type { Facility, PurposeId } from "@/data/facilities";

export interface FacilityGuide {
  support: string;
  staffQualifications: string[];
  otherQualifications?: { label: string; values: string[] };
  services: string[];
  prices: { label: string; value: string; note?: string }[];
  accessSummary: string;
  access?: { label: string; value: string }[];
  reception?: { message: string; url: string; checkedAt: string };
  // Use a facility photo only when permission and attribution are recorded.
  photo?: { src: string; alt: string; credit: string; permission: string };
}

// Source-check history stays internal in facility-verification.ts.
export const FACILITY_GUIDES: Record<string, FacilityGuide> = {
  "asabu-heart-fitness": {
    support: "健康運動指導士が個別の運動メニューを作成。理学療法士・管理栄養士と連携する体制で、理学療法士が毎回直接担当するという案内ではありません。",
    staffQualifications: ["健康運動指導士"],
    otherQualifications: { label: "連携してメニュー提案に関わる資格", values: ["理学療法士", "管理栄養士"] },
    services: ["メディカルチェックを経た個別運動メニュー", "有酸素運動・筋力トレーニング", "運動・食生活の相談（会員区分・オプションによる）"],
    prices: [
      { label: "一般会員", value: "月額9,000円（税込）", note: "入会金4,000円（税込）。メディカルチェック・追加検査等の総額は入会前にご確認ください。" },
      { label: "通院中の方向け", value: "かかりつけ会員：月額6,000円（税込）", note: "入会金4,000円（税込）。指定クリニックへの定期通院が条件。診療費・オプションは別途ご確認ください。" },
    ],
    accessSummary: "北区・来訪前に利用場所を公式窓口へご確認ください",
    access: [{ label: "ご来訪の前に", value: "公式ページ内にクリニックと販売事業者の異なる所在地が記載されています。フィットネスの利用場所は窓口にご確認ください。" }],
  },
  "c-link": {
    support: "トレーナーによる運動サポートと、松田整形外科記念病院との連携を案内。理学療法士資格を持つトレーナーの紹介がありますが、希望日の担当者は予約時にご確認ください。",
    staffQualifications: ["理学療法士", "健康運動実践指導者"],
    services: ["フィジカルチェックと個別運動プログラム", "有酸素運動・筋力トレーニング", "スタジオプログラム", "パーソナルトレーニング（別料金）"],
    prices: [
      { label: "メディカルフィットネス会員", value: "月額11,000円＋入会金10,000円", note: "税込総額は施設へ。身体のチェック・プログラム指導の条件は公式料金表をご覧ください。" },
      { label: "ベーシック会員", value: "月額8,800円＋入会金5,000円", note: "会員区分でサービス範囲が異なります。パーソナルトレーニング等は別料金。" },
    ],
    accessSummary: "北18条駅 徒歩3分・提携駐車場3時間無料",
    access: [{ label: "地下鉄", value: "南北線 北18条駅から徒歩3分" }, { label: "駐車場", value: "施設利用で3時間まで無料。台数に限りがあり、満車時は近隣の有料駐車場を利用。" }],
  },
  "stroke-gym": {
    support: "理学療法士・作業療法士がマンツーマンの個別リハビリを担当。身体の状態と生活の目標に合わせたプランを相談できます。",
    staffQualifications: ["理学療法士", "作業療法士"],
    services: ["脳卒中後の個別自費リハビリ", "施設内の目的別トレーニング", "オンラインの遠隔リハビリ"],
    prices: [
      { label: "ライトプラン", value: "40分×月4回 19,800円（税込）", note: "無料体験の案内があります。体験内容・追加費用は施設へお問い合わせください。" },
      { label: "レギュラープラン", value: "60分×月4回 28,600円（税込）", note: "遠隔プランは40分×月4回29,220円（税込）。上位プランは別料金です。" },
    ],
    accessSummary: "東区北12条東4丁目・ビル2階／一部プラン送迎あり",
    access: [{ label: "建物", value: "N12イーストメディカルビル2階" }, { label: "送迎", value: "札幌店のプレミアム・VIPプランは希望に応じた自宅送迎を案内。対象地域・利用条件は施設へ。" }],
  },
  "noureha-sapporo-chuo": {
    support: "作業療法士が自宅へ訪問し、マンツーマンでリハビリをサポート。生活場面や希望に合わせた内容を相談できます。",
    staffQualifications: ["作業療法士"],
    services: ["訪問での自費リハビリ", "日常生活や上肢の動作練習", "高次脳機能についての相談・練習プラン"],
    prices: [
      { label: "体験プラン（全3回）", value: "26,000円（税込）", note: "初回はカウンセリング＋リハビリ60分、2〜3回目は各90分。" },
      { label: "通常トータルケア", value: "90分 17,500円（税込）", note: "週1回・8週間8回は140,000円（税込）。回数・間隔、訪問条件や追加費用は施設へ。" },
    ],
    accessSummary: "札幌市内全域への訪問・市外は応相談",
    access: [{ label: "訪問エリア", value: "札幌市内全域。札幌市外は応相談。" }, { label: "掲載住所", value: "南区の事業所所在地です。通所施設としてのご案内ではありません。" }],
  },
  "nou-to-karada-lab": {
    support: "理学療法士資格を持つ代表者が、個別の自費リハビリを提供。医療機関で治療中の方は担当医師の同意が必要と案内されています。",
    staffQualifications: ["理学療法士"],
    services: ["脳卒中後の個別自費リハビリ", "身体や生活動作の相談", "札幌市内への訪問サポート"],
    prices: [{ label: "初回体験", value: "5,000円", note: "公式料金画像の表記。所要時間・税込総額・通常料金はお問い合わせください。" }],
    accessSummary: "西区西野・市内の訪問や送迎も相談可",
    access: [{ label: "訪問・送迎", value: "往復30分まで無料の案内あり。それを超える場合や駅での待ち合わせは要相談。利用可否・費用を事前にご確認ください。" }],
  },
  "i-bloom": {
    reception: { message: "新規パーソナルは平日10:00〜16:00のみ受付の案内あり", url: "https://ibloom-pilates.com/#menu", checkedAt: "2026-10-20" },
    support: "公式案内では全トレーナーが理学療法士。女性専用のマンツーマンレッスンで、身体に合わせたマシンピラティスを指導します。",
    staffQualifications: ["理学療法士"],
    services: ["女性専用パーソナル・マシンピラティス", "姿勢・体幹・身体の使い方のレッスン", "自宅でのエクササイズについての助言"],
    prices: [
      { label: "パーソナル初回体験", value: "4,400円", note: "入会金・退会金0円。所要時間・税込総額は施設へ。" },
      { label: "単発・月会員", value: "通常単発8,800円（割引表示7,700円）", note: "割引の適用条件は施設へ。月3回は21,900円、最低継続期間3か月・自動更新。" },
    ],
    accessSummary: "さっぽろ駅 徒歩1分・隣接コインパーキング",
    access: [{ label: "地下鉄・JR", value: "さっぽろ駅徒歩1分、JR札幌駅南口徒歩5分、大通駅徒歩5分。" }, { label: "駐車場", value: "隣接するコインパーキングを利用。" }],
  },
  "geek-pilates-club": {
    support: "理学療法士が在籍するスタジオ。インストラクターを選ぶ予約方式のため、資格を持つ担当者を希望する場合は公式窓口でご相談ください。",
    staffQualifications: ["理学療法士"],
    services: ["マシンピラティス", "インストラクターごとの個別レッスン"],
    prices: [
      { label: "初回体験", value: "5,000円", note: "インストラクターごとに初回体験が利用可能。時間・税込総額は施設へ。" },
      { label: "4回チケット", value: "34,000円（有効期限2か月）", note: "体験当日・翌日の購入特典は条件付き。通常チケットと区別してご確認ください。" },
    ],
    accessSummary: "大通駅35番出口 徒歩1分・階段で3階へ",
    access: [{ label: "地下鉄", value: "大通駅35番出口から徒歩1分。" }, { label: "建物", value: "階段で3階のhairsalon Niico内へ。移動に配慮が必要な方は事前にご相談ください。" }, { label: "駐車場", value: "近隣のコインパーキングを利用。" }],
  },
  "pilates-oto": {
    reception: { message: "新規予約を一時制限中・公式LINEで順次案内", url: "https://pilates-oto.com/service/personal/", checkedAt: "2026-10-20" },
    support: "理学療法士資格を持つ代表者がパーソナルレッスンを案内。理学療法士監修のコースもありますが、監修は毎回の直接指導を意味しません。希望する担当者はお問い合わせください。",
    staffQualifications: [],
    otherQualifications: { label: "代表者・コース監修に関わる資格", values: ["理学療法士"] },
    services: ["女性向けマンツーマンのマシンピラティス", "パーソナルトレーニング", "理学療法士監修の腰・骨盤まわりの運動コース"],
    prices: [
      { label: "体験レッスン", value: "90分 7,900円（税込・1人1回）", note: "新規予約に制限あり。受付方法は公式ページをご覧ください。" },
      { label: "月2コース", value: "各50分・月額18,000円（税込）", note: "入会金・事務手数料は通常20,000円。体験当日のコース契約で5,000円の期間限定案内あり（予告なく終了）。" },
    ],
    accessSummary: "大通駅・さっぽろ駅・バスセンター前駅から徒歩圏",
    access: [{ label: "地下鉄", value: "大通駅30・31番出口方面の創世スクエアから徒歩4分、さっぽろ駅徒歩7分、バスセンター前駅2番出口徒歩5分。" }, { label: "駐車場", value: "近隣の有料パーキングを利用。" }],
  },
  "r-zone": {
    support: "理学療法士資格を持つスタッフが、メディカル分野のサポートなどを担当。全スタッフが理学療法士ではないため、目的に合う担当者を予約時にご相談ください。",
    staffQualifications: ["理学療法士"],
    services: ["ピラティス・コンディショニング・トレーニングを組み合わせたパーソナル", "少人数のマットピラティス", "スポーツ・ダンスの身体づくり", "オンラインのグループレッスン"],
    prices: [
      { label: "初回カウンセリング＋パーソナル", value: "75分 7,500円（税込）" },
      { label: "通常パーソナル", value: "60分 11,000円（税込）", note: "継続チケット・グループは別料金。担当者やコースの条件は施設へ。" },
    ],
    accessSummary: "西18丁目駅3番出口 徒歩3分・テナント棟2階",
    access: [{ label: "地下鉄", value: "東西線 西18丁目駅3番出口から徒歩3分。" }, { label: "建物", value: "日宝北1条ビルのテナント棟203。住居側とは入口が異なります。" }],
  },
  "spocli-labo": {
    reception: { message: "新規会員募集停止のお知らせあり", url: "https://spocli-labo.jp/news/2026/09/15/202/", checkedAt: "2026-10-20" },
    support: "理学療法士のトレーナーが在籍し、医師と連携して運動をサポートします。当日の担当者は相談時にご確認ください。",
    staffQualifications: ["理学療法士"],
    services: ["メディカルフィットネス", "身体機能のチェックと個別トレーニング", "ジムでの自主トレーニング"],
    prices: [
      { label: "レギュラー会員", value: "月額16,500円（税込）", note: "個別指導の利用条件・検査費用は会員区分により異なります。" },
      { label: "入会時の費用", value: "入会金16,500円（税込）", note: "パーソナル・メディカル会員は別料金。体験の費用・時間は公式窓口へお問い合わせください。" },
    ],
    accessSummary: "バスセンター前駅8番出口直結・ビル3階",
    access: [
      { label: "地下鉄", value: "東西線 バスセンター前駅8番出口直結" },
      { label: "建物", value: "大通東やまむらセンタービル3階" },
    ],
  },
  priseness: {
    support:
      "理学療法士がマンツーマンで運動をサポート。身体の状態や目標に合わせて取り組みます。",
    staffQualifications: ["理学療法士"],
    services: [
      "個別トレーニング",
      "姿勢・歩行や筋力のチェック",
      "病院リハビリ後の運動継続・転倒予防の運動支援",
    ],
    prices: [
      {
        label: "体験・通常料金",
        value: "公式料金表をご覧ください",
        note: "時間・回数・対象によってプランが異なります。",
      },
    ],
    accessSummary: "西区琴似・チェストオオイビル3階",
    access: [{ label: "建物", value: "チェストオオイビル3階" }],
  },
  "we-ing": {
    support:
      "理学療法士資格を持つ代表者が運営。訪問・オンラインの運動指導や企業向けの支援を案内しています。",
    staffQualifications: [],
    otherQualifications: { label: "代表者の保有資格", values: ["理学療法士"] },
    services: [
      "訪問・出張での運動指導",
      "オンラインでのサポート",
      "企業向け健康支援",
    ],
    prices: [{ label: "利用料金", value: "内容に応じてお問い合わせください" }],
    accessSummary: "訪問・オンラインに対応（来訪は要相談）",
    access: [
      {
        label: "ご利用方法",
        value: "訪問・オンライン・企業への出張。掲載住所は会社所在地です。",
      },
    ],
  },
  coability: {
    support:
      "理学療法士資格を持つ代表者が個別に対応。運動指導の内容は、相談したいことを伝えてお問い合わせください。",
    staffQualifications: ["理学療法士"],
    services: [
      "コンディショニング（パーソナル施術）",
      "身体の使い方・日常動作についての相談",
    ],
    prices: [
      {
        label: "パーソナル施術",
        value: "50分 8,000円／30分 6,000円",
        note: "税込総額・追加費用は施設にお問い合わせください。",
      },
    ],
    accessSummary: "新道東駅 徒歩12分・駐車場2台",
    access: [
      { label: "地下鉄", value: "東豊線 新道東駅 徒歩12分" },
      { label: "バス", value: "北33条東8丁目 徒歩2分" },
      { label: "駐車場", value: "2台（駐車位置は公式案内をご覧ください）" },
    ],
  },
  "boost-care": {
    support:
      "整体・パーソナルトレーニングを案内している施設です。現在の担当者や専門資格は、お問い合わせ時にご確認ください。",
    staffQualifications: [],
    services: ["パーソナルトレーニング", "コンディショニング"],
    prices: [{ label: "利用料金", value: "施設へお問い合わせください" }],
    accessSummary: "豊平区・詳しい所在地はお問い合わせください",
  },
  physioroom: {
    support:
      "女性向けのピラティス・トレーニングを案内しています。現在の担当者や専門資格は、公式Instagramでお問い合わせください。",
    staffQualifications: [],
    services: ["女性向けピラティス", "トレーニング・コンディショニング"],
    prices: [
      { label: "利用料金", value: "公式Instagramでお問い合わせください" },
    ],
    accessSummary: "南区・詳しい所在地はお問い合わせください",
  },
  robocare: {
    support:
      "理学療法士・作業療法士を紹介するスタッフ案内があります。HALを用いたトレーニングを支援します。担当者は相談時にご確認ください。",
    staffQualifications: ["理学療法士", "作業療法士"],
    services: [
      "装着型サイボーグHALを用いたトレーニング",
      "歩行・上肢の運動支援",
      "訪問プラン（対応条件は施設に相談）",
    ],
    prices: [
      {
        label: "トライアル",
        value: "16,500円（税込）",
        note: "トライアルの所要時間はお問い合わせください。",
      },
      { label: "通常", value: "60分 16,500円／90分 19,800円（税込）" },
    ],
    accessSummary: "西区西野・訪問プランも相談できます",
  },
  "toreriha-club": {
    support:
      "理学療法士が作成に関わる運動メニューを提供。トレーナーがコンディショニングをサポートします。毎回の担当資格は要相談。",
    staffQualifications: [],
    otherQualifications: {
      label: "運動メニュー作成に関わる専門資格",
      values: ["理学療法士"],
    },
    services: [
      "マンツーマンのコンディショニング",
      "施設でのトレーニング",
      "グループレッスン・スポーツ向けプラン",
    ],
    prices: [
      {
        label: "月会員",
        value: "月額 8,250円＋入会金 3,850円",
        note: "利用内容・税込総額は施設にお問い合わせください。",
      },
      {
        label: "チケット",
        value: "1回 7,150円〜（入会金なし）",
        note: "1回1時間。プランごとの条件は公式案内をご覧ください。",
      },
    ],
    accessSummary: "手稲区前田・トライアル手稲店2階",
    access: [{ label: "建物", value: "トライアル手稲店2階" }],
  },
  amilus: {
    support:
      "理学療法士資格を持つコーチが、マンツーマンのパーソナルトレーニングを担当します。",
    staffQualifications: ["理学療法士"],
    services: [
      "パーソナルトレーニング",
      "コンディショニング",
      "ランニングコンサルティング",
      "少人数・プライベートグループレッスン",
    ],
    prices: [
      {
        label: "初回体験",
        value: "60分 2,750円（税込）",
        note: "パーソナルまたはコンディショニング。適用条件は公式案内をご覧ください。",
      },
      {
        label: "通常チケット",
        value: "60分 11,000円（税込・入会金なし）",
        note: "月会員・学割は別プランです。",
      },
    ],
    accessSummary: "JR苗穂駅 徒歩5分・近隣駐車場を利用",
    access: [
      { label: "JR", value: "苗穂駅 徒歩5分" },
      { label: "地下鉄", value: "バスセンター前駅 徒歩12分" },
      { label: "バス", value: "札幌厚生病院停留所 徒歩1分" },
      {
        label: "駐車場",
        value: "専用駐車場なし。近隣の有料駐車場をご利用ください。",
      },
    ],
  },
};

export const facilityGuide = (facility: Facility): FacilityGuide =>
  FACILITY_GUIDES[facility.id] || {
    support: facility.involvement,
    staffQualifications: [],
    services: ["運動・身体のサポート（詳細は施設にお問い合わせください）"],
    prices: [{ label: "利用料金", value: facility.priceNote }],
    accessSummary: facility.ward,
  };

export const PURPOSE_ENTRIES: {
  id: PurposeId;
  title: string;
  description: string;
}[] = [
  {
    id: "after-hospital",
    title: "退院後もリハビリ・運動を続けたい",
    description: "病院リハビリの後の運動継続に",
  },
  {
    id: "fall-prevention",
    title: "いつまでも自分の足で歩きたい",
    description: "歩く力やバランスの維持に",
  },
  {
    id: "joint",
    title: "膝や腰に不安があっても運動したい",
    description: "身体に合わせた取り組みを相談",
  },
  {
    id: "posture-pilates",
    title: "姿勢や体の使い方を整えたい",
    description: "日々の動き・ピラティスに",
  },
  {
    id: "personal-training",
    title: "体力・筋力をつけたい",
    description: "自分のペースで身体づくり",
  },
  {
    id: "sports",
    title: "スポーツをもっと楽しみたい",
    description: "競技や趣味を続けるために",
  },
];
