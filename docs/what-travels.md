# What travels — the transplant test

Every training organisation is a **nursery** (puukool): it helps one skill's
seedling get a strong early start, then the learner's tree is transplanted and
grows on elsewhere, mostly beyond the nursery's reach. The learner owns the tree;
the nursery tends one branch, for one phase.

Credential Commons is the **transplant standard** — the root-ball wrapping that
lets a seedling move from one nursery to the next without dying. CC carries **only
what must survive the transplant**, and nothing else.

## The test

For anything you consider putting in CC, ask one question:

> **Would the *next* organisation need this to recognise and continue the
> learner's growth?**

- **Yes → it travels.** It belongs in CC's airy core: neutral, portable, stable.
- **No → it stays in the nursery.** It is org-internal: keep it in your own
  system, private, and free to differ from every other org.

## What travels (CC's core)

- **Identity** — a stable `@id` for the offering, the outcome and the credential.
- **Learning outcomes** — *what* was learned (the outcome, not the material).
- **Competency alignment** — the skill, named in a framework the next org can read.
- **The credential / achievement** — the personal proof that moves with the learner
  (about a person → PII → restricted, but it travels).
- **The version (ring)** — which version of the curriculum the credential was earned
  against, so the next nursery continues from the right place.

## What stays in the nursery (CC keeps out of the core)

- **Materials** — the readings, videos, quizzes stay put; only *that the learner
  mastered the outcome* travels, never the file.
- **The cohort / voor** — a delivery event that happened here; it does not travel.
- **Participants, rosters, work groups** — the instance layer, mostly personal
  data: restricted, stays.
- **Schedules, sessions, trainers** — delivery mechanics.
- **The org's methods and curriculum workshop** — the nursery's own "genome":
  private, and different in every org.

CC may still offer *optional, neutral slots* for some nursery-internal things (a
public cohort shell, a material link) — but they are **periphery, never core**.
Adding one must never thicken the core.

## Carry the unit, never the conversion

Two failures look alike and both come from a number arriving without its unit.

**Volume.** CC has three separate properties — `cc:ectsCredits`, `cc:academicHours`
(45 min) and `cc:clockHours` (60 min) — precisely so a volume can never be
ambiguous. The unit lives in the property name, not in the value. Publish what the
source states, in the unit it states, and publish several units side by side when
the source gives several. Estonian continuing-education curricula should carry both
hour units, because Töötukassa reads academic hours and HAKA reads clock hours.

**Do not convert between them.** The credit-to-hours ratio is a local convention:
Estonia treats 1 EAP as roughly 26 hours, but providers use anywhere from 25 to 30.
A converted figure is a number no provider ever published, and once it is in the
record nobody downstream can tell it from a stated one. Conversion belongs at the
crosswalk boundary, where it is visible and its cost is declared — this is why
`cc:academicHours` maps to `elm:volumeOfLearning` at *medium* confidence while
`cc:clockHours` maps at *high*: the 45-minute unit needs a conversion, and the
crosswalk says so out loud.

**Price is the same trap, and a real one.** A provider page stating
*"2250 EUR total, 1 ECTS is 75 EUR"* offers two correct numbers for one field. An
aggregator took the second, and a 2250 EUR programme was advertised for months at
75 EUR — through its catalogue page, its share cards, its price range and its
machine-readable output. `cc:price` is therefore defined as the **total for the
whole offering**; a per-unit rate is not expressed in CC at all. If you need to
publish a unit rate, publish it in your own system: it is a commercial fact about
your offering, and by the test above it does not travel.

That last point is worth stating plainly: price does not pass the transplant test.
The next organisation does not need it to recognise a credential or continue a
learner's growth. `cc:price` exists as periphery for catalogue use, never as core,
and no profile requires it.

## Why this is the whole point

The tree leaves. If what you grew cannot travel, the next organisation cannot read
it and the learner starts over. CC exists so growth is **continuable across
organisations** — one portable language for the few things that must move. Less is
more: the smaller the core, the more places it fits.
