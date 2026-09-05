# SNS-M006 — Trip roommate arrangements

- Status: running
- Owner: Main

## Goal

Publish the user-supplied roommate pairs SMALL + STEPH, BUN + CAR, MC + NAT, JO + YL, BEAR + KAY. Rename STP to NULL without changing attendance or hotel status. Roommates are a public planning snapshot, not confirmed room bookings.
User amendment before publication: set WANYI attendance to O; SMALL, BEAR and KAY are booked at both hotels. Preserve remaining statuses and update dependent attendance guidance. Expected totals are 12 attending, 9 Shin Furano and 10 OMO7.

## Tasks

- [ ] SNS-M006-T001 — Main owns implementation, browser proof, reviewed publication and release rollup.

## Acceptance criteria

- [x] Exact five pairs appear in 團友清單; no assignments are invented for remaining members.
- [x] NULL replaces STP and retains O / ? / O. Amended totals are 12 / 9 / 10 and planning copy reflects 12 attending.
- [x] Desktop/mobile browser proof, local drafts/reset and make ci pass.
- [ ] Reviewed publication and live versioned-asset proof observed; completed contracts rolled up.

## Completion handoff

Implementation and local proof recorded in SNS-M006-T001 and PROJECT_STATUS.md. Reviewed publication and live proof remain pending.
