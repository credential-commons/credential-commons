import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { validate } from "../validator/validate.mjs";
import { exportDoc } from "../validator/export.mjs";

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
