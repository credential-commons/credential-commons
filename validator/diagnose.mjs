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
const LEARNING_OUTCOME = CC + "learningOutcome";

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
  const label = (id, { includeId = false } = {}) => {
    const name = byId.get(id)?.[NAME]?.[0]?.["@value"];
    if (!name) return `<${id}>`;
    return includeId ? `"${name}" <${id}>` : `"${name}"`;
  };

  const containers = nodes.filter((n) => isType(n, CC + "Program") || isType(n, CC + "Curriculum"));
  const courses = nodes.filter((n) => isType(n, CC + "Course"));
  const outcomes = nodes.filter((n) => isType(n, CC + "LearningOutcome"));
  const materials = nodes.filter((n) => isType(n, CC + "LearningResource"));

  const taught = new Set();
  for (const m of materials) for (const id of refs(m, SCHEMA + "teaches")) taught.add(id);

  const courseOutcomes = courses.flatMap((course) => refs(course, LEARNING_OUTCOME));
  const reachedOutcomes = (ids) => new Set(
    ids.flatMap((id) => [id, ...refs(byId.get(id) || {}, SKOS + "broader")])
  );

  const findings = [];
  const curriculumOutcomes = new Set();

  // 1. Coverage — a programme's outcomes are reached by its declared courses.
  for (const container of containers) {
    const outcomeIds = refs(container, LEARNING_OUTCOME);
    if (!isType(container, CC + "Program")) {
      for (const id of outcomeIds) curriculumOutcomes.add(id);
      continue;
    }

    const programmeId = container["@id"];
    const programme = label(programmeId, { includeId: true });
    const parts = container[SCHEMA + "hasPart"] || [];
    if (parts.length === 0) {
      findings.push({ severity: "starving", code: "missing-course-parts", node: programmeId,
        message: `Programme ${programme} must declare at least one course in hasPart.` });
    }

    const memberOutcomes = [];
    for (const part of parts) {
      const partId = part["@id"];
      const course = byId.get(partId);
      if (!partId || (course && !isType(course, CC + "Course"))) {
        const partLabel = partId ? label(partId, { includeId: true }) : "the value without a node reference";
        findings.push({ severity: "starving", code: "invalid-course-part", node: programmeId,
          message: `Programme ${programme} must refer to a Course in hasPart. Check ${partLabel}.` });
      } else if (!course) {
        findings.push({ severity: "starving", code: "unresolved-course-part", node: programmeId,
          message: `Programme ${programme} has a course reference <${partId}>. Include that Course node in the graph.` });
      } else {
        for (const id of refs(course, LEARNING_OUTCOME)) memberOutcomes.push(id);
      }
    }

    const reached = reachedOutcomes(memberOutcomes);
    for (const id of new Set(outcomeIds)) {
      if (!reached.has(id)) {
        findings.push({ severity: "starving", code: "uncovered-outcome", node: id,
          message: `Programme ${programme} has no declared course that covers outcome ${label(id)}. Use a shared outcome ID or a direct broader link.` });
      }
    }
  }

  // Standalone Curriculum records retain their existing graph-wide coverage check.
  if (courseOutcomes.length && curriculumOutcomes.size) {
    const reached = reachedOutcomes(courseOutcomes);
    for (const id of curriculumOutcomes) {
      if (!reached.has(id)) {
        findings.push({ severity: "starving", code: "uncovered-outcome", node: id,
          message: `Programme outcome ${label(id)} is not reached by any course outcome — no course shares its @id and none rolls up (broader) into it.` });
      }
    }
  }

  // 2. Substance — every identified course outcome developed by >=1 material (only when materials are present).
  if (materials.length) {
    const seen = new Set();
    for (const outcome of courseOutcomes) {
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
