# SNS-M004 — Location-based Hokkaido food and map guide

- Status: running
- Owner: Main

## Goal
Replace daily restaurant grouping with location groups, expand choices including hotel dining without scores, add Google review evidence alongside Tabelog, and provide interactive venue pins and clearly labelled hotel-reference distances. Preserve public sanitization and all other trip tools.

User amendment: publish the supplied 13-member attendance/Shin Furano/OMO7 status matrix, explicitly authorized after the public/privacy choice. Add planned later checks for flights, transfers, equipment, lessons, insurance and private dietary/contact coordination. Browser edits remain local, not a shared backend. Private document links and actual sensitive personal details stay excluded.

## Tasks
- [ ] SNS-M004-T001 — Main integrates location UI, evidence cards and distance selection, verifies and releases.
- [x] SNS-M004-T002 — FuranoAirport researches and implements Furano and airport venue data.
- [x] SNS-M004-T003 — Asahikawa researches and implements Asahikawa venue data.
- [x] SNS-M004-T004 — VenueMap implements the isolated interactive map module.
- [x] SNS-M004-T001 amendment — Publish exact authorized member matrix and later preparation stages; update group planning to 13 listed / 11 attending / 2 uncertain.

## Acceptance criteria
- [x] Restaurants grouped by location, not dates; existing sightseeing retained separately within locations.
- [x] More choices per location, including actual hotel restaurants without independent ratings.
- [x] Exact-venue Google and Tabelog scores/counts with observed dates where obtainable; missing figures explicit, never hotel scores substituted for restaurants.
- [x] Interactive geographic map with selectable venue/base pins, hotel-reference straight-line distances and actual route links.
- [ ] Actual desktop/mobile and map failure proof, make ci, reviewed publication and live verification.

## Verification
Main exercised the integrated browser after all agents finished. make ci passed. Desktop/mobile proof covered region/filter/sort controls, consent, loaded/blocked/retried tiles, card/pin and keyboard selection, airport co-location, hidden-map recovery, exact member matrix and persistent/reset local drafts. Only the expressly authorized roster is public; private document URLs and sensitive booking/contact details remain excluded.

## Completion handoff
Implementation and local proof are recorded in PROJECT_STATUS.md and the existing site HANDOFF.txt. Reviewed publication and live verification remain the final acceptance gate.
