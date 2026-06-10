export const wards = ["中央区", "北区", "東区", "白石区", "厚別区", "豊平区", "清田区", "南区", "西区", "手稲区"] as const;

export type PublicationStatus = "official" | "candidate" | "checking";

export type PurposeId =
  | "after-hospital"
  | "stroke"
  | "joint"
  | "fall-prevention"
  | "sports"
  | "visit"
  | "pilates"
  | "adl";

export type Purpose = {
  id: PurposeId;
  shortLabel: string;
  label: string;
  description: string;
};

export const purposes: Purpose[] = [
  {
    id: "after-hospital",
    shortLabel: "退院後",
    label: "病院リハビリ終了後の運動継続",
    description: "退院後・外来リハ終了後も運動を続けたい方へ"
  },
  {
    id: "stroke",
    shortLabel: "脳卒中",
    label: "脳卒中後の自費リハビリ",
    description: "発症後の身体機能・生活動作の改善を支援"
  },
  {
    id: "joint",
    shortLabel: "痛み",
    label: "膝痛・腰痛・股関節の不安",
    description: "痛みや不安に合わせた運動・コンディショニング"
  },
  {
    id: "fall-prevention",
    shortLabel: "予防",
    label: "高齢者の転倒予防・フレイル予防",
    description: "いつまでも自分の足で歩き続けるために"
  },
  {
    id: "sports",
    shortLabel: "運動",
    label: "スポーツ・ランニングのコンディショニング",
    description: "パフォーマンス向上とけが予防のサポート"
  },
  {
    id: "visit",
    shortLabel: "訪問",
    label: "訪問対応の自費リハビリ",
    description: "外出が難しい方へ、ご自宅で運動支援"
  },
  {
    id: "pilates",
    shortLabel: "姿勢",
    label: "ピラティス・パーソナルトレーニング",
    description: "専門職監修のもと、姿勢・体づくりを支援"
  },
  {
    id: "adl",
    shortLabel: "生活",
    label: "作業療法士による生活動作支援",
    description: "家事・趣味・仕事など、暮らしの動作を支援"
  }
];

export type Facility = {
  name: string;
  ward: (typeof wards)[number];
  address: string;
  qualifications: string[];
  targets: string[];
  purposes: PurposeId[];
  types: string[];
  price: string;
  feature: string;
  officialUrl?: string;
  contactUrl?: string;
  status: PublicationStatus;
  verifiedAt: string;
  note: string;
};

export const statusLabels: Record<PublicationStatus, string> = {
  official: "正式掲載",
  candidate: "掲載準備中（掲載候補）",
  checking: "情報確認中（要確認）"
};

