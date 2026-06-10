/* =====================================================================
 * 札幌 自費リハビリナビ 施設データ
 *
 * 施設の追加・編集はこのファイルだけで完結します。
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
    label: "PT整体・コンディショニング",
    description: "理学療法士が関わる整体・体の調整",
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

/* ---------------- 施設データ（2026-06-10 時点） ---------------- */

export const FACILITIES: Facility[] = [
  {
    id: "priseness",
    name: "リハビリジム プライズネス",
    ward: "西区",
    address: "札幌市西区琴似",
    categories: ["rehab"],
    qualifications: ["理学療法士"],
    involvement: "理学療法士が運営・在籍",
    tagline:
      "理学療法士がマンツーマンで対応。病院リハビリ後の運動継続や転倒予防など、目的に合わせた運動支援を行います。",
    targets: ["高齢者", "転倒予防", "病院リハビリ後", "膝・腰の不安", "筋力測定"],
    purposes: ["after-hospital", "fall-prevention", "joint"],
    serviceTypes: ["店舗型"],
    priceNote: "公式サイトの料金表をご確認ください",
    site: "https://priseness-health-support.vercel.app/",
    contact: "https://priseness-health-support.vercel.app/",
    displayStatus: "掲載中",
    isPublic: true,
    adminStatus: "正式掲載",
    adminMemo: "運営元として正式掲載。住所・料金・予約URLは最新情報に差し替え。",
    checkedAt: "2026-06-10",
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
    isPublic: true,
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
    involvement: "理学療法士が対応",
    tagline:
      "理学療法士による整体とパーソナルトレーニング。肩・腰・膝の不安や、体の使い方の相談に対応します。",
    targets: ["肩こり・腰痛・膝痛", "体の使い方", "パーソナルトレーニング"],
    purposes: ["joint", "personal-training"],
    serviceTypes: ["店舗型"],
    priceNote: "公式・予約ページでご確認ください",
    site: "https://coability.net/",
    contact: "",
    displayStatus: "公開情報をもとに掲載",
    isPublic: true,
    adminStatus: "掲載候補",
    adminMemo: "表現に『改善』が多いので掲載文は中立にリライト。",
    checkedAt: "2026-06-10",
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
    qualifications: [],
    involvement: "HAL／Neuro HAL FIT 施設",
    tagline:
      "装着型サイボーグHAL®を活用したトレーニング施設。脳卒中・脊髄損傷・神経筋難病の方の歩行や上肢の運動を支援します。",
    targets: ["脳卒中", "脊髄損傷", "神経筋難病", "歩行・上肢"],
    purposes: ["stroke", "after-hospital"],
    serviceTypes: ["店舗型", "訪問型"],
    priceNote: "トライアル 16,500円／60分 16,500円 など",
    site: "https://robocare.jp/neuro-halfit-price/sapporo/",
    contact: "",
    displayStatus: "公開情報をもとに掲載",
    isPublic: true,
    adminStatus: "掲載候補",
    adminMemo: "先進機器系として自費リハビリ枠に掲載。資格者在籍は確認要。資格表示よりサービス特性中心。",
    checkedAt: "2026-06-10",
    priority: "B",
  },
  {
    id: "spocli-labo",
    name: "Sports & Medical fitness スポクリLABO",
    ward: "中央区",
    address: "札幌市内（詳細は公式サイトでご確認ください）",
    categories: ["medical-fitness", "gym"],
    qualifications: ["理学療法士等（確認中）"],
    involvement: "医療機関連携・専門職在籍の可能性（確認中）",
    tagline:
      "スポーツ医学の視点を取り入れたメディカルフィットネス。身体機能評価やパーソナルトレーニングを提供しています。",
    targets: ["スポーツ医学", "身体機能評価", "パーソナルトレーニング"],
    purposes: ["sports", "personal-training"],
    serviceTypes: ["店舗型"],
    priceNote: "ビジターPT 60分 11,000円 など",
    site: "https://spocli-labo.jp/",
    contact: "",
    displayStatus: "公開情報をもとに掲載",
    isPublic: false,
    adminStatus: "情報確認中",
    adminMemo: "医療×フィットネス色が強い。資格者表記・スタッフを確認してから正式候補化。スタッフ紹介ページ確認推奨。",
    checkedAt: "2026-06-10",
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
