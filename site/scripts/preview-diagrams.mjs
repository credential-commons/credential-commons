#!/usr/bin/env node
// Fast design loop: render every concept diagram (wide + narrow + the social card)
// straight to tmp/diagrams/ so the drawing can be reviewed as a real picture
// without building the whole site.
//
//   node scripts/preview-diagrams.mjs
//   node scripts/preview-diagrams.mjs two-trees
//
// tmp/ is git-ignored — these files are not committed.

import { build } from "esbuild";
import sharp from "sharp";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const OUT = "tmp/diagrams";
mkdirSync(OUT, { recursive: true });

const bundles = {
  data: ["src/data/diagrams.ts", "tmp/.diagrams.mjs"],
  lib: ["src/lib/diagram.ts", "tmp/.diagram-lib.mjs"],
};
for (const [entry, outfile] of Object.values(bundles)) {
  await build({ entryPoints: [entry], bundle: true, format: "esm", platform: "node", outfile, logLevel: "silent" });
}

const stamp = process.hrtime.bigint();
const { diagrams } = await import(`${pathToFileURL(path.resolve(bundles.data[1])).href}?t=${stamp}`);
const { renderWide, renderStacked } = await import(`${pathToFileURL(path.resolve(bundles.lib[1])).href}?t=${stamp}`);

const only = process.argv.slice(2);
const list = only.length ? diagrams.filter((d) => only.includes(d.id)) : diagrams;

for (const d of list) {
  for (const [suffix, svg] of [
    ["", renderWide(d)],
    ["-stacked", renderStacked(d)],
  ]) {
    const base = path.join(OUT, `${d.id}${suffix}`);
    writeFileSync(`${base}.svg`, svg);
    await sharp(Buffer.from(svg), { density: 144 }).flatten({ background: "#ffffff" }).png().toFile(`${base}.png`);
  }
  await sharp(Buffer.from(renderWide(d)), { density: 180 })
    .resize(1200, 630, { fit: "contain", background: "#ffffff" })
    .png()
    .toFile(path.join(OUT, `${d.id}.og.png`));
  process.stdout.write(`${d.id}\n`);
}

for (const [, outfile] of Object.values(bundles)) rmSync(outfile, { force: true });
process.stdout.write(`\n${list.length} diagram(s) → ${OUT}/\n`);
