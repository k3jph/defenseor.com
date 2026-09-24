# defenseor.com

The scholarly companion to *Handbook of Military and Defense Operations Research*, edited by Natalie M. Scala and James P. Howard, II.

## Develop

Use Node 22.12 or later (CI uses Node 24).

```sh
npm ci
npm run dev
```

The default development address is http://localhost:4321. Production output is static HTML in `dist/`, built with `npm run build`. The domain is configured as `https://defenseor.com` and `public/CNAME` names it, but this repository does **not** automatically deploy anything or change DNS. The initial implementation is on `build/initial-site`, for review before a production decision.

## Structure

- **Chapters:** searchable second-edition contents and edition-specific pages.
- **Contributors:** a combined index across the two editions with chapter bylines preserved.
- **Reading room:** three original discussion pathways and print-friendly exercises.
- **The book:** current bibliographic details, downloadable citations, and a separately maintained first-edition archive.

Forty chapter records represent twenty chapters in each edition. Fifty-five contributor records connect the bylines without inventing professional biographies. The second edition credits forty-six distinct chapter authors. The website does not reproduce chapter texts or claim to provide their abstracts. New reading prompts, topic labels, and pathways are expressly identified as companion material. See `docs/SOURCES.md` for evidence and limitations.

The design is editorial rather than an adaptation of the CMNA interface. The footer uses Natalie’s portrait first and James’s badge second, at equal square sizes. No remote fonts, analytics, advertising, embeds, or client-side framework are used. Search is a small progressive enhancement over complete static HTML.

## Check

```sh
npm test
npm run build
npm run test:links
npx playwright install chromium
npm run test:browser
```

Browser checks create screenshots and a JSON result in `artifacts/`. GitHub Actions repeats these checks and retains the static build and browser-review artifacts. This is not a claim of exhaustive accessibility certification.

## Content and ownership

Edit publication records in `src/data/catalogue.mjs`; routes and indexes are derived from those records. Keep first- and second-edition entries separate. Preserve the original author order in each chapter. Do not extend a table-of-contents record into a purported chapter summary without reading an authorized source.

Copyright © 2018–2026 Natalie M. Scala and James P. Howard, II for original companion material. Book, chapter, portrait, badge, and cover rights remain with their respective rights holders. This repository does not grant a blanket license for third-party assets.
