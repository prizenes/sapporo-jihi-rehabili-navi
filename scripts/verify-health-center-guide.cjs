const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = (process.argv[2] || "http://localhost:3040").replace(/\/$/, "");
const origin = "https://sapporo-jihi-rehabili-navi.vercel.app";
const articlePath = "/blog/sapporo-health-center-exercise-consultation";
const newsPath = "/news/health-center-consultation-guide-published";
const title = "札幌の健康づくりセンターはどう使う？運動相談と自費リハビリの選び方";
const sources = [
  "https://www.city.sapporo.jp/shisetsuannai/237.html",
  "https://www.sapporo-sport.jp/sapporo-kenkoc/kenshin/",
  "https://www.sapporo-sport.jp/sapporo-kenkoc/information/",
];

async function main() {
  const browser = await chromium.launch({channel: "msedge", headless: true});
  const context = await browser.newContext();
  await context.route("**/*.google-analytics.com/**", route => route.abort());
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", e => errors.push(e.message));
  fs.mkdirSync(".next/qa-health-center-guide", {recursive: true});
  try {
    await page.goto(base + "/blog", {waitUntil: "networkidle"});
    assert.equal(await page.locator(`main a[href="${articlePath}"]`).count(), 1);
    await page.locator(`main a[href="${articlePath}"]`).click();
    await page.waitForURL(base + articlePath);
    for (const width of [320, 390, 1280]) {
      await page.setViewportSize({width, height: 900});
      await page.goto(base + articlePath, {waitUntil: "networkidle"});
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("h1").innerText(), title);
      assert((await page.title()).includes(title));
      assert((await page.locator('meta[name="description"]').getAttribute("content")).includes("中央健康づくりセンター"));
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), origin + articlePath);
      assert.equal(await page.locator('article header time[datetime="2026-11-10"]').count(), 2);
      assert.equal(await page.locator("article > section[id]").count(), 8);
      assert.equal(await page.locator("#programs table tbody tr").count(), 3);
      assert.equal(await page.locator("#compare-and-search table tbody tr").count(), 4);
      assert.equal(await page.locator("article dl dt").count(), 4);
      assert((await page.locator("#support-scope").innerText()).includes("毎回マンツーマン"));
      assert((await page.locator("#cost-and-booking").innerText()).includes("430円"));
      for (const source of sources) {
        const link = page.locator(`article a[href="${source}"]`);
        assert.equal(await link.count(), 1);
        assert.equal(await link.getAttribute("rel"), "noopener noreferrer");
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert(await page.locator("main > article img").evaluateAll(images => images.length > 0 && images.every(i => i.complete && i.naturalWidth > 0)));
      const posting = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(JSON.parse).find(x => x["@type"] === "BlogPosting");
      assert.equal(posting.headline, title);
      assert.equal(posting.datePublished, "2026-11-10T09:00:00+09:00");
      assert.equal(posting.dateModified, "2026-11-10T09:00:00+09:00");
      assert.equal(posting.mainEntityOfPage, origin + articlePath);
      await page.screenshot({path: `.next/qa-health-center-guide/article-${width}.png`});
      await page.locator("#programs").screenshot({path: `.next/qa-health-center-guide/programs-${width}.png`});
    }
    for (const path of await page.locator('main a[href^="/"]').evaluateAll(a => [...new Set(a.map(x => new URL(x.href).pathname))])) assert.equal((await context.request.get(base + path)).status(), 200, path);
    await page.getByRole("link", {name: "掲載施設を探す", exact: true}).click();
    await page.waitForURL(base + "/#search");
    await page.getByLabel("カテゴリ", {exact: true}).selectOption("medical-fitness");
    await page.waitForFunction(() => document.querySelectorAll("#facilities article").length > 0);
    await page.goto(base + "/");
    assert.equal(await page.locator(`#guides a[href="${articlePath}"]`).count(), 1);
    await page.goto(base + "/news");
    await page.locator(`main a[href="${newsPath}"]`).click();
    await page.locator(`main article a[href="${articlePath}"]`).click();
    await page.waitForURL(base + articlePath);
    const xml = await (await context.request.get(base + "/sitemap.xml")).text();
    for (const path of [articlePath, newsPath]) assert.equal(xml.split("<loc>" + origin + path + "</loc>").length - 1, 1);
    assert.deepEqual(errors, []);
    console.log("PASS: health-center article/news, 320/390/1280px, image, sources, program distinctions, metadata/JSON-LD/sitemap, home/search/internal links.");
  } finally { await browser.close(); }
}
main().catch(e => {console.error(e); process.exitCode = 1;});
