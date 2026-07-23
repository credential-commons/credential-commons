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

test("published context (docs/) matches the source of truth (profiles/)", async () => {
  const src = await readFile(path.join(ROOT, "profiles/context/haridus.jsonld"), "utf8");
  const pub = await readFile(path.join(ROOT, "docs/profiles/context/haridus.jsonld"), "utf8");
  assert.equal(pub, src, "docs/profiles/context/haridus.jsonld is stale — re-copy from profiles/");
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
