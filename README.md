# defenseor.com

The scholarly companion to *Handbook of Military and Defense Operations Research*, edited by Natalie M. Scala and James P. Howard, II.

## Review candidate

Development is on `build/initial-site`, draft PR #1. The approved publication-style design remains intact: cover-derived colors, numbered chapters and conspicuous bylines, contributor records, a reading room, and separate edition archives. This is not a CMNA reskin. Forty chapter records preserve their original URLs; twenty current-edition chapters have source-scoped original overviews. Both editions now have published DOI/page references and generated BibTeX/RIS chapter downloads.

**Nothing in the prepublication pass publishes the site or changes DNS.** Start with [the editor review guide](docs/REVIEW.md), [the publication audit](docs/PUBLICATION-AUDIT.md), and [the launch/rollback runbook](docs/LAUNCH.md).

## Develop

Use Node 24 LTS (minimum 22.19) and the committed lockfile.

```sh
npm ci
npm run dev
```

`predev` and `prebuild` generate the optimized square portrait sizes, favicons, and site sharing image locally from the supplied assets. No image service or external fonts are required at runtime. The joint footer places Natalie's portrait first and James's canonical badge second, at equal dimensions. Copyright also names Natalie first.

## Verify

```sh
npm test
npm run build
npm run test:links
npx playwright install --with-deps chromium firefox
npm run test:browser
npm run test:consent
npm run test:external
```

Browser checks enumerate every output HTML file rather than a hand-maintained subset. Chromium runs the axe WCAG A/AA checks; both Chromium and Firefox exercise navigation, filters, downloads, keyboard focus, no-JavaScript browsing, reflow, and larger text. Chromium also exercises the real clipboard API and produces screenshots and print samples. The configured-consent fixture intercepts a synthetic tag, so it never sends real analytics requests. External-link checks distinguish successful visits, broken destinations, and provider access limits. See the generated JSON reports; do not equate an access-limited request or an unrun check with a pass.

## Preview without enabling indexing or analytics

```sh
npm run prebuild
PREVIEW_BUILD=true npx astro build --outDir artifacts/preview
node scripts/serve.mjs artifacts/preview
```

Open the printed localhost address. The preview emits noindex and forces the analytics ID blank. All content and downloads are static, and can also be served by another local HTTP server. Do not review with file:// paths: absolute asset/navigation URLs need an HTTP origin.

## Privacy configuration

`PUBLIC_GA_ID` is blank by default; `.env.example` documents it. This is a disabled configuration, not a dummy ID sent to Google. Cookie Settings accurately reports that state. An explicitly configured valid ID must receive a fresh affirmative choice before a tag loads; changing the ID changes the consent version. The host-only preference cookie is separate from optional analytics. Review privacy wording against the actual hosting and any later configuration before launching.

## Publication

The read-only verification workflow retains a non-indexable preview, production static output, browser/consent JSON reports, screenshots, and print samples. The separate production workflow has only a manual trigger. It requires an exact approved main-branch SHA, matching repository approval variable, typed confirmation, passing checks, and the protected deployment environment. It has no push-triggered publishing. Account settings, custom domain, DNS, redirects, HTTPS and a live-origin acceptance check remain explicit launch-stage work. Follow `docs/LAUNCH.md`; do not use a change of repository visibility as an unapproved workaround.

## Sources and rights

See [SOURCES.md](docs/SOURCES.md), [PUBLICATION-AUDIT.md](docs/PUBLICATION-AUDIT.md), and [DESIGN.md](docs/DESIGN.md). Original chapter overviews and exercises are distinct from chapter authors' prose. No published chapter text, raw private proof, solution set, or author contact directory is included. Existing supplied assets retain their respective rights. Bibliographic source disagreements remain visible for coeditor review.
