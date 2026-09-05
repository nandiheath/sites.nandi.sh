# SNS-M003-T001 — Sanitize and publish Hokkaido

- Status: running
- Owner: Main
- Milestone: SNS-M003
- Depends on: none

## Owned paths
- sites/2027sbd_hokkaido/
- internal/sitebuild/build.go
- internal/sitebuild/build_test.go
- README.md
- PROJECT_STATUS.md
- This contract and its parent milestone

## Goal
Publish a sanitized version of the completed local trip through the existing public GitHub Pages workflow.

## Implementation
Copy only current public source, site metadata and handoff; exclude obsolete nested build artifacts. Remove participant names, individual attendance/booking reports and Google Doc URLs from the UI and repository source. Preserve trip dates, hotels, official sources, calculators, navigation and motion controls. Integrate the existing underscore-slug builder change and consumer test. No DNS or hosting policy changes.

## Acceptance criteria
- [x] Source and output privacy scan clean.
- [x] Browser navigation and responsive checks pass; make ci passes.
- [ ] Pull request merged and exact release observed on public Pages.

## Verification
Full commit-tree privacy scan, actual Chromium, make ci, GitHub Actions and deployed asset verification.

## Blockers
None currently.

## Completion handoff
make ci passed builder tests, Go vet and the two-site production build. The complete trip source and generated trip assets matched none of the private identifiers or source-document patterns. Full-repository scan found only pre-existing generic uses of a common English word in root-page copy and a builder fixture, not participant data. Actual Chromium exercised eight itinerary dates, four transport routes, eight food selectors, two hotel cards, charter calculation and checklist persistence. All six sections fit 390px/320px screens; no JavaScript or local asset errors. Publication is the remaining acceptance gate.
