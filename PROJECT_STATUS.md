# Project Status

## Current state

- SNS-M001 is active: the initial static-site monorepo, home page, local CI contract, and `gh-pages` publishing workflow are under review.
- `sites/home/public/` owns the root page. Future `sites/<slug>/public/` packages publish below `/<slug>/` and appear automatically on the root page.
- Cloudflare DNS is owned and applied from the private infrastructure repository.

## Observed verification

- `make ci` passed the standard-library builder tests, `go vet ./...`, and the production build; output contained the root page, `.nojekyll`, and `CNAME`.
- The builder test observed a fixture site at `/notes/`, an automatically generated home-page link, and rejection of home content that shadows a sub-site route.
- Headless Chrome inspection at 1440×1000 and a true 390×844 mobile emulation showed the complete page without clipping or horizontal overflow; the mobile document and viewport widths both measured 390 pixels.

## Decisions

- The repository uses the Go standard library and has no runtime or package-registry dependency.
- Pull requests run read-only validation. Only pushes to `main` receive `contents: write` and publish generated output.
- `dist/` is generated, ignored, and never used as source.

## Next decisions

- Add a sub-site only when it has real content and a stable slug.
