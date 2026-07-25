# Credential Commons — the scaffold (sõrestik)

This is the skeleton of what Credential Commons models. CC is a **thin profile +
crosswalk layer**: for each part of the skeleton it **reuses** an existing
vocabulary and only **develops** the conformance profile, the constraints that
matter (composition, dual hour units, the calendar guarantee) and the crosswalks.
It does **not** reinvent CTDL, ELM, Open Badges, Verifiable Credentials, ESCO or
xAPI — it profiles and connects them.

**Principle — a neutral commons, not a product.** CC mandates **no single vendor,
product or framework**. Where a layer needs an external model (competency
frameworks, credit systems, delivery), CC defines a **neutral slot** and a
**crosswalk mechanism** — you plug in whatever you already use and CC keeps the
*link* interoperable. ESCO, O*NET, EQF, a national framework or your own are all
equally valid targets; naming any one of them here is an example, never a
requirement. The crosswalks (CTDL / ELM / OB3) say "here is how to map **if** you
use these" — not "use these". That neutrality is the whole point of a commons.

**Principle — a high, airy scaffold.** CC is a **scaffold** (think a light
molecular lattice), not a filled structure. It is deliberately **high-level and
mostly empty**: it holds the **slots** (what a record needs) and the **edges**
(how records relate), and leaves the filling — the actual frameworks, codes and
content — to the adopter. Keep every profile minimal: require only what makes a
record *interoperable*, recommend the rest, mandate no external model. The
scaffold **enables**, and it may **guide** — offering non-binding help on which
frameworks fit a slot (see `docs/choosing-frameworks.md`) — but it never fills
itself. Airy by design: easy to adopt, hard to outgrow.

The operational rule that keeps it airy is the **transplant test**
(`docs/what-travels.md`): a training org is a *nursery* and CC is the standard that
lets a learner's growth survive being transplanted to the next org. Before adding
anything, ask "would the *next* organisation need this to continue the learner's
growth?" — **yes → core; no → stays in the nursery.** Less is more.

Underneath all of this is one meta-principle: **enabling constraints.** Every rule
here — the profiles, the neutral slots, the transplant test, versioning — exists to
make learning and adoption *fast and safe*, never to lock things down. We constrain
only where a constraint sets people (and agents) free to move quickly. Versioning is
the clearest case: we can keep evolving because every version is a fixed point you can
hold (see [`VERSIONING.md`](VERSIONING.md)).

Legend: ✅ built (v0.1) · 🔧 next (v0.2) · ⬜ later.

## Layers

### 1. Actors — who
| Entity | Reuse | CC develops | Status |
|---|---|---|---|
| Provider | `schema:Organization` | — | ✅ |
| Instructor / mentor | `schema:Person` (`schema:instructor`) | — | ✅ |
| Learner | `schema:Person` | achievement link (layer 6) | 🔧 |

### 2. Offerings — what is taught
| Entity | Reuse | CC develops | Status |
|---|---|---|---|
| **Course** (koolitus) | `schema:Course` | `course` profile; standalone + composable | ✅ |
| **Program** (bundle, micro-qualification) | `schema:hasPart` | `program` profile; **composition** of standalone courses | ✅ |
| **Curriculum** (õppekava spec) | ELM `LearningAchievementSpecification` | `curriculum` profile | ✅ |
| **Qualification** (full) | CTDL / ELM, EQF level | `qualification` profile | 🔧 |

### 3. Delivery — when & how (the calendar)
| Entity | Reuse | CC develops | Status |
|---|---|---|---|
| **Session / schedule** | `schema:Event` / `CourseInstance`, `startDate`/`endDate` | `cc:Session` + **the calendar guarantee** (every session MUST have a start date → ainekava is schedulable) | ✅ |
| **Cohort / run** (voor; lend = graduating year-group) | `schema:CourseInstance` | `cohort` profile — one scheduled run of an offering (`delivers` + start date + seats). **Public-safe shell: dates & seats, NEVER a roster.** The instance layer's only public face. | ✅ |
| Delivery mode, location | `schema:courseMode`, `schema:location` | `cc:deliveryMode` | ✅ / ⬜ |

