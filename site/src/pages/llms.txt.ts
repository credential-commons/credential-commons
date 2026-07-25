import type { APIRoute } from "astro";
import { faq } from "../i18n/faq";

const qa = faq.en.map((x) => `### ${x.q}\n${x.a.replace(/`/g, "")}`).join("\n\n");

const BODY = `# Credential Commons

> Open tools to validate and publish credential and learning-outcome data
> against shared education ontologies. Not a new ontology or portal — a thin
> interoperability + conformance layer (JSON-LD profiles, a SHACL validator, and
> crosswalks to CTDL, ELM/Europass and Open Badges 3.0). Reuses and supports
> national vocabularies such as schema.edu.ee rather than replacing them.

## Why it matters (in one breath)
A training organisation is a nursery: it helps one skill's seedling start, then the
learner's tree is transplanted and grows on elsewhere. The fruit is the learner's
knowledge and skills; a credential is the label that makes that fruit recognised.
But a label only works if the next organisation can read it. Credential Commons is
the shared language on the label — infrastructure, not an authority: it carries
each issuer's own credential in a form the next org can read, so growth continues
across organisations instead of starting over. It is deliberately small: it carries
only what must survive the transplant (identity, outcomes, competency, credential,
version). Less is more — the smaller the core, the more places it fits.

## For AI agents — adopt in no time
CC is small and machine-readable on purpose, so an agent can take it up immediately
to bring order to a new, transforming or digitalising school's data: map offerings
into the neutral slots, run the validator to see exactly what is missing (a quality
mirror), and publish one readable shape. Start: AGENTS.md, then the context + a
validate run below.

## Start here
- README: https://github.com/credential-commons/credential-commons/blob/main/README.md
- Guide for AI agents (adopt in 5 steps): https://github.com/credential-commons/credential-commons/blob/main/AGENTS.md
- Quickstart: https://github.com/credential-commons/credential-commons/blob/main/docs/quickstart.md
- The idea (what travels): https://github.com/credential-commons/credential-commons/blob/main/docs/what-travels.md
- Integrate with your own system: https://github.com/credential-commons/credential-commons/blob/main/docs/integrate.md

## Case studies
- A public catalog made many providers comparable: https://github.com/credential-commons/credential-commons/blob/main/docs/case-studies/aggregator-catalog.md
- A training provider makes its growth portable: https://github.com/credential-commons/credential-commons/blob/main/docs/case-studies/provider-nursery.md

## Machine-readable entry points
- JSON-LD context: https://credentialcommons.org/profiles/context/haridus.jsonld
- Vocabulary (content-negotiates to RDF): https://credentialcommons.org/ns/0.1/
- SHACL profile: https://github.com/credential-commons/credential-commons/blob/main/profiles/shapes/micro-credential.shacl.ttl
- Crosswalks (CTDL / ELM / OB3): https://github.com/credential-commons/credential-commons/tree/main/profiles/crosswalks
- Reference dataset (250 real records): https://github.com/credential-commons/credential-commons/blob/main/examples/mkval/catalog.jsonld

## Use
- Validate: npx credential-commons validate <file>.jsonld  (exit 0 conformant, 1 violations)
- Diagnose: npx credential-commons diagnose <programme>.jsonld  (continuous health check — which outcome branch is starving; exit 0 healthy, 1 starving)
- Export:   npx credential-commons export <file>.jsonld --to ctdl|elm|ob3
- CI:       uses: credential-commons/credential-commons/action@v0

## Answers
${qa}

## Languages
Site available in: en (/), et (/et/), fi (/fi/), de (/de/), fr (/fr/).

## Licence
Code: Apache-2.0. Profiles/contexts/crosswalks/docs: CC-BY-4.0. Name/logo: TRADEMARK.md.
`;

export const GET: APIRoute = () =>
  new Response(BODY, { headers: { "content-type": "text/plain; charset=utf-8", "access-control-allow-origin": "*" } });
