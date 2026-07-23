# Applying the Credential Commons curriculum profile to a website

**Audience:** the developer of a site that publishes curricula / study programmes
(e.g. beta.ettevotluskeskus.ee). **Goal:** every programme page carries a
machine-readable, Credential Commons-conformant description of the curriculum
**structure** — and each one is validated **before it goes live**.

> This is the STRUCTURE layer only. It lives in a `<script>` in the page `<head>`.
> **Do not change the visible page, the design, or the marketing copy.**

## 1. What to add to each programme page

Add one block to the page `<head>` (add it, do not replace existing structured data):

```html
<script type="application/ld+json">
{
  "@context": "https://credentialcommons.org/profiles/context/haridus.jsonld",
  "@type": "Curriculum",
  "@id": "https://beta.ettevotluskeskus.ee/koolitused/<programme-slug>",
  "name": "NovaCore Projektijuhtimise Mikrokvalifikatsioon",
  "summary": "Üherealine kirjeldus.",
  "url": "https://beta.ettevotluskeskus.ee/koolitused/<programme-slug>",
  "field": "Juhtimine ja haldus",
  "language": "et",
  "ectsCredits": 5,
  "clockHours": 130,
  "academicHours": 173,
  "provider": { "@type": "Organization", "name": "Ettevõtluskeskus OÜ" },
  "learningOutcome": [
    "Õpiväljund 1 …",
    "Õpiväljund 2 …"
  ],
  "entryRequirements": "Õpingute alustamise tingimused.",
  "content": "Õppe sisu lühikokkuvõte.",
  "awardedCredential": "Mikrokvalifikatsiooni tunnistus (Ettevõtluskeskus OÜ)"
}
</script>
```

## 2. Fields

**Required** (page is NON-conformant without these):

| Field | Notes |
|---|---|
| `name` | Curriculum name (from the HAKA form) |
| `provider` | `{ "@type": "Organization", "name": "Ettevõtluskeskus OÜ" }` |
| `language` | BCP-47, e.g. `"et"` |
| `learningOutcome` | Array of the õpiväljundid — copy them from the HAKA form verbatim |
| **volume** | At least one of `ectsCredits`, `academicHours`, `clockHours` |

**Estonia — publish BOTH hour units** (this is the whole point):

- `clockHours` — **60-minute** clock/astronomical hours → **HAKA** micro-qualification quality basis.
- `academicHours` — **45-minute** academic hours → **Töötukassa** funding requirement.
- `ectsCredits` — EAP where applicable (1 EAP = 26 clock hours).

Take the numbers **from the course's HAKA official form** in `EVK-KVALITEEDIHALDUS`
(`07-COURSES/<course>/official-docs/`). Do not invent or re-derive them if the
form states them — copy exactly. If only one hour unit is on the form, ask the
course owner for the other; do not guess the conversion for a regulator.

**Recommended** (conformant without them, but add when known): `field`,
`entryRequirements`, `content`, `awardedCredential`, `level`, `url`, `summary`.

## 3. Also add schema.org Course (for Google / AI)

The `cc:Curriculum` block is the interoperability layer. For Google rich results
and AI assistants, ALSO add a standard `schema.org/Course` block (separate
`<script>`), using the same facts. See the crosswalks in `profiles/crosswalks/`
for the field mapping. (Both blocks can coexist in the head.)

## 4. Validate BEFORE go-live — required gate

Every curriculum JSON-LD must pass the `curriculum` profile with **zero
violations**. Warnings are acceptable but should be minimised.

```bash
git clone https://github.com/credential-commons/credential-commons.git
cd credential-commons && npm install
# validate one file:
node validator/cli.mjs validate path/to/programme.jsonld --profile curriculum
# exit code 0 = conformant (ship it); 1 = has violations (fix first)
```

Or in CI (if the site has a pipeline):

```yaml
- uses: credential-commons/credential-commons/action@v0
  with:
    files: "path/to/*.jsonld"
    profile: curriculum
```

## 5. Pre-live checklist (per curriculum)

- [ ] `cc validate … --profile curriculum` → **0 violations**
- [ ] **Both** `academicHours` (Töötukassa) **and** `clockHours` (HAKA) present
- [ ] `learningOutcome` matches the HAKA official form exactly
- [ ] `provider.name` = `"Ettevõtluskeskus OÜ"`
- [ ] `@id` and `url` are the real, stable programme-page URLs
- [ ] Visible page / design / marketing copy unchanged
- [ ] The JSON-LD context URL resolves (https://credentialcommons.org/profiles/context/haridus.jsonld)

## 6. Reference

A real, conformant example (from a HAKA form) is in the repo:
`examples/curriculum/evk-novacore-pm.jsonld`. The profile rules are in
`profiles/shapes/curriculum.shacl.ttl`. Questions → open an issue.
