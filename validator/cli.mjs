#!/usr/bin/env node
// Credential Commons CLI
//   cc validate <file.jsonld> [--profile <name>] [--json]
//   cc export   <file.jsonld> --to <ctdl|elm|ob3> [--out <file>]
//
// validate exit: 0 conformant (warnings allowed), 1 has violations, 2 usage/error.

import { readFile, writeFile } from "node:fs/promises";
import { validate, PROFILES } from "./validate.mjs";
import { exportDoc, TARGETS } from "./export.mjs";

function parseArgs(argv) {
  const args = { command: argv[0], file: null, profile: "micro-credential", json: false, to: null, out: null };
  for (let i = 1; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--json") args.json = true;
    else if (a === "--profile") args.profile = argv[++i];
    else if (a === "--to") args.to = argv[++i];
    else if (a === "--out") args.out = argv[++i];
    else if (!a.startsWith("-")) args.file = a;
  }
  return args;
}

async function readDoc(file) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    process.stderr.write(`cannot read/parse ${file}: ${error.message}\n`);
    process.exit(2);
  }
}

const ICON = { violation: "✗", warning: "!", info: "i" };

async function runValidate(args) {
  const doc = await readDoc(args.file);
  let report;
  try {
    report = await validate(doc, { profile: args.profile });
  } catch (error) {
    process.stderr.write(`validation error: ${error.message}\n`);
    process.exit(2);
  }

  if (args.json) {
    process.stdout.write(`${JSON.stringify({ file: args.file, profile: args.profile, ...report }, null, 2)}\n`);
    process.exit(report.conforms ? 0 : 1);
  }

  process.stdout.write(`\nCredential Commons — profile "${args.profile}"\nfile: ${args.file}\n\n`);
  if (report.results.length === 0) {
    process.stdout.write("✓ conformant — no issues.\n\n");
  } else if (report.results.length > 25) {
    // Scale-friendly summary (e.g. validating a whole catalog graph): group by message.
    const byMsg = new Map();
    for (const r of report.results) {
      const k = `${r.severity}|${r.message}`;
      byMsg.set(k, (byMsg.get(k) || 0) + 1);
    }
    const nodes = new Set(report.results.map((r) => r.focusNode)).size;
    for (const [k, n] of [...byMsg.entries()].sort((a, b) => b[1] - a[1])) {
      const [sev, msg] = k.split("|");
      process.stdout.write(`  ${ICON[sev] || "?"} ${String(n).padStart(4)}×  ${msg}\n`);
    }
    process.stdout.write(
      `\n${report.conforms ? "✓ conformant" : "✗ NOT conformant"} — ` +
        `${report.violations} violation(s), ${report.warnings} warning(s) across ${nodes} record(s).\n\n`
    );
  } else {
    for (const r of report.results) {
      const where = r.path ? r.path.replace(/^.*[/#]/, "") : r.focusNode || "";
      process.stdout.write(`  ${ICON[r.severity] || "?"} ${r.severity.toUpperCase().padEnd(9)} ${where}\n     ${r.message}\n`);
    }
    process.stdout.write(
      `\n${report.conforms ? "✓ conformant" : "✗ NOT conformant"} — ` +
        `${report.violations} violation(s), ${report.warnings} warning(s).\n\n`
    );
  }
  process.exit(report.conforms ? 0 : 1);
}

async function runExport(args) {
  if (!args.to) {
    process.stderr.write(`--to <target> required. Targets: ${Object.keys(TARGETS).join(", ")}\n`);
    process.exit(2);
  }
  const doc = await readDoc(args.file);
  let result;
  try {
    result = await exportDoc(doc, { target: args.to });
  } catch (error) {
    process.stderr.write(`export error: ${error.message}\n`);
    process.exit(2);
  }
  const json = `${JSON.stringify(result.output, null, 2)}\n`;
  if (args.out) {
    await writeFile(args.out, json);
    process.stderr.write(`wrote ${args.out} (${args.to}) — mapped ${result.mapped.length}, unmapped: ${result.unmapped.join(", ") || "none"}\n`);
  } else {
    process.stdout.write(json);
    process.stderr.write(`# mapped ${result.mapped.length} field(s); unmapped: ${result.unmapped.join(", ") || "none"}\n`);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.command === "validate" && args.file) return runValidate(args);
  if (args.command === "export" && args.file) return runExport(args);
  process.stderr.write(
    "usage:\n" +
      "  cc validate <file.jsonld> [--profile <name>] [--json]\n" +
      "  cc export   <file.jsonld> --to <ctdl|elm|ob3> [--out <file>]\n" +
      `profiles: ${Object.keys(PROFILES).join(", ")}\n`
  );
  process.exit(2);
}

main().catch((error) => {
  process.stderr.write(`FAIL: ${error.stack || error}\n`);
  process.exit(2);
});