### 4. Substance — the learning itself
| Entity | Reuse | CC develops | Status |
|---|---|---|---|
| Learning outcome | `schema.edu.ee haridus:Opivaljund`, `skos:broader` | `cc:LearningOutcome` as an **identified node**: shared `@id` = **cross-cutting** (läbiv); `broader` = **roll-up** (course → programme). May stay a plain string for simple catalogues. | ✅ |
| **Volume** | ECTS | `academicHours` + `clockHours` (Estonian dual-unit: Töötukassa + HAKA) | ✅ |
| **Competency** (aligns outcome) | **any framework by URI** — ESCO, O*NET, EQF, national, or your own (pattern: CTDL `CredentialAlignmentObject`) | a framework-**agnostic** alignment slot; mandates none | ✅ |
| **Learning resource** (Moodle materials) | `schema:LearningResource`, `schema:teaches` | `learning-resource` profile; **every resource MUST teach ≥1 outcome** (the substance link) | ✅ |
| Assessment | `schema:AssessmentAction` / CTDL | assessment profile | ⬜ |

### 5. Credential — what is awarded
| Entity | Reuse | CC develops | Status |
|---|---|---|---|
| **Micro-credential** | CTDL `ceterms:MicroCredential`, `schema:EducationalOccupationalCredential` | `micro-credential` profile | ✅ |
| Awarded-credential link | — | `cc:awardedCredential` on course/program/curriculum | ✅ |

### 6. Achievement — what a learner earned (issued to a person)
| Entity | Reuse | CC develops | Status |
|---|---|---|---|
| **Issued credential / badge** | **Open Badges 3.0 / W3C Verifiable Credentials** | `achievement` profile (VC credentialSubject) | ✅ |
| Enrolment | `schema:EducationEvent` | — | ⬜ |
| Learning activity (did X) | **xAPI (Experience API)** / IMS Caliper | crosswalk only | ⬜ |

## The edges (relationships)

```
Program --hasPart--> Course            (composition; a course is standalone too)
Course  --hasSession--> Session        (calendar; Session MUST have a date)
Course  --hasInstructor--> Person
Program/Course --learningOutcome--> LearningOutcome --aligns--> Competency (any framework)
LearningOutcome --broader--> LearningOutcome   (roll-up: course outcome → programme outcome)
(same @id in Programme + Course + Material)     (cross-cutting / läbiv — e.g. AI through the whole programme)
LearningResource --teaches--> LearningOutcome  (Moodle material → outcome), --partOf--> Course
Course/Program --awardsCredential--> MicroCredential/Qualification
Cohort (voor) --delivers--> Programme/Course    (a scheduled run; public shell, no roster)
Learner --earned--> Achievement (VC/OB3) --awards--> Credential, --cohort--> Cohort (voor)
```

**Types vs instances.** Everything above the last two lines is a **type** (public,
no PII). A **cohort/voor** is the one *instance* CC gives a public shell (dates and
seats). Participants, rosters and work groups (töörühm) are the rest of the
instance layer — they stay in the adopter's product/operations tree and its
restricted person-data zone. CC meets a real person only at the **achievement**
seam (PII → restricted). See [`docs/integrate.md`](docs/integrate.md).

## Two views over the same nodes: the architecture and the living tree

