# Task lifecycle

IDs use `SNS-NNN`; milestones use `SNS-MNNN`. Create milestones before child tasks. Planned contracts live under `tasks/milestones/planned/` and `tasks/planned/`; claimed contracts move unchanged to the matching `running/` directory with `Status` and `Owner` updated together.

Each task owns explicit non-overlapping paths and records focused proof plus `make ci`. One isolated branch/worktree owns one task. Successful handoff requires a clean pushed branch and merged pull request. The serial rollup owner verifies the milestone, updates `PROJECT_STATUS.md`, and removes completed contracts; Git history retains the evidence.
