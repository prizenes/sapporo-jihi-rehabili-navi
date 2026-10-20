import type { Facility, PurposeId } from "@/data/facilities";

export interface FacilityGuide {
  support: string;
  staffQualifications: string[];
  otherQualifications?: { label: string; values: string[] };
  services: string[];
  prices: { label: string; value: string; note?: string }[];
  accessSummary: string;
  access?: { label: string; value: string }[];
  // Use a facility photo only when permission and attribution are recorded.
  photo?: { src: string; alt: string; credit: string; permission: string };
}

// Source-check history stays internal in facility-verification.ts.
export const FACILITY_GUIDES: Record<string, FacilityGuide> = {
  "spocli-labo": {
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