export const facilities: Facility[] = [
  {
    name: "リハビリジム プライズネス",
    ward: "西区",
    address: "札幌市西区琴似2条3-1-1 チェストオオイビル3階",
    qualifications: ["理学療法士"],
    targets: ["高齢者", "整形外科疾患", "腰痛", "膝痛"],
    purposes: ["after-hospital", "joint", "fall-prevention"],
    types: ["店舗型"],
    price: "60分 8,000円から／回数券あり",
    feature:
      "理学療法士がマンツーマンで対応。病院リハビリ後の運動継続や転倒予防など、一人ひとりの目的に合わせた運動プログラムを提案します。",
    officialUrl: "https://prizenes.com/",
    contactUrl: "https://prizenes.com/contact/",
    status: "official",
    verifiedAt: "2026-06-10",
    note: "運営施設のため正式掲載。料金・サービス内容は公開前に最終確認してください。"
  },
  {
    name: "札幌中央コンディショニングラボ",
    ward: "中央区",
    address: "札幌市中央区大通西エリア",
    qualifications: ["理学療法士"],
    targets: ["スポーツ", "腰痛", "整形外科疾患"],
    purposes: ["sports", "joint", "pilates"],
    types: ["店舗型", "オンライン対応"],
    price: "確認中",
    feature:
      "スポーツやランニングのコンディショニングを想定した掲載候補です。正式な掲載可否、所在地、料金、資格者情報は確認中です。",
    status: "checking",
    verifiedAt: "未確認",
    note: "掲載候補。実在情報として扱わず、施設確認後に正式情報へ差し替え。"
  },
  {
    name: "きた自費リハビリルーム",
    ward: "北区",
    address: "札幌市北区北24条西エリア",
    qualifications: ["理学療法士", "作業療法士"],
    targets: ["脳卒中", "高齢者"],
    purposes: ["stroke", "after-hospital", "adl"],
    types: ["店舗型", "訪問型"],
    price: "確認中",
    feature:
      "脳卒中後の自費リハビリや生活動作支援を想定した掲載候補です。正式な掲載可否、所在地、料金、資格者情報は確認中です。",
    status: "candidate",
    verifiedAt: "未確認",
    note: "掲載準備中。正式掲載前に施設からの同意と内容確認が必要。"
  },
  {
    name: "ひがし訪問リハビリサポート",
    ward: "東区",
    address: "札幌市東区北13条東エリア",
    qualifications: ["理学療法士"],
    targets: ["高齢者", "脳卒中", "整形外科疾患"],
    purposes: ["visit", "fall-prevention", "after-hospital"],
    types: ["訪問型"],
    price: "確認中",
    feature:
      "訪問型の運動支援を想定した掲載候補です。正式な掲載可否、訪問範囲、料金、資格者情報は確認中です。",
    status: "candidate",
    verifiedAt: "未確認",
    note: "掲載準備中。訪問対応範囲と問い合わせ先の確認が必要。"
  },
  {
    name: "しろいし生活動作サポートルーム",
    ward: "白石区",
    address: "札幌市白石区南郷通エリア",
    qualifications: ["作業療法士"],
    targets: ["高齢者", "脳卒中"],
    purposes: ["adl", "stroke", "fall-prevention"],
    types: ["店舗型", "訪問型"],
    price: "確認中",
    feature:
      "作業療法士による生活動作支援を想定した掲載候補です。正式な掲載可否、所在地、料金、資格者情報は確認中です。",
    status: "checking",
    verifiedAt: "未確認",
    note: "情報確認中。サービス範囲と施設確認が必要。"
  },
  {
    name: "あつべつシニア運動ステーション",
    ward: "厚別区",
    address: "札幌市厚別区厚別中央エリア",
    qualifications: ["理学療法士"],
    targets: ["高齢者", "膝痛", "腰痛"],
    purposes: ["fall-prevention", "joint", "after-hospital"],
    types: ["店舗型"],
    price: "確認中",
    feature:
      "シニア向け運動支援や転倒予防を想定した掲載候補です。正式な掲載可否、所在地、料金、資格者情報は確認中です。",
    status: "candidate",
    verifiedAt: "未確認",
    note: "掲載準備中。料金と対象者の確認が必要。"
  },
  {
    name: "とよひらピラティス＆リハサポート",
    ward: "豊平区",
    address: "札幌市豊平区平岸エリア",
    qualifications: ["理学療法士"],
    targets: ["腰痛", "姿勢", "スポーツ"],
    purposes: ["pilates", "joint", "sports"],
    types: ["店舗型", "オンライン対応"],
    price: "確認中",
    feature:
      "専門職監修のピラティス・パーソナルトレーニングを想定した掲載候補です。正式な掲載可否、所在地、料金、資格者情報は確認中です。",
    status: "checking",
    verifiedAt: "未確認",
    note: "情報確認中。誇大な表現を避けた紹介文への調整が必要。"
  },
  {
    name: "きよた脳卒中リハビリスタジオ",
    ward: "清田区",
    address: "札幌市清田区清田エリア",
    qualifications: ["理学療法士", "言語聴覚士"],
    targets: ["脳卒中", "高齢者"],
    purposes: ["stroke", "after-hospital", "visit"],
    types: ["店舗型", "訪問型"],
    price: "確認中",
    feature:
      "脳卒中後の運動支援や言語聴覚士による相談対応を想定した掲載候補です。正式な掲載可否、所在地、料金、資格者情報は確認中です。",
    status: "candidate",
    verifiedAt: "未確認",
    note: "掲載準備中。資格者情報と問い合わせ導線の確認が必要。"
  },
  {
    name: "みなみ膝・腰運動指導ルーム",
    ward: "南区",
    address: "札幌市南区澄川エリア",
    qualifications: ["理学療法士"],
    targets: ["膝痛", "腰痛", "整形外科疾患"],
    purposes: ["joint", "after-hospital", "fall-prevention"],
    types: ["店舗型"],
    price: "確認中",
    feature:
      "膝・腰に不安のある方向けの運動指導を想定した掲載候補です。正式な掲載可否、所在地、料金、資格者情報は確認中です。",
    status: "checking",
    verifiedAt: "未確認",
    note: "情報確認中。所在地と料金の確認が必要。"
  },
  {
    name: "ていね健康づくりラボ",
    ward: "手稲区",
    address: "札幌市手稲区手稲本町エリア",
    qualifications: ["理学療法士", "作業療法士"],
    targets: ["高齢者", "整形外科疾患", "スポーツ"],
    purposes: ["fall-prevention", "after-hospital", "sports", "adl"],
    types: ["店舗型", "訪問型", "オンライン対応"],
    price: "確認中",
    feature:
      "店舗・訪問・オンラインでの運動支援を想定した掲載候補です。正式な掲載可否、所在地、料金、資格者情報は確認中です。",
    status: "candidate",
    verifiedAt: "未確認",
    note: "掲載準備中。対応形式と問い合わせ先の確認が必要。"
  }
];

export const qualifications = Array.from(new Set(facilities.flatMap((facility) => facility.qualifications)));
export const serviceTypes = Array.from(new Set(facilities.flatMap((facility) => facility.types)));