The roll-up (`broader` → a programme's ~5 declared outcomes) is the **architecture
view** — a static, top-down cross-section that regulators (HAKA, Töötukassa) and
buyers need. It is true, but it is not how knowledge *grows*. The scaffold also
supports an **organic view** over the very same nodes: knowledge as a tree.

| Tree | Scaffold slot | Role |
|---|---|---|
| Soil | `field` | the practice knowledge draws from |
| **Roots** | `entryRequirements` + the learner's prior experience | andragogy: an adult arrives already deeply rooted — the roots feed the tree, not the course |
| Seed | a root `LearningOutcome` (no `growsFrom`) | the germ a branch unfolds from |
| **Trunk** | `Program` | compressed structural spine |
| **Boughs** | `Course` | major structural limbs; a standalone course = a **cutting** that roots and sells on its own |
| **Branches / tips** | `LearningOutcome` (+ `growsFrom` 🔧) | where knowledge actually lengthens and re-branches |
| **Cambium / sap** (in every part) | `crossCutting` | *läbiv* — the living layer present throughout (e.g. an AI skill woven across a whole programme) |
| **Leaves** | `LearningResource` | where the work happens; seasonal, replaced each intake |
| **Fruit** | Credential / `Achievement` | harvested; carries the seed → a graduate seeds new growth |
| Growth rings | successive cohorts / a learner's accumulated achievements | time and consolidation |

Two distinct relationships, never conflated:
- **`broader`** = *aggregation* (this narrow outcome is PART OF that broad one) — the funnel, the compliance snapshot.
- **`growsFrom`** 🔧 = *development* (this outcome GREW FROM that earlier one) — the living lineage; roots have none, so a rootless outcome IS a seed. A DAG (a branch may be **grafted** from two roots), never cyclic.

Two maturities, also distinct:
- learner **`stage`** 🔧 (seeme → võrsik → puu, or Bloom / SOLO / your own — a *neutral* slot, CC mandates none): how deep this learner grew on a competency;
- curriculum **lignification** (green shoot → hardened, accredited course): how consolidated the curriculum element is.

Balance is not automatic — a tree balances by **pruning**. The curriculum's balance
is the **wholeness / coverage check** (every declared outcome fed by growth, no
orphan branch): the gardener's shears, an active governance act, not a property.

Design grows **from both ends of the seed**: backward design plants the crown
(outcomes first), the learner climbs the trunk (courses first). The scaffold holds
both; it collapses to neither.

## Where v0.1 stands, and the v0.2 skeleton

**v0.1 (built):** actors (Organization/Person), offerings (course, program,
curriculum), delivery (session + calendar guarantee), substance (outcomes +
dual-hour volume), credential (micro-credential). Four profiles, validator, npm,
crosswalks, a live reference (mikrokvalifikatsioon.ee) and dereferenceable data.

**v0.2 (shipped):** achievement / VC (layer 6), competency alignment (layer 4,
framework-agnostic), **learning resource** (layer 4 — Moodle materials, each MUST
teach ≥1 outcome), **learning outcome as an identified node** (layer 4 —
cross-cutting via shared `@id`, roll-up via `broader`), **cohort / voor** (layer 3
— the public-safe run shell, no roster; achievement now binds to its cohort).
Nine profiles now.

**Shipped — the health check (`cc diagnose`, not a profile):** the substance
analogue of the calendar guarantee, run as a *continuous health monitor* (in CI or
a daily job), not an end-gate. Over a programme graph it reports which branch is
**starving**: a programme outcome not reached by any course outcome (shared `@id`
or `broader`), a `broader` that rolls up into nothing, and (to tend) a course
outcome with no material. It diagnoses so the gardener can act in time — it never
treats or certifies. See [`docs/health-check.md`](docs/health-check.md).

**Decided against — a qualification/EQF profile.** Level frameworks (EQF/NQF) are a
translation device for *formal* qualifications — an industrial, deterministic ladder,
not the organic heart of micro-credentials. So CC does **not** build an EQF-centric
profile. A full qualification is already expressible (program/curriculum + credential
+ composition), and level is a **neutral, optional slot** (`cc:level`) — EQF is a
*realisation on top* (`examples/micro-credential/with-eqf.jsonld`, using the official
EQF URI, Europass/ELM-ready), never baked in. CC stays airy and organic-friendly *and*
works with the monumental frameworks when you need them.

**Still open (small, only if an adopter needs it — not core):**
- **Assessment** (layer 4) — how an outcome is evidenced.
- **Enrolment / learning activity** (layer 6) — xAPI / Caliper crosswalk.

Each is a small profile over a reused vocabulary — never a new silo. Contributions
welcome (`CONTRIBUTING.md`); nothing here is locked.
