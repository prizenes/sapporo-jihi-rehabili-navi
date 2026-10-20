/* =====================================================================
 * 札幌 自費リハビリナビ 施設データ
 *
 * 基本情報はこのファイル、利用者向けの詳しい案内は facility-guide.ts で編集します。
 *
 * isPublic      : true = 公開画面に表示 / false = 非表示（データは保持）
 * displayStatus : 公開画面に出す文言（全施設とも中立的な表現にする）
 * adminStatus   : 管理用ステータス（正式掲載・掲載候補・情報確認中）
 *                 ※ 公開画面には絶対に表示しない
 *
 * ※ 公開情報ベースの一次データです。正式掲載へ切り替える前に、
 *    各施設へ掲載許可・資格者在籍・料金・住所を必ず確認してください。
 * ===================================================================== */

/** 管理用ステータス（公開画面には表示しない） */
export type AdminStatus = "正式掲載" | "掲載候補" | "情報確認中";

export type CategoryId =
  | "rehab"
  | "pt-seitai"
  | "pilates"
  | "gym"
  | "visit"
  | "medical-fitness"
  | "corporate"
  | "sports";

export type PurposeId =
  | "after-hospital"
  | "stroke"
  | "joint"
  | "fall-prevention"
  | "posture-pilates"
  | "personal-training"
  | "visit"
  | "sports";

export interface Category {
  id: CategoryId;
  icon: string;
  label: string;
  description: string;
  examples: string;
}

export interface Purpose {
  id: PurposeId;
  icon: string;
  label: string;
  description: string;
}

export interface Facility {
  id: string;
  name: string;
  ward: string; // 区名 または「札幌市内・近郊」
  address: string;
  categories: CategoryId[];
  qualifications: string[]; // 在籍・監修資格
  involvement: string; // 資格者の関わり方
  tagline: string; // 一言特徴（2〜3行以内）
  targets: string[]; // 主な対象
  purposes: PurposeId[];
  serviceTypes: string[]; // 店舗型 / 訪問型 / オンライン など
  priceNote: string; // 料金目安
  site: string; // 公式サイトURL（"" なら非表示）
  contact: string; // 問い合わせURL（"" なら非表示）
  /** 公開画面に出す文言（例：掲載中／公開情報をもとに掲載） */
  displayStatus: string;
  isPublic: boolean;
  /* ---- 管理用ステータス（公開画面には表示しない） ---- */
  adminStatus: AdminStatus;
  /* ---- 以下は運営用メモ（公開画面には表示されません） ---- */
  adminMemo?: string;
  checkedAt?: string;
  priority?: "A" | "B" | "C";
}

/* ---------------- マスタ ---------------- */

export const WARDS = [
  "中央区",
  "北区",
  "東区",
  "白石区",
  "厚別区",
  "豊平区",
  "清田区",
  "南区",
  "西区",
  "手稲区",
] as const;

export const EXTRA_AREA = "札幌市内・近郊";

export const CATEGORIES: Category[] = [
  {
    id: "rehab",
    icon: "🏥",
    label: "自費リハビリ",
    description: "医療保険・介護保険外で、身体機能の維持・改善を支援",
    examples: "病院リハビリ後・脳卒中後の方など",
  },
  {
    id: "pt-seitai",
    icon: "🤲",
    label: "整体・コンディショニング",
    description: "専門職が関わる身体づくり・運動のコンディショニング",
    examples: "肩こり・腰や膝の不安がある方など",
  },
  {
    id: "pilates",
    icon: "🧘",
    label: "ピラティス・ヨガ",
    description: "専門職が関わる姿勢・体づくりのレッスン",
    examples: "姿勢を整えたい方・運動が久しぶりの方など",
  },
  {
    id: "gym",
    icon: "🏋️",
    label: "パーソナルジム",
    description: "国家資格者が指導するマンツーマントレーニング",
    examples: "体力づくり・ボディメイクをしたい方など",
  },
  {
    id: "visit",
    icon: "🚪",
    label: "訪問型運動支援",
    description: "ご自宅や施設に専門職が伺う運動支援",
    examples: "外出が難しい方・在宅で続けたい方など",
  },
  {
    id: "medical-fitness",
    icon: "💪",
    label: "メディカルフィットネス",
    description: "医療的な視点を取り入れたフィットネス",
    examples: "持病があり運動に不安がある方など",
  },
  {
    id: "corporate",
    icon: "🏢",
    label: "健康経営サポート",
    description: "企業向けの健康づくり・運動支援",
    examples: "従業員の健康づくりに取り組む企業など",
  },
  {
    id: "sports",
    icon: "🏃",
    label: "スポーツコンディショニング",
    description: "競技・ランニングのための体のケアと調整",
    examples: "アスリート・ランナー・部活動生など",
  },
];

