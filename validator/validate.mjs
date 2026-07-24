// Credential Commons — core validator.
//
// Pipeline: JSON-LD data  --(jsonld.toRDF)-->  RDF dataset
//           SHACL profile (Turtle)  --(N3)-->  shapes dataset
//           rdf-validate-shacl  -->  conformance report (violations + warnings)
//
// No network: the canonical @context URL is resolved to the local profile file,
// so `cc validate` runs offline and deterministically.

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import jsonld from "jsonld";
import N3 from "n3";
import rdf from "@zazuko/env";
import SHACLValidator from "rdf-validate-shacl";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const CONTEXT_URL = "https://credentialcommons.org/profiles/context/haridus.jsonld";
const CONTEXT_FILE = path.join(REPO_ROOT, "profiles/context/haridus.jsonld");

export const PROFILES = {
  "micro-credential": "profiles/shapes/micro-credential.shacl.ttl",
  "curriculum": "profiles/shapes/curriculum.shacl.ttl",
  "course": "profiles/shapes/course.shacl.ttl",
  "program": "profiles/shapes/program.shacl.ttl",
};

// Resolve the canonical context (and any relative ref) to the local file, so
// published data can carry the real production URL yet still validate offline.
export async function documentLoader(url) {
  if (url === CONTEXT_URL || url.endsWith("/haridus.jsonld")) {
    const document = JSON.parse(await readFile(CONTEXT_FILE, "utf8"));
    return { contextUrl: null, documentUrl: url, document };
  }
  throw new Error(
    `refusing to fetch remote context <${url}>. Use the Credential Commons context (${CONTEXT_URL}).`
  );
}

function parseToDataset(text, format) {
  const dataset = rdf.dataset();
  const parser = new N3.Parser({ factory: rdf, format });
  for (const quad of parser.parse(text)) dataset.add(quad);
  return dataset;
}

async function jsonldToDataset(doc) {
  const nquads = await jsonld.toRDF(doc, { format: "application/n-quads", documentLoader });
  return parseToDataset(nquads, "application/n-quads");
}

async function loadShapes(profile) {
  const rel = PROFILES[profile];
  if (!rel) throw new Error(`unknown profile "${profile}". Known: ${Object.keys(PROFILES).join(", ")}`);
  const ttl = await readFile(path.join(REPO_ROOT, rel), "utf8");
  return parseToDataset(ttl, "text/turtle");
}

const SEVERITY = {
  "http://www.w3.org/ns/shacl#Violation": "violation",
  "http://www.w3.org/ns/shacl#Warning": "warning",
  "http://www.w3.org/ns/shacl#Info": "info",
};

/**
 * Validate one JSON-LD document against a named profile.
 * @returns {{conforms:boolean, results:Array<{severity,focusNode,path,message}>,
 *           violations:number, warnings:number}}
 */
export async function validate(doc, { profile = "micro-credential" } = {}) {
  const [data, shapes] = await Promise.all([jsonldToDataset(doc), loadShapes(profile)]);
  const report = await new SHACLValidator(shapes, { factory: rdf }).validate(data);

  const results = report.results.map((r) => ({
    severity: SEVERITY[r.severity?.value] || "violation",
    focusNode: r.focusNode?.value || null,
    path: r.path?.value || null,
    message: (r.message[0] && r.message[0].value) || "(no message)",
  }));

  const violations = results.filter((r) => r.severity === "violation").length;
  const warnings = results.filter((r) => r.severity === "warning").length;
  // "conforms" is truthful: warnings do not break conformance, violations do.
  return { conforms: violations === 0, results, violations, warnings };
}
