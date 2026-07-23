# Making a data warehouse Credential Commons-conformant

**Audience:** an engineer maintaining a relational/analytical warehouse of
credential, micro-credential or curriculum data. **Goal:** every record the
warehouse holds can be projected into a Credential Commons-conformant shape,
validated automatically on ingest, and published as reusable Linked Data — so
"conformance" becomes a first-class data-quality metric, not an afterthought.

> Structure only. This does not dictate your storage engine or your BI layer —
> it defines the **shape** the data must be projectable into.

## Canonical resources (full links)

- Spec & tools: https://github.com/credential-commons/credential-commons
- JSON-LD context (resolves): https://credentialcommons.org/profiles/context/haridus.jsonld
- Vocabulary (content-negotiates to RDF): https://credentialcommons.org/ns/0.1/
- Profiles (SHACL):
  - micro-credential — https://github.com/credential-commons/credential-commons/blob/main/profiles/shapes/micro-credential.shacl.ttl
  - curriculum — https://github.com/credential-commons/credential-commons/blob/main/profiles/shapes/curriculum.shacl.ttl
- Validator (CLI + API): https://github.com/credential-commons/credential-commons/tree/main/validator
- Crosswalks (CTDL / ELM / OB3): https://github.com/credential-commons/credential-commons/tree/main/profiles/crosswalks
- Reference data (250 real records): https://github.com/credential-commons/credential-commons/blob/main/examples/mkval/catalog.jsonld
- Real curriculum example: https://github.com/credential-commons/credential-commons/blob/main/examples/curriculum/evk-novacore-pm.jsonld
- Site-application guide (per page): https://github.com/credential-commons/credential-commons/blob/main/docs/apply-curriculum.md

## The seven principles

### 1. Choose the profile per record type
- Short single-skill units (micro-credentials / micro-qualifications) → **micro-credential** profile (`cc:MicroCredential`).
- Full study programmes / continuing-education curricula (õppekava) → **curriculum** profile (`cc:Curriculum`).
Keep the `@type` explicit on every projected record.

### 2. Map columns to CC terms, don't rename your tables
Add a **projection** (a SQL `VIEW` / materialized view, or a build step that emits
JSON-LD) — do **not** destructively rename core columns. Typical mapping:

| Warehouse column | CC term |
|---|---|
| stable record id / URL | `@id` (a persistent `https://` URI) |
| title | `schema:name` (`name`) |
| provider / institution | `provider` → `{ "@type": "Organization", "name": … }` |
| subject field | `cc:field` (`field`) |
| language | `dcterms:language` (`language`, BCP-47) |
| ECTS / EAP | `cc:ectsCredits` (`ectsCredits`) |
| **academic hours (45 min)** | `cc:academicHours` |
| **clock hours (60 min)** | `cc:clockHours` |
| outcomes (child rows) | `cc:learningOutcome` (`learningOutcome`, array) |
| entry conditions | `cc:entryRequirements` |
| content outline | `cc:content` |
| document awarded | `cc:awardedCredential` |

### 3. Store BOTH hour units for curricula
Estonian continuing education has two regulators with two units:
- `cc:clockHours` — 60-minute clock/astronomical hours → **HAKA** quality basis.
- `cc:academicHours` — 45-minute academic hours → **Töötukassa** funding.
Persist **both** columns. Never derive one from the other for a regulator — carry
the figures the course's official (HAKA) form states. `cc:ectsCredits` where it applies.

### 4. Validate on ingest — conformance as a metric
On every ingest, project each record to CC JSON-LD and run it through the profile.
Store the result (violations, warnings) next to the row or in your job ledger, so
data-quality gaps (missing outcomes, missing a hour unit) are visible and trend
over time. Treat a rising violation count as a quality regression.

```bash
git clone https://github.com/credential-commons/credential-commons.git
cd credential-commons && npm install
node validator/cli.mjs validate projected-record.jsonld --profile curriculum   # or micro-credential
# exit 0 = conformant; 1 = violations
```
Programmatic: `import { validate } from "credential-commons/validator/validate.mjs"` → `{ conforms, violations, warnings, results }`.

### 5. Persistent identifiers + append-only history
Use stable `https://` `@id`s (not internal serial ids) so records are dereferenceable
and joinable across systems. Keep change/history tables append-only with a content
hash for idempotent re-ingest, so history accumulates truthfully.

### 6. Privacy: never load person data
Credential/curriculum records are about programmes, not people. Do not ingest
board members, beneficial owners, personal ID numbers or contacts. Keep column-level
`CHECK` constraints on text columns to fail closed if PII ever leaks in.

### 7. Publish a CC-conformant feed
Emit a JSON-LD artifact (`@context` = the CC context above, `@graph` of records)
from the warehouse. Public sites consume this one source of truth (see
`apply-curriculum.md`), so the site, the warehouse and the spec never drift.

## Definition of done

- [ ] Every record projects to `cc:MicroCredential` or `cc:Curriculum`
- [ ] Ingest validates against the profile; conformance stored as a metric
- [ ] Curricula carry **both** `academicHours` and `clockHours`
- [ ] `@id`s are stable `https://` URIs; history append-only; no PII
- [ ] A CC-conformant JSON-LD feed is published for downstream sites
