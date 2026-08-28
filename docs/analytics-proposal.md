# Measuring this site — proposal

This site had no analytics of any kind until now. This is a proposal for a
small, honest starting vocabulary, plus the minimal wiring for the one part
of it that is straightforward to build today
(`site/src/components/Analytics.astro`). It intentionally does not build
everything it describes — some of it needs a decision this document is
asking for, not assuming.

## Why measure this at all

This site is not a product with a funnel. Nobody buys anything here. What's
worth knowing is closer to: which parts of the spec do people actually read,
which case study or doc do they follow up on, and — because this is a
machine-readable vocabulary as much as a web page — which parts of it get
*used*, not just *read*. A plain pageview count answers the first question
reasonably well and the second one barely at all.

## Three kinds of visitor, three different problems

**1. Human readers**, in a browser. A cookieless pageview tool (Umami)
handles this well already: every page under `/`, `/why`, and each locale
prefix renders through `Base.astro`, so a visit shows up as a pageview with
no extra code. What a pageview *cannot* show is which of the footer/nav
links someone followed next — the repo, a specific doc, a case study — since
following one of those either leaves the site entirely (GitHub,
schema.edu.ee) or lands on a same-origin response that never renders this
site's own layout at all (see below). That gap is what
`Analytics.astro`'s one custom event, `outbound_link_click`, closes: it
fires on click, before navigation, for exactly the handful of links the
landing page and the why page offer, tagged with which one
(`target: "repo" | "vocabulary" | "llms_txt" | "case_aggregator" | ...`).
That is the entire proposed vocabulary for this channel. It is deliberately
not a generic "track every link" rule — seeded here to stay legible, not to
prevent adding more later.

**2. AI agents and tools**, fetching a page or the vocabulary to answer a
question or resolve a term. This is the interesting channel and the
hardest to measure honestly with a cookieless *client-side* script, for a
structural reason: an agent doing a plain HTTP fetch never executes
JavaScript, so it never runs Umami's script no matter how the page is
built. Nothing client-side can see this traffic at all.

There is one honest signal already in this codebase, unrelated to
analytics: `/ns/0.1/` and `/ns/0.1/<term>` already content-negotiate on the
`Accept` header (`src/data/vocab.ts`, `negotiate()`) — a request for
`text/turtle` or `application/ld+json` gets RDF, everything else gets a
hand-built HTML page. A request that explicitly asks for RDF is a genuine,
non-invasive signal that *something* wanted the machine-readable form, not
a guess based on user-agent string. **Proposal, not built yet:** count these
server-side, in the two on-demand functions themselves (they already run
per-request — `export const prerender = false`), by posting an event to
Umami's own collector API directly (no browser involved; Umami's collector
is a plain HTTP endpoint and does not require its client script). A
reasonable first event: `vocab_negotiated`, with `format: "rdf" | "html"`
and the requested `term` (or none, for the index). Deliberately not built
in the same change as the client-side wiring, because it touches
request-handling code path in a Vercel Function rather than static markup,
and deserves its own review.

**Be honest about the limit:** this only catches agents that set a
deliberate `Accept` header. Many simple agent fetches (a bare `fetch(url)`
with no special header) fall through to the same `text/html` branch a
browser gets, and would be indistinguishable from a human visit under this
scheme. That is a real ceiling on what this signal can tell us, not
something to paper over.

**3. Bulk / scheduled consumption** — something pulling the whole
vocabulary or every case study on a recurring cadence, rather than a single
agent answering one question. Even the server-side signal above cannot
tell this apart from a one-off agent lookup; that would need
volume/cadence heuristics (repeat requests from the same source over time)
that nothing in this proposal builds. Flagging this as a known gap rather
than a solved problem: if it turns out to matter, it is a separate, later
piece of work, likely closer to log analysis than to an analytics event.

## What is not covered, and why that's a deliberate choice for now

`/llms.txt` and the diagram SVGs (`/diagrams/*.svg`, `/[locale]/diagrams/*`)
are prerendered static files — Vercel serves them directly, no function
runs per request, so nothing in this codebase can observe a hit on them at
all, agent or human, without turning them into on-demand functions. That
conversion has a real cost (added latency, a serverless dependency, on
files whose whole point is to be cheap and always available to any agent
that asks) purely to gain a hit counter. This proposal recommends *not*
doing that. If hit counts on these specific paths become genuinely
important later, Vercel's own edge/access logs are the place to look —
outside this repository's code, and without changing how the files are
served.

## Summary of what this change actually does

- Built: `Analytics.astro` — an Umami pageview snippet (silently disabled
  unless `PUBLIC_UMAMI_SRC` and `PUBLIC_UMAMI_WEBSITE_ID` are both set, no
  built-in default host — see `.env.example`) plus one custom event,
  `outbound_link_click`.
- Proposed, not built: server-side `vocab_negotiated` counting in the
  `/ns/0.1/*` functions, keyed off the `Accept` header they already read.
- Explicitly out of scope for now: distinguishing a single agent visit from
  a scheduled bulk pull, and instrumenting `/llms.txt` or the diagram SVGs.

The vocabulary above is deliberately small. A name added too early and
later regretted is harder to remove cleanly (dashboards and history end up
depending on it) than one added once real traffic shows it's needed.
