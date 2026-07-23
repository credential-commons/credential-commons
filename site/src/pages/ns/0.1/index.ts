import type { APIRoute } from "astro";
import { terms, negotiate } from "../../../data/vocab";

// On-demand so it can content-negotiate on the Accept header (Vercel function).
export const prerender = false;

export const GET: APIRoute = ({ request }) =>
  negotiate(request.headers.get("accept") || "", terms, "Credential Commons vocabulary (cc:) — v0.1");

export const OPTIONS: APIRoute = () =>
  new Response(null, {
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, OPTIONS",
      "access-control-allow-headers": "Accept",
    },
  });
