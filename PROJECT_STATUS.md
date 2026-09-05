# Project Status

## Current state

- SNS-M001 completed through pull requests #1 and #2. The repository now publishes a dependency-free static monorepo at `sites.nandi.sh`.
- `sites/home/public/` owns the root page. Future `sites/<slug>/public/` packages publish below `/<slug>/` and appear automatically on the root page.
- Cloudflare DNS is declared, applied, and verified from the private infrastructure repository.
- SNS-M002 is complete as a local-only working-tree delivery: `sites/2027sbd_hokkaido/public/` serves `/2027sbd_hokkaido/`, with home-page discovery, concise Hong Kong copy, snowboard-focused content, a navy/ice-blue design and controllable VFX. No commit, push or deployment was authorized or performed; the public production state above is unchanged.
- SNS-M003 is preparing the trip for authorized public publication. Participant names, individual attendance/booking reports and private source-document links are excluded from both source and generated assets. Travel dates and hotel itinerary remain public by explicit user choice. Deployment is not yet claimed.

## Observed verification

- `make ci` passed the standard-library builder tests, `go vet ./...`, and the production build; output contained the root page, `.nojekyll`, and `CNAME`.
- The builder test observed a fixture site at `/notes/`, an automatically generated home-page link, and rejection of home content that shadows a sub-site route.
- Headless Chrome inspection at 1440×1000 and a true 390×844 mobile emulation showed the complete page without clipping or horizontal overflow; the mobile document and viewport widths both measured 390 pixels.
- Pull-request validation run `33934714423` passed with deployment skipped. Post-merge run `33934750861` passed both validation and `gh-pages` publication using the Node 24 checkout action.
- The generated `gh-pages` branch contains only `.nojekyll`, `CNAME`, `index.html`, and `styles.css`. GitHub Pages reported status `built`, source `gh-pages:/`, and custom domain `sites.nandi.sh`.
- Public DNS returned both Cloudflare edge addresses. `https://sites.nandi.sh` returned HTTP `200` with Cloudflare and GitHub Pages response headers, and the delivered document contained the expected home-page content.
- SNS-M002 `make ci` passed: builder tests, Go vet and a two-site production build. The route test exercises underscore slugs, exact nested output and generated home discovery.
- Main integrated all three children: T001 native migration/design and effects; T002 four transport routes and five snowboard comparisons; T003 eight daily food/sightseeing views. Actual Chromium exercised every itinerary date, all four routes, all eight food views, skill filters, ticket presets (¥23,400 / ¥31,900 / ¥33,400), optional night (¥35,200), expert-warning removal, checklist persistence, valid/invalid charter calculations and a downloaded eight-event calendar.
- Desktop 1440×1100 and mobile 390×844 screenshots were inspected. All six sections had no document overflow at 390px and 320px. The generated home link, direct trip route and `#mountains` deep link worked; final trip navigation showed no JavaScript or local resource errors.
- Motion OFF persisted after reload; reduced-motion forced OFF with zero running animations. Snowfall drew while visible and cleared when its section was hidden. Detailed source freshness and acceptance evidence remain in `sites/2027sbd_hokkaido/HANDOFF.txt`; local SNS-M002 contracts are rolled up and removed.
- Local trip amendment: the home screen now prompts booking the finalized Shin Furano Prince stay through the official September member promotion, including breakfast/onsen tickets and the 2026-09-15 noon JST deadline. Hotel selection is confirmed; individual bookings are not fabricated.
- Restaurant amendment: all 15 food-related cards cross-checked against Tabelog English primary pages; 18 evidence rows show 17 verified score/count snapshots plus the unverified current hotel buffet. Food-blog recommendation sources removed. Tenkin Honten's official temporary closure removed it from the active dinner plan; cheese-shop/pizza ratings and duplicate Izakaya Tenkin listings are distinguished.
- Final amendment `make ci` passed. Actual desktop/mobile browser proof covered all eight food days at 1440px/390px/320px without overflow, exact rating-link navigation, and the visible hotel booking CTA. Evidence and source limitations are recorded in the existing trip handoff. No publishing or booking occurred.
- Front-page motion amendment: aurora ribbons, staggered heading, shimmering year, shooting stars, CTA glint and layered wind-driven snow are integrated locally. Chromium verified changing frames, desktop/mobile visuals down to 320px, persistent motion OFF, reduced-motion, real background-tab pause/resume, hidden-section canvas clearing and working itinerary navigation. `make ci` and the final build passed; no dependencies or publishing.
- Professional banner redesign supersedes the decorative hero effects: original faceted terrain, editorial typography, structured trip dates and restrained snow/parallax replace the cartoon rider, aurora and shimmer. Actual Chromium desktop/mobile proof covered widths down to 320px, pointer parallax, motion preference persistence, reduced-motion, background pause/resume, the itinerary CTA and unchanged booking link. `make ci` passed; local-only delivery remains in effect.
- SNS-M003 pre-publication proof: the complete trip source and generated assets contain no participant identities, individual booking reports or private document URLs. Chromium exercised all eight itinerary dates, four routes, eight food selectors, hotel cards, charter calculator and persistent checklist; all six sections fit 390px/320px screens with no runtime or local resource errors. `make ci` passed.

## Decisions

- The repository uses the Go standard library and has no runtime or package-registry dependency.
- Pull requests run read-only validation. Only pushes to `main` receive `contents: write` and publish generated output.
- `dist/` is generated, ignored, and never used as source.
- Sub-site slugs accept lowercase letters/digits with single hyphen or underscore separators. The trip is native static HTML/CSS/JavaScript; no frontend package installation is needed.

## Next decisions

- Publication policy resolved: public sanitized trip via the existing Pages workflow. Keep personal identities, individual booking records and private source links out of all future source changes; `noindex` is not access control.
