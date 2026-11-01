import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { publicProjects } from "../content/projects";

const routes = ["/", "/work", ...publicProjects.map((project) => "/work/" + project.slug)];
const widths = [360, 390, 768, 1024, 1440, 1920];

test.describe("Public page accessibility", () => {
  for (const route of routes) {
    test(route + " has one clear page title and no WCAG 2.2 AA axe violations", async ({ page }) => {
      await page.goto(route);
      await expect(page.locator("h1")).toHaveCount(1);
      const scan = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(scan.violations.map(({ id, impact, description, nodes }) => ({
        id, impact, description, nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })),
      }))).toEqual([]);
    });
  }
});

test.describe("Responsive layouts", () => {
  for (const route of ["/", "/work", "/work/adrde-agra-dashboard"]) {
    for (const width of widths) {
      test(route + " has no horizontal overflow at " + width + "px", async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route);
        const dimensions = await page.evaluate(() => ({
          viewport: document.documentElement.clientWidth,
          content: document.documentElement.scrollWidth,
        }));
        expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport + 1);
      });
    }
  }
});

test("Skills tabs and project track filters respond to keyboard and pointer input", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: /Cyber Security/ }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Burp Suite");
  await page.getByRole("tab", { name: /Cloud/ }).press("ArrowRight");
  await expect(page.getByRole("tab", { name: /Cloud/ })).toHaveAttribute("aria-selected", "true");
  await page.getByRole("tab", { name: /Cloud/ }).press("ArrowRight");
  await expect(page.getByRole("tab", { name: /DevOps/ })).toHaveAttribute("aria-selected", "true");

  await page.goto("/work");
  await page.getByRole("button", { name: /Cyber security/ }).click();
  await expect(page.getByText(/Showing \d+ projects/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "PAPERWALL (QuantumShield)" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "VibeCode Editor" })).toHaveCount(0);
});

test("Mobile menu is operable and Escape returns focus to its button", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const openButton = page.getByRole("button", { name: "Open navigation menu" });
  await openButton.click();
  const nav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(nav).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open navigation menu" })).toBeFocused();
});

test("Email is absent from rendered HTML and markdown twins return Markdown", async ({ page, request }) => {
  await page.goto("/");
  const html = await page.content();
  expect(html.toLowerCase()).not.toContain("dhirendrakumar8594@gmail.com");
  for (const route of ["/index.md", "/work.md", "/work/adrde-agra-dashboard.md"]) {
    const response = await request.get(route);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("text/markdown");
  }
  expect((await request.get("/markdown/index")).status()).toBe(404);
});

test("Profile links and project contribution credits use the supplied details", async ({ page, request }) => {
  await page.goto("/");
  const hackerRankLinks = page.getByRole("link", { name: /HackerRank/ });
  await expect(hackerRankLinks).toHaveCount(2);
  await expect(hackerRankLinks.first()).toHaveAttribute(
    "href",
    "https://www.hackerrank.com/profile/dhirendrakumar82",
  );
  const leetCodeLinks = page.getByRole("link", { name: /LeetCode/ });
  await expect(leetCodeLinks.first()).toHaveAttribute(
    "href",
    "https://leetcode.com/u/ABHI_2005_jeeT/",
  );

  await page.goto("/work/project-blindspot");
  const blindspotUrl = "https://github.com/Hareekshith/BlindSpot";
  await expect(page.getByRole("link", { name: blindspotUrl })).toHaveAttribute("href", blindspotUrl);
  expect(await (await request.get("/llms.txt")).text()).toContain(blindspotUrl);

  await page.goto("/work/aegis-federated-learning");
  await expect(page.getByText(/We decided the project and features together/)).toBeVisible();
  await expect(page.getByText(/Gitanjali handled AWS services and deployment/).first()).toBeVisible();
});

test("Metadata avoids localhost canonicals and missing projects return a real 404", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en-IN");
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('meta[property="og:url"]')).toHaveCount(0);
  const response = await page.goto("/work/this-project-does-not-exist");
  expect(response?.status()).toBe(404);
});

test("Robots, sitemap, and generated social images respond", async ({ request }) => {
  expect((await request.get("/robots.txt")).ok()).toBeTruthy();
  expect((await request.get("/sitemap.xml")).ok()).toBeTruthy();
  const image = await request.get("/og");
  expect(image.ok()).toBeTruthy();
  expect(image.headers()["content-type"]).toContain("image/png");
});
