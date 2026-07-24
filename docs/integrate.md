# Integrating Credential Commons with your own product tree

This guide is for developers adopting Credential Commons (CC). It defines the
**principles**, the **architecture**, and the **connection points** you plug into
— so you can *localise* CC onto whatever product/operations system you already run,
without CC dictating your internals.

CC is not a catalog, a portal, or a system to migrate to. **CC is the neutral
language your catalog speaks outward.** You keep your own tree; CC gives you a
stable public socket. (Background: [`living-tree-and-two-trees.md`](living-tree-and-two-trees.md).)

## 1. Principle: socket public, wiring private

- CC defines **neutral, framework-agnostic slots** (the socket). These are stable
  and public.
- **Which of your internal fields fills each slot is your private business** (the
  wiring). Keep that mapping in your own repo; never adopt CC into your internals
  or push your internals into CC.
- The same neutral socket that lets *other institutions* interoperate is also the
  socket that lets *your own* systems (catalog, LXP, CRM, warehouse) speak one
  language to each other.

## 2. Scope: what CC covers, and what stays yours

CC models **types** (the curriculum and credential *definitions* — public, no
personal data). Your system keeps the **instances** (real runs, real people —
mostly personal data, your restricted zone).

| CC covers (types — public, no PII) | Stays in your tree (instances — often PII, restricted) |
|---|---|
| Programme, Course, Session (schedule shape) | a **cohort / intake** (a real scheduled run) |
| Learning outcome, material, competency alignment | **participants**, rosters, enrolments |
| Credential *definition* (what can be earned) | **work groups**, teams |
| — | a credential **issued to a person** (achievement) → PII, restricted |

**Cohorts, participants and work groups are the instance layer** — where a type is
grown into real life, bound to time and people. They are not nodes in CC's
knowledge tree. They live in your product/operations tree and its restricted zone.
CC touches them at exactly one seam: the credential a participant earns.

## 3. The three connection points (where the two trees meet)

Everything crosses at just three seams. Wire only these:

1. **Catalog offering ↔ CC `Programme` / `Course`** — your catalog node projected
   as a CC type. This is the trunk: one canonical identity, a stable `@id`.
2. **Your outcomes ↔ CC `LearningOutcome`** — the branches. Shared `@id` for a
   cross-cutting (*läbiv*) outcome; `broader` for roll-up.
3. **Your credential ↔ CC `MicroCredential`** (public definition) **/ `Achievement`**
   (issued to a person — PII, restricted). The fruit.

## 4. How to localise (the steps)

1. **Map, don't migrate.** For each CC slot, name the internal field that fills it.
   Keep this crosswalk in *your* repo (private). CC only guarantees the socket.
2. **Project, don't expose.** Publish public-safe CC JSON-LD at the three seams via
   a view/endpoint derived from your store — never the raw internal store, never a
   person row.
3. **Types out, instances in.** Only curriculum/credential *types* leave your
   system. Cohorts, participants and rosters stay in your restricted zone; only the
   credential fruit crosses, PII-gated.
4. **Keep the rings.** Version your types with validity dates, so a credential can
   always be read against the version its cohort ran on. Never silently overwrite.
5. **Neutral names in the projection.** The public projection uses CC's neutral
   names, not yours. Your names stay in the private crosswalk.

## 5. What a developer must hold in mind

- Neutral names in public; internal names only in your private crosswalk.
- Three seams only — catalog, outcomes, credential.
- Types are public and PII-free; instances (cohorts/participants) are restricted.
- Retain history — a credential is a claim about a specific version (ring).
- CC is the socket; your tree is yours; you never rebuild one inside the other.
