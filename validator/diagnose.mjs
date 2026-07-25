// Credential Commons — wholeness / health diagnostic.
//
// Not a per-record profile but a GRAPH check: is the living chain unbroken?
//   programme outcome  <-(reached by)-  course outcome  <-(taught by)-  material
//
// Run it CONTINUOUSLY (in CI or a daily job) as a health monitor over your own
// programmes — it surfaces which branch is starving so the gardener can act in
// time. It diagnoses; it never certifies or treats. Structural, deterministic,
// offline (the context resolves to the local file, like the validator).

import jsonld from "jsonld";
import { documentLoader } from "./validate.mjs";

const CC = "https://credentialcommons.org/ns/0.1/";
const SCHEMA = "https://schema.org/";
const SKOS = "http://www.w3.org/2004/02/skos/core#";
const NAME = SCHEMA + "name";

const refs = (node, prop) => (node[prop] || []).filter((v) => v["@id"]).map((v) => v["@id"]);
const isType = (node, t) => (node["@type"] || []).includes(t);

/**
 * Diagnose the health of a programme graph.
 * @returns {{healthy:boolean, starving:number, warnings:number, counts:object,
 *            findings:Array<{severity:'starving'|'warning', code:string, node:string, message:string}>}}
 */
export async function diagnose(doc) {
  const flat = await jsonld.flatten(doc, null, { documentLoader });
  const nodes = Array.isArray(flat) ? flat : flat["@graph"] || [];
  const byId = new Map(nodes.filter((n) => n["@id"]).map((n) => [n["@id"], n]));
  const label = (id) => {
    const n = byId.get(id);
    const name = n && n[NAME] && n[NAME][0] && n[NAME][0]["@value"];
    return name ? `"${name}"` : `<${id}>`;
  };

  const containers = nodes.filter((n) => isType(n, CC + "Program") || isType(n, CC + "Curriculum"));
  const courses = nodes.filter((n) => isType(n, CC + "Course"));
  const outcomes = nodes.filter((n) => isType(n, CC + "LearningOutcome"));
  const materials = nodes.filter((n) => isType(n, CC + "LearningResource"));

  const taught = new Set();
  for (const m of materials) for (const id of refs(m, SCHEMA + "teaches")) taught.add(id);

  const containerOutcomes = new Set();
  for (const c of containers) for (const id of refs(c, CC + "learningOutcome")) containerOutcomes.add(id);
  const courseOutcomes = [];
  for (const c of courses) for (const id of refs(c, CC + "learningOutcome")) courseOutcomes.push({ course: c["@id"], outcome: id });

  const findings = [];

  // 1. Coverage — every programme outcome reached by >=1 course outcome
  //    (a course shares its @id = cross-cutting, or a course outcome rolls up via broader).
  if (courseOutcomes.length) {
    for (const poId of containerOutcomes) {
      const reached = courseOutcomes.some((r) =>
        r.outcome === poId || refs(byId.get(r.outcome) || {}, SKOS + "broader").includes(poId)
      );
      if (!reached) {
        findings.push({ severity: "starving", code: "uncovered-outcome", node: poId,
          message: `Programme outcome ${label(poId)} is not reached by any course outcome — no course shares its @id and none rolls up (broader) into it.` });
      }
    }
  }

  // 2. Substance — every identified course outcome developed by >=1 material (only when materials are present).
  if (materials.length) {
    const seen = new Set();
    for (const { outcome } of courseOutcomes) {
      if (seen.has(outcome) || !byId.has(outcome)) continue;
      seen.add(outcome);
      if (!taught.has(outcome)) {
        findings.push({ severity: "warning", code: "outcome-without-material", node: outcome,
          message: `Course outcome ${label(outcome)} has no learning material teaching it.` });
      }
    }
  }

  // 3. Dangling roll-up — broader must resolve to an outcome defined in this graph.
  for (const o of outcomes) {
    for (const b of refs(o, SKOS + "broader")) {
      if (!byId.has(b)) {
        findings.push({ severity: "starving", code: "dangling-rollup", node: o["@id"],
          message: `Outcome ${label(o["@id"])} rolls up (broader) into <${b}>, which is not defined here.` });
      }
    }
  }

  const starving = findings.filter((f) => f.severity === "starving").length;
  const warnings = findings.filter((f) => f.severity === "warning").length;
  return {
    healthy: starving === 0,
    starving,
    warnings,
    counts: { programmes: containers.length, courses: courses.length, outcomes: outcomes.length, materials: materials.length },
    findings,
  };
}
