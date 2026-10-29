import { describe, expect, it } from "vitest";
import { COUNTRY_GUIDES, findCountryGuide } from "@/src/constant/countries";
import { CURRENCIES } from "@/src/constant/currencies";
import { buildCountryMetadata, getCountryPath } from "@/src/lib/seo";
import { SITE_CONFIG } from "@/src/constant/site";

describe("country guides", () => {
  it("have unique slugs and known currencies", () => {
    const slugs = COUNTRY_GUIDES.map((guide) => guide.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const guide of COUNTRY_GUIDES) {
      expect(CURRENCIES.some((currency) => currency.code === guide.currency)).toBe(true);
      expect(guide.mustInclude.length).toBeGreaterThan(3);
      expect(guide.faqs.length).toBeGreaterThan(0);
    }
  });

  it("build search-friendly metadata", () => {
    for (const guide of COUNTRY_GUIDES) {
      const metadata = buildCountryMetadata(guide);
      expect(`${metadata.title} | ${SITE_CONFIG.name}`.length).toBeLessThanOrEqual(60);
      expect(String(metadata.description).length).toBeLessThanOrEqual(160);
      expect(metadata.alternates?.canonical).toBe(getCountryPath(guide));
    }
  });

  it("finds a guide by slug", () => {
    expect(findCountryGuide("pakistan")?.currency).toBe("PKR");
    expect(findCountryGuide("atlantis")).toBeUndefined();
  });
});
