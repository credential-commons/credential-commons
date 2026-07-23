import type { APIRoute } from "astro";
import { terms, findTerm, negotiate } from "../../../data/vocab";

// Individual term dereferencing, e.g. /ns/0.1/MicroCredential with content
// negotiation. On-demand (no getStaticPaths needed).
export const prerender = false;

export const GET: APIRoute = ({ params, request }) => {
  const term = findTerm(String(params.term));
  if (!term) return new Response("Unknown term.\n", { status: 404, headers: { "content-type": "text/plain" } });
  return negotiate(request.headers.get("accept") || "", [term], `cc:${term.id} — Credential Commons`);
};
