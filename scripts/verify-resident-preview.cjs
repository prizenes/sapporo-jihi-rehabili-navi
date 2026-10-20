const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.argv[2] || "http://localhost:3020";
if (!/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(base))
  throw Error("Preview tests must only run against localhost.");
function readData(file) {
  const m = { exports: {} };
  new Function(
    "module",
    "exports",
    ts.transpile(fs.readFileSync(file, "utf8"), {
      module: ts.ModuleKind.CommonJS,
    }),
  )(m, m.exports);
  return m.exports;
}
const { FACILITIES } = readData("data/facilities.ts");
const { PURPOSE_ENTRIES, FACILITY_GUIDES } = readData("data/facility-guide.ts");
const facilities = FACILITIES.filter((f) => f.isPublic);
async function main() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext();
  await context.route("**/*.google-analytics.com/**", (route) => route.abort());
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  fs.mkdirSync("outputs/resident-preview-20261020", { recursive: true });
  async function checkResults(expected) {
    await page.waitForFunction(
      (count) =>
        document.querySelectorAll("#facilities article").length === count,
      expected.length,
    );
    const links = await page
      .locator("#facilities h3 a")
      .evaluateAll((nodes) => nodes.map((n) => new URL(n.href).pathname));
    assert.deepEqual(
      links.sort(),
      expected.map((f) => `/facilities/${f.id}`).sort(),
    );
  }
  try {
    for (const width of [320, 390, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base, { waitUntil: "networkidle" });
      await page.screenshot({
        path: `outputs/resident-preview-20261020/home-${width}.png`,
      });
      await page
        .locator("#purpose")
        .screenshot({
          path: `outputs/resident-preview-20261020/purpose-${width}.png`,
        });
      assert.equal(
        await page
          .locator("h1")
          .innerText()
          .then((t) => t.replace(/\s/g, "")),
        "札幌で、あなたに合うリハビリ・運動施設を。",
      );
      assert.equal(
        await page.locator("#purpose button[aria-pressed]").count(),
        6,
      );
      for (const entry of [
        ...PURPOSE_ENTRIES,
        { id: "stroke", title: "脳卒中後の自費リハビリ" },
        { id: "visit", title: "訪問でのサポートを探す" },
      ]) {
        await page
          .getByRole("button", { name: "条件をリセット", exact: true })
          .click();
        await page
          .locator("#purpose button")
          .filter({ hasText: entry.title })
          .click();
        await checkResults(
          facilities.filter((f) => f.purposes.includes(entry.id)),
        );
        assert((await page.getByLabel("選択中の条件").innerText()).length > 0);
        await page.waitForFunction(() => document.activeElement?.id === "results-heading");
      }
      await page
        .getByRole("button", { name: "条件をリセット", exact: true })
        .click();
      await checkResults(facilities);
      await page
        .locator("#facilities article")
        .first()
        .screenshot({
          path: `outputs/resident-preview-20261020/card-${width}.png`,
        });
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `home ${width}`,
      );
      for (const f of facilities) {
        await page.goto(base + `/facilities/${f.id}`);
        const text = await page.locator("main").innerText();
        assert(!text.includes("公式情報の照合"), f.id);
        assert(!text.includes("掲載時のデータ"), f.id);
        const sections = await page
          .locator("article > section > h2")
          .allTextContents();
        assert.deepEqual(sections, [
          "こんな方におすすめ",
          "受けられるサービス",
          "指導・サポート体制",
          "料金・体験案内",
          "アクセス・通いやすさ",
          "公式サイト・お問い合わせ",
        ]);
        const guide = FACILITY_GUIDES[f.id];
        if (!guide.staffQualifications.length)
          assert(!text.includes("スタッフの保有資格"), f.id);
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth,
          ),
          false,
          `${f.id} ${width}`,
        );
        const json = await page
          .locator('script[type="application/ld+json"]')
          .allTextContents();
        const web = json
          .map((x) => JSON.parse(x))
          .find((x) => x["@type"] === "WebPage");
        assert.equal(web.about.address, f.address);
        assert.equal(
          await page.locator('link[rel="canonical"]').getAttribute("href"),
          "https://sapporo-jihi-rehabili-navi.vercel.app/facilities/" + f.id,
        );
      }
      // Exercise the visible card -> detail -> official website path.
      await page.goto(base);
      await page
        .locator("#purpose button")
        .filter({ hasText: "体力・筋力をつけたい" })
        .click();
      const card = page
        .locator("#facilities article")
        .filter({ has: page.locator('h3 a[href="/facilities/amilus"]') });
      await card
        .getByRole("link", { name: "特徴・料金を見る", exact: true })
        .click();
      await page.waitForURL("**/facilities/amilus");
      const official = page.locator('a[data-link-location="facility_detail"]');
      assert.equal(
        await official.getAttribute("href"),
        "https://amilus-studio.com/",
      );
      await context.route("https://amilus-studio.com/", (route) =>
        route.fulfill({
          status: 200,
          contentType: "text/html",
          body: "External-link test endpoint",
        }),
      );
      const popupPromise = page.waitForEvent("popup");
      await official.click();
      const popup = await popupPromise;
      await popup.waitForURL("https://amilus-studio.com/");
      await popup.close();
      await page.screenshot({
        path: `outputs/resident-preview-20261020/detail-${width}.png`,
      });
      console.log(
        `PASS viewport ${width}: 8 purpose paths, ${facilities.length} detail pages and official link`,
      );
    }
    await page.goto(base);
    await page.getByLabel("カテゴリ", { exact: true }).selectOption("medical-fitness");
    await checkResults(facilities.filter(f => f.categories.includes("medical-fitness")));
    assert.equal(await page.locator('#facilities h3 a[href="/facilities/spocli-labo"]').count(), 1);
    await page.getByRole("button", { name: "条件をリセット", exact: true }).click();
    await page.getByLabel("エリア", { exact: true }).selectOption("手稲区");
    await page.getByLabel("ご利用方法", { exact: true }).selectOption("店舗型");
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(
      await page.getByLabel("エリア", { exact: true }).inputValue(),
      "手稲区",
    );
    assert.equal(
      await page.getByLabel("ご利用方法", { exact: true }).inputValue(),
      "店舗型",
    );
    await checkResults(
      facilities.filter(
        (f) => f.ward === "手稲区" && f.serviceTypes.includes("店舗型"),
      ),
    );
    await page
      .getByRole("button", { name: "条件をリセット", exact: true })
      .click();
    await page
      .getByText("目的・スタッフの保有資格でさらに絞る", { exact: true })
      .click();
    await page
      .getByLabel("スタッフの保有資格", { exact: true })
      .selectOption("理学療法士");
    await checkResults(
      facilities.filter((f) =>
        FACILITY_GUIDES[f.id].staffQualifications.includes("理学療法士"),
      ),
    );
    assert.equal(
      await page
        .locator('#facilities h3 a[href="/facilities/toreriha-club"]')
        .count(),
      0,
    );
    assert.equal(
      await page.locator('#facilities h3 a[href="/facilities/we-ing"]').count(),
      0,
    );
    await page
      .getByRole("button", {
        name: "スタッフ：理学療法士の条件を解除",
        exact: true,
      })
      .click();
    await checkResults(facilities);
    assert.equal(new URL(page.url()).searchParams.has("qualification"), false);
    assert.deepEqual(errors, []);
    console.log(
      "PASS: shared filter state, URL restoration, role-aware staff qualifications, individual reset, JSON-LD and no browser errors.",
    );
  } finally {
    await browser.close();
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
