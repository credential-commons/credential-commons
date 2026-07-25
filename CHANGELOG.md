# Changelog

Notable changes to Credential Commons. The format loosely follows
[Keep a Changelog](https://keepachangelog.com/). The project is **pre-stable (0.x)** —
any part may change between minor versions; see [`VERSIONING.md`](VERSIONING.md).
Every change is recorded here with migration notes so humans and agents can follow
the standard's growth precisely.

## [Unreleased]

### Added
- Profiles beyond the first two: `course`, `program`, `achievement`,
  `competency-alignment`, `learning-resource`, `learning-outcome`, `cohort` (voor)
  — **nine profiles** in total.
- Learning outcomes as identified nodes: cross-cutting outcomes via a shared `@id`,
  roll-up via `broader` (skos:broader), developmental lineage via `growsFrom` (proposed).
- Cohort/voor as the one public-safe delivery instance (dates + seats, never a roster);
  `achievement` can bind to its cohort.
- Docs: `SCAFFOLD.md`, `docs/choosing-frameworks.md`, `docs/integrate.md`,
  `docs/what-travels.md`, `docs/living-tree-and-two-trees.md`, and two case studies.
- Site: content-negotiating `/ns/` vocabulary for all terms; a translated
  **"Why Credential Commons"** page (en/et/fi/de/fr); `llms.txt` value story and
  agent guidance; cookieless (Umami) analytics readiness.
- `VERSIONING.md` and this changelog.

### Changed
- Renamed `FRAMEWORK.md` → `SCAFFOLD.md`.
- Fixed the homepage CLI example (`npx credential-commons`, not `npx cc`).

### Migration
- No breaking changes to the existing `micro-credential` or `curriculum` profiles.
  New profiles are additive; the `@context` gained new terms only.

## [0.1.0] — 2026-07-23

### Added
- Initial release: `micro-credential` and `curriculum` profiles, the JSON-LD context,
  a real SHACL validator + CLI, exporters (CTDL / ELM / OB3), a GitHub Action, a
  250-record reference dataset, and an i18n site with dereferenceable `cc:` vocabulary.
- Published to npm as `credential-commons@0.1.0`.
