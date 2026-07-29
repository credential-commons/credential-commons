# Visual explanations: OG images and concept diagrams

**Status: roadmap (not yet built).** This note records a gap and a plan so the
work is visible to anyone picking it up next.

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
