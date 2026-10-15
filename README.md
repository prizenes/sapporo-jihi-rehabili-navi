# 札幌 自費リハビリナビ（リデザイン版）

理学療法士・作業療法士・言語聴覚士など身体の専門職が関わる、札幌市内の
自費リハビリ・整体・ピラティス・ジム・運動支援施設を探せる地域ポータルサイトです。

Next.js 14（App Router）+ TypeScript + Tailwind CSS

## セットアップ

`npm install` のあと、開発時は `npm run dev`、公開前の確認は `npm run build` を実行します。

## アクセス解析

GA4は全ページ共通の `app/layout.tsx` で読み込みます。VercelのProduction環境変数に
`NEXT_PUBLIC_GA_ID=G-HB1Z9BRRJ3` を設定し、変更後は再デプロイしてください。
未設定の場合も、このサイトの測定IDを使用します。開発・Vercel PreviewではGA4を読み込みません。
Vercel AnalyticsはGA4とは別の計測サービスで、引き続き有効です。

公式サイトボタンは `facility_website_click` を送信します。`facility_id` と `link_location`
（`facility_list` / `facility_detail`）で施設・設置場所を区別できます。
GA4でこれらのパラメータを集計軸に使う場合は、管理画面のカスタム定義でイベントスコープのディメンションとして登録してください。
一般の外部リンクの自動計測 `click` とは別のイベントです。双方を合算して同一クリックを二重に数えないでください。

公開後、自分のスマートフォンでサイトを開き、GA4の「リアルタイム」で訪問が表示されるか確認します。
ページ移動の計測には、GA4の拡張計測機能でブラウザの履歴変更に基づくページビューを有効にしてください。
広告ブロッカーなどによって計測されないことがあります。修正前の未計測データは復元できません。

## Google検索への登録

Search Consoleで `https://sapporo-jihi-rehabili-navi.vercel.app/` のプロパティを選択します。
「URL検査」でトップページを検査し、未登録であれば「インデックス登録をリクエスト」します。
「サイトマップ」に `https://sapporo-jihi-rehabili-navi.vercel.app/sitemap.xml` を送信してください。
既存の所有権確認ファイル `public/google7c5e558402d1d832.html` は削除しないでください。
検索登録や順位上昇は保証されません。「検索パフォーマンス」で表示回数とクリック数を確認します。
サイトマップは `app/sitemap.ts` が記事・新着情報・公開施設のデータから自動生成します。

## 読みもの・新着情報の更新

- 読みものは `data/articles.ts` の `ARTICLES` に追加します。URLは `/blog/slug` です。
- `slug` は公開後に変更しないでください。タイトル、説明文、カテゴリ、公開日・更新日、要点、本文、質問と回答、参考情報を編集できます。
- 本文は `sections` に段落・チェックリスト・比較表として登録します。画像は `public/images/` に置きます。
- 新着情報は `data/news.ts` に追加します。URLは `/news/slug` です。実際の公開・更新に関するお知らせのみ追加してください。
- 施設の元データは引き続き `data/facilities.ts` です。`isPublic: true` の施設だけが一覧・詳細ページ・サイトマップに含まれます。
- 公式情報の照合結果は `data/facility-verification.ts` です。元データの確認日と照合日を区別し、取得できなかった情報は未確認のまま記録します。
- よくある質問は `data/faq.ts`、運営者・編集方針は `app/about/page.tsx` です。

公開日は実際の公開日を、更新日は本文を変更した日を記録します。今回の記事・新着情報の初回公開日は2026年10月15日です。
料金相場・臨床効果・専門家の監修・取材の実績を、根拠なく追記しないでください。
施設の料金等は掲載時の情報で、詳細ページに確認日を明記しています。新しいページを作ることと情報の再確認は別です。

## SEO・回答の見つけやすさ

各ページに固有のtitle・description・canonical・OGPを設定しています。記事には本文と一致するBlogPosting、
各詳細ページにはパンくずの構造化データを追加しています。FAQリッチリザルトやAI回答への採用は保証しません。
質問への回答・比較表・参考情報・運営者を読者が確認できる構成です。
`llms.txt` や特殊なAI専用タグによる順位上昇は前提にしていません。

公開後はSearch Consoleで `/blog` と記事URLを検査し、サイトマップの読み込み状態を確認します。
GA4のページ別表示数と、Search Consoleの検索語・表示回数・クリック数を月単位で比較してください。
表示回数があるのにクリックされない記事はタイトルと説明文、読まれても施設検索につながらない記事は内容と関連リンクを見直します。

## 画像

記事用イメージ写真はUnsplash配信の以下の写真を取得しています。実在の掲載施設や札幌の現地写真ではありません。

- `training.jpg`: https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b
- `planning-notes.jpg`: https://images.unsplash.com/photo-1434030216411-0b793f4b4173
- `movement.jpg`: https://images.unsplash.com/photo-1518611012118-696072aa579a

元配信URLは `https://images.unsplash.com/` に上記IDを付けたものです。施設写真に置き換える場合は、掲載許可を確認してから差し替えてください。

## 検索改善・検証

2026年10月15日の差分と資料照合は `docs/search-improvement-2026-10-15.md` に記載しています。
`node scripts/verify-site.cjs http://localhost:3012` でローカルを、公開URLを引数に指定すると本番のGA4送信も確認できます。
この検証スクリプトにはPlaywrightとブラウザが必要です。`PLAYWRIGHT_MODULE`、`PLAYWRIGHT_CHANNEL` で既存の実行環境を指定できます。

