import { describe, expect, it } from "vitest";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildPageMetadata,
  buildSiteJsonLd,
  serializeJsonLd,
} from "@/src/lib/seo";
import { PAGE_SEO, SEO_KEYWORDS } from "@/src/constant/seo";
import { SITE_CONFIG } from "@/src/constant/site";

describe("PAGE_SEO", () => {
  const pages = Object.entries(PAGE_SEO);

  it("keeps titles and descriptions within search-result limits", () => {
    for (const [, page] of pages) {
      expect(`${page.title} | ${SITE_CONFIG.name}`.length).toBeLessThanOrEqual(60);
      expect(page.description.length).toBeLessThanOrEqual(160);
      expect(page.description.length).toBeGreaterThanOrEqual(50);
    }
  });

  it("uses unique paths, titles and descriptions", () => {
    for (const field of ["path", "title", "description"] as const) {
      const values = pages.map(([, page]) => page[field]);
      expect(new Set(values).size).toBe(values.length);
    }
  });
});

describe("buildPageMetadata", () => {
  it("sets canonical, Open Graph and Twitter tags for a page", () => {
    const metadata = buildPageMetadata("pricing");
    expect(metadata.title).toBe(PAGE_SEO.pricing.title);
    expect(metadata.alternates?.canonical).toBe("/pricing");
    expect(metadata.openGraph).toMatchObject({ url: "/pricing", siteName: SITE_CONFIG.name });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
    expect(metadata.openGraph?.images).toEqual([expect.objectContaining({ url: "/opengraph-image" })]);
    expect(metadata.keywords).toEqual(expect.arrayContaining(SEO_KEYWORDS));
  });

  it("uses an absolute title on the home page", () => {
    expect(buildPageMetadata("home").title).toEqual({
      absolute: `${SITE_CONFIG.name} — ${PAGE_SEO.home.title}`,
    });
  });
});

describe("structured data", () => {
  it("describes the organisation, website and app in one graph", () => {
    const types = (buildSiteJsonLd()["@graph"] as { "@type": string }[]).map((node) => node["@type"]);
    expect(types).toEqual(["Organization", "WebSite", "WebApplication"]);
  });

  it("builds a Home › Page breadcrumb with absolute URLs", () => {
    const items = buildBreadcrumbJsonLd("pricing").itemListElement as { item: string; position: number }[];
    expect(items.map((item) => item.position)).toEqual([1, 2]);
    expect(items[1].item).toBe(`${SITE_CONFIG.url}/pricing`);
  });

  it("turns FAQs into Question entities", () => {
    const faq = buildFaqJsonLd([{ q: "Is it free?", a: "Yes." }]);
    expect(faq.mainEntity).toEqual([
      { "@type": "Question", name: "Is it free?", acceptedAnswer: { "@type": "Answer", text: "Yes." } },
    ]);
  });

  it("escapes < so content can't close the script tag", () => {
    expect(serializeJsonLd({ name: "</script><script>alert(1)</script>" })).not.toContain("</script>");
  });
});
