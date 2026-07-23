# Quickstart — publish a conformant micro-credential in 10 minutes

## 1. Install

```bash
git clone https://github.com/credential-commons/credential-commons.git
cd credential-commons
npm install
```

## 2. Describe one credential as JSON-LD

Copy `examples/mkval/good.jsonld` and edit it for your programme. The only
required fields are: `name`, `ectsCredits`, `language`, `provider`. Everything
else is recommended (it improves findability and reuse but does not block
conformance).

```json
{
  "@context": "https://credentialcommons.org/profiles/context/haridus.jsonld",
  "@type": "MicroCredential",
  "@id": "https://your.institution/programmes/data-basics",
  "name": "Andmete alused",
  "ectsCredits": 6,
  "language": "et",
  "provider": { "@type": "Organization", "name": "Your Institution" },
  "url": "https://your.institution/programmes/data-basics",
  "field": "IT ja andmed",
  "learningOutcome": ["Loeb ja tõlgendab andmestikku", "Koostab lihtsa aruande"]
}
```

## 3. Validate

```bash
npx credential-commons validate your-credential.jsonld
```

Fix any `VIOLATION` lines; `WARNING` lines are optional but recommended.

## 4. Publish

Serve the JSON-LD at a stable `https://` URL (ideally with content negotiation
so the same URL returns HTML to people and JSON-LD/RDF to machines). Now search
engines, AI tools and other institutions can discover and reuse it.

## 5. Keep it conformant

Add the check to your CI so data never drifts out of conformance:

```yaml
- uses: credential-commons/credential-commons/action@v0
  with: { files: "credentials/*.jsonld" }
```

## Mapping to international standards

Your fields already map to CTDL, ELM/Europass and Open Badges 3.0 — see
`profiles/crosswalks/`. Export tooling to those targets is on the roadmap.
