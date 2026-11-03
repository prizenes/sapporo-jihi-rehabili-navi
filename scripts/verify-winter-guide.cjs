const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = (process.argv[2] || "http://localhost:3033").replace(/\/$/, "");
const origin = "https://sapporo-jihi-rehabili-navi.vercel.app";
const articlePath = "/blog/sapporo-winter-access";
const newsPath = "/news/winter-access-predeparture-guide-updated";
const sources = ["https://www.city.sapporo.jp/kensetsu/yuki/", "https://www.city.sapporo.jp/kensetsu/yuki/josetsu_info.html", "https://www4.city.sapporo.jp/cgi-bin/kensetsu/yuki/jyosetsu.cgi", "https://www.city.sapporo.jp/st/"];
async function main() {
  const browser = await chromium.launch({channel: "msedge", headless: true});
  const context = await browser.newContext();
  // These checks are test visits, not organic traffic.
  await context.route("**/*.google-analytics.com/**", r => r.abort());
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", e => errors.push(e.message));
  fs.mkdirSync(".next/qa-winter-guide", {recursive: true});
  try {
    await page.goto(base + "/blog", {waitUntil: "networkidle"});
    assert.equal(await page.locator(`main a[href="${articlePath}"]`).count(), 1);
    await page.locator(`main a[href="${articlePath}"]`).click();
    await page.waitForURL(base + articlePath);
    for (const width of [320, 390, 1280]) {
      await page.setViewportSize({width, height: 900});
      await page.goto(base + articlePath, {waitUntil: "networkidle"});
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("h1").innerText(), "札幌で冬も通いやすい運動支援施設を探すには？アクセス確認リスト");
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), origin + articlePath);
      assert((await page.locator('meta[name="description"]').getAttribute("content")).includes("出発前"));
      assert.equal(await page.locator('article header time[datetime="2026-10-15"]').count(), 1);
      assert.equal(await page.locator('article header time[datetime="2026-11-03"]').count(), 1);
      assert.equal(await page.locator("article > section[id]").count(), 7);
      assert.equal(await page.locator("article dl dt").count(), 4);
      assert.equal(await page.locator("#family-plan table tbody tr").count(), 5);
      for (const id of ["route", "entrance", "weather", "options", "before-departure", "family-plan", "checked-information"]) assert.equal(await page.locator(`article [id="${id}"]`).count(), 1);
      assert((await page.locator("#before-departure").innerText()).includes("昨年度の表示を当日の情報として使わない"));
      for (const source of sources) assert.equal(await page.locator(`article a[href="${source}"]`).count(), 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow at ${width}`);
      assert(await page.locator("main > article img").evaluateAll(images => images.length > 0 && images.every(i => i.complete && i.naturalWidth > 0)));
      const posting = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(JSON.parse).find(x => x["@type"] === "BlogPosting");
      assert.equal(posting.datePublished, "2026-10-15T09:00:00+09:00");
      assert.equal(posting.dateModified, "2026-11-03T09:00:00+09:00");
      assert.equal(posting.mainEntityOfPage, origin + articlePath);
      await page.screenshot({path: `.next/qa-winter-guide/article-${width}.png`});
      await page.locator("#family-plan").screenshot({path: `.next/qa-winter-guide/family-plan-${width}.png`});
    }
    for (const path of await page.locator('main a[href^="/"]').evaluateAll(a => [...new Set(a.map(x => new URL(x.href).pathname))])) assert.equal((await context.request.get(base + path)).status(), 200, path);
    await page.getByRole("link", {name: "掲載施設を探す", exact: true}).click();
    await page.waitForURL(base + "/#search");
    await page.getByLabel("エリア", {exact: true}).selectOption("西区");
    await page.waitForFunction(() => document.querySelectorAll("#facilities article").length > 0);
    for (const text of await page.locator("#facilities article").allTextContents()) assert(text.includes("西区"));
    await page.goto(base + "/news");
    assert.equal(await page.locator(`main a[href="${newsPath}"]`).count(), 1);
    await page.locator(`main a[href="${newsPath}"]`).click();
    await page.locator(`main article a[href="${articlePath}"]`).click();
    await page.waitForURL(base + articlePath);
    const sitemap = await (await context.request.get(base + "/sitemap.xml")).text();
    const xml = await page.evaluate(s => { const d = new DOMParser().parseFromString(s, "application/xml"); return [...d.getElementsByTagName("url")].map(n => ({url: n.querySelector("loc")?.textContent, date: n.querySelector("lastmod")?.textContent})); }, sitemap);
    assert.equal(xml.filter(x => x.url === origin + articlePath).length, 1);
    assert.equal(xml.find(x => x.url === origin + articlePath).date, "2026-11-03T09:00:00+09:00");
    assert.equal(xml.filter(x => x.url === origin + newsPath).length, 1);
    assert.deepEqual(errors, []);
    console.log("PASS: winter article URL/publication retained; departure checklist, family table, seasonal caveat, sources, updated metadata/JSON-LD/sitemap, mobile/PC and search/news links.");
  } finally { await browser.close(); }
}
main().catch(e => {console.error(e); process.exitCode = 1;});
