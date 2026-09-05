# Project Status

## Current state

- SNS-M001 completed through pull requests #1 and #2. The repository now publishes a dependency-free static monorepo at `sites.nandi.sh`.
- `sites/home/public/` owns the root page. Future `sites/<slug>/public/` packages publish below `/<slug>/` and appear automatically on the root page.
- Cloudflare DNS is declared, applied, and verified from the private infrastructure repository.

## Observed verification

- `make ci` passed the standard-library builder tests, `go vet ./...`, and the production build; output contained the root page, `.nojekyll`, and `CNAME`.
- The builder test observed a fixture site at `/notes/`, an automatically generated home-page link, and rejection of home content that shadows a sub-site route.
- Headless Chrome inspection at 1440×1000 and a true 390×844 mobile emulation showed the complete page without clipping or horizontal overflow; the mobile document and viewport widths both measured 390 pixels.
- Pull-request validation run `33934714423` passed with deployment skipped. Post-merge run `33934750861` passed both validation and `gh-pages` publication using the Node 24 checkout action.
- The generated `gh-pages` branch contains only `.nojekyll`, `CNAME`, `index.html`, and `styles.css`. GitHub Pages reported status `built`, source `gh-pages:/`, and custom domain `sites.nandi.sh`.
- Public DNS returned both Cloudflare edge addresses. `https://sites.nandi.sh` returned HTTP `200` with Cloudflare and GitHub Pages response headers, and the delivered document contained the expected home-page content.

## Decisions

- The repository uses the Go standard library and has no runtime or package-registry dependency.
- Pull requests run read-only validation. Only pushes to `main` receive `contents: write` and publish generated output.
- `dist/` is generated, ignored, and never used as source.

## Next decisions

- Add a sub-site only when it has real content and a stable slug.
