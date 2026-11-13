const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = (process.argv[2] || "http://localhost:3041").replace(/\/$/, "");
const origin = "https://sapporo-jihi-rehabili-navi.vercel.app";
const articlePath = "/blog/after-hospital-exercise-support";
const newsPath = "/news/after-hospital-handoff-guide-updated";
const title = "病院のリハビリが終了したら？札幌で運動を続ける方法";
async function main() {
  const browser = await chromium.launch({channel: "msedge", headless: true});
  const context = await browser.newContext();
  await context.route("**/*.google-analytics.com/**", route => route.abort());
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", e => errors.push(e.message));
  fs.mkdirSync(".next/qa-handoff-guide", {recursive: true});
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
      assert((await page.locator('meta[name="description"]').getAttribute("content")).includes("引継ぎメモ"));
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), origin + articlePath);
      for (const date of ["2026-10-15", "2026-11-13"]) assert.equal(await page.locator(`article header time[datetime="${date}"]`).count(), 1);
      assert.equal(await page.locator("article > section[id]").count(), 9);
      assert.equal(await page.locator("#handoff table tbody tr").count(), 6);
      assert.equal(await page.locator("#review table tbody tr").count(), 4);
      assert.equal(await page.locator("article dl dt").count(), 4);
      assert((await page.locator("#handoff").innerText()).includes("診療情報提供書や利用許可書ではありません"));
      assert((await page.locator("#booking-message").innerText()).includes("問い合わせ例"));
      assert.equal(await page.locator('main a[href="/blog/sapporo-health-center-exercise-consultation"]').count(), 1);
      assert.equal(await page.locator('main a[href="/blog/sapporo-medical-fitness-guide"]').count(), 1);
      for (const url of ["https://www.city.sapporo.jp/kaigo/k100citizen/k170houkatuyobou.html", "https://www.japanpt.or.jp/about_pt/therapy/", "https://www.jaot.or.jp/about/definition/"]) assert.equal(await page.locator(`article a[href="${url}"]`).count(), 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert(await page.locator("main > article img").evaluateAll(images => images.length > 0 && images.every(i => i.complete && i.naturalWidth > 0)));
      const posting = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(JSON.parse).find(x => x["@type"] === "BlogPosting");
      assert.equal(posting.headline, title);
      assert.equal(posting.datePublished, "2026-10-15T09:00:00+09:00");
      assert.equal(posting.dateModified, "2026-11-13T09:00:00+09:00");
      assert.equal(posting.mainEntityOfPage, origin + articlePath);
      await page.screenshot({path: `.next/qa-handoff-guide/article-${width}.png`});
      await page.locator("#handoff").screenshot({path: `.next/qa-handoff-guide/handoff-${width}.png`});
    }
    for (const path of await page.locator('main a[href^="/"]').evaluateAll(a => [...new Set(a.map(x => new URL(x.href).pathname))])) assert.equal((await context.request.get(base + path)).status(), 200, path);
    await page.getByRole("link", {name: "掲載施設を探す", exact: true}).click();
    await page.waitForURL(base + "/#search");
    await page.getByLabel("カテゴリ", {exact: true}).selectOption("gym");
    await page.waitForFunction(() => document.querySelectorAll("#facilities article").length > 0);
    await page.goto(base + "/");
    assert.equal(await page.locator(`#guides a[href="${articlePath}"]`).count(), 1);
    await page.goto(base + "/news");
    await page.locator(`main a[href="${newsPath}"]`).click();
    await page.locator(`main article a[href="${articlePath}"]`).click();
    await page.waitForURL(base + articlePath);
    const xml = await page.evaluate(s => [...new DOMParser().parseFromString(s, "application/xml").getElementsByTagName("url")].map(n => ({url: n.querySelector("loc")?.textContent, date: n.querySelector("lastmod")?.textContent})), await (await context.request.get(base + "/sitemap.xml")).text());
    for (const path of [articlePath, newsPath]) {
      assert.equal(xml.filter(x => x.url === origin + path).length, 1);
      assert.equal(xml.find(x => x.url === origin + path).date, "2026-11-13T09:00:00+09:00");
    }
    assert.deepEqual(errors, []);
    console.log("PASS: retained URL/publication, handoff and review tables, inquiry, sources, metadata/JSON-LD/sitemap, related articles, home/search/news, 320/390/1280px.");
  } finally { await browser.close(); }
}
main().catch(e => {console.error(e); process.exitCode = 1;});
