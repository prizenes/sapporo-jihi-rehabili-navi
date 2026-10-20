export const VERIFICATION_LABELS = {
  name: "施設名",
  address: "所在地",
  qualifications: "資格・関与方法",
  services: "サービス内容",
  pricing: "料金",
} as const;
type VerificationField = keyof typeof VERIFICATION_LABELS;
type Check = { confirmed: boolean; note: string };
export interface FacilityVerification {
  reviewedAt: string;
  checks: Record<VerificationField, Check>;
  sources: { title: string; url: string }[];
}

// These are source checks, not approval by a facility or changes to its listing.
export const FACILITY_VERIFICATIONS: Record<string, FacilityVerification> = {
  "spocli-labo": {
    reviewedAt: "2026-10-20",
    checks: {
      name: { confirmed: true, note: "公式トップでSports & Medical fitness スポクリLABOを確認。" },
      address: { confirmed: true, note: "公式アクセス欄に中央区大通東4丁目1-19 大通東やまむらセンタービル3F、バスセンター前駅8番出口直結と記載。" },
      qualifications: { confirmed: true, note: "公式スタッフ紹介に理学療法士のトレーナー3名の案内を確認。毎回の担当者を保証するものではない。" },
      services: { confirmed: true, note: "公式でメディカルフィットネス、カウンセリング、身体機能評価、個別・自主トレーニングを確認。医療機関での検査は提携先・会員区分により別条件。" },
      pricing: { confirmed: true, note: "入会金16,500円、レギュラー月額16,500円、パーソナル月額27,500円、メディカル月額46,200円（各税込）の表記を確認。個別指導回数にはページ内の表記差があるため回数は掲載しない。" },
    },
    sources: [
      { title: "公式サービス・スタッフ・料金・アクセス", url: "https://spocli-labo.jp/" },
      { title: "公式問い合わせ", url: "https://spocli-labo.jp/contact/" },
      { title: "新規会員募集停止（2026-09-15、2026-10-20本文確認）", url: "https://spocli-labo.jp/news/2026/09/15/202/" },
    ],
  },
  "seitai-sakka": {
    reviewedAt: "2026-10-20",
    checks: {
      name: { confirmed: true, note: "公式トップに整体院札佳と記載されています。" },
      address: { confirmed: true, note: "公式トップとスタッフページの住所欄で山の手三条1-3-25 プリエ琴似507を確認しました。" },
      qualifications: { confirmed: true, note: "公式トップの院長紹介に理学療法士と記載されています。他スタッフの資格は異なるため、担当者は予約時にご確認ください。" },
      services: { confirmed: true, note: "公式トップに個室での整体、手技と運動を組み合わせたメニューの案内があります。医療機関でのリハビリと同じとは限りません。" },
      pricing: { confirmed: false, note: "公式トップに2回目以降の整体30分10,000円、新規80分2,980円の表記があります。初回の適用条件・税込総額は今回確定できていません。予約時にご確認ください。" },
    },
    sources: [
      { title: "公式施設・院長・メニュー・所在地", url: "https://seitai-sakka.com/" },
      { title: "公式スタッフページ・住所欄", url: "https://seitai-sakka.com/staff/" },
    ],
  },
  hagukumi: {
    reviewedAt: "2026-10-20",
    checks: {
      name: { confirmed: true, note: "公式施設紹介にココロとカラダの整体院 はぐくみと記載されています。" },
      address: { confirmed: true, note: "公式サイトの所在地欄で札幌市西区西野四条3-1-38を確認しました。" },
      qualifications: { confirmed: true, note: "公式施設紹介に院長が理学療法士の国家資格を保有すると記載されています。資格の関与方法は公式の案内に基づいています。" },
      services: { confirmed: true, note: "公式メニューと施設紹介に予約制の個別ケア・コンディショニングの案内があります。効果や疾患への対応を保証する表現は転載していません。" },
      pricing: { confirmed: false, note: "公式メニューにはベーシックケア7,000円（税込）・初回加算1,000円の案内がありますが、施設紹介に別の金額・所要時間も残っています。最新の料金・時間を直接ご確認ください。" },
    },
    sources: [
      { title: "公式施設紹介・資格・所在地", url: "https://hagukumi2019.com/access/Kokorotokaradanoseitaiin_Hagukumi/" },
      { title: "公式メニュー・料金", url: "https://hagukumi2019.com/menu/" },
    ],
  },
  "kinmaq-teineyamaguchi": {
    reviewedAt: "2026-10-20",
    checks: {
      name: { confirmed: true, note: "公式店舗ページにNext整体KINMAQ イオン手稲山口院と記載されています。" },
      address: { confirmed: true, note: "公式アクセス欄に手稲区明日風6丁目1-1 イオンスーパーセンター手稲山口店内1階と記載されています。" },
      qualifications: { confirmed: true, note: "公式店舗ページのFAQに施術スタッフは理学療法士と記載されています。当日の担当・在籍状況は予約前にご確認ください。" },
      services: { confirmed: true, note: "公式店舗ページで整体、筋膜に着目したケア、姿勢・動きに関する相談の案内を確認しました。改善効果を保証する文言は掲載していません。" },
      pricing: { confirmed: false, note: "初回限定2,980円などの表記を確認しましたが、適用条件や継続時の総額まで確定していないため、限定価格を通常料金として掲載していません。" },
    },
    sources: [
      { title: "公式店舗・スタッフ・FAQ・アクセス・料金案内", url: "https://kinmaq.com/branch/hokkaido/teineyamaguchi/" },
    ],
  },
  "toreriha-club": {
    reviewedAt: "2026-10-20",
    checks: {
      name: { confirmed: true, note: "公式サイトの施設概要にトレリハCLUBと記載されています。" },
      address: { confirmed: true, note: "公式施設概要で手稲区前田5条13丁目3番地1号 トライアル手稲店を確認しました。2階の表記は手稲区社会福祉協議会の地域情報とも照合しました。" },
      qualifications: { confirmed: true, note: "公式プラン本文に理学療法士がメニューを作成する旨の記載があります。現時点のスタッフ在籍や、すべての回を理学療法士が担当することまでは確認できていません。" },
      services: { confirmed: true, note: "公式サイトで個別コンディショニング、グループレッスン、スポーツ向けプランを確認しました。系列の介護保険サービスとは区別しています。" },
      pricing: { confirmed: false, note: "公式プランに月額8,250円＋入会金3,850円、チケット7,150円〜／回の記載を確認しました。プランごとの条件、税込総額は施設へご確認ください。" },
    },
    sources: [
      { title: "公式施設概要・所在地・問い合わせ", url: "https://torerihaclub.net/" },
      { title: "公式サービス・プラン（資格者の関与・料金）", url: "https://torerihaclub.net/serviceplan-members" },
      { title: "札幌市社会福祉協議会の手稲区地域情報（所在地補足）", url: "https://www.sapporo-shakyo.or.jp/files/00007500/00007581/20260312134633.pdf" },
    ],
  },
  amilus: {
    reviewedAt: "2026-10-20",
    checks: {
      name: { confirmed: true, note: "公式施設案内でTraining Studio AMILUSの名称を確認しました。" },
      address: { confirmed: true, note: "公式アクセスに中央区北2条東9丁目90-28 リーサ苗穂駅前1Fと記載されています。" },
      qualifications: { confirmed: true, note: "公式料金ページに理学療法士資格を持つコーチがパーソナルトレーニングを指導すると記載されています。" },
      services: { confirmed: true, note: "公式料金・プランでパーソナルトレーニング、コンディショニング、ランニングコンサルティングを確認しました。" },
      pricing: { confirmed: true, note: "公式料金表に60分チケット1回11,000円（税込）・入会金なしと記載されています。月会員・学割・体験は別条件です。最新の条件をご確認ください。" },
    },
    sources: [
      { title: "公式料金・プラン・資格者の関与", url: "https://amilus-studio.com/plan-price/" },
      { title: "公式施設・アクセス", url: "https://amilus-studio.com/studio-access/" },
    ],
  },
  "physiowellness-maruyama": {
    reviewedAt: "2026-10-20",
    checks: {
      name: { confirmed: true, note: "公式サイトでフィジオウェルネス マルヤマの施設名を確認しました。" },
      address: { confirmed: true, note: "公式所在地欄で中央区南1条西25丁目1-17 Maruyama S1ビル3Fを確認しました。" },
      qualifications: { confirmed: true, note: "公式代表紹介に理学療法士と記載されています。医療機関ではない旨の説明も確認しました。" },
      services: { confirmed: true, note: "公式サービス案内で整体、スポーツフォーム・トレーニング方法の相談、靴の調整・インソール作成を確認しました。" },
      pricing: { confirmed: true, note: "公式料金に整体約60分8,800円、初回検査・評価2,200円（税込）と記載されています。靴関連・学割などは別条件のため、予約時に総額をご確認ください。" },
    },
    sources: [
      { title: "公式代表紹介・所在地", url: "https://physiowellness.jp/about.php" },
      { title: "公式サービス案内", url: "https://physiowellness.jp/seitai.php" },
      { title: "公式料金システム", url: "https://physiowellness.jp/system.php" },
    ],
  },
  priseness: {
    reviewedAt: "2026-10-15",
    checks: {
      name: { confirmed: true, note: "公式サイトに同名の施設案内があります。" },
      address: {
        confirmed: true,
        note: "公式表記は札幌市西区琴似2条3-1-1 チェストオオイビル3階です。元の掲載所在地は琴似までの略記です。",
      },
      qualifications: {
        confirmed: true,
        note: "公式トレーナー紹介に理学療法士の資格が記載されています。実際の担当者は予約時に確認してください。",
      },
      services: {
        confirmed: true,
        note: "個別トレーニングの案内を確認しました。希望する内容への対応は施設へお問い合わせください。",
      },
      pricing: {
        confirmed: true,
        note: "公式料金ページを確認しました。複数の時間・回数・対象別の料金があるため、掲載欄は引き続き公式料金表への案内としています。",
      },
    },
    sources: [
      { title: "施設・トレーナー紹介", url: "https://prizenes.com/" },
      { title: "公式料金", url: "https://prizenes.com/price/" },
    ],
  },
  "we-ing": {
    reviewedAt: "2026-10-15",
    checks: {
      name: { confirmed: true, note: "公式会社概要で社名を確認しました。" },
      address: {
        confirmed: true,
        note: "公式サイトに札幌市北区北七条西4丁目1-1の表記があります。訪問先とは異なるため来訪可否は事前に確認してください。",
      },
      qualifications: {
        confirmed: true,
        note: "代表者の保有資格として理学療法士の記載を確認しました。",
      },
      services: {
        confirmed: true,
        note: "訪問・オンライン、企業向け健康支援の案内を確認しました。個別の対応範囲は施設へ確認してください。",
      },
      pricing: {
        confirmed: false,
        note: "今回確認した会社概要ではサービスごとの料金総額を確認できませんでした。見積もりをご確認ください。",
      },
    },
    sources: [
      { title: "公式会社概要・サービス案内", url: "https://we-ing.biz/about/" },
    ],
  },
  phact: {
    reviewedAt: "2026-10-15",
    checks: {
      name: {
        confirmed: true,
        note: "公式サイトでPhact（ふぁくと）の施設名を確認しました。",
      },
      address: {
        confirmed: true,
        note: "公式アクセスページで北7条西2丁目6番 37山京ビル917を確認しました。",
      },
      qualifications: {
        confirmed: true,
        note: "公式コンセプトページの代表プロフィールに理学療法士と記載されています。",
      },
      services: {
        confirmed: true,
        note: "公式サービス案内で身体のケア等のメニューを確認しました。個別の対応は事前にご相談ください。",
      },
      pricing: {
        confirmed: true,
        note: "公式料金表の画像で60分8,800円・80分12,000円（税込）の記載を確認しました。条件・最新料金は施設へ確認してください。",
      },
    },
    sources: [
      { title: "公式施設案内", url: "https://www.in-phact.com/" },
      {
        title: "公式プロフィール",
        url: "https://www.in-phact.com/コンセプト/",
      },
      { title: "公式料金表", url: "https://www.in-phact.com/サービス-料金/" },
      { title: "公式アクセス", url: "https://www.in-phact.com/アクセス/" },
    ],
  },
  coability: {
    reviewedAt: "2026-10-15",
    checks: {
      name: {
        confirmed: true,
        note: "公式サイトにConditioning Gym CoAbilityの表記があります。",
      },
      address: {
        confirmed: false,
        note: "今回取得できた公式ページ本文では、掲載住所の番地を照合できませんでした。来訪前にご確認ください。",
      },
      qualifications: {
        confirmed: true,
        note: "公式の院長紹介に理学療法士の保有資格が記載されています。",
      },
      services: {
        confirmed: true,
        note: "現在の公式案内にはパーソナル施術が記載されています。運動指導の希望内容・対応範囲は個別に確認してください。",
      },
      pricing: {
        confirmed: true,
        note: "公式本文でパーソナル施術50分8,000円・30分6,000円を確認しました。税込表示か・追加料金の有無はご確認ください。",
      },
    },
    sources: [
      { title: "公式施設・資格・メニュー案内", url: "https://coability.net/" },
    ],
  },
  "boost-care": {
    reviewedAt: "2026-10-15",
    checks: {
      name: {
        confirmed: true,
        note: "公式ドメインの記事の検索表示でBoost Care（ブーストケア）の施設名を確認しました。",
      },
      address: {
        confirmed: false,
        note: "検索表示には南平岸の所在地がありますが、今回公式本文を直接取得できず、最新住所の全面照合は未完了です。",
      },
      qualifications: {
        confirmed: false,
        note: "公式ドメインの記事の検索表示に運動器認定理学療法士の表記があります。最新の担当体制は直接確認できていません。",
      },
      services: {
        confirmed: false,
        note: "今回の公式ページ取得ができず、現在のメニュー構成の全面照合は未完了です。",
      },
      pricing: {
        confirmed: false,
        note: "最新の公式料金を取得できませんでした。数値を推測せず、公式窓口への確認をご案内します。",
      },
    },
    sources: [
      {
        title: "公式サイト（取得できない場合があります）",
        url: "https://boost-care.com/",
      },
      {
        title: "照合を試みた公式記事",
        url: "https://boost-care.com/lower-back-pain/5190/",
      },
    ],
  },
  physioroom: {
    reviewedAt: "2026-10-15",
    checks: {
      name: {
        confirmed: false,
        note: "既存の公式Instagramを取得できず、最新の施設名表記を再確認できませんでした。",
      },
      address: {
        confirmed: false,
        note: "最新の所在地は再確認できていません。来訪前に公式窓口へご確認ください。",
      },
      qualifications: {
        confirmed: false,
        note: "現在の資格・在籍・担当体制は再確認できていません。掲載時の情報と区別してご覧ください。",
      },
      services: {
        confirmed: false,
        note: "現在のサービス内容や利用条件は再確認できていません。",
      },
      pricing: {
        confirmed: false,
        note: "現在の公式料金を取得できず、数値の追記は行っていません。",
      },
    },
    sources: [
      {
        title: "掲載時の公式Instagram（取得できない場合があります）",
        url: "https://www.instagram.com/physioroom_sapporo/",
      },
    ],
  },
  robocare: {
    reviewedAt: "2026-10-15",
    checks: {
      name: {
        confirmed: true,
        note: "公式拠点案内で札幌ロボケアセンターの表記を確認しました。",
      },
      address: {
        confirmed: true,
        note: "公式拠点案内で西区西野九条8-14-5を確認しました。",
      },
      qualifications: {
        confirmed: true,
        note: "公式スタッフ紹介に理学療法士・作業療法士・言語聴覚士の表記があります。掲載時の資格欄は未記入のまま保持しています。担当者・在籍状況は直接ご確認ください。",
      },
      services: {
        confirmed: true,
        note: "HALを用いたトレーニングと訪問プランの案内を確認しました。対象・対応条件は施設へご確認ください。",
      },
      pricing: {
        confirmed: true,
        note: "公式料金表でトライアル16,500円・60分16,500円（税込）の記載を確認しました。利用条件は直接ご確認ください。",
      },
    },
    sources: [
      {
        title: "公式拠点・スタッフ・料金案内",
        url: "https://robocare.jp/neuro-halfit-price/sapporo/",
      },
    ],
  },
};
