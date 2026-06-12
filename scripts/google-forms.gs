/**
 * 札幌 自費リハビリナビ Googleフォーム自動作成スクリプト
 *
 * 実行手順:
 * 1. Google Driveで「新規」→「その他」→「Google Apps Script」を開く
 * 2. このファイルのコードを Apps Script エディタに貼り付ける
 * 3. 関数プルダウンで createSapporoRehabNaviForms を選択する
 * 4. 「実行」を押し、初回のみGoogleアカウントの権限を許可する
 * 5. 実行ログに出る「編集URL」「回答用URL」を控える
 *
 * 作成されるもの:
 * - 無料掲載申込フォーム
 * - 掲載情報の修正・削除依頼フォーム
 * - 各フォームの回答保存用Googleスプレッドシート
 */

const WARDS = [
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
  "札幌市外・近郊",
];

const CONFIRMATION_MESSAGE =
  "ご連絡ありがとうございます。\n" +
  "内容を確認のうえ、必要に応じてご連絡いたします。\n" +
  "掲載可否や掲載内容の反映にはお時間をいただく場合があります。";

function createSapporoRehabNaviForms() {
  const listingForm = createListingApplicationForm();
  const updateForm = createUpdateOrRemovalRequestForm();

  logFormUrls("無料掲載申込フォーム", listingForm);
  logFormUrls("掲載情報の修正・削除依頼フォーム", updateForm);
}

function createListingApplicationForm() {
  const form = FormApp.create("札幌 自費リハビリナビ｜無料掲載申込フォーム");

  form
    .setDescription(
      "札幌 自費リハビリナビでは、理学療法士・作業療法士・言語聴覚士など身体の専門職が関わる、自費リハビリ・整体・ピラティス・ジム・運動支援施設の無料掲載を受け付けています。\n\n" +
        "ご入力いただいた内容を確認のうえ、掲載可否や掲載内容についてご連絡いたします。\n" +
        "掲載内容は、医療広告や誇大広告とならないよう、必要に応じて表現を調整させていただく場合があります。"
    )
    .setConfirmationMessage(CONFIRMATION_MESSAGE)
    .setCollectEmail(false)
    .setAllowResponseEdits(false)
    .setLimitOneResponsePerUser(false)
    .setProgressBar(true);

  addTextItem(form, "施設名", true);
  addTextItem(form, "運営会社名・屋号", false);
  addTextItem(form, "担当者名", true);
  addEmailItem(form, "連絡先メールアドレス", true);
  addTextItem(form, "電話番号", false);
  addUrlItem(form, "公式サイトURL", true);
  addTextItem(form, "施設所在地", true);
  addListItem(form, "札幌市の区", WARDS, true);
  addCheckboxItem(
    form,
    "対応エリア",
    WARDS.concat(["オンライン対応", "訪問対応"]),
    false
  );
  addCheckboxItem(
    form,
    "施設カテゴリ",
    [
      "自費リハビリ",
      "整体・コンディショニング",
      "ピラティス",
      "ヨガ",
      "パーソナルジム",
      "メディカルフィットネス",
      "訪問型運動支援",
      "スポーツコンディショニング",
      "健康経営サポート",
      "その他",
    ],
    true
  );
  addCheckboxItem(
    form,
    "在籍・関与している資格",
    [
      "理学療法士",
      "作業療法士",
      "言語聴覚士",
      "看護師",
      "柔道整復師",
      "鍼灸師",
      "健康運動指導士",
      "アスレティックトレーナー",
      "その他",
    ],
    true
  );
  addMultipleChoiceItem(
    form,
    "資格者の関わり方",
    [
      "代表者が国家資格者",
      "常勤スタッフとして在籍",
      "非常勤スタッフとして在籍",
      "サービスを監修している",
      "外部連携している",
      "その他",
    ],
    true
  );
  addCheckboxItem(
    form,
    "主な対象",
    [
      "病院リハビリ後の運動継続",
      "脳卒中後の自費リハビリ",
      "高齢者の転倒予防",
      "フレイル予防",
      "膝の不安",
      "腰の不安",
      "股関節の不安",
      "姿勢改善",
      "スポーツ・ランニング",
      "産後ケア",
      "生活動作の改善支援",
      "企業向け健康支援",
      "その他",
    ],
    true
  );
  addParagraphItem(form, "サービス内容", true);
  addTextItem(form, "料金目安", true);
  addMultipleChoiceItem(form, "訪問対応", ["あり", "なし", "要相談"], true);
  addMultipleChoiceItem(
    form,
    "オンライン対応",
    ["あり", "なし", "要相談"],
    true
  );
  addUrlItem(form, "予約・問い合わせURL", false);
  addParagraphItem(form, "掲載用の紹介文", false);
  addMultipleChoiceItem(
    form,
    "掲載画像の提供可否",
    ["提供可能", "提供不可", "相談したい"],
    false
  );
  addRequiredConfirmationCheckboxItem(form, "掲載に関する確認事項", [
    "掲載内容に虚偽がないことを確認しました。",
    "掲載内容について、必要に応じて確認の連絡を受けることに同意します。",
    "「必ず改善」「完治」「地域No.1」などの誇大表現は使用しません。",
    "医療機関の診断・治療の代替と誤解される表現は使用しません。",
    "掲載内容の表現が必要に応じて調整されることに同意します。",
  ]);

  attachResponseSpreadsheet(
    form,
    "札幌 自費リハビリナビ｜無料掲載申込フォーム 回答"
  );

  return form;
}

