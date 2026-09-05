# SNS-001 — Build and publish the initial site

- Status: running
- Owner: Main
- Milestone: SNS-M001
- Depends on: none

## Owned paths

- `.github/workflows/pages.yml`
- `.gitignore`
- `AGENTS.md`
- `Makefile`
- `PROJECT_STATUS.md`
- `README.md`
- `cmd/`
- `go.mod`
- `internal/`
- `scripts/`
- `sites/`
- `tasks/`

## Goal

Create the root site, nested-site assembly contract, local CI target, and merge-only `gh-pages` publisher.

## Implementation

1. Build every self-contained site package into one deterministic Pages artifact.
2. Add the root home surface and generated discovery links for future sub-sites.
3. Run the same validation locally and on pull requests; publish only merged `main` commits.

## Acceptance criteria

- [x] `make ci` passes from a clean checkout.
- [x] Home content publishes at `/`; a fixture sub-site publishes at `/<slug>/` without collisions.
- [x] The real page is visually inspected at desktop and mobile widths.
- [ ] The merged workflow creates `gh-pages`, and Pages reports `sites.nandi.sh`.

## Verification

- `make ci` — tests, vets, and builds the complete artifact.
- `make serve` plus browser inspection — home page is readable and responsive.
- GitHub workflow and Pages API — branch publication and custom-domain state are observed.

## Blockers

- None

## Completion handoff

- Summary: Implemented the standard-library site assembler, responsive root page, local validation contract, and merge-only branch publisher.
- Files changed: `.github/workflows/pages.yml`, `.gitignore`, `AGENTS.md`, `Makefile`, `PROJECT_STATUS.md`, `README.md`, `cmd/`, `go.mod`, `internal/`, `scripts/`, `sites/`, `tasks/`.
- Observed verification: `make ci` passed tests, vet, and a one-site production build. The fixture test observed `/notes/` assembly and route-collision rejection. Headless Chrome inspection passed at 1440×1000 and an emulated 390×844 viewport with document `scrollWidth` equal to 390.
- Delivery: Pending pull request.
- Follow-ups:
