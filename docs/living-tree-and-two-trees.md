# The two trees, and why the catalog is the trunk

A design note on how Credential Commons positions itself. It is common to model a
whole education operation as a **living, organically growing tree**. This note
records how CC relates to that picture, so CC stays a thin, neutral lattice and
never tries to become the whole system.

## Two trees, one vocabulary

There are **two different trees** that share botanical words but mean different
things. Do not conflate them.

| | **Product / operations tree** | **Knowledge / credential tree** (Credential Commons) |
|---|---|---|
| Roots | data sources & infrastructure | the learner's **prior knowledge & entry requirements** (andragogy) |
| Soil | budget, resources | the field / real practice |
| Trunk | the catalog / warehouse spine | the **programme** |
| Branches | product families / lines | **learning outcomes** |
| Leaves | delivery events & variants | **learning materials** |
| Fruit | revenue, outcomes | the **credential / competence** |

The first tree is how an *organisation* grows and runs its offerings — its own
internal concern. The second is how *knowledge* develops and is credentialed.
**CC lives in the knowledge/credential tree.** The two meet at exactly three
points — the catalog offering, the learning outcomes, and the credential — and CC
*crosswalks* to an operations tree at those points; it never owns or rebuilds one.

## The catalog is the trunk

CC's outward message: **the catalog is the trunk — one trunk, many branches.** A
tree has one trunk; every branch and leaf connects through it. That is CC's whole
value: one interoperable reference point. (Seen from a curriculum-development
angle a catalog can look like the *crown* — the finished output — but for an
interoperability layer the useful framing is the trunk: the single spine everyone
connects to.)

## Neutral names, with a crosswalk

CC mints **neutral, framework-agnostic names** and expects each adopter to map
them to whatever their own systems already call these things. CC must not adopt
any one system's internal vocabulary — that would stop being a commons. The
mapping from CC's neutral names to an adopter's internal columns is the adopter's
private business; CC only guarantees the neutral socket is stable.

Examples of the neutral concepts an adopter maps onto:

- `growsFrom` — developmental lineage (an adopter's "prerequisite" relation).
- `stage` — maturity, framework-agnostic (an adopter's lifecycle / Bloom / SOLO ladder).
- `crossCutting` — a *läbiv* outcome threaded through a programme (an adopter's "swimlane" or themed thread).
- `broader` — roll-up of narrow outcomes into broad ones.
- a stable `@id` — the adopter's canonical, never-changing identifier.

## Growth rings — history is first-class

Wood is knowledge crystallised. **Rings are knowledge crystallised *in time*** —
each ring is one retained version, frozen and never overwritten. Two reasons this
is load-bearing, not bookkeeping:

1. **Structural.** This year's growth sits on last year's ring. Discard the rings
   and the tree collapses — retained history is what new growth stands on.
2. **A credential is a claim about a specific ring.** Verifying a past credential
   means reading *the ring it grew in* — the outcome as it stood at issue time, not
   today's. Version history is what keeps a credential trustworthy over time.

Therefore CC treats **retained history (versioning, with validity dates) as
first-class**: an outcome or offering is never silently overwritten; each version
is kept so a credential can always be read against the ring it grew in.

## What CC will not do

- Not rebuild an operations/product system; not own that tree.
- Not pick a competency framework, a stage ladder, or a compliance scheme —
  it offers the neutral slots those fill.
- Not become a catalog or portal — it is the language a catalog speaks outward.
