# sites.nandi.sh — Agent Guide

## Scope

This repository assembles independent static sites into one GitHub Pages artifact. `sites/home/public/` publishes at `/`; every other `sites/<slug>/public/` publishes at `/<slug>/`.

## Session protocol

1. Read `PROJECT_STATUS.md`, the active milestone, and the claimed task before editing.
2. Claim one path-owned task in an isolated branch/worktree from current `origin/main`.
3. Edit only its owned paths. Update all consumers when changing exported build behavior.
4. Run focused proof and `make ci` before handoff.
5. Push a clean branch, merge through a pull request, observe the Pages workflow, then roll up status and remove completed contracts.

## Commands

- `make build` — assemble all sites into ignored `dist/`.
- `make serve` — rebuild and serve the complete site at `http://127.0.0.1:4173`.
- `make test` — run behavioral builder tests.
- `make validate` / `make ci` — run tests, Go vet, and a production build. CI uses this exact target.
- `make format` — format Go source.

## Rules

- Keep a site self-contained under `sites/<slug>/`; shared build mechanics belong in `internal/sitebuild/`.
- `sites/home` is reserved for the root. Other directory names must be lowercase URL-safe slugs.
- Never commit `dist/`, credentials, custom-domain tokens, generated branches, or deployment state.
- Pull requests validate only. Only a merged `main` commit may force-publish generated output to `gh-pages`.
- Cloudflare DNS remains owned by the private infrastructure repository, not this public repository.
