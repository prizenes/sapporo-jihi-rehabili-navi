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
