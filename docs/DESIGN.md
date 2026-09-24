# Design notes

The site is an editorial reference collection, not a reskin of the CMNA numerical workshop. Large serif titles, prominent bylines, numbered contents, thin rules and open margins provide the structure. Navigation centers chapters, contributors, the reading room and edition details. The main reading surface is warm near-white; the book’s dark field and pale yellow appear selectively.

## Actual cover samples

Both cover files were inspected. For each RGB image, the most common pixel in a flat-field patch was measured: dark patch at normalized bounds (0.02, 0.15, 0.08, 0.32), top-band patch at (0.02, 0.01, 0.12, 0.07). These measurements describe the downloaded JPEG/WebP assets, not a print-production specification.

| Reference | Dark field | Yellow band |
| --- | --- | --- |
| Second edition | `#110b39` | `#feec96` |
| First edition | `#110c3b` | `#ffed98` |

The second-edition samples are used as `--ink-deep` and `--yellow`. `--ink: #272443`, `--paper: #faf8f1`, `--white: #fffef9`, `--muted: #64616b`, and `--olive: #465645` are deliberately adapted supporting colors, not claimed exact cover samples. No light yellow body text is placed on a white background. See `cover-samples.json` for image sizes and measured values.

Natalie’s image is cropped square with `object-fit: cover`; James’s SVG is kept intact with `object-fit: contain`. Both occupy the same square footprint. Their different media are preserved instead of synthesizing replacement portraits or badges. Neither image identifies the book’s masthead; the joint identity belongs in the publication footer and editor section.

System fonts avoid third-party font requests. Browsing is fully static. Search, copy citation and print are progressive enhancements. No motion is necessary for navigation, and reduced-motion preferences are respected. Browser and metadata tests are repeatable in CI; they are not a claim of a comprehensive accessibility audit.
