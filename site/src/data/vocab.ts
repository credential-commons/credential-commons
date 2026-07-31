// The cc: vocabulary (v0.1) + serializers. Dependency-free string templates so
// the content-negotiation endpoints can return Turtle / JSON-LD / HTML for the
// same URI — real dereferenceable Linked Data.

export const NS = "https://credentialcommons.org/ns/0.1/";

export type Term = { id: string; kind: "Class" | "Property"; label: string; comment: string };

export const terms: Term[] = [
  { id: "MicroCredential", kind: "Class", label: "Micro-credential", comment: "A short, recognised unit of learning that awards a credential for one skill." },
  { id: "Curriculum", kind: "Class", label: "Curriculum", comment: "A curriculum / study programme (Estonian: õppekava) — broader than a single micro-credential." },
  { id: "Course", kind: "Class", label: "Course", comment: "A single course / training (Estonian: koolitus) — standalone, credential-giving, and composable into a program." },
  { id: "Program", kind: "Class", label: "Program", comment: "A program (e.g. a micro-qualification) composed of one or more standalone courses." },
  { id: "Session", kind: "Class", label: "Session", comment: "One scheduled session of a course; MUST carry a start date (calendar linkage)." },
  { id: "hasPart", kind: "Property", label: "Has part", comment: "A part of a program — a Course, by @id or nested (schema:hasPart)." },
  { id: "partOf", kind: "Property", label: "Part of", comment: "The program this course belongs to (schema:isPartOf)." },
  { id: "schedule", kind: "Property", label: "Schedule", comment: "The course's sessions on the calendar (one or more Session)." },
  { id: "deliveryMode", kind: "Property", label: "Delivery mode", comment: "How the course is delivered (online / blended / onsite)." },
  { id: "standalone", kind: "Property", label: "Standalone", comment: "Whether the course can be taken/sold on its own (boolean)." },
  { id: "Achievement", kind: "Class", label: "Achievement", comment: "What a learner earned — an issued credential for a person (Open Badges 3.0 / W3C VC compatible)." },
  { id: "awards", kind: "Property", label: "Awards", comment: "What the achievement grants — a Course/Program/MicroCredential by @id." },
  { id: "awardedTo", kind: "Property", label: "Awarded to", comment: "The learner the achievement was awarded to (a Person)." },
  { id: "awardedDate", kind: "Property", label: "Awarded date", comment: "When the achievement was awarded (xsd:date)." },
  { id: "evidence", kind: "Property", label: "Evidence", comment: "Evidence for the achievement (e.g. a portfolio artifact URL)." },
  { id: "LearningOutcome", kind: "Class", label: "Learning outcome", comment: "A learning outcome (õpiväljund) as an identified node. Shared @id across programme/course/material expresses a cross-cutting (läbiv) outcome; broader expresses roll-up." },
  { id: "crossCutting", kind: "Property", label: "Cross-cutting", comment: "Marks an outcome as cross-cutting (läbiv) — woven through several courses of a programme (boolean)." },
  { id: "broader", kind: "Property", label: "Broader", comment: "The broader outcome this one rolls up into (skos:broader, by @id) — e.g. a course outcome → a programme outcome." },
  { id: "LearningResource", kind: "Class", label: "Learning resource", comment: "A learning material (reading, video, quiz, activity — e.g. in Moodle) that MUST teach at least one learning outcome (schema:teaches) — the substance link." },
  { id: "teaches", kind: "Property", label: "Teaches", comment: "The learning outcome(s) a resource teaches (schema:teaches) — connects material up to course and credential." },
  { id: "learningResourceType", kind: "Property", label: "Learning resource type", comment: "The kind of material (schema:learningResourceType) — e.g. reading, video, quiz, assignment." },
  { id: "Cohort", kind: "Class", label: "Cohort (voor)", comment: "One scheduled run of a programme/course (Estonian: voor; a graduating year-group is a lend). Public-safe shell — dates and seats, NEVER participants or a roster (that is restricted person-data). Aligns with schema:CourseInstance." },
  { id: "delivers", kind: "Property", label: "Delivers", comment: "The programme/course a cohort runs (cc:delivers -> an offering by @id)." },
  { id: "capacity", kind: "Property", label: "Capacity", comment: "Number of seats in a cohort (schema:maximumAttendeeCapacity) — a count, never a roster." },
  { id: "location", kind: "Property", label: "Location", comment: "Where a cohort is delivered (schema:location)." },
  { id: "cohort", kind: "Property", label: "Cohort", comment: "The cohort/voor an achievement was earned in (cc:cohort -> a Cohort by @id) — pins it to the season and curriculum version (ring)." },
  { id: "CompetencyAlignment", kind: "Class", label: "Competency alignment", comment: "Aligns an outcome/course to a competency in ANY framework (ESCO, EQF, national, own) — CC mandates none." },
  { id: "aligns", kind: "Property", label: "Aligns", comment: "One or more competency alignments for an outcome or course." },
  { id: "targetFramework", kind: "Property", label: "Target framework", comment: "Which framework the alignment targets — a URI or name. Any framework; CC picks none." },
  { id: "targetCode", kind: "Property", label: "Target code", comment: "The competency's code within its framework." },
  { id: "targetName", kind: "Property", label: "Target name", comment: "The competency's name within its framework." },
  { id: "targetUrl", kind: "Property", label: "Target URL", comment: "A resolvable URL for the competency." },
  { id: "ectsCredits", kind: "Property", label: "ECTS/EAP credits", comment: "Credit points in the ECTS (Estonian EAP) framework. A positive number; 7.5 is valid. Publish what the source states — do NOT derive this from hours. The credit-to-hours ratio is a local convention (Estonia treats 1 EAP as roughly 26 hours, but providers use 25-30), so a converted value is a number no provider ever published." },
  { id: "academicHours", kind: "Property", label: "Academic hours (45 min)", comment: "Volume in academic hours of 45 minutes (Estonia: required by Töötukassa for funding). A positive number. Never convert to or from clock hours or credits — give the unit the source gives; publish several units side by side when the source states several." },
  { id: "clockHours", kind: "Property", label: "Clock hours (60 min)", comment: "Volume in clock / astronomical hours of 60 minutes (Estonia: HAKA micro-qualification quality basis). A positive number. Never convert to or from academic hours or credits. Estonian continuing-education curricula should publish BOTH hour units, because two different authorities read two different units." },
  { id: "learningOutcome", kind: "Property", label: "Learning outcome", comment: "A statement of what a learner knows or can do (approximately schema.edu.ee haridus:Opivaljund)." },
  { id: "entryRequirements", kind: "Property", label: "Entry requirements", comment: "Conditions for starting the curriculum." },
  { id: "content", kind: "Property", label: "Content", comment: "An outline of the curriculum content." },
  { id: "awardedCredential", kind: "Property", label: "Awarded credential", comment: "What completion of the curriculum awards." },
  { id: "level", kind: "Property", label: "Level", comment: "Optional, framework-agnostic qualification level. Fill with EQF (use the official level URI), a national NQF, or leave it out — a micro-credential need not claim a level. CC mandates none." },
  { id: "field", kind: "Property", label: "Subject field", comment: "Broad subject area of the credential." },
  { id: "price", kind: "Property", label: "Price", comment: "TOTAL price for the whole offering, as one amount. A per-unit rate (e.g. a price per ECTS credit or per hour) is NOT expressed here — publish the total. If a provider states both, as in \"2250 EUR total, 1 ECTS is 75 EUR\", cc:price is 2250. Periphery, not core: price does not survive the transplant test, so it is optional and never required by a profile." },
  { id: "priceCurrency", kind: "Property", label: "Price currency", comment: "ISO 4217 currency code for the price." },
  { id: "registrationDeadline", kind: "Property", label: "Registration deadline", comment: "Deadline to register (xsd:date)." },
  { id: "Assessment", kind: "Class", label: "Assessment", comment: "How a learning outcome is assessed — the method (schema:name) and criteria (cc:criteria) for objective, transparent assessment. Models the assessment DESIGN (which travels; HAKA requires it), never test instances or learner results (PII -> nursery)." },
  { id: "criteria", kind: "Property", label: "Criteria", comment: "The assessment criteria — what an objective, transparent judgement of the outcome checks." },
  { id: "assesses", kind: "Property", label: "Assesses", comment: "The learning outcome(s) this assessment checks (cc:assesses -> a LearningOutcome by @id). HAKA: every outcome must be assessable." },
];

