# Credential Commons — guide for AI agents

<!-- AMOS-TÖÖKORD:ALGUS (allikas: arthunt/amos-ops agents/amos-tookord-plokk.md – ära muuda siin) -->
## AMOS-i ühine töökord (omanik 16.10.2026)

Kehtib igale sessioonile ja agendile (Claude Code, Codex, pilv) selles repos. Täistekst: `arthunt/amos-ops` → `agents/uhised-reeglid.md` ja `docs/po-harta.md`.

- **Kohustus = GitHub issue.** Selle repo töö issue on selles repos. Kui töö puudutab mitut repot või hosti, tee issue repos `arthunt/amos-ops`. Sõnum ilma issue'ta ununeb.
- **Sildid:** `ala:<ala>` (üks), `olek:töös` / `olek:blokeeritud`, `omanik` (vajab omaniku otsust), `teise-ala`, `prio:kõrge`. Issue keha: `Väärtus:` (konversioon / õppija edu / CS aeg) ja `Valmis, kui:`.
- **Alustades** vaata oma ala järjekorda ja võta suurima väärtusega asi, mitte kõige uuem sõnum. WIP ≤ 5 `olek:töös`; GO + pakett valmis ja ootab ainult live'i akent → `olek:ootab-akent` (ei loe WIP-i). Sulge ainult tõendiga (PR, readback, link).
- **Merge klassi järgi** (autor ≠ kontrollija):
  - **A** (docs, logid, mälu): ise, kui CI on roheline. **Agentide reeglid (CLAUDE.md, AGENTS.md, `.claude/`) on B.**
  - **B** (õppijale/kliendile minev sisu): ise pärast valideerija GO-d (silt `valideerija-go`), tarne merge'itud sha-st;
  - **C** (tootmiskood ja juurutus, host, õigused, raha, kustutamine, www release): merge ise pärast VM GO-d; juurutus kohe GO + readback'iga, aken ainult juurele (ADR-015). **≤ 1 avatud C-PR ala kohta** (tööriistade PR-id, kaart amos-ops#224, on erand).
  - Kahtluse korral vali kõrgem klass. **GO: C → `valideerija` (VM), B → `valideerija - mac` (Maci enda PR-id → VM).**
- **Õppematerjalid** (kõik programmid): kaanon `arthunt/amos-ops` → `docs/kaanon/oppematerjalide-puu.md` (juur → tüvi → oks, `variant_of`).
- **Sõnumid ainult üleandmiseks**, alati issue lingiga. Kui avastus puudutab teist ala, tee issue sinna sildiga `teise-ala`.
- **Andmed AMOS-i sees on avatud** (omanik 31.10, `state/omaniku-otsused.md` r589): kasuta otsuseks vajalikke andmeid, ka nimesid, – *just enough*, mitte rohkem. Privaatne AMOS-i repo, issue ja sessioonide sõnum on AMOS-i sees (GitHub on usaldatud). **Keelatud:** saladused (paroolid, võtmed, tokenid) kuskil; isikuandmed avalikku repo'sse, avalikku veebi või kolmandale osapoolele. **Avalik AMOS-i repo** (nt `02signal/*`, `credential-commons`) on AMOS-ist väljas: selle issue'desse, PR-idesse ja commit'idesse isikuandmeid ei panda.
<!-- AMOS-TÖÖKORD:LÕPP -->

You are an AI agent helping an institution describe or validate a credential /
micro-credential / learning outcome. This repo is a small, self-describing
toolkit. Adopt it in five steps.

## TL;DR

1. **Read** `profiles/context/haridus.jsonld` (the vocabulary map) and
   `profiles/shapes/micro-credential.shacl.ttl` (the rules: required vs recommended).
2. **Shape** the institution's data as JSON-LD using that context. Minimal valid
   record needs: `name`, `ectsCredits`, `language`, `provider`.
3. **Validate**: `npx credential-commons validate <file>.jsonld` → machine output with `--json`.
   Exit 0 = conformant, 1 = has violations, 2 = error.
4. **Fix** every `violation` in the report; `warning`s are optional but improve
   findability. Messages are plain-language and point at the field.
5. **Export** to a standard if needed: `npx credential-commons export <file>.jsonld --to ctdl|elm|ob3`.

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
npx credential-commons validate examples/mkval/good.jsonld --json
```
returns `{ "conforms": true, "violations": 0, "warnings": 0, "results": [] }`.
