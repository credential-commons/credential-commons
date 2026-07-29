/**
 * Concept diagrams — the drawing system.
 *
 * Credential Commons explains ideas that are easy to misread in prose. A single
 * clear picture explains them faster, and the same file works in three places:
 * on the page, in image search, and as the card a link renders when it is shared.
 *
 * Two shapes are rendered from one description:
 *   • wide    960×504 — exactly the 1200×630 social-card ratio, so a shared card
 *                       fills the frame with no letterbox. Also the desktop figure.
 *   • stacked 400×640 — narrow screens. A wide diagram scaled into a 360 px phone
 *                       renders its labels at ~8 px; that is not a diagram anymore.
 *
 * Rules:
 *   • Text stays real SVG `<text>`, never outlines, so machines read the
 *     explanation rather than pixels. Every diagram carries `<title>` + `<desc>`.
 *   • Self-contained: no external hosts, no webfonts, no runtime requests.
 *     System fonts only — the same stack the site itself uses — so the browser
 *     and the build-time rasteriser agree on what they draw.
 *   • The headline states the claim. If a diagram needs two claims, it is two
 *     diagrams.
 */

/* ── Tokens (the site's own palette, from Base.astro) ─────────────────────── */

export const C = {
  ink: "#12212e",
  ink2: "#2b3d4d",
  muted: "#5a6b80",
  faint: "#8a9aac",
  teal: "#2f9e95",
  tealDeep: "#1f6f68",
  tealSoft: "#eaf6f4",
  tealLine: "#bcdfda",
  paper: "#f5f9fb",
  line: "#dbe4ee",
  white: "#ffffff",
} as const;

export const FONT = "system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif";
export const R = { lg: 14, md: 12, sm: 8 } as const;

export type Mode = "wide" | "stacked";

const CANVAS = {
  wide: { w: 960, h: 504, pad: 48 },
  stacked: { w: 400, h: 640, pad: 26 },
} as const;

export type Scale = {
  kicker: number;
  headline: number;
  deck: number;
  label: number;
  sub: number;
  body: number;
  takeaway: number;
  foot: number;
};

const TYPE: Record<Mode, Scale> = {
  wide: { kicker: 18, headline: 42, deck: 22, label: 22, sub: 16, body: 20, takeaway: 19, foot: 16 },
  stacked: { kicker: 12, headline: 25, deck: 15, label: 16, sub: 12, body: 15, takeaway: 14, foot: 11 },
};

/* ── Text measurement (approximate — good enough to lay out, deliberately
      biased to over-estimate so nothing silently runs past a margin) ──────── */

const NARROW = "iljtIf.,:;'`!|()[]-";
const WIDEC = "mMWQ@%—–";

function advance(ch: string, bold: boolean): number {
  let f: number;
  if (NARROW.includes(ch)) f = 0.32;
  else if (WIDEC.includes(ch)) f = 0.9;
  else if (ch === " ") f = 0.28;
  else if (ch >= "A" && ch <= "Z") f = 0.68;
  else if (ch >= "0" && ch <= "9") f = 0.57;
  else f = 0.55;
  return bold ? f * 1.08 : f * 1.02;
}

export function textWidth(s: string, size: number, bold = false): number {
  let w = 0;
  for (const ch of s) w += advance(ch, bold);
  return w * size;
}

