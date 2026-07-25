# The health check — watching the living tree

Organic structures are not tended at harvest; they are tended **daily**. A gardener
walks the rows, spots a yellowing leaf, and gives water, nutrients or treatment *in
time*. `cc diagnose` is that daily walk for a curriculum — a **continuous health
monitor**, not an end-of-course gate.

```
npx credential-commons diagnose my-programme.jsonld
```

## What it checks

It reads a whole programme graph (a programme with its courses, outcomes and
materials) and asks whether the living chain is unbroken:

```
programme outcome  ←(reached by)—  course outcome  ←(taught by)—  material
```

- **starving — uncovered outcome:** a programme outcome that no course outcome
  reaches (none shares its `@id` as a cross-cutting outcome, and none rolls up into
  it via `broader`). A branch with nothing feeding it.
- **starving — dangling roll-up:** a `broader` that points into an outcome not
  defined in the graph. A branch grafted to nothing.
- **to tend — outcome without material:** a course outcome that no learning
  material teaches yet. Not fatal, but a leaf that should be growing.

Exit code `0` when nothing is starving (warnings are fine), `1` when a branch is
starving. Add `--json` for a machine-readable report.

## How to use it — daily, everywhere

Run it in CI on every change, and on a schedule over your live catalogue. Then your
own tree — the school's programmes — stays visibly healthy: you see where a branch
is starving and can give the nutrient (a missing outcome link, a missing material)
**at the right time and in the right place**, before it shows up as a gap for a
learner.

CC **diagnoses; it does not treat.** The health monitor tells you where to act; the
tending — writing the material, fixing the roll-up — is the gardener's work, and
stays yours. That is the enabling constraint: a shared, travelling structure is what
makes fast daily correction possible at all.
