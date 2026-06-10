# 札幌 自費リハビリナビ

札幌市内で、理学療法士・作業療法士・言語聴覚士など身体の専門職が関わる自費リハビリ・運動支援施設を探せる無料掲載サイトです。

病院リハビリ後の運動継続、脳卒中後の自費リハビリ、転倒予防、膝痛・腰痛の運動指導など、地域の方が目的やエリアから相談先を探しやすくすることを目的にしています。

## 構成

- `app/page.tsx`: トップページ
- `components/RehabFacilitySearch.tsx`: 施設検索・絞り込みUI
- `data/facilities.ts`: 施設データ、目的、区、掲載ステータス
- `lib/rehab-directory.ts`: サイト名、title、description
- `app/sitemap.ts`: sitemap
- `app/robots.ts`: robots

## 施設データの編集方法

施設情報は `data/facilities.ts` の `facilities` 配列で管理します。

各施設は次の項目を持ちます。

```ts
{
  name: "施設名",
  ward: "西区",
  address: "所在地",
  qualifications: ["理学療法士"],
  targets: ["高齢者", "腰痛"],
  purposes: ["after-hospital", "joint"],
  types: ["店舗型"],
  price: "料金目安",
  feature: "特徴文",
  officialUrl: "https://example.com/",
  contactUrl: "https://example.com/contact/",
  status: "official",
  verifiedAt: "2026-06-10",
  note: "掲載メモ"
}
```

## 新しい施設の追加方法

1. `data/facilities.ts` の `facilities` 配列末尾に施設オブジェクトを追加します。
2. `ward` は `wards` にある札幌市の区名から選びます。
3. `purposes` は `purposes` にあるIDを指定します。
4. 正式な掲載同意と内容確認が済むまでは、`status` を `candidate` または `checking` にします。
5. プライズネス以外を `official` にする場合は、掲載同意、料金、所在地、資格者情報、問い合わせ先を確認してから変更します。

掲載ステータス:

- `official`: 正式掲載
- `candidate`: 掲載準備中（掲載候補）
- `checking`: 情報確認中（要確認）

## 掲載申込フォーム案

現在の「無料掲載を申し込む」ボタンは仮リンクです。Googleフォーム公開後、`app/page.tsx` の `href="#"` をフォームURLへ差し替えてください。

Googleフォーム項目案:

- 施設名
- 所在地
- 対応エリア
- 公式サイトURL
- 問い合わせ先
- 在籍資格
- 資格者氏名または責任者名
- 主な対象
- サービス内容
- 料金
- 訪問対応の有無
- オンライン対応の有無
- 掲載写真の有無
- 掲載希望文
- 誇大広告を行っていないことへの確認
- 掲載内容確認への同意

## Vercelへのデプロイ方法

1. GitHubにこのプロジェクト用リポジトリを作成します。
2. このプロジェクトをpushします。
3. Vercelで `Add New...` から `Project` を選びます。
4. GitHubリポジトリをImportします。
5. Framework Presetは `Next.js` を選びます。
6. Build Commandは `next build`、Output Directoryは `.next` のままで問題ありません。
7. 独自ドメインを使う場合は、`lib/site.ts` と `app/layout.tsx` のURLを本番ドメインに変更します。

## Google Analytics設定

GA4の測定タグは全ページ共通の `components/SiteAnalytics.tsx` で読み込みます。

VercelのProject Settingsから、Production環境に次の環境変数を追加してください。

```txt
NEXT_PUBLIC_GA_ID=G-HB1Z9BRRJ3
```

現在の測定対象:

- サイト名: 札幌自費リハビリナビ
- ストリームURL: `https://sapporo-jihi-rehabili-navi.vercel.app/`
- 測定ID: `G-HB1Z9BRRJ3`

計測は本番環境のみで有効になります。ローカル開発環境やVercel PreviewではGA4タグを出さない設定です。

## ローカル確認

```bash
npm install
npm run dev
```

`http://localhost:3000` を開いて確認します。

## 注意すべき表現

医療広告や誤解を避けるため、次の表現は使わないでください。

- 治療します
- 診断します
- 必ず改善します
- 完治します
- 医師の代わりに判断します
- 地域No.1
- 絶対に良くなる

代わりに使いやすい表現:

- 運動支援
- 身体機能の維持・改善を支援
- 病院リハビリ後の運動継続
- 転倒予防
- 生活動作の改善を支援
- 医療保険・介護保険外の自費サービス
- 身体の専門職が関わる施設

## 公開前チェック

- スマホ表示が崩れていないか
- 施設カードが見やすいか
- エリア、目的、資格、サービス種別のフィルターが動作するか
- プライズネス以外が `official` になっていないか
- 避けるべき表現が残っていないか
- GoogleフォームURLが仮リンクのまま公開されていないか
- Vercelでビルドエラーが出ないか

## 今後の拡張案

- 施設詳細ページ
- 掲載申込フォーム
- ブログ記事
- SEO記事
- 有料掲載プラン
- インタビュー記事
- Google Analytics
- Search Console
- OGP画像
