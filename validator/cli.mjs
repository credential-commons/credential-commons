#!/usr/bin/env node
// Credential Commons CLI — `cc validate <file.jsonld> [--profile <name>] [--json]`
//
// Exit code 0 = conformant (warnings allowed), 1 = has violations, 2 = usage/error.

import { readFile } from "node:fs/promises";
import { validate, PROFILES } from "./validate.mjs";

function parseArgs(argv) {
  const args = { command: argv[0], file: null, profile: "micro-credential", json: false };
  for (let i = 1; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--json") args.json = true;
    else if (a === "--profile") args.profile = argv[++i];
    else if (!a.startsWith("-")) args.file = a;
  }
  return args;
}

const ICON = { violation: "✗", warning: "!", info: "i" };

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.command !== "validate" || !args.file) {
    process.stderr.write(
      "usage: cc validate <file.jsonld> [--profile <name>] [--json]\n" +
        `profiles: ${Object.keys(PROFILES).join(", ")}\n`
    );
    process.exit(2);
  }

  let doc;
  try {
    doc = JSON.parse(await readFile(args.file, "utf8"));
  } catch (error) {
    process.stderr.write(`cannot read/parse ${args.file}: ${error.message}\n`);
    process.exit(2);
  }

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

main().catch((error) => {
  process.stderr.write(`FAIL: ${error.stack || error}\n`);
  process.exit(2);
});
