import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { validate } from "../validator/validate.mjs";
import { exportDoc } from "../validator/export.mjs";
import { diagnose } from "../validator/diagnose.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const load = async (rel) => JSON.parse(await readFile(path.join(ROOT, rel), "utf8"));

test("conformant mkval example passes with zero violations", async () => {
  const report = await validate(await load("examples/mkval/good.jsonld"));
  assert.equal(report.conforms, true);
  assert.equal(report.violations, 0);
});

test("incomplete example is flagged with the expected required-field violations", async () => {
  const report = await validate(await load("examples/mkval/invalid.jsonld"));
  assert.equal(report.conforms, false);
  assert.equal(report.violations, 3); // ectsCredits, language, provider
  const paths = report.results.filter((r) => r.severity === "violation").map((r) => r.path);
  assert.ok(paths.some((p) => p.endsWith("ectsCredits")));
  assert.ok(paths.some((p) => p.endsWith("language")));
  assert.ok(paths.some((p) => p.endsWith("provider")));
});

test("export to CTDL maps the type and core fields via the crosswalk", async () => {
  const { output, mapped, unmapped } = await exportDoc(await load("examples/mkval/good.jsonld"), { target: "ctdl" });
  assert.equal(output["@type"], "ceterms:MicroCredential");
  assert.equal(output["ceterms:name"], "Digitaalse toote disain ja arendus");
  assert.equal(output["ceterms:creditValue"], 15);
  assert.ok(mapped.includes("ceterms:name"));
  assert.ok(Array.isArray(unmapped)); // unmapped fields are reported, never silently dropped
});

test("curriculum profile: conformant example passes (volume via hours)", async () => {
  const report = await validate(await load("examples/curriculum/good.jsonld"), { profile: "curriculum" });
  assert.equal(report.conforms, true);
  assert.equal(report.violations, 0);
});

test("curriculum profile: incomplete example flags outcomes + volume + core fields", async () => {
  const report = await validate(await load("examples/curriculum/invalid.jsonld"), { profile: "curriculum" });
  assert.equal(report.conforms, false);
  // provider, language, learningOutcome, and the ECTS-or-hours volume constraint
  assert.equal(report.violations, 4);
  assert.ok(report.results.some((r) => /Volume is REQUIRED/.test(r.message)));
});

test("course profile: conformant example (schedule + trainer + dual hours)", async () => {
  const report = await validate(await load("examples/course/good.jsonld"), { profile: "course" });
  assert.equal(report.conforms, true);
  assert.equal(report.violations, 0);
});

test("course profile: a Session without a start date is a violation (calendar guarantee)", async () => {
  const report = await validate({
    "@context": "https://credentialcommons.org/profiles/context/haridus.jsonld",
    "@type": "Course",
    "@id": "https://x.ee/c",
    name: "Test",
    language: "et",
    ectsCredits: 3,
    provider: { "@type": "Organization", name: "X" },
    learningOutcome: ["a"],
    schedule: [{ "@type": "Session", name: "no date" }],
  }, { profile: "course" });
  assert.equal(report.conforms, false);
  assert.ok(report.results.some((r) => /Session MUST have a start date/.test(r.message)));
});

test("program profile: conformant when it composes courses; a program with no parts fails", async () => {
  const ok = await validate(await load("examples/program/good.jsonld"), { profile: "program" });
  assert.equal(ok.conforms, true);
  const noParts = await validate({
    "@context": "https://credentialcommons.org/profiles/context/haridus.jsonld",
    "@type": "Program",
    "@id": "https://x.ee/p",
    name: "Empty program",
    language: "et",
    provider: { "@type": "Organization", name: "X" },
    learningOutcome: ["a"],
  }, { profile: "program" });
  assert.equal(noParts.conforms, false);
  assert.ok(noParts.results.some((r) => /compose at least one course/.test(r.message)));
});

test("achievement profile: conformant example; missing learner/date/awards fails", async () => {
  const ok = await validate(await load("examples/achievement/good.jsonld"), { profile: "achievement" });
  assert.equal(ok.conforms, true);
  assert.equal(ok.violations, 0);
  const empty = await validate(
    { "@context": "https://credentialcommons.org/profiles/context/haridus.jsonld", "@type": "Achievement", "@id": "https://x.ee/a" },
    { profile: "achievement" }
  );
  assert.equal(empty.violations, 3); // awards, awardedTo, awardedDate
});

test("competency alignment is framework-agnostic: two different frameworks both pass; none-named fails", async () => {
  const plural = await validate(await load("examples/competency-alignment/good.jsonld"), { profile: "competency-alignment" });
  assert.equal(plural.conforms, true); // ESCO + Estonian EKR, both valid — pluralism
  const noFramework = await validate({
    "@context": "https://credentialcommons.org/profiles/context/haridus.jsonld",
    "@type": "CompetencyAlignment",
    "@id": "https://x.ee/a",
    targetName: "something",
  }, { profile: "competency-alignment" });
  assert.equal(noFramework.conforms, false);
  assert.ok(noFramework.results.some((r) => /MUST name the framework/.test(r.message)));
});

