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

公開後、自分のスマートフォンでサイトを開き、GA4の「リアルタイム」で訪問が表示されるか確認します。
ページ移動の計測には、GA4の拡張計測機能でブラウザの履歴変更に基づくページビューを有効にしてください。
広告ブロッカーなどによって計測されないことがあります。修正前の未計測データは復元できません。

## Google検索への登録

Search Consoleで `https://sapporo-jihi-rehabili-navi.vercel.app/` のプロパティを選択します。
「URL検査」でトップページを検査し、未登録であれば「インデックス登録をリクエスト」します。
「サイトマップ」に `https://sapporo-jihi-rehabili-navi.vercel.app/sitemap.xml` を送信してください。
検索登録や順位上昇は保証されません。「検索パフォーマンス」で表示回数とクリック数を確認します。
ページ追加時は `app/sitemap.xml` に実在する公開ページのURLを追加します。

