import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import { terms, NS } from "./src/data/vocab.ts";

// Static by default; the vocabulary endpoints opt into on-demand rendering
// (prerender = false) so cc: URIs can content-negotiate to RDF on Vercel.
//
// That opt-in also made them invisible to @astrojs/sitemap, which only sees
// prerendered routes — so all 47 cc: term pages were missing from the sitemap
// even though they are real, indexable HTML. They are added back here from the
// same term list the pages themselves are built from, so the two cannot drift.
const vocabPages = [NS, ...terms.map((t) => `${NS}${t.id}`)];

export default defineConfig({
  site: "https://credentialcommons.org",
  output: "static",
  adapter: vercel(),
  integrations: [
    sitemap({
      customPages: vocabPages,
      // Emit xhtml:link alternates so the five language versions are grouped as
      // one page rather than five competing ones. The pages already carry the
      // same hreflang set in <head>; this makes the sitemap agree with them.
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", et: "et", fi: "fi", de: "de", fr: "fr" },
      },
      // Page canonicals carry no trailing slash, but the sitemap emitted one —
      // so the sitemap pointed at a URL that each page then disavowed.
      // Normalise to match the canonical; the root keeps its slash.
      serialize: (item) => {
        const u = new URL(item.url);
        if (u.pathname !== "/") u.pathname = u.pathname.replace(/\/$/, "");
        return { ...item, url: u.href };
      },
    }),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "et", "fi", "de", "fr"],
    routing: { prefixDefaultLocale: false },
  },
});
