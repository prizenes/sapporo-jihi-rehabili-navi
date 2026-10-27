const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = (process.argv[2] || "http://localhost:3027").replace(/\/$/, "");
const origin = "https://sapporo-jihi-rehabili-navi.vercel.app";
const m = { exports: {} };
new Function("module", "exports", ts.transpile(fs.readFileSync("data/sapporo-medical-fitness-guide.ts", "utf8"), { module: ts.ModuleKind.CommonJS }))(m, m.exports);
const article = m.exports.SAPPORO_MEDICAL_FITNESS_GUIDE;
const articlePath = `/blog/${article.slug}`;
const newsPath = "/news/medical-fitness-guide-published";

async function main() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext();
  // Layout test accesses must not be treated as organic visits.
  await context.route("**/*.google-analytics.com/**", route => route.abort());
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  fs.mkdirSync(".next/qa-medical-fitness", { recursive: true });
  try {
    await page.goto(base + "/blog", { waitUntil: "networkidle" });
    assert.equal(await page.locator(`main a[href="${articlePath}"]`).count(), 1);
    await page.locator(`main a[href="${articlePath}"]`).click();
    await page.waitForURL(base + articlePath);
    for (const width of [320, 390, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base + articlePath, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("h1").innerText(), article.title);
      assert((await page.title()).includes(article.title));
      assert.equal(await page.locator('meta[name="description"]').getAttribute("content"), article.description);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), origin + articlePath);
      assert.equal(await page.locator('article header time[datetime="2026-10-27"]').count(), 2);
      assert.equal(await page.locator("article > section[id]").count(), article.sections.length);
      assert.equal(await page.locator("article table tbody tr").count(), 6);
      assert.equal(await page.locator("article dl dt").count(), article.questions.length);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert(await page.locator("main > article img").evaluateAll(images => images.length > 0 && images.every(image => image.complete && image.naturalWidth > 0)));
      const posting = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(JSON.parse).find(item => item["@type"] === "BlogPosting");
      assert.equal(posting.headline, article.title);
      assert.equal(posting.mainEntityOfPage, origin + articlePath);
      assert.equal(posting.datePublished, article.publishedAt + "T09:00:00+09:00");
      assert.equal(posting.dateModified, article.updatedAt + "T09:00:00+09:00");
      for (const section of article.sections) assert.equal(await page.locator(`article [id="${section.id}"]`).count(), 1);
      for (const reference of article.references) assert.equal(await page.locator(`article a[href="${reference.url}"]`).count(), 1);
      await page.screenshot({ path: `.next/qa-medical-fitness/article-${width}.png` });
      await page.locator("article table").screenshot({ path: `.next/qa-medical-fitness/table-${width}.png` });
    }
    for (const path of await page.locator('main a[href^="/"]').evaluateAll(links => [...new Set(links.map(link => new URL(link.href).pathname))])) assert.equal((await context.request.get(base + path)).status(), 200, path);
    await page.getByRole("link", { name: "掲載施設を探す", exact: true }).click();
    await page.waitForURL(base + "/#search");
    await page.getByLabel("カテゴリ", { exact: true }).selectOption("medical-fitness");
    await page.waitForFunction(() => document.querySelectorAll("#facilities article").length === 3);
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
    console.log("PASS: new article and news, mobile/desktop, image, table, dates, metadata, JSON-LD, reference links, related articles, sitemap and medical-fitness search.");
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
