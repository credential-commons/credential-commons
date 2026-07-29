/**
 * Concept-diagram copy, per locale.
 *
 * Every string that a diagram draws lives here — nothing is hardcoded in the
 * drawing code. Adding a language is a copy task, not a code task.
 *
 * Two things to respect when translating:
 *
 * 1. **Reuse the terms already established** in `why.ts`, `ui.ts` and `faq.ts`.
 *    A reader who meets "credential" as one word on `/why` and a different word
 *    in the diagram will think they are two different things.
 * 2. **Length is a hard constraint.** These strings are drawn into a fixed
 *    canvas, not reflowed by a browser. German and French run 20–35% longer than
 *    English; a headline that doubles in length gets auto-shrunk and stops
 *    looking deliberate. Budgets are noted on each field below. `alt` is the one
 *    field with no limit — it is never drawn, only read by assistive technology
 *    and by machines.
 *
 * Proper names (CTDL, ELM / Europass, Open Badges 3.0, Credential Commons) are
 * not translated.
 */

import type { Locale } from "./ui";

/** Shared frame copy. Budgets are in characters, measured against the wide canvas. */
export type DiagramCopy = {
  /** Small label above the headline. Budget ~18. */
  kicker: string;
  /** The claim, not the topic. Budget ~52 (wraps to two lines beyond that). */
  headline: string;
  /** One line of qualification. Budget ~70. Optional. */
  deck?: string;
  /** What the reader should take away. Budget ~78. */
  takeaway: string;
  /** Complete, self-contained explanation. No length limit — never drawn. */
  alt: string;
  /** Short caption for use under the figure. Budget ~140. */
  caption: string;
};

export type DiagramsDict = {
  /** The three parts of the layer. Part labels ~14, subs ~34. */
  overview: DiagramCopy & { parts: { label: string; sub: string }[] };
  /** Two parallel tracks. `opsTrack` ~34, `knowledgeTrack` ~64; short names ~12; cells ~24. */
  twoTrees: DiagramCopy & {
    opsTrack: string;
    knowledgeTrack: string;
    opsShort: string;
    knowledgeShort: string;
    ops: [string, string, string, string];
    knowledge: [string, string, string, string];
  };
  /** The transplant test. Panel titles ~26, items ~30. */
  whatTravels: DiagramCopy & {
    travelsTitle: string;
    travels: string[];
    staysTitle: string;
    stays: string[];
  };
  /** Versions as rings. `versionWord` ~10, ring notes ~26, `note` ~52. */
  growthRings: DiagramCopy & { versionWord: string; rings: [string, string, string]; note: string };
  /** Neutral slots and crosswalks. `slotsLabel` ~30, slots ~22, `crosswalksTo` ~16. */
  neutralSlots: DiagramCopy & { slotsLabel: string; slots: [string, string, string, string]; crosswalksTo: string };
};

