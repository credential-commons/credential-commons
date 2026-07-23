#!/usr/bin/env node
// Generate examples/mkval/catalog.jsonld from the live mkval public feed.
//
// Maps each programme to the Credential Commons `micro-credential` shape. This
// is the reference "real data" corpus — run it to refresh the flagship example.
//
//   node scripts/from-mkval-feed.mjs [feedUrl]

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const FEED = process.argv[2] || "https://status.amos.02signal.com/mkval-catalog/catalog-feed.json";
const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "examples/mkval/catalog.jsonld");

function toCredential(p) {
  const node = {
    "@type": "MicroCredential",
    "@id": p.url || p.sourceUrl || `urn:mkval:${encodeURIComponent(p.name || "")}`,
    name: p.name,
  };
  if (p.summary) node.summary = p.summary;
  if (p.url) node.url = p.url;
  if (p.field) node.field = p.field;
  if (p.language) node.language = p.language;
  if (typeof p.ects === "number") node.ectsCredits = p.ects;
  if (p.provider) node.provider = { "@type": "Organization", name: p.provider };
  const outcomes = Array.isArray(p.outcomes) ? p.outcomes.filter(Boolean) : [];
  if (outcomes.length) node.learningOutcome = outcomes;
  if (p.registrationDeadline) node.registrationDeadline = p.registrationDeadline;
  if (p.startDate) node.startDate = p.startDate;
  return node;
}

const res = await fetch(FEED);
if (!res.ok) throw new Error(`feed HTTP ${res.status}`);
const feed = await res.json();
const programmes = feed.programs || feed.programmes || [];

const catalog = {
  "@context": "https://credentialcommons.org/profiles/context/haridus.jsonld",
  "@graph": programmes.map(toCredential),
};

await writeFile(OUT, `${JSON.stringify(catalog, null, 2)}\n`);
process.stdout.write(`wrote ${OUT} — ${catalog["@graph"].length} programmes (feed checkedAt ${feed.checkedAt || "?"})\n`);