test("cohort (voor) profile: a run with an offering + start date conforms; one that delivers nothing fails", async () => {
  const ok = await validate(await load("examples/cohort/good.jsonld"), { profile: "cohort" });
  assert.equal(ok.conforms, true);
  assert.equal(ok.violations, 0);
  const noOffering = await validate({
    "@context": "https://credentialcommons.org/profiles/context/haridus.jsonld",
    "@type": "Cohort",
    "@id": "https://x.ee/voor/1",
    name: "Orphan voor",
    startDate: "2026-03-02",
  }, { profile: "cohort" });
  assert.equal(noOffering.conforms, false);
  assert.ok(noOffering.results.some((r) => /MUST deliver a known offering/.test(r.message)));
});

test("learning-outcome profile: an identified cross-cutting outcome conforms; a node with no statement fails", async () => {
  const ok = await validate(await load("examples/learning-outcome/good.jsonld"), { profile: "learning-outcome" });
  assert.equal(ok.conforms, true);
  assert.equal(ok.violations, 0);
  const noName = await validate({
    "@context": "https://credentialcommons.org/profiles/context/haridus.jsonld",
    "@type": "LearningOutcome",
    "@id": "https://x.ee/lo/1",
    crossCutting: true,
  }, { profile: "learning-outcome" });
  assert.equal(noName.conforms, false);
  assert.ok(noName.results.some((r) => /MUST state the outcome/.test(r.message)));
});

test("learning-outcome: the whole UAP chain resolves — every outcome node in programme+course+material is well-formed", async () => {
  // Shared @id (.../uap/lo/ai) appears in the programme, the course and the material.
  const report = await validate(await load("examples/learning-outcome/uap-chain.jsonld"), { profile: "learning-outcome" });
  assert.equal(report.conforms, true); // all cc:LearningOutcome nodes across the graph carry a statement
  assert.equal(report.violations, 0);
});

test("learning-resource profile: conformant when it teaches an outcome; a resource that teaches nothing fails", async () => {
  const ok = await validate(await load("examples/learning-resource/good.jsonld"), { profile: "learning-resource" });
  assert.equal(ok.conforms, true);
  assert.equal(ok.violations, 0);
  const noOutcome = await validate({
    "@context": "https://credentialcommons.org/profiles/context/haridus.jsonld",
    "@type": "LearningResource",
    "@id": "https://x.ee/m/1",
    name: "Orphan material",
    url: "https://x.ee/m/1",
  }, { profile: "learning-resource" });
  assert.equal(noOutcome.conforms, false);
  assert.ok(noOutcome.results.some((r) => /MUST teach at least one learning outcome/.test(r.message)));
});

test("health check: the UAP chain is healthy — every programme outcome is fed", async () => {
  const r = await diagnose(await load("examples/learning-outcome/uap-chain.jsonld"));
  assert.equal(r.healthy, true);
  assert.equal(r.starving, 0);
  // the budgeting course outcome has no material yet -> a 'tend' warning, never starving
  assert.ok(r.findings.some((f) => f.code === "outcome-without-material"));
});

test("health check: an uncovered programme outcome is flagged as starving", async () => {
  const doc = {
    "@context": "https://credentialcommons.org/profiles/context/haridus.jsonld",
    "@graph": [
      {
        "@type": "Program", "@id": "https://x.ee/p", name: "P", language: "et",
        provider: { "@type": "Organization", name: "X" },
        learningOutcome: [
          { "@id": "https://x.ee/lo/a", "@type": "LearningOutcome", name: "Covered" },
          { "@id": "https://x.ee/lo/orphan", "@type": "LearningOutcome", name: "Orphan" },
        ],
        hasPart: ["https://x.ee/c"],
      },
      {
        "@type": "Course", "@id": "https://x.ee/c", name: "C", language: "et",
        provider: { "@type": "Organization", name: "X" },
        learningOutcome: [{ "@id": "https://x.ee/lo/a" }],
      },
    ],
  };
  const r = await diagnose(doc);
  assert.equal(r.healthy, false);
  assert.ok(r.findings.some((f) => f.code === "uncovered-outcome" && /Orphan/.test(f.message)));
});

test("EQF is a realisation on top of the neutral level slot — a micro-credential with an EQF level conforms", async () => {
  const report = await validate(await load("examples/micro-credential/with-eqf.jsonld"));
  assert.equal(report.conforms, true); // the neutral `level` slot filled with the EQF URI does not break conformance
});

test("published context (site/) matches the source of truth (profiles/)", async () => {
  const src = await readFile(path.join(ROOT, "profiles/context/haridus.jsonld"), "utf8");
  const pub = await readFile(path.join(ROOT, "site/public/profiles/context/haridus.jsonld"), "utf8");
  assert.equal(pub, src, "site/public/profiles/context/haridus.jsonld is stale — re-copy from profiles/");
});

test("warnings do not break conformance on their own", async () => {
  // A minimal-but-valid record: all required fields, no recommended ones.
  const report = await validate({
    "@context": "https://credentialcommons.org/profiles/context/haridus.jsonld",
    "@type": "MicroCredential",
    "@id": "https://example.edu/p/1",
    name: "Minimaalne kehtiv kirje",
    ectsCredits: 6,
    language: "et",
    provider: { "@type": "Organization", name: "Näidiskool" },
  });
  assert.equal(report.conforms, true);
  assert.ok(report.warnings >= 1);
});
