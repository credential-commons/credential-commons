/**
 * The concept diagrams.
 *
 * Each one states a claim the project actually makes — the wording is taken from
 * `docs/what-travels.md`, `docs/living-tree-and-two-trees.md`, `SCAFFOLD.md` and
 * the site's own copy. Nothing here promises trust, recognition or adoption; a
 * diagram describes what the layer *is*, not what it will achieve for you.
 *
 * English only for now. The site is published in five languages, but diagram copy
 * needs a native reader before it goes out, so translation is deliberately not
 * guessed here.
 */

import {
  C,
  R,
  type Diagram,
  type Mode,
  type Scale,
  type Zone,
  block,
  box,
  fitSize,
  n,
  text,
  textWidth,
  wrap,
} from "../lib/diagram";

/* ── shared pieces ────────────────────────────────────────────────────────── */

/** A titled list panel. `accent` marks the side the diagram is arguing for. */
function panel(
  x: number,
  y: number,
  w: number,
  h: number,
  title: string,
  items: string[],
  accent: boolean,
  t: Scale,
  size: number,
): string {
  const padX = 20;
  const glyph = accent ? "→" : "·";
  let out =
    box(x, y, w, h, { fill: accent ? C.tealSoft : C.paper, stroke: accent ? C.tealLine : C.line, r: R.lg }) +
    text(x + padX, y + 32, title, {
      size: fitSize(title, w - padX * 2, t.sub * 1.1, 10, true),
      weight: 800,
      fill: accent ? C.tealDeep : C.faint,
      tracking: 0.4,
    });
  let cy = y + 32 + size * 1.6;
  for (const item of items) {
    const lines = wrap(item, w - padX * 2 - 26, size);
    out +=
      text(x + padX, cy, glyph, { size, weight: 700, fill: accent ? C.teal : C.faint }) +
      block(x + padX + 26, cy, lines, { size, fill: accent ? C.ink2 : C.muted }).svg;
    cy += Math.max(size * 1.5, lines.length * size * 1.3 + 6);
  }
  return out;
}

/** Height a `panel` needs for its content. */
function panelHeight(items: string[], w: number, size: number): number {
  const inner = w - 20 * 2 - 26;
  const rows = items.reduce((sum, i) => sum + Math.max(size * 1.5, wrap(i, inner, size).length * size * 1.3 + 6), 0);
  return 32 + size * 1.6 + rows + 14;
}

/** Two lists side by side (wide) or stacked (narrow), auto-fitted to the space. */
function twoPanels(
  z: Zone,
  t: Scale,
  mode: Mode,
  left: { title: string; items: string[] },
  right: { title: string; items: string[] },
): string {
  const wide = mode === "wide";
  const gap = wide ? 24 : 14;
  const w = wide ? (z.w - gap) / 2 : z.w;
  const avail = wide ? z.h : (z.h - gap) / 2;
  let size = t.body;
  let need = Math.max(panelHeight(left.items, w, size), panelHeight(right.items, w, size));
  while (size > t.sub * 0.8 && need > avail) {
    size -= 0.5;
    need = Math.max(panelHeight(left.items, w, size), panelHeight(right.items, w, size));
  }
  const h = Math.min(avail, Math.max(need, wide ? 150 : 110));
  if (wide) {
    const y = z.y + (z.h - h) / 2;
    return (
      panel(z.x, y, w, h, left.title, left.items, true, t, size) +
      panel(z.x + w + gap, y, w, h, right.title, right.items, false, t, size)
    );
  }
  return (
    panel(z.x, z.y, w, h, left.title, left.items, true, t, size) +
    panel(z.x, z.y + h + gap, w, h, right.title, right.items, false, t, size)
  );
}

/** A labelled cell used by the two-tracks diagram. */
function cell(x: number, y: number, w: number, h: number, label: string, accent: boolean, size: number): string {
  const lines = wrap(label, w - 20, size, true);
  const top = y + h / 2 - ((lines.length - 1) * size * 1.22) / 2 + size * 0.34;
  return (
    box(x, y, w, h, { fill: accent ? C.tealSoft : C.paper, stroke: accent ? C.tealLine : C.line, r: R.md }) +
    block(x + w / 2, top, lines, {
      size,
      weight: 700,
      fill: accent ? C.tealDeep : C.muted,
      anchor: "middle",
      leading: size * 1.22,
    }).svg
  );
}

/* ── the diagrams ─────────────────────────────────────────────────────────── */

const OPS = ["Data and infrastructure", "Catalogue / warehouse", "Product lines", "Revenue"];
const KNOWLEDGE = ["Prior knowledge", "Programme", "Learning outcomes", "Credential"];
/** The three stages where the two tracks describe the same thing. */
const MEETS = [false, true, true, true];

const twoTrees: Diagram = {
  id: "two-trees",
  kicker: "Two trees",
  headline: "Two trees. Three places they meet.",
  deck: "Credential Commons models the knowledge tree, and crosswalks to yours",
  takeaway: "Your operations tree stays yours — Credential Commons never rebuilds one.",
  alt: "Two parallel tracks. The upper track is an organisation's product and operations tree: data and infrastructure, the catalogue or warehouse, product lines, revenue. The lower track is the knowledge and credential tree that Credential Commons models: prior knowledge, the programme, learning outcomes, the credential. Dashed links join the two tracks at three stages — the catalogue offering, the learning outcomes, and the credential. Credential Commons crosswalks to an operations tree at those points; it never owns or rebuilds one.",
  caption:
    "Two tracks: an operations tree and a knowledge tree. They meet at three stages — the catalogue offering, the learning outcomes and the credential.",
  draw(z, t, mode) {
    const wide = mode === "wide";
    if (wide) {
      const cols = 4;
      const gap = 16;
      const cw = (z.w - gap * (cols - 1)) / cols;
      const labelH = 22;
      const linkH = 34;
      // Both track names sit ABOVE their row, so nothing can reach the footer rule.
      const ch = Math.max(44, Math.min(54, (z.h - labelH * 2 - linkH) / 2));
      const total = labelH * 2 + ch * 2 + linkH;
      const top = z.y + Math.max(0, (z.h - total) / 2);
      const size = t.sub;
      const kRowTop = top + labelH + ch + linkH + labelH;
      let out =
        text(z.x, top + labelH - 6, "YOUR PRODUCT / OPERATIONS TREE", { size: t.sub * 0.8, weight: 700, fill: C.faint, tracking: 1.4 }) +
        text(z.x, kRowTop - 6, "THE KNOWLEDGE / CREDENTIAL TREE — WHAT CREDENTIAL COMMONS MODELS", {
          size: t.sub * 0.8,
          weight: 700,
          fill: C.tealDeep,
          tracking: 1.4,
        });
      for (let i = 0; i < cols; i += 1) {
        const x = z.x + (cw + gap) * i;
        out += cell(x, top + labelH, cw, ch, OPS[i], false, size);
        out += cell(x, kRowTop, cw, ch, KNOWLEDGE[i], true, size);
        if (MEETS[i]) {
          const y0 = top + labelH + ch + 5;
          const y1 = kRowTop - labelH - 5;
          out +=
            `<line x1="${n(x + cw / 2)}" y1="${n(y0)}" x2="${n(x + cw / 2)}" y2="${n(y1)}" stroke="${C.teal}" stroke-width="2" stroke-dasharray="4 4"/>` +
            `<circle cx="${n(x + cw / 2)}" cy="${n((y0 + y1) / 2)}" r="5" fill="${C.teal}"/>`;
        }
      }
      return out;
    }
    // Narrow: one row per stage, the two tracks side by side.
    const rowGap = 12;
    const rows = 4;
    const labelH = 22;
    const rh = Math.min(66, (z.h - labelH - rowGap * (rows - 1)) / rows);
    const cw = (z.w - 26) / 2;
    const kicker = t.sub * 0.78;
    // Without these the two columns are unlabelled and the diagram loses its point.
    let out =
      text(z.x, z.y + kicker, "OPERATIONS", { size: kicker, weight: 700, fill: C.faint, tracking: 1.1 }) +
      text(z.x + cw + 26, z.y + kicker, "KNOWLEDGE", { size: kicker, weight: 700, fill: C.tealDeep, tracking: 1.1 });
    for (let i = 0; i < rows; i += 1) {
      const y = z.y + labelH + (rh + rowGap) * i;
      out += cell(z.x, y, cw, rh, OPS[i], false, t.sub);
      out += cell(z.x + cw + 26, y, cw, rh, KNOWLEDGE[i], true, t.sub);
      if (MEETS[i]) {
        out +=
          `<line x1="${n(z.x + cw + 5)}" y1="${n(y + rh / 2)}" x2="${n(z.x + cw + 21)}" y2="${n(y + rh / 2)}" stroke="${C.teal}" stroke-width="2" stroke-dasharray="4 4"/>` +
          `<circle cx="${n(z.x + cw + 13)}" cy="${n(y + rh / 2)}" r="4.5" fill="${C.teal}"/>`;
      }
    }
    return out;
  },
};

const whatTravels: Diagram = {
  id: "what-travels",
  kicker: "The transplant test",
  headline: "Only what the next organisation needs has to travel",
  takeaway: "Would the next organisation need it? Then it travels.",
  alt: "The transplant test decides what belongs in a shared credential record. One question: would the next organisation need this to recognise and continue the learner's growth? What travels: the learner's identity, the learning outcomes, the alignment to a competency framework, the credential or achievement itself, and the version the claim was made against. What stays behind: course materials, cohorts, rosters, schedules, and the organisation's own teaching methods. Credential Commons is deliberately small — it holds only what must survive the transplant.",
  caption:
    "The transplant test: what the next organisation needs travels with the learner; everything else stays where it was made.",
  draw: (z, t, mode) =>
    twoPanels(
      z,
      t,
      mode,
      {
        title: "TRAVELS WITH THE LEARNER",
        items: ["Identity", "Learning outcomes", "Competency alignment", "The credential and its version"],
      },
      { title: "STAYS WHERE IT WAS MADE", items: ["Materials", "Cohorts and rosters", "Schedules", "Your own teaching methods"] },
    ),
};

const growthRings: Diagram = {
  id: "growth-rings",
  kicker: "Versions",
  headline: "A credential is a claim about one ring",
  takeaway: "Each version is frozen and kept, so an old credential still reads true.",
  alt: "Versions modelled as growth rings. Each published version of a programme is one ring: it is retained, frozen, and never overwritten by later versions. A credential is a claim about the specific ring it was granted against, so verifying an older credential means reading that ring rather than the current version of the programme. History is first-class rather than an audit log bolted on afterwards.",
  caption: "Each version is a retained ring. A credential points at the ring it was granted against.",
  draw(z, t, mode) {
    const wide = mode === "wide";
    const rings = [
      { v: "0.1", label: "first published version" },
      { v: "0.2", label: "revised — 0.1 kept" },
      { v: "0.3", label: "current version" },
    ];
    const size = wide ? Math.min(z.h, 190) : Math.min(z.h * 0.42, 170);
    const cx = wide ? z.x + size / 2 + 8 : z.x + z.w / 2;
    const cy = wide ? z.y + z.h / 2 : z.y + size / 2;
    const rMax = size / 2;
    let out = "";
    // Outermost first, so inner rings draw on top and stay visible.
    for (let i = rings.length - 1; i >= 0; i -= 1) {
      const r = rMax * ((i + 1) / rings.length);
      out += `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="${i === 0 ? C.tealSoft : C.white}" stroke="${C.teal}" stroke-width="${i === rings.length - 1 ? 3 : 2}"/>`;
    }
    // Version sits ON its own ring. Leader lines from an inner ring would have to
    // cross every ring outside it, which reads as noise.
    rings.forEach((ring, i) => {
      const r = rMax * ((i + 1) / rings.length);
      const ly = i === 0 ? cy + t.sub * 0.34 : cy - r + t.sub * 1.35;
      out += text(cx, ly, ring.v, { size: t.sub, weight: 800, fill: C.tealDeep, anchor: "middle" });
    });

    if (wide) {
      const lx = z.x + size + 48;
      let ly = z.y + (z.h - (rings.length * (t.body * 1.35 + 16) + t.sub * 2)) / 2 + t.body;
      rings.forEach((ring) => {
        out +=
          `<circle cx="${n(lx + 6)}" cy="${n(ly - t.body * 0.32)}" r="6" fill="${C.teal}"/>` +
          text(lx + 24, ly, `Version ${ring.v}`, { size: t.body, weight: 800, fill: C.ink }) +
          text(lx + 24 + textWidth(`Version ${ring.v}`, t.body, true) + 10, ly, `— ${ring.label}`, { size: t.sub, fill: C.muted });
        ly += t.body * 1.35 + 16;
      });
      out += text(lx, ly + t.sub * 0.6, "A credential names the ring it was granted against.", {
        size: t.sub,
        weight: 700,
        fill: C.tealDeep,
      });
      return out;
    }
    let ly = z.y + size + 34;
    rings.forEach((ring) => {
      out +=
        text(z.x, ly, `Version ${ring.v}`, { size: t.body, weight: 800, fill: C.ink }) +
        text(z.x, ly + t.sub * 1.35, ring.label, { size: t.sub, fill: C.muted });
      ly += t.body * 1.35 + t.sub * 1.35 + 10;
    });
    return out;
  },
};

const neutralSlots: Diagram = {
  id: "neutral-slots",
  kicker: "Neutral slots",
  headline: "We define the socket, you keep your framework",
  takeaway: "The socket stays stable. What you plug into it stays yours.",
  alt: "Credential Commons mandates no single vendor, product or framework. Where a layer needs an external model — a competency framework, a credit system, a level, a delivery mode — it defines a neutral, framework-agnostic slot plus a crosswalk mechanism. Adopters plug in whatever they already use, and the crosswalks describe how those fields map to CTDL, ELM/Europass and Open Badges 3.0. The crosswalks say how to map if you use these standards; they do not say to use them.",
  caption: "Neutral slots with crosswalks: Credential Commons guarantees the socket, not your choice of framework.",
  draw(z, t, mode) {
    const wide = mode === "wide";
    const slots = ["Competency framework", "Credit system", "Level", "Delivery mode"];
    const walks = ["CTDL", "ELM / Europass", "Open Badges 3.0"];
    if (wide) {
      const gap = 16;
      const w = (z.w - gap * (slots.length - 1)) / slots.length;
      const h = 74;
      // Centre the whole slots + crosswalks group, otherwise it hugs the top and
      // leaves a dead band above the footer rule.
      const total = h + 46 + t.sub * 2.2;
      const top = z.y + Math.max(8, (z.h - total) / 2);
      let out = text(z.x, top - 12, "NEUTRAL SLOTS — YOURS TO FILL", { size: t.sub * 0.8, weight: 700, fill: C.faint, tracking: 1.4 });
      slots.forEach((s, i) => {
        const x = z.x + (w + gap) * i;
        const lines = wrap(s, w - 18, t.sub, true);
        out +=
          box(x, top, w, h, { fill: C.white, stroke: C.teal, r: R.md, dash: "6 5" }) +
          block(x + w / 2, top + h / 2 - ((lines.length - 1) * t.sub * 1.22) / 2 + t.sub * 0.34, lines, {
            size: t.sub,
            weight: 700,
            fill: C.tealDeep,
            anchor: "middle",
            leading: t.sub * 1.22,
          }).svg;
      });
      const by = top + h + 46;
      out += `<line x1="${n(z.x)}" y1="${n(top + h + 22)}" x2="${n(z.x + z.w)}" y2="${n(top + h + 22)}" stroke="${C.line}" stroke-width="2" stroke-dasharray="5 5"/>`;
      out += text(z.x, by + t.sub * 0.9, "crosswalks to", { size: t.sub, fill: C.muted });
      let cx = z.x + textWidth("crosswalks to", t.sub) + 18;
      walks.forEach((wk) => {
        const cw = textWidth(wk, t.sub, true) + 26;
        out +=
          box(cx, by - t.sub * 0.5, cw, t.sub * 2.2, { fill: C.tealSoft, stroke: C.tealLine, r: t.sub * 1.1 }) +
          text(cx + cw / 2, by + t.sub * 0.9, wk, { size: t.sub, weight: 700, fill: C.tealDeep, anchor: "middle" });
        cx += cw + 12;
      });
      return out;
    }
    const h = 52;
    const gap = 10;
    let out = "";
    slots.forEach((s, i) => {
      const y = z.y + (h + gap) * i;
      out +=
        box(z.x, y, z.w, h, { fill: C.white, stroke: C.teal, r: R.md, dash: "6 5" }) +
        text(z.x + z.w / 2, y + h / 2 + t.sub * 0.34, s, { size: t.sub, weight: 700, fill: C.tealDeep, anchor: "middle" });
    });
    const by = z.y + (h + gap) * slots.length + 16;
    out += text(z.x, by, "crosswalks to", { size: t.sub, fill: C.muted });
    let cy = by + t.sub * 1.9;
    walks.forEach((wk) => {
      const cw = textWidth(wk, t.sub, true) + 26;
      out +=
        box(z.x, cy - t.sub, cw, t.sub * 2.1, { fill: C.tealSoft, stroke: C.tealLine, r: t.sub * 1.05 }) +
        text(z.x + cw / 2, cy + t.sub * 0.36, wk, { size: t.sub, weight: 700, fill: C.tealDeep, anchor: "middle" });
      cy += t.sub * 2.6;
    });
    return out;
  },
};

const inOnePicture: Diagram = {
  id: "credential-commons",
  kicker: "Credential Commons",
  headline: "A thin interoperability layer, not a portal",
  deck: "three parts, all open",
  takeaway: "Describe the record, check your data, map to the standards you already use.",
  alt: "Credential Commons is a thin, open interoperability and conformance layer made of three parts. Profiles are machine-readable descriptions of what a good record looks like. The validator answers whether your data conforms. Crosswalks describe how your fields map to international standards such as CTDL, ELM/Europass and Open Badges 3.0. It is not a new ontology, a registry, or a portal.",
  caption: "Three parts: machine-readable profiles, a validator, and crosswalks to existing standards.",
  draw(z, t, mode) {
    const wide = mode === "wide";
    const parts = [
      { label: "Profiles", sub: "what a good record looks like" },
      { label: "Validator", sub: "does your data conform?" },
      { label: "Crosswalks", sub: "how your fields map to standards" },
    ];
    if (wide) {
      const gap = 20;
      const w = (z.w - gap * 2) / 3;
      const h = Math.min(z.h, 148);
      const y = z.y + (z.h - h) / 2;
      return parts
        .map((p, i) => {
          const x = z.x + (w + gap) * i;
          const subLines = wrap(p.sub, w - 34, t.sub);
          return (
            box(x, y, w, h, { fill: i === 0 ? C.tealSoft : C.paper, stroke: i === 0 ? C.tealLine : C.line, r: R.lg }) +
            text(x + w / 2, y + h / 2 - 6, p.label, { size: t.label, weight: 800, fill: i === 0 ? C.tealDeep : C.ink, anchor: "middle" }) +
            block(x + w / 2, y + h / 2 + t.sub * 1.5, subLines, { size: t.sub, fill: C.muted, anchor: "middle", leading: t.sub * 1.25 }).svg
          );
        })
        .join("");
    }
    const gap = 14;
    const h = Math.min(96, (z.h - gap * 2) / 3);
    return parts
      .map((p, i) => {
        const y = z.y + (h + gap) * i;
        return (
          box(z.x, y, z.w, h, { fill: i === 0 ? C.tealSoft : C.paper, stroke: i === 0 ? C.tealLine : C.line, r: R.lg }) +
          text(z.x + z.w / 2, y + h / 2 - 2, p.label, { size: t.label, weight: 800, fill: i === 0 ? C.tealDeep : C.ink, anchor: "middle" }) +
          text(z.x + z.w / 2, y + h / 2 + t.sub * 1.4, p.sub, { size: t.sub, fill: C.muted, anchor: "middle" })
        );
      })
      .join("");
  },
};

export const diagrams: Diagram[] = [inOnePicture, twoTrees, whatTravels, growthRings, neutralSlots];
export const diagramById = new Map(diagrams.map((d) => [d.id, d]));
