# Versioning

Credential Commons is built from **enabling constraints**: rules whose purpose is
not to lock things down but to make learning and adoption *fast and safe* — at every
level, for people and for agents. Versioning is the most important one. It is what
lets the standard keep learning and evolving quickly **without breaking anyone who
already depends on it**.

We are early (**0.x**). New edges are still emerging, and the profiles, context and
vocabulary **may still change**. That is deliberate — freezing the URIs now would
trade real learning for a false stability. Versioning is how we stay free to learn
*and* stay trustworthy at the same time. So: **the URIs are not frozen yet; every
version is.**

## What carries a version

| Artifact | Where the version lives | Example |
|---|---|---|
| Vocabulary / namespace | the path segment | `…/ns/0.1/` |
| Profiles, context, crosswalks | the npm package + a git tag | `credential-commons@0.1.0` |
| Tooling (validator, CLI, Action) | npm SemVer | `0.1.0` |

During 0.x these move together under one number.

## How to pin (reproducibility now)

Because we are still learning, the **live** URLs track the latest 0.x and may
change. To get a frozen, reproducible snapshot — which agentic and automated use
needs — **pin a version**:

- `npm install credential-commons@0.1.0` — the profiles and context at that exact
  version travel *inside* the package, offline and unchanging.
- or reference a git tag / commit of the repo.

So you can move fast (the live standard evolves) and still build on solid ground
(your pin never shifts under you). That is the enabling constraint in one line:
**change is safe because every version is a fixed point you can hold.**

## The 0.x contract (what to expect while we learn)

- **0.x = pre-stable.** Any part may change between minor versions. Breaking changes
  are allowed — but never silent.
- **Every change is recorded** in [`CHANGELOG.md`](CHANGELOG.md), with what changed
  and how to migrate. Humans and agents can follow the standard's growth precisely.
- **A new namespace version never deletes the old.** When `…/ns/0.2/` ships,
  `…/ns/0.1/` stays resolvable, so data already published keeps validating.

## At 1.0 (later, not now)

When the edges settle, **1.0** draws the stable line: the URIs become permanent and
SemVer guarantees apply — a breaking change then requires a new major version. We are
not there yet, and saying so plainly is part of being trustworthy. Until then, expect
to learn with us.

## For agents

- Read the current version from the namespace path and the package version.
- **Pin a version** for reproducible runs; discover newer ones via npm / releases.
- Follow [`CHANGELOG.md`](CHANGELOG.md) to adapt across versions — every entry carries
  migration notes, so tracking the standard can itself be automated.