export const findTerm = (id: string) => terms.find((t) => t.id === id);

const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

export function toTurtle(list: Term[]): string {
  const head =
    "@prefix cc: <https://credentialcommons.org/ns/0.1/> .\n" +
    "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n" +
    "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n" +
    "@prefix owl: <http://www.w3.org/2002/07/owl#> .\n\n";
  const body = list
    .map((t) => {
      const type = t.kind === "Class" ? "rdfs:Class, owl:Class" : "rdf:Property, owl:DatatypeProperty";
      return `cc:${t.id} a ${type} ;\n    rdfs:label "${esc(t.label)}"@en ;\n    rdfs:comment "${esc(t.comment)}"@en ;\n    rdfs:isDefinedBy <${NS}> .`;
    })
    .join("\n\n");
  return head + body + "\n";
}

export function toJsonLd(list: Term[]): object {
  return {
    "@context": {
      cc: NS,
      rdfs: "http://www.w3.org/2000/01/rdf-schema#",
      label: "rdfs:label",
      comment: "rdfs:comment",
    },
    "@graph": list.map((t) => ({
      "@id": `cc:${t.id}`,
      "@type": t.kind === "Class" ? "rdfs:Class" : "rdf:Property",
      label: { "@value": t.label, "@language": "en" },
      comment: { "@value": t.comment, "@language": "en" },
      "rdfs:isDefinedBy": { "@id": NS },
    })),
  };
}

