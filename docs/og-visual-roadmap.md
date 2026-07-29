# Visual explanations: OG images and concept diagrams

**Status: built.** The OG foundation and the first five concept diagrams now ship.
What is still open is listed at the end. The rest of this note records why the
work was done the way it was.

## What exists now

- `site/src/lib/diagram.ts` — the drawing system: palette taken from the site's
  own tokens, approximate text measurement, layout primitives, and a frame that
  sizes its own footer from its content.
- `site/src/data/diagrams.ts` — five diagrams: `credential-commons` (the three
  parts), `two-trees`, `what-travels`, `growth-rings`, `neutral-slots`.
- Routes `/diagrams/<id>.svg` and `/diagrams/stacked/<id>.svg`, rasterised after
  the build by `site/scripts/rasterize-diagrams.mjs` to `<id>.png` and a
  `1200×630` `<id>.og.png`.
- `Base.astro` now emits `og:image`, its dimensions and alt text, plus the full
  Twitter `summary_large_image` set. A page picks its card with the `ogDiagram`
  prop; `/why` uses `two-trees`, everything else uses `credential-commons`.
- `npm run diagrams` in `site/` renders every diagram to `tmp/diagrams/` so the
  drawing can be reviewed as a real picture without building the site.

Two things worth knowing before changing any of it:

- **Rasterise into the deployed directory.** The Vercel adapter copies static
  output to `.vercel/output/static` *during* the build, before any post-build
  step runs. Writing PNGs only into `dist/client` leaves them out of the deploy
  and every `og:image` 404s. The script writes to both.
- **Two shapes, not one scaled shape.** Wide is `960×504` — exactly the
  `1200×630` ratio, so a shared card fills the frame with no letterbox. A wide
  diagram scaled into a 360 px viewport renders its labels at roughly 8 px, so
  narrow screens get a genuinely different composition at `400×640`.

## Why

Credential Commons explains ideas that are easy to misread in prose — the two
trees (what you run vs. what a learner can do), what actually *travels* between
systems, the neutral slots, and the crosswalks to other vocabularies. A single
clear picture explains these faster than a paragraph, and it works in three
places at once:

- **on the page** — a reader (or an LLM reading the page) sees the idea;
- **in search** — the same image is indexable;
- **when shared** — links to the site render a card in chats and feeds instead
  of a bare URL.

## The gap

`site/src/layouts/Base.astro` sets `og:type`, `og:title`, `og:description` and
`og:url`, but **no `og:image` and no Twitter/summary-card tags**. The only image
in the site is `favicon.svg`. There is no diagram pipeline. So today, sharing a
Credential Commons link produces no visual, and the core concepts have no figure.

## Plan

1. **OG foundation** *(smallest, unblocks all sharing)* — in `Base.astro` add
   `og:image` (with `og:image:width`/`:height`), `twitter:card=summary_large_image`
   and `twitter:image`. Generate a branded default card at build time. Prefer a
   self-contained approach (build-time render of local SVG/HTML) so there are no
   external requests at runtime.
2. **Concept diagrams** — author each as a hand-made, self-contained SVG whose
   `<text>` layer is real text (so machines read the explanation, not pixels).
   Each SVG is used inline on the page *and* rasterised to a `1200×630` `og.png`
   social card. Flagship set:
   - **One catalogue, two trees** — product/operations vs. knowledge/credentials,
     the catalogue as the shared root. (`/why`)
   - **The living tree / growth rings** — seed → seedling → tree; versions as
     rings. (scaffold + versioning)
   - **What travels** — the transplant test: what moves between systems.
   - **The neutral slots** — the profiles as empty, framework-agnostic slots.
     (`ns/0.1` term pages)
   - **Crosswalks** — the same concept expressed in other vocabularies.
3. **Wire it** — point each page's `og:image` at the relevant card; embed the
   SVG inline with an `alt`/`aria-label` for humans and machines.

## Principles

- **Self-contained** — no external hosts; CSP-safe, fast, nothing leaked.
- **Machine-readable** — SVG text, page `alt` text, real captions.
- **One source, three channels** — the same file serves page, search and share.

Priority order: OG foundation first, then the two-trees and living-tree cards,
then the rest as capacity allows.

## Still open

- **Diagrams are English only.** The site publishes in five languages, and every
  locale currently shares the English card. Diagram copy needs a native reader
  before it goes out, so the translations are deliberately not guessed. The
  drawing system takes its strings from the diagram description, so adding a
  locale is a copy task, not a code task.
- **Diagrams are not yet embedded in page content.** They exist as routes and as
  share cards. Placing them inline on `/why` and the `ns/0.1` term pages is the
  next step, and depends on the locale question above.
- **Crosswalk detail.** `neutral-slots` names the three crosswalk targets but
  does not show a field-level mapping. A separate diagram could.
