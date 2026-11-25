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

Use the JSON-LD default graph for the programme, its courses, outcomes and
materials. A single top-level `@graph` without a graph `@id` can group the nodes.
Declare courses through `hasPart` as inline `Course` nodes or as `@id` references
to courses in the default graph. The health check runs offline and skips nodes
inside named graphs. Use `validate --profile program` to check catalogue summary
structure.

- **starving — missing course parts:** a programme declares no course through
  `hasPart`. Add at least one course.
- **starving — unresolved or invalid course part:** a part is absent from the
  supplied graph or does not identify a `Course`. Include that course or fix the
  link. Each part is checked even when the programme has another valid course.
- **starving — uncovered outcome:** none of a programme's declared courses
  reaches its identified outcome. Coverage requires a shared `@id` or a direct
  `broader` link from a course outcome. The finding names the programme.
- **starving — dangling roll-up:** a `broader` that points into an outcome not
  defined in the graph. A branch grafted to nothing.
- **to tend — outcome without material:** a course outcome that no learning
  material teaches yet. Not fatal, but a leaf that should be growing.

The `hasPart` coverage check applies to `Program` nodes, including nodes typed
as both `Program` and `Curriculum`. Standalone `Curriculum` nodes use the legacy
coverage check against all courses in the default graph. This check runs when
at least one course declares an identified outcome.

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
