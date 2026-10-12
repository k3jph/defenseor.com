# Publication and rollback runbook

## Production model

`main` is the production source branch for defenseor.com. A push to `main`
automatically starts the **Publish production site** workflow.

The production workflow:

1. checks out the exact triggering commit;
2. installs locked dependencies;
3. runs unit tests;
4. builds the production site;
5. checks internal links;
6. runs the Chromium and Firefox browser suite;
7. runs consent tests;
8. records an output checksum manifest and release SHA;
9. uploads the GitHub Pages artifact;
10. deploys the artifact; and
11. runs the real-domain acceptance check against `defenseor.com`.

A failed build or verification job prevents deployment. A failed live check is
reported after deployment and should be treated as a production defect.

The workflow also supports `workflow_dispatch` as a manual rerun of the
current `main` commit. There is no `APPROVED_RELEASE_SHA` variable, typed
confirmation phrase, or per-release SHA approval gate.

If the `github-pages` environment is configured in repository settings to
require a human reviewer, GitHub will still pause deployment at that environment
boundary. Remove that environment-review requirement if fully automatic
main-branch publication is desired.

## Routine publication

1. Make and review the change using the normal repository workflow.
2. Merge or push the accepted change to `main`.
3. GitHub Actions automatically runs the production workflow.
4. Confirm that build, browser, consent, deploy, and live-check jobs succeed.
5. Treat the resulting commit SHA as the production release identifier.

The workflow itself does not modify DNS, Cloudflare settings, the custom domain,
or other provider-side configuration.

## Analytics

The default production workflow intentionally leaves `PUBLIC_GA_ID` blank.
Enabling analytics is a separate configuration decision. Never use the personal
website's analytics ID by accident. If the configured analytics ID changes, the
consent version must also change so visitors receive a fresh choice.

## Manual rerun

Use **Actions → Publish production site → Run workflow** on `main` when the
current source has not changed but the production build or deployment needs to
be repeated.

## Rollback

For an ordinary bad release, revert the offending commit or commits on `main`
and push the revert. The revert itself becomes a new production release and
automatically passes through the same verification and live-check pipeline.

For investigation or forensic comparison, each successful build stores:

- the generated `dist/` tree;
- `artifacts/output-sha256.txt`; and
- `artifacts/release-sha.txt`

in a `production-release-<sha>` artifact retained for 90 days.

Provider-side changes such as DNS, Pages custom-domain configuration, Cloudflare
settings, or certificate changes are not reverted by source control and must be
rolled back separately when relevant.

## First-cutover notes

Historical launch records may refer to the original SHA approval gate. That gate
was removed after the site entered routine production because it added friction
without materially improving the already comprehensive automated verification
pipeline.
