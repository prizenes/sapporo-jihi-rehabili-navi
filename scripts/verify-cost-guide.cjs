const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = (process.argv[2] || "http://localhost:3030").replace(/\/$/, "");
const origin = "https://sapporo-jihi-rehabili-navi.vercel.app";
const cache = new Map();
function data(name) {
  if (!name.startsWith("@/data/")) return require(name);
  if (cache.has(name)) return cache.get(name).exports;
  const m = { exports: {} };
  cache.set(name, m);
  new Function("module", "exports", "require", ts.transpile(fs.readFileSync(`.${name.slice(1)}.ts`, "utf8"), {module: ts.ModuleKind.CommonJS}))(m, m.exports, data);
  return m.exports;
}
const articles = data("@/data/articles").ARTICLES;
const article = articles.find(a => a.slug === "private-rehab-cost-checklist");
const news = data("@/data/news").NEWS;
const notice = news.find(n => n.slug === "cost-guide-contract-checklist-updated");
const articlePath = `/blog/${article.slug}`;
const newsPath = `/news/${notice.slug}`;
assert.equal(new Set(articles.map(a => a.slug)).size, articles.length);
assert.equal(new Set(news.map(n => n.slug)).size, news.length);
assert.equal(article.publishedAt, "2026-10-15");
assert.equal(article.updatedAt, "2026-10-30");

async function main() {
  const browser = await chromium.launch({channel: "msedge", headless: true});
  const context = await browser.newContext();
  await context.route("**/*.google-analytics.com/**", r => r.abort());
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", e => errors.push(e.message));
  fs.mkdirSync(".next/qa-cost-guide", {recursive: true});
  try {
    await page.goto(base + "/blog", {waitUntil: "networkidle"});
    assert.equal(await page.locator(`main a[href="${articlePath}"]`).count(), 1);
    await page.locator(`main a[href="${articlePath}"]`).click();
    await page.waitForURL(base + articlePath);
    for (const width of [320, 390, 1280]) {
      await page.setViewportSize({width, height: 900});
      await page.goto(base + articlePath, {waitUntil: "networkidle"});
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("h1").innerText(), article.title);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), origin + articlePath);
      assert.equal(await page.locator('meta[name="description"]').getAttribute("content"), article.description);
      assert.equal(await page.locator('article header time[datetime="2026-10-15"]').count(), 1);
      assert.equal(await page.locator('article header time[datetime="2026-10-30"]').count(), 1);
      assert.equal(await page.locator("article > section[id]").count(), 7);
      assert.equal(await page.locator("article dl dt").count(), 4);
      assert.equal(await page.locator("#before-contract li").count(), 6);
      assert((await page.locator("#consultation").innerText()).includes("011-728-2121"));
      for (const section of article.sections) assert.equal(await page.locator(`article [id="${section.id}"]`).count(), 1);
      for (const ref of article.references) assert.equal(await page.locator(`article a[href="${ref.url}"]`).count(), 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert(await page.locator("main > article img").evaluateAll(images => images.length > 0 && images.every(i => i.complete && i.naturalWidth > 0)));
      const posting = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(JSON.parse).find(x => x["@type"] === "BlogPosting");
      assert.equal(posting.datePublished, "2026-10-15T09:00:00+09:00");
      assert.equal(posting.dateModified, "2026-10-30T09:00:00+09:00");
      assert.equal(posting.mainEntityOfPage, origin + articlePath);
      await page.screenshot({path: `.next/qa-cost-guide/article-${width}.png`});
      await page.locator("#before-contract").screenshot({path: `.next/qa-cost-guide/contract-${width}.png`});
    }
    for (const path of await page.locator('main a[href^="/"]').evaluateAll(a => [...new Set(a.map(x => new URL(x.href).pathname))])) assert.equal((await context.request.get(base + path)).status(), 200, path);
    await page.getByRole("link", {name: "掲載施設を探す", exact: true}).click();
    await page.waitForURL(base + "/#search");
    await page.getByLabel("カテゴリ", {exact: true}).selectOption("rehab");
    await page.waitForFunction(() => document.querySelectorAll("#facilities article").length > 0);
    await page.goto(base + "/news");
    assert.equal(await page.locator(`main a[href="${newsPath}"]`).count(), 1);
    await page.locator(`main a[href="${newsPath}"]`).click();
    await page.locator(`main article a[href="${articlePath}"]`).click();
    await page.waitForURL(base + articlePath);
    const sitemap = await (await context.request.get(base + "/sitemap.xml")).text();
    assert.equal(sitemap.split(`<loc>${origin}${articlePath}</loc>`).length - 1, 1);
    assert(sitemap.includes("2026-10-30T09:00:00+09:00"));
    assert.equal(sitemap.split(`<loc>${origin}${newsPath}</loc>`).length - 1, 1);
    assert.deepEqual(errors, []);
    console.log("PASS: existing cost article URL/publication date retained; substantive sections, sources, updated date, metadata, JSON-LD, mobile/PC, image, links, search and dated news verified.");
  } finally { await browser.close(); }
}
main().catch(e => {console.error(e); process.exitCode = 1;});
