import type { APIRoute } from "astro";
import { faq } from "../i18n/faq";

const qa = faq.en.map((x) => `### ${x.q}\n${x.a.replace(/`/g, "")}`).join("\n\n");

const BODY = `# Credential Commons

> Open tools to validate and publish credential and learning-outcome data
> against shared education ontologies. Not a new ontology or portal — a thin
> interoperability + conformance layer (JSON-LD profiles, a SHACL validator, and
> crosswalks to CTDL, ELM/Europass and Open Badges 3.0). Reuses and supports
> national vocabularies such as schema.edu.ee rather than replacing them.

## Start here
- README: https://github.com/credential-commons/credential-commons/blob/main/README.md
- Guide for AI agents (adopt in 5 steps): https://github.com/credential-commons/credential-commons/blob/main/AGENTS.md
- Quickstart: https://github.com/credential-commons/credential-commons/blob/main/docs/quickstart.md

## Machine-readable entry points
- JSON-LD context: https://credentialcommons.org/profiles/context/haridus.jsonld
- Vocabulary (content-negotiates to RDF): https://credentialcommons.org/ns/0.1/
- SHACL profile: https://github.com/credential-commons/credential-commons/blob/main/profiles/shapes/micro-credential.shacl.ttl
- Crosswalks (CTDL / ELM / OB3): https://github.com/credential-commons/credential-commons/tree/main/profiles/crosswalks
- Reference dataset (250 real records): https://github.com/credential-commons/credential-commons/blob/main/examples/mkval/catalog.jsonld

## Use
- Validate: npx credential-commons validate <file>.jsonld  (exit 0 conformant, 1 violations)
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
