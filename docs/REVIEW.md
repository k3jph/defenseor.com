# Editor review guide

This candidate preserves the approved layout and cover palette. It is not deployed. The CI artifact `static-review-preview` is the complete, non-indexable review build; `publication-review` contains browser results, screenshots, and print samples. Run the static preview through `node scripts/serve.mjs <preview-directory>` or a local HTTP server rather than opening its HTML as file:// URLs.

## Read first

Start with About this companion, one current chapter, one first-edition chapter, and one reading-room note. Review all twenty current-edition overviews before publication. Each is original companion prose from a bounded reading of production-proof introductions and relevant sections, not an approved author abstract. Public DOI and page metadata was checked independently. See `PUBLICATION-AUDIT.md` for exact source differences, including the proof's 2025 copyright year versus the published 2024 record and the second-edition chapter-19 author order.

Check the Natalie-first joint attribution, portrait crop, and editor descriptions. The proposed corrections mailbox is James's publicly listed `jh@jameshoward.us`; no new mailbox or form service has been created. Review the three original exercises as editor-created companion material, not supplied or endorsed by the chapter authors. Confirm the use of the existing supplied covers and portrait; no new excerpt/figure or solution-set permissions are assumed.

## Functional review

Try a chapter-title, author, and topic search in each edition. Search terms and part filters belong to that edition. Old title variants still find the same stable records. Copy a chapter reference, download its BibTeX/RIS, and follow its DOI to the publisher. Look at the footer's Cookie Settings: it should accurately say analytics is not enabled. Read and print a reading-room exercise; the printout identifies the book, edition, site, and original companion authorship.

## Scope of verification

The gate checks metadata, sources/identifiers, the production build, internal links, every rendered HTML route, default-off tracking, real browser downloads and clipboard, keyboard access and dialog focus, reflow, 200% text, no-JavaScript reading, and automated accessibility. Configured consent uses an intercepted synthetic tag, never a live Google measurement account. Automated checks are not a full screen-reader or disability-user evaluation. External link reports distinguish reachable, broken, and access-limited endpoints; a provider blocking automated requests is not counted as a verified successful visit.

## Approval and release

Record requested changes and approval on PR #1. No merge, production publish, DNS alteration, or invitation to contributors is part of this pass. After both editor reviews, follow `LAUNCH.md`. Real-domain redirects, certificate behavior, Secure cookies, and real-origin browser checks are acceptance work at the deployment stage, not completed prepublication claims.
