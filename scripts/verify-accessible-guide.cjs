// Run after npm run build and npm run start; pass localhost or production origin.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = (process.argv[2] || "http://localhost:3023").replace(/\/$/, "");
const origin = "https://sapporo-jihi-rehabili-navi.vercel.app";
const slug = "sapporo-accessible-exercise-facilities";
const articlePath = `/blog/${slug}`;
const newsPath = "/news/accessible-exercise-guide-published";
const title = "札幌で杖・車いすでも通いやすい運動施設を探すには？駅出口と入口の確認手順";
const references = [
  "https://www.city.sapporo.jp/st/subway/ekikonaizu/ekikonaizu.html",
  "https://www.city.sapporo.jp/st/subway/jyosya_ichi/annaizu.html",
  "https://www.city.sapporo.jp/st/elevator/mokuji.html",
];

async function main() {
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || "msedge", headless: true });
  const context = await browser.newContext();
  // These layout tests do not represent organic traffic.
  await context.route("**/*.google-analytics.com/**", route => route.abort());
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  const screenshots = ".next/qa-accessible-guide";
  fs.mkdirSync(screenshots, { recursive: true });
  try {
    await page.goto(base + "/blog", { waitUntil: "networkidle" });
    assert.equal(await page.locator(`main a[href="${articlePath}"]`).count(), 1, "Article must not be duplicated");
    await page.locator(`main a[href="${articlePath}"]`).click();
    await page.waitForURL(base + articlePath);
    for (const width of [320, 390, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base + articlePath, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("h1").innerText(), title);
      assert((await page.title()).includes(title));
      assert((await page.locator('meta[name="description"]').getAttribute("content")).includes("札幌"));
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), origin + articlePath);
      assert.equal(await page.locator('meta[name="robots"][content*="noindex"]').count(), 0);
      assert.equal(await page.locator('article header time[datetime="2026-10-23"]').count(), 2);
      assert.equal(await page.locator('article > section[id]').count(), 7);
      assert.equal(await page.locator('article table tbody tr').count(), 6);
      assert.equal(await page.locator('article dl dt').count(), 3);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow at ${width}`);
      assert(await page.locator('main > article img').evaluateAll(images => images.length > 0 && images.every(image => image.complete && image.naturalWidth > 0)), "Article image must load");
      const data = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(JSON.parse);
      const posting = data.find(item => item["@type"] === "BlogPosting");
      assert.equal(posting.headline, title);
      assert.equal(posting.mainEntityOfPage, origin + articlePath);
      assert.equal(posting.datePublished, "2026-10-23T09:00:00+09:00");
      assert.equal(posting.dateModified, posting.datePublished);
      for (const href of references) assert.equal(await page.locator(`article a[href="${href}"]`).count(), 1);
      const anchors = await page.locator('nav[aria-label="この記事の目次"] a').evaluateAll(links => links.map(link => link.hash.slice(1)));
      for (const id of anchors) assert.equal(await page.locator(`[id="${id}"]`).count(), 1);
      await page.screenshot({ path: `${screenshots}/article-${width}.png` });
      await page.locator('article table').screenshot({ path: `${screenshots}/checklist-${width}.png` });
    }
    const internalPaths = await page.locator('main a[href^="/"]').evaluateAll(links => [...new Set(links.map(link => new URL(link.href).pathname))]);
    for (const path of internalPaths) assert.equal((await context.request.get(base + path)).status(), 200, path);
    await page.getByRole("link", { name: "掲載施設を探す", exact: true }).click();
    await page.waitForURL(base + "/#search");
    await page.getByLabel("エリア", { exact: true }).selectOption("西区");
    await page.waitForFunction(() => document.querySelectorAll("#facilities article").length > 0);
    for (const text of await page.locator("#facilities article").allTextContents()) assert(text.includes("西区"));
    await page.goto(base + "/");
    assert.equal(await page.locator(`#guides a[href="${articlePath}"]`).count(), 1);
    await page.goto(base + "/news");
    await page.locator(`main a[href="${newsPath}"]`).click();
    await page.waitForURL(base + newsPath);
    await page.locator(`main article a[href="${articlePath}"]`).click();
    await page.waitForURL(base + articlePath);
    const sitemap = await (await context.request.get(base + "/sitemap.xml")).text();
    for (const path of [articlePath, newsPath]) assert.equal(sitemap.split(`<loc>${origin}${path}</loc>`).length - 1, 1);
    assert.deepEqual(errors, []);
    console.log("PASS: accessible guide, dated update notice, 320/390/1280 layouts, image, table, metadata, JSON-LD, references, sitemap, article-to-search and news-to-article paths.");
  } finally {
    await browser.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
