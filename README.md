# Credential Commons

**Open tools to validate and publish credential and learning-outcome data against shared education ontologies — fast.**

Credential Commons is not a new ontology and not a portal. It is a thin, open
**interoperability + conformance layer**: machine-readable *profiles* (what a good
record looks like), a *validator* (does your data conform?), and *crosswalks*
(how your fields map to international standards). It **reuses and supports**
national vocabularies such as [schema.edu.ee](https://schema.edu.ee/) rather than
replacing them.

> Status: **0.x, pre-stable** (see [`VERSIONING.md`](VERSIONING.md)). Nine profiles —
> `micro-credential`, `curriculum`, `course`, `program`, `learning-outcome`,
> `learning-resource`, `competency-alignment`, `achievement`, `cohort` — plus a
> continuous health check (`cc diagnose`). Framework-neutral by design; built to
> grow by contribution.

## Why

Vocabularies for describing credentials already exist — [schema.edu.ee](https://schema.edu.ee/),
[CTDL](https://credreg.net/), the [European Learning Model](https://europa.eu/europass/elm-browser/).
What is missing is a *fast, batteries-included way to adopt them*. Credential
Commons is that path: point the validator at your data, get a plain-language
report of what to fix, and publish conformant Linked Data other systems (search,
AI, other institutions) can reuse.

## How it relates to other standards

**Credential Commons does not compete with Verifiable Credentials or Open Badges.**
A credential has two halves, and they are different jobs:

- **What is this thing?** — name, volume, language, provider, learning outcomes,
  which version of the curriculum it belongs to. *This is Credential Commons.*
- **Who earned it, and who says so?** — the person, the date, the evidence, the
  issuer's signature. *This is [W3C Verifiable Credentials](https://www.w3.org/TR/vc-data-model-2.0/)
  and [Open Badges 3.0](https://www.imsglobal.org/spec/ob/v3p0).*

Most of the work happens before anyone earns anything, and none of it has a person
in it — which is why it can be published openly. A signature proves authorship, not
quality: a badge with no volume, no language and a one-line description signs and
verifies exactly as cleanly as a complete one. Credential Commons is the check that
runs before the signature, and `cc export --to ob3` hands the result straight over.

| Standard | What it actually is | You need it when… | What it does not do |
|---|---|---|---|
| **Credential Commons** | A thin shared shape for describing an offering, a curriculum and a credential — plus a validator that tells you what is missing. | You want your catalogue, curricula and credentials readable by other organisations, and you want to know whether your data is complete. | Issues nothing, signs nothing, awards nothing to a person. Not an authority, no stamp of its own. |
| **W3C Verifiable Credentials** | A container and signature format: proof that a named issuer said something about a named subject, unaltered since. | You must prove who issued a credential and that nobody changed it — wallets, cross-border checks, fraud-sensitive contexts. | Says nothing about what a credential should contain. Empty content signs as well as complete content. |
| **Open Badges 3.0** | A Verifiable Credentials profile for achievements: this person earned this achievement, with evidence and a date. | You award something to individual people and want it in a wallet or badge platform. | `creditsAvailable` is a bare number with no unit, so ECTS and EAP cannot be told apart; `criteria` is free narrative, not structured learning outcomes. |
| **CTDL** | A rich vocabulary for credentials, competencies and the organisations behind them, used mainly in the US. | You publish into the US credential ecosystem, or need its depth of credential-type distinctions. | It is large. Adopting it fully is a project, not an afternoon. |
| **ELM / Europass** | The European Learning Model — the data model behind Europass and European digital credentials. | You need European recognition: Europass, EQF levels, cross-border mobility. | Built for the European formal machinery; does not tell you whether your own data is complete. |
| **schema.edu.ee** | A national vocabulary that fixes local meaning. Other countries have their own. | You operate in that country and the local terms have to be exact. | On its own it does not travel outside its country. |
| **schema.org** | The general web vocabulary search engines and AI assistants already read. | You want your programmes understood on the open web. | For education it stays shallow: a bare credit count and a competency link exist, but no ECTS model, no outcome structure, no versioning. |

**Where the join is still rough.** Exporting to Open Badges 3.0 currently loses the
two things that matter most in Europe: OB3's credit field carries no unit, so
ECTS/EAP must still travel as an alignment or an extension, and `criteria` is
narrative, so structured learning outcomes map only loosely (see
[`profiles/crosswalks/ob3.yaml`](profiles/crosswalks/ob3.yaml), a starter mapping).
That gap is exactly why a description layer is needed — and closing it properly is
open work. Pull requests welcome.

Longer version, in five languages: <https://credentialcommons.org/standards>

## Quick start

```bash
npm install
npx credential-commons validate examples/mkval/good.jsonld
```

```
Credential Commons — profile "micro-credential"
file: examples/mkval/good.jsonld

✓ conformant — no issues.
```

Try the intentionally-incomplete record to see a report:

```bash
npx credential-commons validate examples/mkval/invalid.jsonld
#   ✗ VIOLATION ectsCredits  — ECTS/EAP credit value is REQUIRED
#   ✗ VIOLATION language     — Language is REQUIRED (BCP-47, e.g. "et")
#   ...
```

Add `--json` for machine-readable output, e.g. in CI.

### Validate a whole catalog at once

The reference dataset `examples/mkval/catalog.jsonld` is **250 real Estonian
micro-qualifications** (generated from a live feed via `scripts/from-mkval-feed.mjs`).
Validating the graph reports data-quality gaps at scale:

```bash
npx credential-commons validate examples/mkval/catalog.jsonld
#   !   45×  Recommended: at least one learning outcome
#   ✗   22×  ECTS/EAP credit value is REQUIRED
#   ✗ NOT conformant — 22 violation(s), 45 warning(s) across 59 record(s).
```

### Export to an international standard

```bash
npx credential-commons export examples/mkval/good.jsonld --to ctdl   # or elm, ob3
```

Emits the record mapped onto CTDL / ELM-Europass / Open Badges 3.0 via the
crosswalks, and reports any field it could not map (nothing is dropped silently).

## What's in here

| Path | What |
|---|---|
| `profiles/context/` | JSON-LD context — friendly keys → shared IRIs (schema.org, `haridus:`, dcterms) |
| `profiles/shapes/` | SHACL profiles — the conformance rules (required vs recommended) |
| `profiles/crosswalks/` | Field maps to CTDL, ELM/Europass, Open Badges 3.0 |
| `validator/` | `cc` CLI — `validate` a record, `diagnose` a programme's health, `export` to CTDL/ELM/OB3 |
| `action/` | GitHub Action to run the validator in any institution's CI |
| `examples/mkval/` | Reference dataset: real Estonian micro-qualifications, conformant |

## Use it in your own CI

```yaml
- uses: credential-commons/credential-commons/action@v0
  with:
    files: "data/*.jsonld"
    profile: micro-credential
```

## For AI agents

This repo is self-describing for automated adoption: see [`AGENTS.md`](AGENTS.md)
(5-step adoption), [`docs/llms.txt`](docs/llms.txt), and the machine-readable
entry points (JSON-LD context, SHACL profile, crosswalks). The validator has a
programmatic API (`import { validate, exportDoc }`) returning structured objects,
and `--json` output for shell use.

## The scaffold

CC is a **scaffold** — a high, airy lattice of slots and edges, deliberately
mostly empty. The full skeleton — entities, relationships, and what CC reuses vs
develops per layer — is in [`SCAFFOLD.md`](SCAFFOLD.md). It enables, and may
*guide* on which framework fits a slot ([`docs/choosing-frameworks.md`](docs/choosing-frameworks.md)),
but never fills itself or mandates a framework.

## Roadmap

- **Now (0.x):** nine profiles across the layers (offerings, delivery, substance,
  credential, achievement, cohort), the SHACL validator + CLI, a **health check**
  (`cc diagnose`) that flags which outcome branch is starving, CTDL/ELM/OB3
  crosswalks, a 250-record reference dataset, a GitHub Action, a published context +
  dereferenceable vocabulary, a [versioning policy](VERSIONING.md), and an i18n site.
- **Next (only as adopters need it):** deeper structural exporters (CTDL
  `QuantitativeValue` for credits, `CredentialAlignmentObject` for outcomes);
  optional assessment and enrolment/xAPI profiles; a hosted web validator.
- **At 1.0:** stable, permanent URIs and SemVer guarantees.

CC mandates **no** competency or level framework — EQF and the like are realisations
that fill neutral slots (see [`docs/choosing-frameworks.md`](docs/choosing-frameworks.md)).
Contributions welcome — see [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Who's using it

See [`ADOPTERS.md`](ADOPTERS.md) and add yourself. Because adopters reference the
public `@context` URL, conformant data is also discoverable in the wild — adoption
means published interoperable data, not a tracked install.

## Governance, licence & responsibility

- **Code** (`validator/`, `action/`, `scripts/`): **Apache-2.0**. It includes an
  explicit *no-warranty* and *limitation-of-liability* clause (§7–8): the software
  is provided "as is" and you are responsible for how you use it. That is the
  standard, deliberate split — maximum freedom to adopt, no liability transferred
  to contributors.
- **Profiles, contexts, crosswalks, docs**: **CC-BY-4.0** (`profiles/LICENSE.md`) —
  free to use/adapt commercially with attribution.
- **Name & logo**: project marks, see [`TRADEMARK.md`](TRADEMARK.md). Open
  substance, protected identity — so "Credential Commons conformant" stays
  meaningful. There is no paid gate to *being* conformant; if `cc validate`
  passes, your data is conformant.
- Inbound contributions are licensed under the same terms (see `CONTRIBUTING.md`).

Credential Commons is a neutral, open steward; institutions are welcome as
contributors. It is used in production by
[mikrokvalifikatsioon.ee](https://mikrokvalifikatsioon.ee), which publishes its
catalogue with these profiles. A hosted validator and integration service
(credentialstudy.com) is planned. The spec here stays free and open; anyone can
fork, self-host, or extend it.
