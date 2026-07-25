# Choosing frameworks for the slots (guidance, not requirement)

Credential Commons is a **scaffold**: it holds the slots, you fill them.
Credential Commons **mandates none** of the frameworks below — this page is
**guidance to help you choose**, never a requirement. Two adopters can pick
differently and still be interoperable, because the scaffold keeps the *link*
(`targetFramework` + code/name/URI) consistent regardless of which framework
fills the slot.

## Competency (aligning outcomes)

| Option | Fits when |
|---|---|
| **ESCO** | EU / cross-border skills & occupations; multilingual |
| **EQF / NQF** | you need a recognised *level* (1–8) |
| **O*NET** | US / occupation-centric competencies |
| **National framework** (e.g. Estonian EKR) | national recognition / funding |
| **Your own** | internal skills taxonomy, LXP, sister brands |

Rule of thumb: use the framework your *audience already trusts*; add a second
alignment (the slot allows many) when you serve more than one audience. CC keeps
both links interoperable.

## Credit / volume

| Option | Fits when |
|---|---|
| **ECTS / EAP** | higher-education credit is expected |
| **Academic hours** (45 min) | Estonia: Töötukassa funding |
| **Clock hours** (60 min) | Estonia: HAKA micro-qualification quality |

For Estonian continuing education, publish **both** hour units (they satisfy two
regulators) and ECTS where it applies.

## What is awarded

| Option | Fits when |
|---|---|
| **Micro-credential** (CTDL / schema.org) | a short, single-skill credential |
| **Qualification** | a full qualification — expressed as a program/curriculum with an awarded credential (and an optional `level`), not a separate profile |
| **Open Badges 3.0 / W3C Verifiable Credentials** | a credential *issued to a learner* (the achievement layer) |

## Qualification level

The `level` slot is a **neutral, optional slot**, exactly like the competency slot —
CC mandates no level framework, and **a micro-credential need not claim a level at
all.** Level frameworks (EQF/NQF) are a translation device for *formal* qualifications;
useful where regulators, funders or cross-border recognition require them, but not the
organic heart of micro-credentials. Fill the slot with whatever identifier your
audience reads:

| Option | Fits when |
|---|---|
| **EQF** | EU / cross-border recognition. Use the official level URI (`http://data.europa.eu/snb/eqf/…`) so it is Europass/ELM-ready — see `examples/micro-credential/with-eqf.jsonld` |
| **National NQF** (e.g. Estonian EKR) | national recognition / funding |
| **SCQF, AQF, others** | the national system your audience uses |
| **none** | a micro-credential that makes no level claim — perfectly conformant |

EQF and other established frameworks are a **realisation on top of the neutral slot**,
never baked into the core: CC stays airy and organic-friendly *and* works with the
monumental frameworks when you need them.

## Delivery & activity

| Option | Fits when |
|---|---|
| **schema.org Event / CourseInstance** | scheduling sessions on the calendar |
| **xAPI / IMS Caliper** | recording what a learner *did* (LXP / Moodle activity) |

---

Nothing here is binding. If your best fit is a framework not listed, name it in
`targetFramework` (a URI or name) and you are still conformant — the scaffold
only asks *which* framework, never *that* framework.
