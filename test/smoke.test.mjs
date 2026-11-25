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

test("assessment profile: conformant when it assesses an outcome; one that assesses nothing fails", async () => {
  const ok = await validate(await load("examples/assessment/good.jsonld"), { profile: "assessment" });
  assert.equal(ok.conforms, true);
  assert.equal(ok.violations, 0);
  const noOutcome = await validate({
    "@context": "https://credentialcommons.org/profiles/context/haridus.jsonld",
    "@type": "Assessment",
    "@id": "https://x.ee/hindamine/1",
    name: "Test",
    criteria: ["something objective"],
  }, { profile: "assessment" });
  assert.equal(noOutcome.conforms, false);
  assert.ok(noOutcome.results.some((r) => /MUST reference the learning outcome/.test(r.message)));
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

const graph = (...nodes) => ({
  "@context": "https://credentialcommons.org/profiles/context/haridus.jsonld",
  "@graph": nodes,
});
const exampleId = (path) => `https://example.invalid/${path}`;

test("health check: each programme counts only the courses it declares", async () => {
  const outcome = { "@type": "LearningOutcome", "@id": exampleId("result"), name: "Shared outcome" };
  const first = {
    "@type": ["Program", "Curriculum"], "@id": exampleId("first"), name: "First programme",
    hasPart: [exampleId("first-course")],
    learningOutcome: [{ "@id": outcome["@id"] }],
  };
  const second = {
    "@type": "Program", "@id": exampleId("second"), name: "Second programme",
    hasPart: [exampleId("second-course")],
    learningOutcome: [{ "@id": outcome["@id"] }],
  };
  const firstCourse = {
    "@type": "Course", "@id": exampleId("first-course"),
    learningOutcome: [{ "@id": exampleId("another-result") }],
  };
  const secondCourse = {
    "@type": "Course", "@id": exampleId("second-course"),
    partOf: first["@id"],
    learningOutcome: [{ "@id": outcome["@id"] }],
  };

  const report = await diagnose(graph(first, second, firstCourse, secondCourse, outcome));
  assert.equal(report.healthy, false);
  assert.equal(report.counts.programmes, 2);
  assert.equal(report.starving, 1);
  assert.equal(report.findings[0].node, outcome["@id"]);
  assert.equal(report.findings[0].code, "uncovered-outcome");
  assert.match(report.findings[0].message, /First programme/);
  assert.match(report.findings[0].message, /https:\/\/example\.invalid\/first/);
});

test("health check: incomplete programme composition is diagnosed", async (t) => {
  const outcome = { "@type": "LearningOutcome", "@id": exampleId("result") };
  const programme = {
    "@type": "Program", "@id": exampleId("programme"), name: "Example programme",
    learningOutcome: [{ "@id": outcome["@id"] }],
  };
  const course = {
    "@type": "Course", "@id": exampleId("course"),
    learningOutcome: [{ "@id": outcome["@id"] }],
  };
  const material = {
    "@type": "LearningResource", "@id": exampleId("material"),
    teaches: [{ "@id": outcome["@id"] }],
  };
  const cases = [
    ["missing hasPart with an unrelated course", {}, [course],
      ["missing-course-parts", "uncovered-outcome"]],
    ["empty hasPart", { hasPart: [] }, [],
      ["missing-course-parts", "uncovered-outcome"]],
    ["an unresolved part and no courses", { hasPart: [exampleId("missing")] }, [],
      ["unresolved-course-part", "uncovered-outcome"]],
    ["a resolved part of the wrong type", { hasPart: [material["@id"]] }, [material],
      ["invalid-course-part", "uncovered-outcome"]],
    ["a valid course plus broken parts", { hasPart: [course["@id"], material["@id"], exampleId("missing")] },
      [course, material], ["invalid-course-part", "unresolved-course-part"]],
    ["a valid course plus a literal part", { hasPart: [course["@id"], { "@value": "An invalid part" }] },
      [course], ["invalid-course-part"]],
    ["a declared course without identified outcomes", { hasPart: [course["@id"]] },
      [{ ...course, learningOutcome: ["A text outcome"] }], ["uncovered-outcome"]],
  ];

  for (const [name, properties, nodes, expectedCodes] of cases) {
    await t.test(name, async () => {
      const report = await diagnose(graph({ ...programme, ...properties }, outcome, ...nodes));
      assert.equal(report.healthy, false);
      assert.equal(report.starving, expectedCodes.length);
      assert.deepEqual(report.findings.map((finding) => finding.code).sort(), expectedCodes.sort());
      for (const finding of report.findings) {
        assert.equal(finding.severity, "starving");
        assert.match(finding.message, /Example programme/);
        assert.deepEqual(Object.keys(finding).sort(), ["code", "message", "node", "severity"]);
        const expectedNode = finding.code === "uncovered-outcome" ? outcome["@id"] : programme["@id"];
        assert.equal(finding.node, expectedNode);
      }
    });
  }
});

test("health check: inline and referenced courses cover shared IDs and direct broader outcomes", async () => {
  const shared = { "@type": "LearningOutcome", "@id": exampleId("shared") };
  const broad = { "@type": "LearningOutcome", "@id": exampleId("broad") };
  const narrow = { "@type": "LearningOutcome", "@id": exampleId("narrow"), broader: broad["@id"] };
  const referenced = {
    "@type": "Course", "@id": exampleId("course"),
    learningOutcome: [{ "@id": narrow["@id"] }],
  };
  const programme = {
    "@type": "Program", "@id": exampleId("programme"),
    hasPart: [
      { "@type": "Course", learningOutcome: [{ "@id": shared["@id"] }] },
      { "@id": referenced["@id"] },
    ],
    learningOutcome: [{ "@id": shared["@id"] }, { "@id": broad["@id"] }],
  };

  const report = await diagnose(graph(programme, referenced, shared, broad, narrow));
  assert.equal(report.healthy, true);
  assert.equal(report.starving, 0);
  assert.equal(report.counts.courses, 2);

  const indirectlyBroader = { ...narrow, "@id": exampleId("narrower"), broader: narrow["@id"] };
  const indirectCourse = { ...referenced, learningOutcome: [{ "@id": indirectlyBroader["@id"] }] };
  const indirect = await diagnose(graph(programme, indirectCourse, shared, broad, narrow, indirectlyBroader));
  assert.equal(indirect.healthy, false);
  assert.equal(indirect.starving, 1);
  assert.equal(indirect.findings[0].code, "uncovered-outcome");
  assert.equal(indirect.findings[0].node, broad["@id"]);
});

test("health check: standalone Curriculum keeps its existing coverage checks", async () => {
  const outcome = { "@type": "LearningOutcome", "@id": exampleId("result") };
  const curriculum = {
    "@type": "Curriculum", "@id": exampleId("curriculum"),
    learningOutcome: [{ "@id": outcome["@id"] }],
  };
  const course = {
    "@type": "Course", "@id": exampleId("course"),
    learningOutcome: [{ "@id": outcome["@id"] }],
  };
  assert.equal((await diagnose(graph(curriculum, outcome))).healthy, true);
  assert.equal((await diagnose(graph(curriculum, outcome, course))).healthy, true);

  const differentOutcome = { ...outcome, "@id": exampleId("other-result"), broader: exampleId("missing") };
  const differentCourse = { ...course, learningOutcome: [{ "@id": differentOutcome["@id"] }] };
  const report = await diagnose(graph(curriculum, outcome, differentCourse, differentOutcome));
  assert.equal(report.healthy, false);
  assert.deepEqual(report.findings.map((finding) => finding.code), ["uncovered-outcome", "dangling-rollup"]);
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
