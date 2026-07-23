// Credential Commons — exporter.
//
// Transforms a Credential Commons JSON-LD document into a target standard
// (CTDL, ELM/Europass, Open Badges 3.0) using the crosswalk tables. v0.1 maps
// literal and reference predicates plus the credential type and the provider
// name; deep structural mapping (e.g. CTDL QuantitativeValue for credits,
// CredentialAlignmentObject for outcomes) is on the roadmap. Unmapped fields are
// reported so nothing is silently dropped.

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import jsonld from "jsonld";
import YAML from "yaml";

import { documentLoader } from "./validate.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const TARGETS = {
  ctdl: "profiles/crosswalks/ctdl.yaml",
  elm: "profiles/crosswalks/elm.yaml",
  ob3: "profiles/crosswalks/ob3.yaml",
};

const PREFIXES = {
  cc: "https://credentialcommons.org/ns/0.1/",
  schema: "https://schema.org/",
  dcterms: "http://purl.org/dc/terms/",
  haridus: "https://schema.edu.ee/0.1/",
};

function expandCurie(curie) {
  const [prefix, ...rest] = curie.split(":");
  const local = rest.join(":");
  return (PREFIXES[prefix] || `${prefix}:`) + local;
}

async function loadCrosswalk(target) {
  const rel = TARGETS[target];
  if (!rel) throw new Error(`unknown target "${target}". Known: ${Object.keys(TARGETS).join(", ")}`);
  const doc = YAML.parse(await readFile(path.join(REPO_ROOT, rel), "utf8"));
  const map = new Map(); // full source IRI -> target curie
  for (const m of doc.maps || []) {
    if (m.target) map.set(expandCurie(m.cc), m.target);
  }
  return { doc, map };
}

function literalOf(valueObject) {
  if (valueObject == null || typeof valueObject !== "object") return valueObject;
  if ("@value" in valueObject) return valueObject["@value"];
  if ("@id" in valueObject) return { "@id": valueObject["@id"] };
  // Nested node (e.g. provider Organization): carry its schema:name if present.
  const name = valueObject["https://schema.org/name"];
  if (Array.isArray(name) && name[0] && "@value" in name[0]) return { name: name[0]["@value"] };
  return null;
}

/**
 * Export a Credential Commons JSON-LD doc to a target standard.
 * @returns {{ output: object, mapped: string[], unmapped: string[] }}
 */
export async function exportDoc(doc, { target = "ctdl" } = {}) {
  const { doc: crosswalk, map } = await loadCrosswalk(target);
  const expanded = (await jsonld.expand(doc, { documentLoader }))[0] || {};

  const output = { "@context": { [crosswalk.prefix]: crosswalk.namespace } };
  const mapped = [];
  const unmapped = [];

  if (expanded["@id"]) output["@id"] = expanded["@id"];
  const typeIri = (expanded["@type"] || [])[0];
  if (typeIri && map.has(typeIri)) {
    output["@type"] = map.get(typeIri);
    mapped.push("@type");
  }

  for (const [iri, values] of Object.entries(expanded)) {
    if (iri === "@id" || iri === "@type") continue;
    const targetCurie = map.get(iri);
    if (!targetCurie) {
      unmapped.push(iri.replace(/^.*[/#]/, ""));
      continue;
    }
    const mappedValues = (Array.isArray(values) ? values : [values]).map(literalOf).filter((v) => v != null);
    output[targetCurie] = mappedValues.length === 1 ? mappedValues[0] : mappedValues;
    mapped.push(targetCurie);
  }

  return { output, mapped, unmapped };
}
