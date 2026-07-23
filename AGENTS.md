# Credential Commons — guide for AI agents

You are an AI agent helping an institution describe or validate a credential /
micro-credential / learning outcome. This repo is a small, self-describing
toolkit. Adopt it in five steps.

## TL;DR

1. **Read** `profiles/context/haridus.jsonld` (the vocabulary map) and
   `profiles/shapes/micro-credential.shacl.ttl` (the rules: required vs recommended).
2. **Shape** the institution's data as JSON-LD using that context. Minimal valid
   record needs: `name`, `ectsCredits`, `language`, `provider`.
3. **Validate**: `npx cc validate <file>.jsonld` → machine output with `--json`.
   Exit 0 = conformant, 1 = has violations, 2 = error.
4. **Fix** every `violation` in the report; `warning`s are optional but improve
   findability. Messages are plain-language and point at the field.
5. **Export** to a standard if needed: `npx cc export <file>.jsonld --to ctdl|elm|ob3`.

## Canonical machine-readable entry points

| Resource | Path / URL |
|---|---|
| JSON-LD context | `https://credentialcommons.org/profiles/context/haridus.jsonld` |
| SHACL profile | `profiles/shapes/micro-credential.shacl.ttl` |
| Crosswalks | `profiles/crosswalks/{ctdl,elm,ob3}.yaml` |
| Reference data (250 real records) | `examples/mkval/catalog.jsonld` |
| Programmatic API | `import { validate, exportDoc } from "./validator/…"` (returns structured objects) |

## Rules of thumb

- **Reuse terms, don't invent.** Prefer `schema:`, `haridus:` (schema.edu.ee),
  `dcterms:`. Only `cc:` when nothing fits.
- **Warnings ≠ failure.** Conformance is about `violation`s only.
- **Nothing is dropped silently.** `cc export` reports unmapped fields on stderr.
- Deterministic & offline: the validator resolves the context locally, so runs
  are reproducible without network.

## One-shot example

```bash
npx cc validate examples/mkval/good.jsonld --json
```
returns `{ "conforms": true, "violations": 0, "warnings": 0, "results": [] }`.
