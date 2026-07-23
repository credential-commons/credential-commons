# Contributing to Credential Commons

Thank you for helping make credential and learning-outcome data interoperable.

## Principles

1. **Reuse, don't reinvent.** Prefer existing terms (schema.org, `haridus:` from
   schema.edu.ee, dcterms, CTDL, ELM). Mint a `cc:` term only when nothing fits,
   and add a crosswalk entry when you do.
2. **Profiles are constraints, not ontologies.** A profile says *how* to use
   terms for a given credential type; it does not define new meaning.
3. **Every change ships with an example.** New rule → add a passing and a failing
   example so the behaviour is demonstrable and tested.
4. **Plain language in messages.** Validation messages are read by institution
   staff, not only engineers.

## How to propose a change

1. Open an issue describing the credential type or field and the standard(s) it
   should map to.
2. For a new/edited rule: update the SHACL shape, the JSON-LD context if needed,
   the relevant crosswalk(s), and add examples under `examples/`.
3. Run `npm test` — the reference dataset must stay conformant.
4. Open a PR. Profile/semantic changes are versioned; breaking changes bump the
   profile version.

## AI-assisted maintenance

This project is maintained with heavy AI assistance (mapping data to profiles,
drafting crosswalks, reviewing PRs, answering integration questions). Semantic,
trust and versioning decisions are made by human maintainers. Both are welcome to
contribute; all changes go through review and the test suite.

## Licence of contributions

Code contributions are under Apache-2.0; profile/context/crosswalk/doc
contributions are under CC-BY-4.0. By opening a PR you agree to license your
contribution under these terms.