const SITE = "https://credentialcommons.org";
/** HTML-attribute escaping. Distinct from `esc` above, which escapes Turtle strings. */
const escAttr = (s: string): string => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

export function toHtml(list: Term[], title: string): string {
  const rows = list
    .map((t) => `<tr><td><code>cc:${t.id}</code></td><td>${t.kind}</td><td>${t.label}</td><td>${t.comment}</td></tr>`)
    .join("\n");

  // A single-term page dereferences one cc: URI; the index lists the whole
  // vocabulary. Different canonical, different description.
  const single = list.length === 1 ? list[0] : null;
  const canonical = single ? `${NS}${single.id}` : NS;
  const description = single
    ? `cc:${single.id} — ${single.label}. ${single.comment} Part of the Credential Commons cc: vocabulary (v0.1); dereferences to Turtle or JSON-LD by content negotiation.`
    : "The Credential Commons cc: vocabulary (v0.1). Terms are minted only where no existing vocabulary fits, and every term dereferences to Turtle or JSON-LD by content negotiation.";

  // These pages are hand-built HTML rather than the Astro layout, which left them
  // the one part of the site with no description and no share card at all — and
  // they are the most citable URLs the project has.
  const ogImage = `${SITE}/diagrams/neutral-slots.og.png`;
  const meta = `<meta name="description" content="${escAttr(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Credential Commons">
<meta property="og:title" content="${escAttr(title)}">
<meta property="og:description" content="${escAttr(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escAttr(title)}">
<meta name="twitter:description" content="${escAttr(description)}">
<meta name="twitter:image" content="${ogImage}">
<meta name="robots" content="index,follow">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">`;

  // The neutral-slots diagram explains what this vocabulary IS — a set of
  // framework-agnostic sockets — so it belongs on the index. On a single-term
  // page it would only decorate, so it is left off.
  const figure = single
    ? ""
    : `<figure style="margin:22px 0 26px">
<picture>
<source media="(max-width: 640px)" srcset="/diagrams/stacked/neutral-slots.svg" type="image/svg+xml" width="400" height="640">
<source srcset="/diagrams/neutral-slots.svg" type="image/svg+xml" width="960" height="504">
<img src="/diagrams/neutral-slots.png" alt="Credential Commons mandates no single vendor, product or framework. Where a layer needs an external model — a competency framework, a credit system, a level, a delivery mode — it defines a neutral, framework-agnostic slot plus a crosswalk mechanism. Adopters plug in whatever they already use, and the crosswalks describe how those fields map to CTDL, ELM/Europass and Open Badges 3.0." width="960" height="504" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border:1px solid #dbe4ee;border-radius:12px;background:#fff">
</picture>
<figcaption style="margin-top:8px;color:#5a6b80;font-size:.9rem;line-height:1.45">Neutral slots with crosswalks: Credential Commons defines the socket, not your choice of framework.</figcaption>
</figure>`;

  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escAttr(title)}</title>
${meta}
<style>body{margin:0;font:16px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:#12212e}.wrap{max-width:760px;margin:0 auto;padding:44px 20px}code{font-family:ui-monospace,Menlo,monospace;background:#eef3f7;padding:1px 5px;border-radius:5px}table{border-collapse:collapse;width:100%;margin-top:16px}th,td{border:1px solid #dbe4ee;padding:8px 10px;text-align:left;vertical-align:top;font-size:.94rem}th{background:#f5f9fb}a{color:#2f9e95;font-weight:600}</style>
</head><body><main class="wrap">
<h1>Credential Commons vocabulary — <code>cc:</code> v0.1</h1>
<p>Namespace <code>${NS}</code>. Terms minted where no existing vocabulary fits; prefer <code>schema:</code>, <code>haridus:</code> (schema.edu.ee) and <code>dcterms:</code> otherwise. This page content-negotiates: request it with <code>Accept: text/turtle</code> or <code>application/ld+json</code> for RDF.</p>
${figure}
<table><tr><th>Term</th><th>Kind</th><th>Label</th><th>Meaning</th></tr>
${rows}
</table>
<p style="margin-top:20px"><a href="/">← Credential Commons</a> · <a href="/profiles/context/haridus.jsonld">JSON-LD context</a> · <a href="https://github.com/credential-commons/credential-commons/tree/main/profiles/crosswalks">crosswalks</a></p>
</main></body></html>`;
}

export function negotiate(accept: string, list: Term[], title: string): Response {
  const cors = { "access-control-allow-origin": "*" };
  if (accept.includes("text/turtle") || accept.includes("application/rdf+xml")) {
    return new Response(toTurtle(list), { headers: { "content-type": "text/turtle; charset=utf-8", ...cors } });
  }
  if (accept.includes("ld+json") || accept.includes("application/json")) {
    return new Response(JSON.stringify(toJsonLd(list), null, 2), { headers: { "content-type": "application/ld+json; charset=utf-8", ...cors } });
  }
  return new Response(toHtml(list, title), { headers: { "content-type": "text/html; charset=utf-8", ...cors } });
}