export const PURPOSES: Purpose[] = [
  {
    id: "after-hospital",
    icon: "🏥",
    label: "病院リハビリ後の運動継続",
    description: "退院後・外来リハ終了後も運動を続けたい",
  },
  {
    id: "stroke",
    icon: "🧠",
    label: "脳卒中後の自費リハビリ",
    description: "発症後の身体機能・生活動作の維持・改善を支援",
  },
  {
    id: "joint",
    icon: "🦵",
    label: "膝・腰・股関節の不安",
    description: "痛みや不安に合わせた運動・コンディショニング",
  },
  {
    id: "fall-prevention",
    icon: "👟",
    label: "転倒予防・フレイル予防",
    description: "いつまでも自分の足で歩き続けるために",
  },
  {
    id: "posture-pilates",
    icon: "🧘",
    label: "姿勢改善・ピラティス",
    description: "専門職が関わる姿勢・体づくり",
  },
  {
    id: "personal-training",
    icon: "🏋️",
    label: "パーソナルトレーニング",
    description: "資格者によるマンツーマンの運動指導",
  },
  {
    id: "visit",
    icon: "🚪",
    label: "訪問対応",
    description: "ご自宅・施設への訪問で運動を支援",
  },
  {
    id: "sports",
    icon: "🏃",
    label: "スポーツ・ランニング",
    description: "競技のためのコンディショニング",
  },
];

/* ---------------- 施設データ（確認日は各施設の checkedAt に記録） ---------------- */

