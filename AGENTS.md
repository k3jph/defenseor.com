# Working on DefenseOR

Work on the requested branch. Do not merge, deploy, alter DNS, or change another website without explicit instructions. The initial build branch is `build/initial-site`.

## Identity

Natalie comes first throughout joint ownership and editor credits. Footer: Natalie’s square portrait, James’s square canonical badge, `defenseor.com`, and `A website of Natalie Scala and James Howard`. Copyright names Natalie M. Scala and James P. Howard, II, in that order. Images have equal visible square dimensions. Do not replace James’s badge with his photograph or a generated emblem.

## Design and writing

This is an authored handbook, not a monograph. Preserve the publication-style design, conspicuous chapter bylines, independent contributor records, edition-specific identities, and cover-derived palette. Do not copy the CMNA page shell. Use clear, developed explanatory prose for original notes; never invent an author’s conclusions, current role, affiliation, or endorsement. The user’s canonical writing directions are in `howardjp/chatgpt-backing-store/writing/` when needed for expanded prose.

## Evidence

Read `docs/SOURCES.md`. Metadata follows the documented source precedence in `docs/PUBLICATION-AUDIT.md`; chapter identifiers and pages have explicit published deposits. Preserve supported subtitles omitted by the deposit. Topic tags and reading pathways are editorial additions, clearly labeled. Do not merge chapter numbering or bylines between editions. No unverified chapter DOI, pagination, full text, claims of peer review, or invented resources. A missing source is a gap to record, not fill with plausible detail.

## Engineering

Static Astro, minimal JavaScript, local assets, no third-party embeds. Analytics stays unconfigured by default and may load only after valid affirmative consent for the current configuration. Preview builds force it off. Preserve full no-JavaScript navigation and visible focus states. Verify metadata tests, build, internal links, and browser and consent checks. Respect the manual release approval gate in `docs/LAUNCH.md`. Keep dependency versions locked. Record changes and limits; never report a passed test that has not run. Bootstrap import workflows are temporary and must not remain after the initial build.
