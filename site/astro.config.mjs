import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

// Static by default; the vocabulary endpoints opt into on-demand rendering
// (prerender = false) so cc: URIs can content-negotiate to RDF on Vercel.
export default defineConfig({
  site: "https://credentialcommons.org",
  output: "static",
  adapter: vercel(),
  integrations: [sitemap()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "et", "fi", "de", "fr"],
    routing: { prefixDefaultLocale: false },
  },
});
