# SNS-M001 — Initial Pages monorepo

- Status: running
- Owner: Main

## Goal

Publish a locally reproducible static-site monorepo at `sites.nandi.sh` through GitHub Pages.

## Tasks

- [ ] SNS-001 — Build and publish the initial site

## Acceptance criteria

- [ ] The root home page builds at `/` and future site packages map to `/<slug>/`.
- [ ] Pull requests run the local CI contract without deployment permission.
- [ ] Merged `main` commits publish generated output to `gh-pages`.
- [ ] GitHub Pages serves the configured custom domain over HTTPS.

## Verification

- Scenario or command: Run `make ci`, inspect the served page, merge SNS-001, observe the Pages workflow and public HTTPS response.
- Expected observation: Local and hosted output agree; `gh-pages` contains only generated static content and the custom-domain files.

## Blockers

- Cloudflare DNS is delivered through a separate private-infrastructure task after the site branch exists.

## Completion handoff

- Tasks rolled up:
- Observed milestone verification:
- Project status updated:
- Delivery:
- Follow-ups:
