/**
 * The concept diagrams.
 *
 * Each one states a claim the project actually makes — the wording is taken from
 * `docs/what-travels.md`, `docs/living-tree-and-two-trees.md`, `SCAFFOLD.md` and
 * the site's own copy. Nothing here promises trust, recognition or adoption; a
 * diagram describes what the layer *is*, not what it will achieve for you.
 *
 * All drawn text comes from `src/i18n/diagrams.ts`. Nothing is hardcoded here,
 * so a diagram exists in every locale the copy exists in. Diagram ids stay in
 * English across locales, because they are URLs.
 */

import { CROSSWALK_TARGETS, copyFor } from "../i18n/diagrams";
import type { Locale } from "../i18n/ui";
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
    text(x + padX, y + 32, title.toUpperCase(), {
      size: fitSize(title.toUpperCase(), w - padX * 2, t.sub * 1.1, 10, true),
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
  // Longer languages shrink the list type rather than overflowing the panel.
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
  // Long compounds (German especially) get their own size rather than spilling.
  const fitted = Math.min(size, fitSize(label, w - 20, size, size * 0.72, true));
  const lines = wrap(label, w - 20, fitted, true);
  const top = y + h / 2 - ((lines.length - 1) * fitted * 1.22) / 2 + fitted * 0.34;
  return (
    box(x, y, w, h, { fill: accent ? C.tealSoft : C.paper, stroke: accent ? C.tealLine : C.line, r: R.md }) +
    block(x + w / 2, top, lines, {
      size: fitted,
      weight: 700,
      fill: accent ? C.tealDeep : C.muted,
      anchor: "middle",
      leading: fitted * 1.22,
    }).svg
  );
}

/* ── the diagrams ─────────────────────────────────────────────────────────── */

/** The three stages where the two tracks describe the same thing. */
const MEETS = [false, true, true, true];

export function buildDiagrams(lang: Locale): Diagram[] {
  const c = copyFor(lang);

  const overview: Diagram = {
    id: "credential-commons",
    ...c.overview,
    draw(z, t, mode) {
      const parts = c.overview.parts;
      if (mode === "wide") {
        const gap = 20;
        const w = (z.w - gap * 2) / 3;
        const h = Math.min(z.h, 148);
        const y = z.y + (z.h - h) / 2;
        return parts
          .map((p, i) => {
            const x = z.x + (w + gap) * i;
            const label = fitSize(p.label, w - 30, t.label, t.body * 0.8, true);
            return (
              box(x, y, w, h, { fill: i === 0 ? C.tealSoft : C.paper, stroke: i === 0 ? C.tealLine : C.line, r: R.lg }) +
              text(x + w / 2, y + h / 2 - 6, p.label, {
                size: label,
                weight: 800,
                fill: i === 0 ? C.tealDeep : C.ink,
                anchor: "middle",
              }) +
              block(x + w / 2, y + h / 2 + t.sub * 1.5, wrap(p.sub, w - 34, t.sub), {
                size: t.sub,
                fill: C.muted,
                anchor: "middle",
                leading: t.sub * 1.25,
              }).svg
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
            text(z.x + z.w / 2, y + h / 2 - 2, p.label, {
              size: fitSize(p.label, z.w - 30, t.label, t.body * 0.8, true),
              weight: 800,
              fill: i === 0 ? C.tealDeep : C.ink,
              anchor: "middle",
            }) +
            text(z.x + z.w / 2, y + h / 2 + t.sub * 1.4, p.sub, {
              size: fitSize(p.sub, z.w - 24, t.sub, t.sub * 0.78),
              fill: C.muted,
              anchor: "middle",
            })
          );
        })
        .join("");
    },
  };

  const twoTrees: Diagram = {
    id: "two-trees",
    ...c.twoTrees,
    draw(z, t, mode) {
      const { ops, knowledge, opsTrack, knowledgeTrack, opsShort, knowledgeShort } = c.twoTrees;
      if (mode === "wide") {
        const cols = 4;
        const gap = 16;
        const cw = (z.w - gap * (cols - 1)) / cols;
        const labelH = 22;
        const linkH = 34;
        // Both track names sit ABOVE their row. The cell height follows the space
        // actually left — a fixed floor pushed the lower row into the footer rule
        // in the languages whose headline or deck runs longer than English.
        const avail = z.h - labelH * 2 - linkH;
        const ch = Math.max(34, Math.min(54, avail / 2));
        const total = labelH * 2 + ch * 2 + linkH;
        const top = z.y + Math.max(0, (z.h - total) / 2);
        const kSize = t.sub * 0.8;
        const kRowTop = top + labelH + ch + linkH + labelH;
        let out =
          text(z.x, top + labelH - 6, opsTrack.toUpperCase(), {
            size: fitSize(opsTrack.toUpperCase(), z.w * 0.5, kSize, 10, true),
            weight: 700,
            fill: C.faint,
            tracking: 1.4,
          }) +
          text(z.x, kRowTop - 6, knowledgeTrack.toUpperCase(), {
            size: fitSize(knowledgeTrack.toUpperCase(), z.w, kSize, 10, true),
            weight: 700,
            fill: C.tealDeep,
            tracking: 1.4,
          });
        for (let i = 0; i < cols; i += 1) {
          const x = z.x + (cw + gap) * i;
          out += cell(x, top + labelH, cw, ch, ops[i], false, t.sub);
          out += cell(x, kRowTop, cw, ch, knowledge[i], true, t.sub);
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
        text(z.x, z.y + kicker, opsShort.toUpperCase(), {
          size: fitSize(opsShort.toUpperCase(), cw, kicker, 8, true),
          weight: 700,
          fill: C.faint,
          tracking: 1.1,
        }) +
        text(z.x + cw + 26, z.y + kicker, knowledgeShort.toUpperCase(), {
          size: fitSize(knowledgeShort.toUpperCase(), cw, kicker, 8, true),
          weight: 700,
          fill: C.tealDeep,
          tracking: 1.1,
        });
      for (let i = 0; i < rows; i += 1) {
        const y = z.y + labelH + (rh + rowGap) * i;
        out += cell(z.x, y, cw, rh, ops[i], false, t.sub);
        out += cell(z.x + cw + 26, y, cw, rh, knowledge[i], true, t.sub);
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
    ...c.whatTravels,
    draw: (z, t, mode) =>
      twoPanels(
        z,
        t,
        mode,
        { title: c.whatTravels.travelsTitle, items: c.whatTravels.travels },
        { title: c.whatTravels.staysTitle, items: c.whatTravels.stays },
      ),
  };

  const growthRings: Diagram = {
    id: "growth-rings",
    ...c.growthRings,
    draw(z, t, mode) {
      const wide = mode === "wide";
      const versions = ["0.1", "0.2", "0.3"];
      const { versionWord, rings, note } = c.growthRings;
      const size = wide ? Math.min(z.h, 190) : Math.min(z.h * 0.42, 170);
      const cx = wide ? z.x + size / 2 + 8 : z.x + z.w / 2;
      const cy = wide ? z.y + z.h / 2 : z.y + size / 2;
      const rMax = size / 2;
      let out = "";
      // Outermost first, so inner rings draw on top and stay visible.
      for (let i = versions.length - 1; i >= 0; i -= 1) {
        const r = rMax * ((i + 1) / versions.length);
        out += `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="${i === 0 ? C.tealSoft : C.white}" stroke="${C.teal}" stroke-width="${i === versions.length - 1 ? 3 : 2}"/>`;
      }
      // The version sits ON its own ring. A leader line from an inner ring would
      // have to cross every ring outside it, which reads as noise.
      versions.forEach((v, i) => {
        const r = rMax * ((i + 1) / versions.length);
        const ly = i === 0 ? cy + t.sub * 0.34 : cy - r + t.sub * 1.35;
        out += text(cx, ly, v, { size: t.sub, weight: 800, fill: C.tealDeep, anchor: "middle" });
      });

      if (wide) {
        const lx = z.x + size + 48;
        const lw = z.w - size - 48;
        let ly = z.y + (z.h - (versions.length * (t.body * 1.35 + 16) + t.sub * 2)) / 2 + t.body;
        versions.forEach((v, i) => {
          const head = `${versionWord} ${v}`;
          const headW = textWidth(head, t.body, true);
          out +=
            `<circle cx="${n(lx + 6)}" cy="${n(ly - t.body * 0.32)}" r="6" fill="${C.teal}"/>` +
            text(lx + 24, ly, head, { size: t.body, weight: 800, fill: C.ink }) +
            text(lx + 24 + headW + 10, ly, `— ${rings[i]}`, {
              size: fitSize(`— ${rings[i]}`, lw - 34 - headW - 10, t.sub, t.sub * 0.78),
              fill: C.muted,
            });
          ly += t.body * 1.35 + 16;
        });
        out += text(lx, ly + t.sub * 0.6, note, {
          size: fitSize(note, lw, t.sub, t.sub * 0.8, true),
          weight: 700,
          fill: C.tealDeep,
        });
        return out;
      }
      let ly = z.y + size + 34;
      versions.forEach((v, i) => {
        out +=
          text(z.x, ly, `${versionWord} ${v}`, { size: t.body, weight: 800, fill: C.ink }) +
          text(z.x, ly + t.sub * 1.35, rings[i], { size: fitSize(rings[i], z.w, t.sub, t.sub * 0.8), fill: C.muted });
        ly += t.body * 1.35 + t.sub * 1.35 + 10;
      });
      return out;
    },
  };

  const neutralSlots: Diagram = {
    id: "neutral-slots",
    ...c.neutralSlots,
    draw(z, t, mode) {
      const { slots, slotsLabel, crosswalksTo } = c.neutralSlots;
      const walks = CROSSWALK_TARGETS;
      if (mode === "wide") {
        const gap = 16;
        const w = (z.w - gap * (slots.length - 1)) / slots.length;
        const h = 74;
        // Centre the whole slots + crosswalks group, otherwise it hugs the top and
        // leaves a dead band above the footer rule.
        const total = h + 46 + t.sub * 2.2;
        const top = z.y + Math.max(8, (z.h - total) / 2);
        let out = text(z.x, top - 12, slotsLabel.toUpperCase(), {
          size: fitSize(slotsLabel.toUpperCase(), z.w * 0.6, t.sub * 0.8, 10, true),
          weight: 700,
          fill: C.faint,
          tracking: 1.4,
        });
        slots.forEach((s, i) => {
          const x = z.x + (w + gap) * i;
          const fitted = Math.min(t.sub, fitSize(s, w - 18, t.sub, t.sub * 0.72, true));
          const lines = wrap(s, w - 18, fitted, true);
          out +=
            box(x, top, w, h, { fill: C.white, stroke: C.teal, r: R.md, dash: "6 5" }) +
            block(x + w / 2, top + h / 2 - ((lines.length - 1) * fitted * 1.22) / 2 + fitted * 0.34, lines, {
              size: fitted,
              weight: 700,
              fill: C.tealDeep,
              anchor: "middle",
              leading: fitted * 1.22,
            }).svg;
        });
        const by = top + h + 46;
        out += `<line x1="${n(z.x)}" y1="${n(top + h + 22)}" x2="${n(z.x + z.w)}" y2="${n(top + h + 22)}" stroke="${C.line}" stroke-width="2" stroke-dasharray="5 5"/>`;
        out += text(z.x, by + t.sub * 0.9, crosswalksTo, { size: t.sub, fill: C.muted });
        let cx = z.x + textWidth(crosswalksTo, t.sub) + 18;
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
          text(z.x + z.w / 2, y + h / 2 + t.sub * 0.34, s, {
            size: fitSize(s, z.w - 24, t.sub, t.sub * 0.75, true),
            weight: 700,
            fill: C.tealDeep,
            anchor: "middle",
          });
      });
      const by = z.y + (h + gap) * slots.length + 16;
      out += text(z.x, by, crosswalksTo, { size: t.sub, fill: C.muted });
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

  return [overview, twoTrees, whatTravels, growthRings, neutralSlots];
}

/** English set — used by the default-locale routes. */
export const diagrams: Diagram[] = buildDiagrams("en");
export const diagramIds = diagrams.map((d) => d.id);
