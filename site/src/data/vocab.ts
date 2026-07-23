// The cc: vocabulary (v0.1) + serializers. Dependency-free string templates so
// the content-negotiation endpoints can return Turtle / JSON-LD / HTML for the
// same URI — real dereferenceable Linked Data.

export const NS = "https://credentialcommons.org/ns/0.1/";

export type Term = { id: string; kind: "Class" | "Property"; label: string; comment: string };

export const terms: Term[] = [
  { id: "MicroCredential", kind: "Class", label: "Micro-credential", comment: "A short, recognised unit of learning that awards a credential for one skill." },
  { id: "ectsCredits", kind: "Property", label: "ECTS/EAP credits", comment: "Credit points in the ECTS (Estonian EAP) framework." },
  { id: "learningOutcome", kind: "Property", label: "Learning outcome", comment: "A statement of what a learner knows or can do (approximately schema.edu.ee haridus:Opivaljund)." },
  { id: "field", kind: "Property", label: "Subject field", comment: "Broad subject area of the credential." },
  { id: "price", kind: "Property", label: "Price", comment: "Price of the credential (amount)." },
  { id: "priceCurrency", kind: "Property", label: "Price currency", comment: "ISO 4217 currency code for the price." },
  { id: "registrationDeadline", kind: "Property", label: "Registration deadline", comment: "Deadline to register (xsd:date)." },
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

export function toHtml(list: Term[], title: string): string {
  const rows = list
    .map((t) => `<tr><td><code>cc:${t.id}</code></td><td>${t.kind}</td><td>${t.label}</td><td>${t.comment}</td></tr>`)
    .join("\n");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<link rel="canonical" href="${NS}">
<style>body{margin:0;font:16px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:#12212e}.wrap{max-width:760px;margin:0 auto;padding:44px 20px}code{font-family:ui-monospace,Menlo,monospace;background:#eef3f7;padding:1px 5px;border-radius:5px}table{border-collapse:collapse;width:100%;margin-top:16px}th,td{border:1px solid #dbe4ee;padding:8px 10px;text-align:left;vertical-align:top;font-size:.94rem}th{background:#f5f9fb}a{color:#2f9e95;font-weight:600}</style>
</head><body><main class="wrap">
<h1>Credential Commons vocabulary — <code>cc:</code> v0.1</h1>
<p>Namespace <code>${NS}</code>. Terms minted where no existing vocabulary fits; prefer <code>schema:</code>, <code>haridus:</code> (schema.edu.ee) and <code>dcterms:</code> otherwise. This page content-negotiates: request it with <code>Accept: text/turtle</code> or <code>application/ld+json</code> for RDF.</p>
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
