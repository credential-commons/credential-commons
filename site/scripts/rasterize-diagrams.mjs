#!/usr/bin/env node
// Rasterise every concept diagram to PNG after the build.
//
// SVG stays the source of truth and the crisp on-page <source>, but image search
// indexes raster reliably and SVG poorly, and no social network will render an
// SVG card. For each <name>.svg this writes:
//   <name>.png     — 2× on-page raster (indexable <img> fallback)
//   <name>.og.png  — 1200×630 social card
//
// Wide diagrams are authored at 960×504, exactly the 1200×630 ratio, so the card
// fills the frame edge to edge. The narrow (stacked) variants are on-page only —
// a portrait card gets cropped by every network — so they get no .og.png.
//
// PNGs are build output; they are not committed.

import sharp from "sharp";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

// The Vercel adapter copies static output to .vercel/output/static DURING the
// build — before this script runs. Writing only into dist/client would leave the
// PNGs out of the deployed directory and every og:image would 404. So rasterise
// into whichever output directories actually exist.
// Diagrams live at /diagrams/… for the default locale and /<locale>/diagrams/…
// for the rest, so walk the whole static root and pick out anything under a
// "diagrams" directory.
const targets = (process.argv[2] ? [process.argv[2]] : [".vercel/output/static", "dist/client"]).filter((d) =>
  existsSync(d),
);
if (targets.length === 0) {
  process.stdout.write("No diagram output directory — nothing to rasterise.\n");
  process.exit(0);
}

const OG_W = 1200;
const OG_H = 630;

const DIAGRAM_SEG = `${path.sep}diagrams${path.sep}`;

function svgFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...svgFiles(full));
    else if (entry.name.endsWith(".svg") && full.includes(DIAGRAM_SEG)) out.push(full);
  }
  return out;
}

let count = 0;
for (const DIR of targets) {
for (const svgPath of svgFiles(DIR)) {
  const svg = readFileSync(svgPath);
  const base = svgPath.replace(/\.svg$/, "");

  await sharp(svg, { density: 144 })
    .flatten({ background: "#ffffff" })
    .png({ compressionLevel: 9 })
    .toFile(`${base}.png`);

  const isStacked = svgPath.includes(`${path.sep}stacked${path.sep}`);
  if (!isStacked) {
    await sharp(svg, { density: 180 })
      .resize(OG_W, OG_H, { fit: "contain", background: "#ffffff" })
      .flatten({ background: "#ffffff" })
      .png({ compressionLevel: 9 })
      .toFile(`${base}.og.png`);
  }

  count += 1;
  process.stdout.write(`rasterised ${svgPath} → .png${isStacked ? "" : " + .og.png"}\n`);
}
}
process.stdout.write(`Done: ${count} file(s) across ${targets.length} output dir(s).\n`);
