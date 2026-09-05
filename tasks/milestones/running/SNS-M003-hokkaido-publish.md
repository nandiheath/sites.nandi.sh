# SNS-M003 — Publish sanitized Hokkaido trip

- Status: running
- Owner: Main

## Goal
Publish the reviewed trip site publicly at /2027sbd_hokkaido/ after removing personal details from source and generated output. User explicitly authorized public publishing with participant names, individual booking reports and the source document link removed; trip dates and hotel itinerary remain public.

## Tasks
- [ ] SNS-M003-T001 — Sanitize source, verify, publish through a pull request and observe Pages deployment.

## Acceptance criteria
- [x] No participant identities, individual booking reports or private source-document links in the publication commit or generated site.
- [x] Existing trip tools, professional banner and hotel itinerary work.
- [ ] make ci passes; pull request merged; live page verified.

## Verification
Scan the full publication tree and generated assets, exercise actual Chromium, observe GitHub Actions and the deployed route.

## Blockers
None currently.

## Completion handoff
Observed results will be recorded after publication.
