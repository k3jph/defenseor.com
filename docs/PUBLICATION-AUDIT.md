# Publication audit · 24 September 2026

## Evidence and precedence

The public catalogue now uses Taylor & Francis's chapter-level Crossref deposits for DOI, page ranges, and chapter-level title comparisons. Full subtitles supported by the publisher contents and chapter heading are retained when a deposit omits them. Original routes remain unchanged. Early contents-list titles remain searchable as aliases. Editor roles remain editor roles: Crossref classifies the book's named editors as authors, but the title page and publisher identify them as editors.

The April 2024 second-edition production proof was read for chapter introductions and relevant sections to write the twenty original companion overviews. It is **not** a final published PDF. Its manuscript text and imagery are not copied into this repository. The source scopes for each overview are in `src/data/chapter-notes.mjs`; the overview is a guide to scope, not a comprehensive abstract or substitute for reading the chapter.

Public metadata queries (retrieved 2026-09-24):
- https://api.crossref.org/works?filter=isbn:9781003396307&rows=100
- https://api.crossref.org/works?filter=isbn:9780429467219&rows=100

All forty chapter DOIs and page ranges were retrieved independently. Second-edition DOI suffixes include part dividers and must NOT be generated from the chapter number.

## Recorded differences from the initial catalogue

| Record | Initial contents-list title | Deposited chapter title |
|---|---|---|
| 2e-01 | Modern Data Analytics for the Military Operations Researcher | Modern Data Analytics for the Military Operational Researcher |
| 2e-02 | Microsoft Excel: The Universal Tool of Analysis | Microsoft Excel |
| 2e-15 | A Model for and Inventory of Cybersecurity Values: Metrics and Best Practices | A Model for and Inventory of Cybersecurity Values |
| 2e-16 | Applying Information Theory to Validate Commanders’ Critical Information Requirements | Applying Information Theory to Validate Commanders' Critical Information Requirements |
| 2e-17 | Modeling and Analysis of the Army’s Sustainable Readiness Model Scheduling Problem | Modeling and Analysis of the Army's Sustainable Readiness Model Scheduling Problem |
| 2e-19 | Why Won’t They Use Our Model? | Why Won't They Use Our Model? |
| 1e-01 | Modern Data Analytics for the Military Operations Researcher | Modern Data Analytics for the Military Operational Researcher |
| 1e-03 | Military Decision Analysis | Multiattribute Decision Modeling in Defense Applications |
| 1e-08 | Modern Methods for Characterization of Social Networks Through Network Models | Modern Methods for Characterization of Social Networks through Network Models |
| 1e-09 | Process Optimization Through Structured Problem Solving | Process Optimization through Structured Problem Solving |
| 1e-13 | From BOGSAT to Turbo Teams | From BOGSAT to TurboTeam: Collaboration for National Security Teams in the Age of Analytics |
| 1e-19 | Modernizing Military Operations Research Education | Modernizing Military Operations Research Education to Form the Foundation for US Military Force Modernization |

For 2e-02 and 2e-15, the displayed title retains the initial full title and subtitle, supported by both the publisher contents and the proof chapter heading. Crossref supplies only the main title. The raw deposit and `depositedTitle` remain available for comparison; the shorter deposit is not treated as evidence that the subtitle disappeared.

## Differences requiring explicit editorial awareness

- **Second-edition year:** the proof copyright page says 2025. The public publisher listing and Crossref publication record say 2024. The website keeps 2024; this is a documented source choice, not a correction to the proof file.
- **Chapter 1:** the initial publisher contents list says “Operations Researcher”; the proof chapter heading and deposited chapter record say “Operational Researcher.” The site uses the latter but preserves the original slug and searchable alias.
- **Chapter 3:** the proof contents list and early first-edition contents list use “Military Decision Analysis.” The chapter heading and chapter-level published deposits use “Multiattribute Decision Modeling in Defense Applications.” The website uses the deposited title in both editions without rewriting the existing routes.
- **Second-edition chapter 19:** the proof byline reads Walt DeGrange then Wilson L. Price, while the publisher contents/deposit read Wilson L. Price then Walt DeGrange. The site retains the latter pending coeditor review. The first-edition deposit names DeGrange first, which is preserved. The proof explicitly credits all second-edition updates to DeGrange; no current biography or endorsement has been inferred.
- Crossref omits suffixes for several names in the second edition (King III, Hamm Jr., Pignatiello Jr.). Existing full names supported by the proof/bylines are retained. First-edition chapter 5 is expanded from the shortened early list to its deposited full names.
- Place names in chapter 18 refer to the names used in that publication, not assertions about current installation names.

## Reading-room review

The three original pathways were checked against the relevant chapter introductions and section structure. Each now has a chapter-specific explanation of the connection, and retains a separately labeled, civilian companion exercise. They do not claim that the chapter authors supplied or endorsed those exercises. The data/forecasting pathway distinguishes time-series forecast evaluation from simulation validation rather than treating them as the same procedure.

## Rights and source boundaries

The review uses privately accessible production proofs only as evidence. No raw proof, proof screenshot, publisher abstract, chapter figure, solution set, or author email directory is included in site output, source archives, or repository history. New text is original companion prose; no permission to republish chapter content is inferred. Existing cover and identity assets retain their respective rights and are listed in `docs/SOURCES.md`. Any future excerpt or supplied resource requires its own permission record before publication.

## Review, not approval

James and Natalie still need to review the twenty overviews, chapter-19 byline discrepancy, joint attribution, and original exercises. This audit does not represent their approval. Production/DNS changes and real-origin acceptance tests remain gated until that review.