export const FACILITIES: Facility[] = [
  {
    id: "priseness",
    name: "リハビリジム プライズネス",
    ward: "西区",
    address: "札幌市西区琴似2条3-1-1 チェストオオイビル3階",
    categories: ["gym"],
    qualifications: ["理学療法士"],
    involvement: "理学療法士がトレーナーとしてマンツーマンの運動をサポート",
    tagline:
      "理学療法士がマンツーマンで対応。病院リハビリ後の運動継続や転倒予防など、目的に合わせた運動支援を行います。",
    targets: ["高齢者", "転倒予防", "病院リハビリ後", "膝・腰の不安", "筋力測定"],
    purposes: ["after-hospital", "fall-prevention", "joint"],
    serviceTypes: ["店舗型"],
    priceNote: "公式サイトの料金表をご確認ください",
    site: "https://prizenes.com/",
    contact: "https://lin.ee/OtTQpMp",
    displayStatus: "公開情報をもとに掲載",
    isPublic: true,
    adminStatus: "正式掲載",
    adminMemo: "運営元として正式掲載。2026-10-20公式トップで詳細住所・理学療法士による運動支援を再確認。料金の数値は未取得のため公式料金表への案内を維持。",
    checkedAt: "2026-10-20",
    priority: "A",
  },
  {
    id: "we-ing",
    name: "株式会社WE-ing",
    ward: "北区",
    address: "札幌市北区北7条西4丁目1-1",
    categories: ["pt-seitai", "visit", "corporate"],
    qualifications: ["理学療法士"],
    involvement: "代表者が理学療法士",
    tagline:
      "理学療法士による健康整体・運動指導。訪問・出張型やオンライン、企業向けの健康経営サポートにも対応しています。",
    targets: ["健康整体", "運動指導", "健康経営", "訪問・出張", "オンライン"],
    purposes: ["visit", "personal-training"],
    serviceTypes: ["訪問型", "オンライン", "企業向け"],
    priceNote: "公式サイトでご確認ください",
    site: "https://we-ing.biz/about/",
    contact: "",
    displayStatus: "公開情報をもとに掲載",
    isPublic: true,
    adminStatus: "掲載候補",
    adminMemo: "ユーザー指定。正式掲載前に掲載許可と料金詳細確認。",
    checkedAt: "2026-06-10",
    priority: "A",
  },
  {
    id: "phact",
    name: "Conditioning Salon Phact（ふぁくと）",
    ward: "北区",
    address: "札幌市北区北7条西2丁目6番 37山京ビル917",
    categories: ["pt-seitai"],
    qualifications: ["理学療法士"],
    involvement: "理学療法士が運営",
    tagline:
      "札幌駅北口の理学療法士運営サロン。肩・腰・膝の不安や姿勢・歩行、アスリートのコンディショニングに対応します。",
    targets: ["肩こり・腰痛・膝痛", "姿勢・歩行", "アスリート", "後遺症の相談"],
    purposes: ["joint", "sports", "stroke"],
    serviceTypes: ["店舗型"],
    priceNote: "60分 8,800円／80分 12,000円 など",
    site: "https://www.in-phact.com/",
    contact: "",
    displayStatus: "公開情報をもとに掲載",
    isPublic: false,
    adminStatus: "掲載候補",
    adminMemo: "医療機関ではない旨の注意表現あり。サイト文言の参考にもなる。",
    checkedAt: "2026-06-10",
    priority: "A",
  },
  {
    id: "coability",
    name: "Conditioning Gym CoAbility",
    ward: "東区",
    address: "札幌市東区北32条東7丁目2-18",
    categories: ["pt-seitai", "gym"],
    qualifications: ["理学療法士"],
    involvement: "理学療法士資格を持つ代表者が個別に対応",
    tagline:
      "理学療法士による整体とパーソナルトレーニング。肩・腰・膝の不安や、体の使い方の相談に対応します。",
    targets: ["肩こり・腰痛・膝痛", "体の使い方", "パーソナルトレーニング"],
    purposes: ["joint", "personal-training"],
    serviceTypes: ["店舗型"],
    priceNote: "パーソナル施術50分8,000円／30分6,000円。税込総額・追加費用は施設へご確認ください。",
    site: "https://coability.net/",
    contact: "",
    displayStatus: "公開情報をもとに掲載",
    isPublic: true,
    adminStatus: "掲載候補",
    adminMemo: "2026-10-20公式本文で所在地・代表者資格・料金・新道東駅徒歩12分・駐車場2台を再確認。現在の案内はパーソナル施術。運動指導の詳細は要相談。",
    checkedAt: "2026-10-20",
    priority: "A",
  },
  {
    id: "boost-care",
    name: "Boost Care（ブーストケア）",
    ward: "豊平区",
    address: "札幌市豊平区（詳細は公式サイトでご確認ください）",
    categories: ["pt-seitai", "gym"],
    qualifications: ["運動器認定理学療法士"],
    involvement: "代表・施術者が理学療法士",
    tagline:
      "運動器認定理学療法士による整体・パーソナルトレーニング。肩や腰の不安、筋力トレーニング、体づくりを支援します。",
    targets: ["肩こり・腰痛", "筋トレ指導", "スポーツ", "身体づくり"],
    purposes: ["joint", "sports", "personal-training"],
    serviceTypes: ["店舗型"],
    priceNote: "公式サイトでご確認ください",
    site: "https://boost-care.com/",
    contact: "",
    displayStatus: "公開情報をもとに掲載",
    isPublic: true,
    adminStatus: "掲載候補",
    adminMemo: "正式掲載前に住所・料金を確認。",
    checkedAt: "2026-06-10",
    priority: "A",
  },
  {
    id: "physioroom",
    name: "PHYSIOROOM（フィジオルーム）",
    ward: "南区",
    address: "札幌市南区（詳細は公式情報をご確認ください）",
    categories: ["pt-seitai", "pilates", "gym"],
    qualifications: ["理学療法士"],
    involvement: "女性理学療法士・トレーナー",
    tagline:
      "女性専用の整体・ピラティス・トレーニング。柔軟性づくりやパフォーマンス向上の相談に対応します。",
    targets: ["女性専用", "整体", "ピラティス", "柔軟性"],
    purposes: ["posture-pilates", "personal-training", "sports"],
    serviceTypes: ["店舗型"],
    priceNote: "Instagram・掲載媒体でご確認ください",
    site: "https://www.instagram.com/physioroom_sapporo/",
    contact: "",
    displayStatus: "公開情報をもとに掲載",
    isPublic: true,
    adminStatus: "掲載候補",
    adminMemo: "確認元が主にSNS/外部媒体。掲載許可を優先。",
    checkedAt: "2026-06-10",
    priority: "C",
  },
  {
    id: "robocare",
    name: "札幌ロボケアセンター",
    ward: "西区",
    address: "札幌市西区西野九条8-14-5",
    categories: ["rehab"],
    qualifications: ["理学療法士", "作業療法士"],
    involvement: "公式スタッフ紹介に理学療法士・作業療法士を掲載。HALを用いたトレーニングをサポート",
    tagline:
      "装着型サイボーグHAL®を活用したトレーニング施設。脳卒中・脊髄損傷・神経筋難病の方の歩行や上肢の運動を支援します。",
    targets: ["脳卒中", "脊髄損傷", "神経筋難病", "歩行・上肢"],
    purposes: ["stroke", "after-hospital"],
    serviceTypes: ["店舗型", "訪問型"],
    priceNote: "トライアル16,500円／通常60分16,500円・90分19,800円（税込）。トライアル時間は施設へお問い合わせください。",
    site: "https://robocare.jp/neuro-halfit-price/sapporo/",
    contact: "",
    displayStatus: "公開情報をもとに掲載",
    isPublic: true,
    adminStatus: "掲載候補",
    adminMemo: "2026-10-20公式本文で所在地・スタッフ紹介のPT/OT・HAL・訪問プラン・税込料金を再確認。今回本文で確認した資格のみ反映。",
    checkedAt: "2026-10-20",
    priority: "B",
  },
  {
    id: "seitai-sakka",
    name: "整体院札佳",
    ward: "西区",
    address: "札幌市西区山の手三条1-3-25 プリエ琴似507",
    categories: ["pt-seitai"],
    qualifications: ["理学療法士"],
    involvement: "公式サイトで院長の理学療法士資格を確認。当日の担当者は予約時にご確認ください。",
    tagline: "個室での整体と、手技・運動を組み合わせたメニューを案内しています。姿勢や日常動作について相談できます。",
    targets: ["肩・腰の不安", "姿勢", "日常動作", "コンディショニング"],
    purposes: ["joint", "posture-pilates"],
    serviceTypes: ["店舗型"],
    priceNote: "公式掲載：2回目以降の整体30分10,000円。初回条件・税込総額は施設へご確認ください。",
    site: "https://seitai-sakka.com/",
    contact: "https://seitai-sakka.com/",
    displayStatus: "公開情報をもとに掲載",
    isPublic: false,
    adminStatus: "掲載候補",
    adminMemo: "2026-10-20公式トップで院長資格・住所・整体と運動の案内を確認。掲載承認は未取得。問い合わせは公式トップの案内を利用。",
    checkedAt: "2026-10-20",
    priority: "B",
  },
  {
    id: "hagukumi",
    name: "ココロとカラダの整体院 はぐくみ",
    ward: "西区",
    address: "札幌市西区西野四条3-1-38",
    categories: ["pt-seitai"],
    qualifications: ["理学療法士"],
    involvement: "公式施設紹介に院長が理学療法士の国家資格を保有すると記載。",
    tagline: "完全予約制の整体・コンディショニング施設。個別のカウンセリングと身体のケアを案内しています。",
    targets: ["身体のケア", "コンディショニング", "個別相談"],
    purposes: ["joint"],
    serviceTypes: ["店舗型"],
    priceNote: "公式ページ間で料金・所要時間の表記が異なるため、予約前に最新の総額をご確認ください。",
    site: "https://hagukumi2019.com/",
    contact: "https://hagukumi2019.com/contact/",
    displayStatus: "公開情報をもとに掲載",
    isPublic: false,
    adminStatus: "掲載候補",
    adminMemo: "公式アクセス・メニューを照合。メニューに7,000円＋初回1,000円、施設紹介には旧料金らしき別表記があるため金額の確定を保留。掲載承認は未取得。",
    checkedAt: "2026-10-20",
    priority: "B",
  },
  {
    id: "kinmaq-teineyamaguchi",
    name: "Next整体KINMAQ イオン手稲山口院",
    ward: "手稲区",
    address: "札幌市手稲区明日風6丁目1-1 イオンスーパーセンター手稲山口店内1階",
    categories: ["pt-seitai"],
    qualifications: ["理学療法士"],
    involvement: "公式店舗ページで施術スタッフは理学療法士と案内。当日の担当者は施設へご確認ください。",
    tagline: "商業施設内の予約制整体施設。筋膜に着目した身体のケアや、姿勢・動きに関する相談を案内しています。",
    targets: ["肩・腰の不安", "膝・股関節の不安", "姿勢", "身体のケア"],
    purposes: ["joint", "posture-pilates"],
    serviceTypes: ["店舗型"],
    priceNote: "初回限定価格などの案内があります。適用条件と継続時の総額は公式サイト・施設へご確認ください。",
    site: "https://kinmaq.com/branch/hokkaido/teineyamaguchi/",
    contact: "https://kinmaq.com/branch/hokkaido/teineyamaguchi/",
    displayStatus: "公開情報をもとに掲載",
    isPublic: false,
    adminStatus: "掲載候補",
    adminMemo: "2026-10-20公式店舗のスタッフ・FAQ・所在地を確認。限定価格を通常料金として掲載しない。掲載承認は未取得。",
    checkedAt: "2026-10-20",
    priority: "B",
  },
  {
    id: "toreriha-club",
    name: "トレリハCLUB",
    ward: "手稲区",
    address: "札幌市手稲区前田5条13丁目3番地1号 トライアル手稲店2階",
    categories: ["gym", "sports"],
    qualifications: ["理学療法士"],
    involvement: "公式プラン案内に理学療法士によるメニュー作成の記載があります。在籍状況・当日の担当資格は要確認。",
    tagline: "個別コンディショニングやグループレッスンを提供するフィットネスクラブ。身体づくりやスポーツの運動継続を支援します。",
    targets: ["身体づくり", "膝・腰の不安", "スポーツ", "グループでの運動"],
    purposes: ["joint", "sports", "personal-training"],
    serviceTypes: ["店舗型"],
    priceNote: "公式掲載：月額8,250円＋入会金3,850円、チケット7,150円〜／回。プラン条件・税込総額は要確認。",
    site: "https://torerihaclub.net/",
    contact: "https://torerihaclub.net/#contact",
    displayStatus: "公開情報をもとに掲載",
    isPublic: true,
    adminStatus: "掲載候補",
    adminMemo: "公式サービス・プラン本文でPTによるメニュー作成を確認。スタッフ紹介が画像主体のため、在籍・毎回PT担当とは断定しない。介護保険の系列施設と混同しない。掲載承認は未取得。",
    checkedAt: "2026-10-20",
    priority: "B",
  },
  {
    id: "amilus",
    name: "Training Studio AMILUS（アミラス）",
    ward: "中央区",
    address: "札幌市中央区北2条東9丁目90-28 リーサ苗穂駅前1階",
    categories: ["gym", "pt-seitai", "sports"],
    qualifications: ["理学療法士"],
    involvement: "公式料金ページに理学療法士資格を持つコーチがパーソナルトレーニングを担当すると記載。",
    tagline: "苗穂駅近くのトレーニングスタジオ。パーソナルトレーニング、コンディショニング、ランニングのサポートを案内しています。",
    targets: ["パーソナルトレーニング", "コンディショニング", "ランニング", "身体づくり"],
    purposes: ["personal-training", "sports"],
    serviceTypes: ["店舗型"],
    priceNote: "60分チケット1回11,000円（税込・入会金なし）。月会員等は別条件のため公式料金表をご確認ください。",
    site: "https://amilus-studio.com/",
    contact: "https://amilus-studio.com/contact/",
    displayStatus: "公開情報をもとに掲載",
    isPublic: true,
    adminStatus: "掲載候補",
    adminMemo: "2026-10-20公式料金・アクセスを確認。体験価格・月会費と通常チケット料金を区別。掲載承認は未取得。",
    checkedAt: "2026-10-20",
    priority: "B",
  },
  {
    id: "physiowellness-maruyama",
    name: "フィジオウェルネス マルヤマ",
    ward: "中央区",
    address: "札幌市中央区南1条西25丁目1-17 Maruyama S1ビル3階",
    categories: ["pt-seitai", "sports"],
    qualifications: ["理学療法士"],
    involvement: "公式代表紹介で理学療法士資格を確認。医療機関ではない旨の案内があります。",
    tagline: "整体・コンディショニングのほか、靴の調整やインソール作成を案内する施設。スポーツフォームやトレーニング方法も相談できます。",
    targets: ["肩・腰の不安", "膝・足の不安", "靴・インソール", "スポーツフォーム"],
    purposes: ["joint", "sports"],
    serviceTypes: ["店舗型"],
    priceNote: "整体約60分8,800円＋初回検査・評価2,200円（税込）。学割・靴の調整等は別料金。",
    site: "https://physiowellness.jp/",
    contact: "https://physiowellness.jp/contact/",
    displayStatus: "公開情報をもとに掲載",
    isPublic: false,
    adminStatus: "掲載候補",
    adminMemo: "2026-10-20公式代表紹介・整体・料金システム・所在地を確認。初回加算を料金欄に明記。掲載承認は未取得。",
    checkedAt: "2026-10-20",
    priority: "B",
  },
  {
    id: "spocli-labo",
    name: "Sports & Medical fitness スポクリLABO",
    ward: "中央区",
    address: "札幌市中央区大通東4丁目1-19 大通東やまむらセンタービル3階",
    categories: ["medical-fitness", "gym"],
    qualifications: ["理学療法士"],
    involvement: "公式スタッフ紹介に理学療法士のトレーナーを掲載。医師と連携し、カウンセリングと運動プログラムを提供。",
    tagline:
      "スポーツ医学の視点を取り入れたメディカルフィットネス。身体機能評価やパーソナルトレーニングを提供しています。",
    targets: ["スポーツ医学", "身体機能評価", "パーソナルトレーニング"],
    purposes: ["sports", "personal-training"],
    serviceTypes: ["店舗型"],
    priceNote: "レギュラー月額16,500円＋入会金16,500円（税込）。パーソナル会員等は別料金。内容・検査費用は施設へご確認ください。",
    site: "https://spocli-labo.jp/",
    contact: "https://spocli-labo.jp/contact/",
    displayStatus: "公開情報をもとに掲載",
    isPublic: true,
    adminStatus: "掲載候補",
    adminMemo: "2026-10-20ユーザーのメディカルフィットネス追加依頼に基づき公式トップ・問い合わせを確認。PTトレーナー、詳細住所、駅直結、入会金と月会費を確認。掲載承認は未取得。個別指導の回数は公式ページ内で表記差があり案内を確定しない。",
    checkedAt: "2026-10-20",
    priority: "B",
  },
  {
    id: "field-cruise",
    name: "フィールドクルーズ",
    ward: EXTRA_AREA,
    address: "確認中",
    categories: ["rehab", "sports"],
    qualifications: ["理学療法士等（確認中）"],
    involvement: "確認中",
    tagline: "比較記事で「リハビリとトレーニングの中間型」として紹介されている候補施設です。",
    targets: ["若年層", "復帰目的"],
    purposes: ["after-hospital", "sports"],
    serviceTypes: ["確認中"],
    priceNote: "確認中",
    site: "",
    contact: "",
    displayStatus: "公開情報をもとに掲載",
    isPublic: false,
    adminStatus: "情報確認中",
    adminMemo: "比較記事に掲載あり。公式確認後に追加。公式確認が必要。",
    checkedAt: "2026-06-10",
    priority: "C",
  },
];

/* ---------------- 公開画面用のヘルパー ---------------- */

/** 公開画面に表示する施設（isPublic: true のみ） */
export const publicFacilities = (): Facility[] =>
  FACILITIES.filter((f) => f.isPublic);

/**
 * 公開画面での表示順：エリア順（区の並び順）→ 施設名順。
 * ランキングに見えない並びにするため、優先度などでは並べ替えない。
 */
export const sortedPublicFacilities = (): Facility[] => {
  const wardIndex = (w: string): number => {
    const i = WARDS.findIndex((ward) => w.includes(ward));
    return i === -1 ? WARDS.length : i; // 札幌市内・近郊は最後
  };
  return publicFacilities()
    .slice()
    .sort(
      (a, b) =>
        wardIndex(a.ward) - wardIndex(b.ward) ||
        a.name.localeCompare(b.name, "ja")
    );
};

export const categoryLabel = (id: CategoryId): string =>
  CATEGORIES.find((c) => c.id === id)?.label ?? id;