function createUpdateOrRemovalRequestForm() {
  const form = FormApp.create(
    "札幌 自費リハビリナビ｜掲載情報の修正・削除依頼フォーム"
  );

  form
    .setDescription(
      "掲載中の施設情報について、修正・削除をご希望の場合はこちらからご連絡ください。\n" +
        "内容を確認のうえ、必要に応じて掲載情報を修正または削除いたします。"
    )
    .setConfirmationMessage(CONFIRMATION_MESSAGE)
    .setCollectEmail(false)
    .setAllowResponseEdits(false)
    .setLimitOneResponsePerUser(false)
    .setProgressBar(true);

  addTextItem(form, "施設名", true);
  addTextItem(form, "ご担当者名", true);
  addEmailItem(form, "連絡先メールアドレス", true);
  addMultipleChoiceItem(
    form,
    "ご依頼内容",
    [
      "掲載内容を修正したい",
      "掲載を削除したい",
      "掲載内容について問い合わせたい",
      "無料掲載を申し込みたい",
      "その他",
    ],
    true
  );
  addParagraphItem(form, "修正したい内容", false);
  addParagraphItem(form, "削除を希望する理由", false);
  addUrlItem(form, "公式サイトURL", false);
  addRequiredConfirmationCheckboxItem(form, "確認事項", [
    "施設関係者または掲載内容を確認できる立場として連絡しています。",
    "内容確認のため、必要に応じて連絡を受けることに同意します。",
  ]);

  attachResponseSpreadsheet(
    form,
    "札幌 自費リハビリナビ｜掲載情報の修正・削除依頼フォーム 回答"
  );

  return form;
}

function addTextItem(form, title, required) {
  form.addTextItem().setTitle(title).setRequired(required);
}

function addEmailItem(form, title, required) {
  const validation = FormApp.createTextValidation()
    .requireTextIsEmail()
    .setHelpText("メールアドレスの形式で入力してください。")
    .build();

  form
    .addTextItem()
    .setTitle(title)
    .setRequired(required)
    .setValidation(validation);
}

function addUrlItem(form, title, required) {
  const item = form.addTextItem().setTitle(title).setRequired(required);

  if (required) {
    const validation = FormApp.createTextValidation()
      .requireTextIsUrl()
      .setHelpText("URLの形式で入力してください。")
      .build();
    item.setValidation(validation);
  }
}

function addParagraphItem(form, title, required) {
  form.addParagraphTextItem().setTitle(title).setRequired(required);
}

function addListItem(form, title, choices, required) {
  form.addListItem().setTitle(title).setChoiceValues(choices).setRequired(required);
}

function addCheckboxItem(form, title, choices, required) {
  form
    .addCheckboxItem()
    .setTitle(title)
    .setChoiceValues(choices)
    .setRequired(required);
}

function addMultipleChoiceItem(form, title, choices, required) {
  form
    .addMultipleChoiceItem()
    .setTitle(title)
    .setChoiceValues(choices)
    .setRequired(required);
}

function addRequiredConfirmationCheckboxItem(form, title, choices) {
  const validation = FormApp.createCheckboxValidation()
    .requireSelectExactly(choices.length)
    .setHelpText("すべての項目にチェックしてください。")
    .build();

  form
    .addCheckboxItem()
    .setTitle(title)
    .setChoiceValues(choices)
    .setRequired(true)
    .setValidation(validation);
}

function attachResponseSpreadsheet(form, spreadsheetName) {
  const spreadsheet = SpreadsheetApp.create(spreadsheetName);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
  Logger.log("回答スプレッドシート: " + spreadsheet.getUrl());
}

function logFormUrls(label, form) {
  Logger.log("==== " + label + " ====");
  Logger.log("編集URL: " + form.getEditUrl());
  Logger.log("回答用URL: " + form.getPublishedUrl());
}
