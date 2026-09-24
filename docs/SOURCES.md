# Publication sources and content boundaries

Initial build reviewed 2026-09-23/24; prepublication source pass 2026-09-24. See `PUBLICATION-AUDIT.md` for the chapter-level audit and recorded discrepancies.

## Authoritative inputs

- Second-edition title, chapter titles, original author order, part structure, year, print ISBN and editor names: publisher product record, https://www.routledge.com/Handbook-of-Military-and-Defense-Operations-Research/Scala-HowardII/p/book/9781032497488 . Twenty chapters, Approaches (1–14), Applications (15–18), Soft Skills and Perspectives (19–20), 2024.
- First-edition chapter titles, bylines and four-part structure: Natalie Scala’s posted contents, https://www.drnataliescala.com/mdor-toc . Twenty chapters.
- First edition year and ISBN, second edition metadata cross-check: James’s current bibliographic record, https://jameshoward.us/books/handbook-military-defense-operations-research/ and `_data/books.yml` in `k3jph/k3jph.github.io`.
- Additional comparison: https://www.drnataliescala.com/mdor-toc-2 and https://www.drnataliescala.com/books . The books page lists 2025 for the second edition, while the publisher and James’s bibliographic record give 2024. The site follows 2024; it does not silently amend Natalie’s website. Some second-edition title spellings also differ; the publisher is used for that edition.

## Chapter-level publication records

The prepublication pass adds forty explicit chapter DOI/page records from the publisher's Crossref deposits. See `src/data/publication-records.mjs` for per-record retrieval URLs and dates. Full supported subtitles are retained when a deposit supplies only a main title. Existing chapter URLs and searchable initial-title aliases are preserved. Source conflicts are recorded rather than silently correcting another source.

## Editorial additions and scoped chapter reading

Twenty current-edition overviews were written from the April 2024 second-edition production proof's chapter introductions and relevant sections. This proof is an editorial source, not a final published PDF or a file offered to visitors. The per-chapter reading scope is recorded in `src/data/chapter-notes.mjs`. No raw proof text, proof image, personal email directory, solution set, or chapter figure has been added to the repository or output. The first-edition archive remains bibliographic; no invented chapter overviews are supplied there.

The part descriptions, search tags, related-chapter suggestions and reading-room exercises are original companion material. The three pathways have been checked against their selected chapter introductions and relevant section structure, with explicit links between the readings. They are not author-supplied teaching packages, approved abstracts, or operational advice. Contributor pages describe handbook contributions, not current affiliations or complete CVs. Any additional chapter content or author-supplied resource requires its own source and permission record.

## Name normalization

Display each chapter’s original byline. For cross-edition contributor indexing only, normalize the corresponding variants Lynette Arnhart/Lynette M.B. Arnhart, Marvin King/Marvin L. King III, Robert E. Hamm, Jr./Robert E. Hamm Jr., and Mark A. C. Timms/Mark A.C. Timms. Such cross-edition matching can be corrected without altering the printed bylines.

## Images

James specified these identity sources:
- https://jameshoward.us/assets/img/identity/jh-badge-1x1.svg
- https://images.squarespace-cdn.com/content/v1/5a6b6f31b1ffb6024ea638b6/1520103099816-SF1507C9KYTHUYUJ2311/NScala.jpg

The original portrait is preserved and used to generate optimized square WebP crops at build time, not redrawn. The badge is preserved intact. The first-edition cover is from James’s existing asset at https://jameshoward.us/assets/img/mdor-cover.webp . The second-edition cover is the book image linked by the MIT Press Bookstore’s ISBN 9781032497488 record, https://mitpressbookstore.mit.edu/book/9781032497488 , served from https://images.booksense.com/images/488/497/9781032497488.jpg . The publisher/CDN and the existing VitalSource cover endpoint returned 403 to the initial build runner, so those endpoints are not dependencies of the finished site.

All displayed assets are preserved locally; no visitor requests go to these original image services. Asset provenance is not a grant of additional reuse rights. Copyright remains with the respective holders.

## Before launch

Review the look, original reading notes and all records with the editors. A manually gated deployment workflow is prepared; production hosting settings and DNS have not been configured by this pass. See `LAUNCH.md`. Review the notices against the actual hosting configuration and any later analytics or embeds before launch. Verify permissions for any subsequently supplied chapter text or teaching resources. Do not fabricate news, errata, acknowledgments or contributor approvals to fill sections.

## Code and privacy references

Consent behavior adapts the existing `public/assets/js/gdpr-cookie.js` and `src/components/CookieConsent.astro` pattern from `k3jph/k3jph.github.io` (read from main on 2026-09-24). Local additions include the native settings dialog, explicitly disabled GA configuration, malformed/expired choice handling, configuration-version changes, and teardown by reload after withdrawal. No personal-site measurement ID is reused. Google basic-consent behavior was checked against https://developers.google.com/tag-platform/security/concepts/consent-mode . Automated accessibility testing follows https://playwright.dev/docs/accessibility-testing ; it is not a claim of complete accessibility certification.

The corrections address uses James's existing public address, confirmed at https://search.r-project.org/CRAN/refmans/waterfall/html/waterfall-package.html . It does not create an organizational mailbox or publish contributor contact records.