export function wrap(s: string, max: number, size: number, bold = false): string[] {
  const words = s.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const word of words) {
    const next = cur ? `${cur} ${word}` : word;
    if (cur && textWidth(next, size, bold) > max) {
      lines.push(cur);
      cur = word;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
}

/** Largest size at or below `size` that keeps `s` on one line, never below `min`. */
export function fitSize(s: string, max: number, size: number, min: number, bold = false): number {
  const w = textWidth(s, size, bold);
  return w <= max ? size : Math.max(min, Math.floor((size * max) / w));
}

/* ── SVG primitives ───────────────────────────────────────────────────────── */

export const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const n = (v: number): string => (Math.round(v * 100) / 100).toString();

export type TextOpts = {
  size: number;
  fill?: string;
  weight?: number;
  anchor?: "start" | "middle" | "end";
  tracking?: number;
};

export function text(x: number, y: number, s: string, o: TextOpts): string {
  const a = o.anchor && o.anchor !== "start" ? ` text-anchor="${o.anchor}"` : "";
  const w = o.weight && o.weight !== 400 ? ` font-weight="${o.weight}"` : "";
  const t = o.tracking ? ` letter-spacing="${o.tracking}"` : "";
  return `<text x="${n(x)}" y="${n(y)}" font-size="${n(o.size)}"${w} fill="${o.fill ?? C.ink}"${a}${t}>${esc(s)}</text>`;
}

export function block(
  x: number,
  y: number,
  lines: string[],
  o: TextOpts & { leading?: number },
): { svg: string; height: number } {
  const lead = o.leading ?? o.size * 1.32;
  return { svg: lines.map((l, i) => text(x, y + i * lead, l, o)).join(""), height: lines.length * lead };
}

export function box(
  x: number,
  y: number,
  w: number,
  h: number,
  o: { fill: string; stroke?: string; r?: number; dash?: string },
): string {
  const st = o.stroke ? ` stroke="${o.stroke}"` : "";
  const d = o.dash ? ` stroke-dasharray="${o.dash}"` : "";
  return `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${o.r ?? R.md}" fill="${o.fill}"${st}${d}/>`;
}

export function arrow(x: number, y: number, len: number, dir: "right" | "down", color = C.faint): string {
  const head = 9;
  if (dir === "right") {
    return (
      `<line x1="${n(x)}" y1="${n(y)}" x2="${n(x + len - head)}" y2="${n(y)}" stroke="${color}" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M${n(x + len)} ${n(y)}L${n(x + len - head)} ${n(y - head * 0.62)}L${n(x + len - head)} ${n(y + head * 0.62)}Z" fill="${color}"/>`
    );
  }
  return (
    `<line x1="${n(x)}" y1="${n(y)}" x2="${n(x)}" y2="${n(y + len - head)}" stroke="${color}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M${n(x)} ${n(y + len)}L${n(x - head * 0.62)} ${n(y + len - head)}L${n(x + head * 0.62)} ${n(y + len - head)}Z" fill="${color}"/>`
  );
}

/** The project mark (same geometry as favicon.svg) — pure shapes, no font. */
export function brandMark(x: number, y: number, size: number): string {
  const s = size / 32;
  return (
    `<g transform="translate(${n(x)},${n(y)}) scale(${n(s)})" aria-hidden="true">` +
    `<rect width="32" height="32" rx="7" fill="${C.teal}"/>` +
    `<path d="M11 16.5l3.2 3.2L21 12.5" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></g>`
  );
}

/* ── Diagram description ──────────────────────────────────────────────────── */

export type Zone = { x: number; y: number; w: number; h: number };

export type Diagram = {
  /** Served at /diagrams/<id>.svg */
  id: string;
  kicker: string;
  /** The claim, not the topic. */
  headline: string;
  deck?: string;
  /** What a reader should take away. */
  takeaway: string;
  /** Complete, self-contained explanation — this is what machines read. */
  alt: string;
  /** Short caption shown under the figure on the page. */
  caption: string;
  /** Draws the body inside the space left between header and footer. */
  draw: (z: Zone, t: Scale, mode: Mode) => string;
};

const SITE_LABEL = "credentialcommons.org";

function render(d: Diagram, mode: Mode): string {
  const CV = CANVAS[mode];
  const t = TYPE[mode];
  const wide = mode === "wide";
  const x = CV.pad;
  const w = CV.w - CV.pad * 2;

  let y = CV.pad + t.kicker;
  let head = text(x, y, d.kicker.toUpperCase(), { size: t.kicker, weight: 700, fill: C.faint, tracking: t.kicker * 0.16 });

  const hlSize = wide ? fitSize(d.headline, w, t.headline, 28, true) : t.headline;
  const hlLines = wrap(d.headline, w, hlSize, true);
  y += wide ? 40 : 26;
  const hl = block(x, y, hlLines, { size: hlSize, weight: 800, fill: C.ink, leading: hlSize * 1.14 });
  head += hl.svg;
  y += hl.height;

  if (d.deck) {
    const dk = block(x, y + t.deck * 0.2, wrap(d.deck, w, t.deck), { size: t.deck, fill: C.muted, leading: t.deck * 1.3 });
    head += dk.svg;
    y += dk.height + (wide ? 4 : 2);
  }

  // Footer height follows its content, so the takeaway can never collide with the mark.
  const markS = wide ? 26 : 20;
  const labelW = textWidth(SITE_LABEL, t.foot, true);
  const brandW = markS + 10 + labelW;
  const tkLines = wrap(d.takeaway, wide ? w - brandW - 48 : w, t.takeaway);
  const tkH = tkLines.length * t.takeaway * 1.3;
  const footerH = wide ? Math.max(tkH, markS) + 28 : tkH + 16 + markS + 6;
  const footTop = CV.h - CV.pad - footerH;
  const markY = wide ? footTop + (footerH - markS) / 2 + 6 : CV.h - CV.pad - markS;
  const foot =
    `<line x1="${n(x)}" y1="${n(footTop)}" x2="${n(CV.w - CV.pad)}" y2="${n(footTop)}" stroke="${C.line}" stroke-width="2"/>` +
    block(x, footTop + (wide ? 28 : 22) + t.takeaway * 0.72, tkLines, { size: t.takeaway, fill: C.ink2, leading: t.takeaway * 1.3 }).svg +
    brandMark(CV.w - CV.pad - brandW, markY, markS) +
    text(CV.w - CV.pad, markY + markS * 0.66, SITE_LABEL, { size: t.foot, weight: 700, fill: C.muted, anchor: "end" });

  const bodyTop = y + (wide ? 24 : 18);
  const zone: Zone = { x, y: bodyTop, w, h: Math.max(60, footTop - 18 - bodyTop) };

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CV.w} ${CV.h}" width="${CV.w}" height="${CV.h}" role="img" aria-labelledby="dt dd">` +
    `<title id="dt">${esc(d.headline)}</title><desc id="dd">${esc(d.alt)}</desc>` +
    `<rect width="${CV.w}" height="${CV.h}" fill="${C.white}"/>` +
    `<g font-family="${FONT}">${head}${d.draw(zone, t, mode)}${foot}</g></svg>\n`
  );
}

export const renderWide = (d: Diagram): string => render(d, "wide");
export const renderStacked = (d: Diagram): string => render(d, "stacked");

export function svgResponse(svg: string): Response {
  return new Response(svg, { headers: { "Content-Type": "image/svg+xml; charset=utf-8" } });
}