const en: DiagramsDict = {
  overview: {
    kicker: "Credential Commons",
    headline: "A thin interoperability layer, not a portal",
    deck: "three parts, all open",
    takeaway: "Describe your data, check that it conforms, map it to standards you already use.",
    alt: "Credential Commons is a thin, open interoperability and conformance layer made of three parts. Profiles are machine-readable descriptions of what a good record looks like. The validator answers whether your data conforms. Crosswalks describe how your fields map to international standards such as CTDL, ELM/Europass and Open Badges 3.0. It is not a new ontology, a registry, or a portal.",
    caption: "Three parts: machine-readable profiles, a validator, and crosswalks to existing standards.",
    parts: [
      { label: "Profiles", sub: "what a good record looks like" },
      { label: "Validator", sub: "does your data conform?" },
      { label: "Crosswalks", sub: "how your fields map to standards" },
    ],
  },
  twoTrees: {
    kicker: "Two trees",
    headline: "Two trees. Three places they meet.",
    deck: "Credential Commons models the knowledge tree, and crosswalks to yours",
    takeaway: "Your operations tree stays yours — Credential Commons never rebuilds one.",
    alt: "Two parallel tracks. The upper track is an organisation's product and operations tree: data and infrastructure, the catalogue or warehouse, product lines, revenue. The lower track is the knowledge and credential tree that Credential Commons models: prior knowledge, the programme, learning outcomes, the credential. Dashed links join the two tracks at three stages — the catalogue offering, the learning outcomes, and the credential. Credential Commons crosswalks to an operations tree at those points; it never owns or rebuilds one.",
    caption:
      "Two tracks: an operations tree and a knowledge tree. They meet at three stages — the catalogue offering, the learning outcomes and the credential.",
    opsTrack: "Your product / operations tree",
    knowledgeTrack: "The knowledge / credential tree — what Credential Commons models",
    opsShort: "Operations",
    knowledgeShort: "Knowledge",
    ops: ["Data and infrastructure", "Catalogue / warehouse", "Product lines", "Revenue"],
    knowledge: ["Prior knowledge", "Programme", "Learning outcomes", "Credential"],
  },
  whatTravels: {
    kicker: "The transplant test",
    headline: "Only what the next organisation needs has to travel",
    takeaway: "Would the next organisation need it? Then it travels.",
    alt: "The transplant test decides what belongs in a shared credential record. One question: would the next organisation need this to recognise and continue the learner's growth? What travels: the learner's identity, the learning outcomes, the alignment to a competency framework, the credential or achievement itself, and the version the claim was made against. What stays behind: course materials, cohorts, rosters, schedules, and the organisation's own teaching methods. Credential Commons is deliberately small — it holds only what must survive the transplant.",
    caption:
      "The transplant test: what the next organisation needs travels with the learner; everything else stays where it was made.",
    travelsTitle: "Travels with the learner",
    travels: ["Identity", "Learning outcomes", "Competency alignment", "The credential and its version"],
    staysTitle: "Stays where it was made",
    stays: ["Materials", "Cohorts and rosters", "Schedules", "Your own teaching methods"],
  },
  growthRings: {
    kicker: "Versions",
    headline: "A credential is a claim about one ring",
    takeaway: "Nothing is overwritten, so an old credential can still be checked.",
    alt: "Versions modelled as growth rings. Each published version of a programme is one ring: it is retained, frozen, and never overwritten by later versions. A credential is a claim about the specific ring it was granted against, so verifying an older credential means reading that ring rather than the current version of the programme. History is part of the model from the start, not a log added on afterwards.",
    caption: "Each version is a retained ring. A credential points at the ring it was granted against.",
    versionWord: "Version",
    rings: ["first published version", "revised — 0.1 kept", "current version"],
    note: "A credential names the ring it was granted against.",
  },
  neutralSlots: {
    kicker: "Neutral slots",
    headline: "The socket is fixed, the framework stays yours",
    takeaway: "The socket is the part that stays put. What you plug into it stays yours.",
    alt: "Credential Commons mandates no single vendor, product or framework. Where a layer needs an external model — a competency framework, a credit system, a level, a delivery mode — it defines a neutral, framework-agnostic slot plus a crosswalk mechanism. Adopters plug in whatever they already use, and the crosswalks describe how those fields map to CTDL, ELM/Europass and Open Badges 3.0. The crosswalks say how to map if you use these standards; they do not say to use them.",
    caption: "Neutral slots with crosswalks: Credential Commons defines the socket, not your choice of framework.",
    slotsLabel: "Neutral slots — yours to fill",
    slots: ["Competency framework", "Credit system", "Level", "Delivery mode"],
    crosswalksTo: "crosswalks to",
  },
};

/** Crosswalk targets are proper names — the same in every language. */
export const CROSSWALK_TARGETS = ["CTDL", "ELM / Europass", "Open Badges 3.0"] as const;

export const diagramCopy: Record<Locale, DiagramsDict> = {
  en,
  // Translations land here. Until a locale is reviewed by a native reader it
  // falls back to English rather than shipping a machine guess.
  et: en,
  fi: en,
  de: en,
  fr: en,
};

export const copyFor = (lang: Locale): DiagramsDict => diagramCopy[lang] ?? en;
