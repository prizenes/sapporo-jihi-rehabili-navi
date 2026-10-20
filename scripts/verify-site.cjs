/*
 * Run against a built local site first, then production.
 * node scripts/verify-site.cjs http://localhost:3012
 * Requires Playwright and a browser. PLAYWRIGHT_MODULE can specify its module path;
 * PLAYWRIGHT_CHANNEL can select a browser (defaults to msedge on Windows).
 * GA4 verification opens real pages and clicks official links: these are test visits.
 */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = (process.argv[2] || "http://localhost:3012").replace(/\/$/, "");
const productionOrigin = "https://sapporo-jihi-rehabili-navi.vercel.app";
const isProduction = base === productionOrigin;

function analyticsEvents(response) {
  const request = response.request();
  const url = new URL(request.url());
  if (
    !url.hostname.endsWith("google-analytics.com") ||
    !url.pathname.endsWith("/collect")
  )
    return [];
  const payloads = (request.postData() || "").split("\n");
  return payloads
    .map((body) => {
      const fields = new URLSearchParams(url.search);
      for (const [key, value] of new URLSearchParams(body))
        fields.set(key, value);
      return {
        id: fields.get("tid"),
        event: fields.get("en"),
        path: fields.get("dl"),
        facility: fields.get("ep.facility_id"),
        placement: fields.get("ep.link_location"),
        status: response.status(),
      };
    })
    .filter((event) => event.id === "G-HB1Z9BRRJ3");
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_CHANNEL || process.platform === "win32"
      ? { channel: process.env.PLAYWRIGHT_CHANNEL || "msedge" }
      : {}),
  });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  if (!isProduction)
    await context.route("**/*.google-analytics.com/**", (route) =>
      route.abort(),
    );
  const received = [];
  context.on("response", (response) =>
    received.push(...analyticsEvents(response)),
  );
  const waitGA = (predicate) =>
    page.waitForResponse(
      (response) => analyticsEvents(response).some(predicate),
      { timeout: 45000 },
    );
  try {
    const homePageView = isProduction
      ? waitGA((event) => event.event === "page_view")
      : null;
    const homeResponse = await page.goto(base + "/", {
      waitUntil: "networkidle",
    });
    assert.equal(homeResponse.status(), 200);
    if (homePageView) await homePageView;
    if (isProduction) {
      const articlePageView = waitGA(
        (event) =>
          event.event === "page_view" &&
          event.path &&
          new URL(event.path).pathname ===
            "/blog/after-hospital-exercise-support",
      );
      await page
        .locator('#guides a[href="/blog/after-hospital-exercise-support"]')
        .click();
      await articlePageView;
      await page.goto(base + "/", { waitUntil: "networkidle" });
    }
    assert.deepEqual(
      await page
        .locator("main > section")
        .evaluateAll((nodes) => nodes.slice(0, 4).map((node) => node.id)),
      ["top", "search", "facilities", "guides"],
    );
    assert.equal(await page.locator("#guides article").count(), 3);
    const formUrls = await page
      .locator('main a[href*="docs.google.com/forms"]')
      .evaluateAll((nodes) => nodes.map((node) => node.href));
    for (const [ward, count] of [["中央区", 2], ["西区", 4], ["手稲区", 2]]) {
      await page.getByLabel("エリア", { exact: true }).selectOption(ward);
      assert.equal(await page.locator("#facilities article").count(), count, ward);
    }
    await page.getByLabel("エリア", { exact: true }).selectOption("厚別区");
    assert.equal(await page.locator("#facilities article").count(), 0);
    await page
      .locator("#facilities")
      .getByText("このエリア・条件の施設情報を募集中です。", { exact: true })
      .waitFor();
    await page
      .getByRole("button", { name: "条件をリセット", exact: true })
      .click();
    assert.equal(await page.locator("#facilities article").count(), 13);
    for (const viewport of [
      { width: 320, height: 740 },
      { width: 390, height: 844 },
      { width: 1280, height: 900 },
    ]) {
      await page.setViewportSize(viewport);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `Overflow at ${viewport.width}`,
      );
      if (process.env.SCREENSHOT_DIR) {
        fs.mkdirSync(process.env.SCREENSHOT_DIR, { recursive: true });
        await page.locator("#search").scrollIntoViewIfNeeded();
        await page.screenshot({
          path: path.join(
            process.env.SCREENSHOT_DIR,
            `search-${viewport.width}.png`,
          ),
        });
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    if (isProduction) {
      const clickResponse = waitGA(
        (event) =>
          event.event === "facility_website_click" &&
          event.placement === "facility_list",
      );
      const [popup] = await Promise.all([
        page.waitForEvent("popup"),
        page
          .locator(
            'a[data-facility-id="phact"][data-link-location="facility_list"]',
          )
          .click(),
      ]);
      await clickResponse;
      await popup.close();
    }

    const sitemapResponse = await context.request.get(base + "/sitemap.xml");
    assert.equal(sitemapResponse.status(), 200);
    const sitemap = await sitemapResponse.text();
    const urls = await page.evaluate(
      (xml) =>
        [
          ...new DOMParser()
            .parseFromString(xml, "application/xml")
            .querySelectorAll("loc"),
        ].map((node) => node.textContent),
      sitemap,
    );
    assert.equal(new Set(urls).size, urls.length);
    assert(urls.some((url) => url.endsWith("/blog/sapporo-home-exercise-support")));
    assert(
      urls.some((url) => url.endsWith("/blog/what-is-private-rehabilitation")),
    );
    assert(
      urls.some((url) => url.endsWith("/blog/sapporo-senior-exercise-consultation")),
    );
    for (const url of urls) {
      const response = await context.request.get(base + new URL(url).pathname);
      assert.equal(response.status(), 200, url);
      assert(!/noindex/i.test(response.headers()["x-robots-tag"] || ""), url);
    }
    const robots = await context.request.get(base + "/robots.txt");
    assert.equal(robots.status(), 200);
    assert((await robots.text()).includes("Allow: /"));
    assert(!(await robots.text()).includes("Disallow: /"));

    const articlePaths = [
      "/blog/sapporo-home-exercise-support",
      "/blog/sapporo-senior-exercise-consultation",
      "/blog/after-hospital-exercise-support",
      "/blog/what-is-private-rehabilitation",
      "/blog/physical-therapist-personal-gym",
    ];
    for (const path of [
      ...articlePaths,
      "/facilities/priseness",
      "/facilities/phact",
      "/facilities/seitai-sakka",
      "/facilities/hagukumi",
      "/facilities/kinmaq-teineyamaguchi",
      "/facilities/toreriha-club",
      "/facilities/amilus",
      "/facilities/physiowellness-maruyama",
    ]) {
      await page.goto(base + path, { waitUntil: "domcontentloaded" });
      assert.equal(await page.locator("h1").count(), 1);
      assert.equal(
        await page.locator('link[rel="canonical"]').getAttribute("href"),
        productionOrigin + path,
      );
      assert(
        !/noindex/i.test(
          await page
            .locator('meta[name="robots"]')
            .evaluateAll((nodes) =>
              nodes.map((node) => node.content).join(" "),
            ),
        ),
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        path,
      );
      await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((nodes) =>
          nodes.forEach((node) => JSON.parse(node.textContent)),
        );
    }
    await page.goto(base + "/contact");
    assert.equal(
      await page.locator('main a[href*="docs.google.com/forms"]').count(),
      2,
    );
    formUrls.push(
      ...(await page
        .locator('main a[href*="docs.google.com/forms"]')
        .evaluateAll((nodes) => nodes.map((node) => node.href))),
    );
    for (const id of [
      "1FAIpQLSfIAWPbtHTRThPm2jBwK_4tMikH6F3DZC04GfOPF60UyBdc1w",
      "1FAIpQLSf8JcXETDke0A5TvUpif6Z6YkxY--TG6byphiYS2s50D9RTvw",
      "1FAIpQLSea313vMagsEOigcMRXrLZ6Gl1yP-SmC3wP9bLxDl044DGQlQ",
    ])
      assert(
        formUrls.some((url) => url.includes(id)),
        `Existing form changed: ${id}`,
      );
    const hidden = await context.request.get(base + "/facilities/field-cruise");
    assert.equal(hidden.status(), 404);
    if (isProduction) {
      await page.goto(base + "/facilities/phact");
      const detailClick = waitGA(
        (event) =>
          event.event === "facility_website_click" &&
          event.placement === "facility_detail",
      );
      const [popup] = await Promise.all([
        page.waitForEvent("popup"),
        page
          .locator(
            'a[data-facility-id="phact"][data-link-location="facility_detail"]',
          )
          .click(),
      ]);
      await detailClick;
      await popup.close();
      assert(
        received.some(
          (event) =>
            event.event === "page_view" &&
            event.status >= 200 &&
            event.status < 300,
        ),
      );
      assert(
        received.some(
          (event) =>
            event.event === "facility_website_click" &&
            event.status >= 200 &&
            event.status < 300,
        ),
      );
      console.log(
        "GA4 responses:",
        JSON.stringify(
          received.filter((event) =>
            ["page_view", "facility_website_click"].includes(event.event),
          ),
          null,
          2,
        ),
      );
    }
    console.log(
      `PASS: ${urls.length} sitemap URLs; search, three guides, canonical, robots, mobile layout, forms and hidden-facility checks.`,
    );
  } finally {
    await browser.close();
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
