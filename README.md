# Credential Commons

**Open tools to validate and publish credential and learning-outcome data against shared education ontologies — fast.**

Credential Commons is not a new ontology and not a portal. It is a thin, open
**interoperability + conformance layer**: machine-readable *profiles* (what a good
record looks like), a *validator* (does your data conform?), and *crosswalks*
(how your fields map to international standards). It is built to be an **ally** of
national vocabularies such as [schema.edu.ee](https://schema.edu.ee/) — it reuses
their terms rather than replacing them.

> Status: **v0.1, early.** One profile (`micro-credential`), one reference
> dataset (Estonian micro-qualifications). Built to grow by contribution.

## Why

Standards for describing credentials already exist — [schema.edu.ee](https://schema.edu.ee/),
[CTDL](https://credreg.net/), the [European Learning Model](https://europa.eu/europass/elm-browser/),
[Open Badges 3.0](https://www.imsglobal.org/spec/ob/v3p0). What is missing is a
*fast, batteries-included way to adopt them*. Credential Commons is that path:
point the validator at your data, get a plain-language report of what to fix, and
publish conformant Linked Data other systems (search, AI, other institutions) can
reuse.

## Quick start

```bash
npm install
npx cc validate examples/mkval/good.jsonld
```

```
Credential Commons — profile "micro-credential"
file: examples/mkval/good.jsonld

✓ conformant — no issues.
```

Try the intentionally-incomplete record to see a report:

```bash
npx cc validate examples/mkval/invalid.jsonld
#   ✗ VIOLATION ectsCredits  — ECTS/EAP credit value is REQUIRED
#   ✗ VIOLATION language     — Language is REQUIRED (BCP-47, e.g. "et")
#   ...
```

Add `--json` for machine-readable output, e.g. in CI.

## What's in here

| Path | What |
|---|---|
| `profiles/context/` | JSON-LD context — friendly keys → shared IRIs (schema.org, `haridus:`, dcterms) |
| `profiles/shapes/` | SHACL profiles — the conformance rules (required vs recommended) |
| `profiles/crosswalks/` | Field maps to CTDL, ELM/Europass, Open Badges 3.0 |
| `validator/` | `cc` CLI — validate JSON-LD against a profile |
| `action/` | GitHub Action to run the validator in any institution's CI |
| `examples/mkval/` | Reference dataset: real Estonian micro-qualifications, conformant |

## Use it in your own CI

```yaml
- uses: credential-commons/credential-commons/action@v0
  with:
    files: "data/*.jsonld"
    profile: micro-credential
```

## Governance & licence

- Code: **Apache-2.0**.
- Profiles, contexts, crosswalks, docs: **CC-BY-4.0** (`profiles/LICENSE.md`).
- Neutral, open steward; institutions welcome as contributors. See
  [`CONTRIBUTING.md`](CONTRIBUTING.md).

A hosted validator and integration service run on top of this open spec at
[credentialstudy.com](https://credentialstudy.com). The spec here stays free and
open; anyone can fork, self-host, or extend it.
