# SNS-M005 — Cache-safe trip asset delivery

- Status: running
- Owner: Main

## Goal
Fix stale trip releases for returning browsers and cached CDN edges. Live JavaScript has cache-control max-age=14400 but unchanged URLs. Use a deterministic content-versioned asset directory, preserving relative module/CSS dependencies and the stable trip document route. No infrastructure cache-policy mutation.

## Tasks
- [ ] SNS-M005-T001 — Implement, reproduce cached-client upgrade, publish and verify.

## Acceptance criteria
- [ ] A changed nested asset changes the whole site asset base; unchanged builds are stable.
- [ ] Entry HTML points at versioned assets; relative module/CSS imports stay in that version.
- [ ] Existing non-opted-in sites preserve output behavior; symlinks remain rejected.
- [ ] Browser with cached prior assets upgrades correctly; make ci passes; reviewed release and live asset proof observed.

## Completion handoff
Release evidence will be recorded after execution.
