# Credential Commons — the framework (sõrestik)

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
| Delivery mode, location | `schema:courseMode`, `schema:location` | `cc:deliveryMode` | ✅ / ⬜ |

### 4. Substance — the learning itself
| Entity | Reuse | CC develops | Status |
|---|---|---|---|
| Learning outcome | `schema.edu.ee haridus:Opivaljund` | `cc:learningOutcome` | ✅ |
| **Volume** | ECTS | `academicHours` + `clockHours` (Estonian dual-unit: Töötukassa + HAKA) | ✅ |
| **Competency** (aligns outcome) | **any framework by URI** — ESCO, O*NET, EQF, national, or your own (pattern: CTDL `CredentialAlignmentObject`) | a framework-**agnostic** alignment slot; mandates none | 🔧 |
| **Learning resource** (Moodle materials) | `schema:LearningResource` | link resource → outcome / course | 🔧 |
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
Course  --teaches--> LearningOutcome --aligns--> Competency (ESCO)
Course  --usesResource--> LearningResource (Moodle)
Course/Program --awardsCredential--> MicroCredential/Qualification
Learner --earned--> Achievement (VC/OB3) --proves--> Credential
```

## Where v0.1 stands, and the v0.2 skeleton

**v0.1 (built):** actors (Organization/Person), offerings (course, program,
curriculum), delivery (session + calendar guarantee), substance (outcomes +
dual-hour volume), credential (micro-credential). Four profiles, validator, npm,
crosswalks, a live reference (mikrokvalifikatsioon.ee) and dereferenceable data.

**v0.2 (the next skeleton to develop) — in priority order:**
1. **Achievement / Verifiable Credential** profile (layer 6) — the learner layer:
   what a real learner earned, as OB3.0 / W3C VC. Connects Moodle + learners +
   the credential into one verifiable chain. Biggest new value.
2. **Qualification** profile (layer 2) — full qualifications with EQF level.
3. **Competency alignment** (layer 4) — outcomes ↔ ESCO / a framework.
4. **Learning resource** (layer 4) — Moodle materials linked to outcomes/courses.

Each is a small profile over a reused vocabulary — never a new silo. Contributions
welcome (`CONTRIBUTING.md`); nothing here is locked.
