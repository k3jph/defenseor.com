# Publication and rollback runbook

## Current boundary

The review branch is not production. No DNS, GitHub Pages settings, repository visibility, Cloudflare rules, or hosting account has been changed by the prepublication pass. A workflow file is not proof that hosting has been configured. Human approval and real-origin checks remain outstanding.

## Before the first launch

1. James and Natalie review the stable candidate, including `PUBLICATION-AUDIT.md` and the chapter-19 byline discrepancy. Record the approved commit/tree in the PR. Do not change content after approval without another review of the change.
2. Verify that the organization's existing plan can publish Pages from this private repository. Do not make the repository public to solve a hosting limitation without explicit authorization. Set the Pages publishing source to GitHub Actions and set its custom domain to `defenseor.com`. The `public/CNAME` file alone does not configure a custom Actions deployment.
3. Protect the `github-pages` environment: require an authorized human reviewer and permit deployments only from `main`. Configure the domain-verification record through the authorized domain administrator, then the necessary apex/www DNS records, using GitHub's current guidance. Preserve unrelated MX/TXT/email records. Confirm Cloudflare TLS settings, certificate issuance, HTTPS enforcement, and that `www` redirects to the apex with the path/query retained. Both hosts returned separate HTTP 200 responses during the passive prepublication audit; that is not the desired finished redirect configuration.
4. Preserve the current holding-page source/hosting configuration and DNS values for the initial cutover rollback. Record any provider-side changes separately. No previous deployed version of this new companion exists yet.
5. After approval, merge the reviewed change. Reconcile the resulting main commit/tree with the reviewed candidate (a squash changes the SHA), rerun verification, and set repository variable `APPROVED_RELEASE_SHA` to that exact main commit. A missing or different variable blocks deployment. Do not set the variable before approval.
6. Run **Publish an approved release** from `main` with that full 40-character SHA and confirmation `PUBLISH defenseor.com`. There is no push-triggered deployment. The workflow repeats tests before producing the artifact, then reaches the protected environment. Approve that environment only after the preceding checks pass.
7. The default release intentionally has **no analytics ID**. Enabling analytics is a later reviewed configuration change, not a prerequisite for publication. Never use the personal website's ID. The active-configuration consent version changes when the ID changes, requiring a fresh choice. Preview builds forcibly disable analytics.
8. Inspect the actual domain: `npm run test:launch -- --live`. The script rejects the old holding page, non-redirecting www, missing deep links, missing citations, accidental noindex, an incorrect sitemap, and soft 404s. Certificate and redirects are checked through real HTTPS fetches. Browser-check the live origin's real clipboard and cookie settings, downloads, mobile layout, and Secure preference-cookie behavior as well. Propagation can take time; a failed live check is a failed check, not an assumed eventual success.
9. Finalize the hosting wording in the privacy notice against what was actually configured. Save the release SHA, output manifest, and downloaded `approved-release-<sha>` artifact outside the workflow's 90-day retention window. Then remove or clear the approval variable so another release cannot be approved by accident.

## Rollback

For the first cutover, restore the recorded previous hosting/DNS configuration if necessary. For a later companion release, identify the last known-good approved commit and archived static output; never assume the immediately preceding commit was a successful release. Confirm its source and tests, set `APPROVED_RELEASE_SHA` to that specific known-good main ancestor, and dispatch the same gated workflow. This rebuilds from locked dependencies and republishes after its checks. Rebuilding may update the copyright ending year; the saved output manifest identifies the exact earlier artifact when byte-for-byte restoration is required. Retain provider-side changes and DNS backups separately because reverting source does not revert DNS. Run real-domain acceptance again and record the outcome.

## Sources checked 2026-09-24

- GitHub custom Pages workflows: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- Custom domain configuration: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- HTTPS: https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https
- GitHub Pages availability depends on account plan and repository visibility; configuration must be confirmed in the repository settings by an authorized administrator.
